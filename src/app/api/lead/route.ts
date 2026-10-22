import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { siteConfig } from "@/lib/site-config";

/* Leads are written to Supabase AND forwarded to the CRM webhook configured
   via LEAD_WEBHOOK_URL (a Zapier catch hook). The two deliveries are wrapped
   independently: neither one failing can cost us the other, and neither can
   turn a valid submission into an error for the visitor.

   Anti-spam guards run BEFORE any delivery, in this order:
   honeypot → blocklists → rate limits → validation.

   Two kinds of rejection:
   - definite-bot signals (honeypot, blocklist, rate limit) return {ok:true}
     but deliver NOTHING, so the bot never learns it's being filtered — every
     drop is logged as "[lead-guard] drop" with a reason and the IP;
   - problems a real person can fix (invalid US phone) return 400 with a
     message the survey displays. */

/* ---- Blocklist — extend these when a new bot fingerprint shows up ---- */
const BLOCKED_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "tempmail.com",
  "10minutemail.com",
  "trashmail.com",
]);
const BLOCKED_REFERRER_SUBSTRINGS: string[] = [];
const BLOCKED_IPS = new Set<string>([]);

/* ---- In-memory rate limits (per serverless instance; reset on cold start,
        which is fine — they only need to blunt burst abuse) ---- */
const IP_LIMIT = { max: 5, windowMs: 10 * 60_000 };
const EMAIL_LIMIT = { max: 3, windowMs: 60 * 60_000 };
const ipHits = new Map<string, number[]>();
const emailHits = new Map<string, number[]>();

function overLimit(
  map: Map<string, number[]>,
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
) {
  const now = Date.now();
  if (map.size > 5000) {
    for (const [k, v] of map) if (now - v[v.length - 1] > windowMs) map.delete(k);
  }
  const hits = (map.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  map.set(key, hits);
  return hits.length > max;
}

/* 10 digits, or 11 starting with 1 (the visitor typed the +1) — anything else
   is not a US number. Returns the normalized 10-digit form. */
function usPhoneDigits(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return null;
}

function str(v: unknown, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

function nullable(v: unknown, max: number) {
  const s = str(v, max);
  return s ? s : null;
}

function silentDrop(reason: string, detail: Record<string, string>) {
  console.warn("[lead-guard] drop", { reason, ...detail });
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const referer = req.headers.get("referer") ?? "";

  /* 1. Honeypot — hidden "company" field in the survey; humans never fill it. */
  if (str(body.company, 200)) {
    return silentDrop("honeypot", { ip });
  }

  const lead = {
    state: str(body.state, 40),
    household: str(body.household, 40),
    pre_existing: str(body.pre_existing, 10),
    timing: str(body.timing, 40),
    first_name: str(body.first_name, 80),
    last_name: str(body.last_name, 80),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    consent: true, // the consent paragraph is shown above the submit button
    source: siteConfig.domain,
    /* Attribution — captured client-side, see lib/attribution.ts */
    channel: nullable(body.channel, 60),
    utm_source: nullable(body.utm_source, 300),
    utm_medium: nullable(body.utm_medium, 300),
    utm_campaign: nullable(body.utm_campaign, 300),
    utm_term: nullable(body.utm_term, 300),
    utm_content: nullable(body.utm_content, 300),
    gclid: nullable(body.gclid, 300),
    fbclid: nullable(body.fbclid, 300),
    msclkid: nullable(body.msclkid, 300),
    ttclid: nullable(body.ttclid, 300),
    referrer: nullable(body.referrer, 300),
    landing_page: nullable(body.landing_page, 300),
    form_location: nullable(body.form_location, 60),
    submitted_at: new Date().toISOString(),
  };

  const emailKey = lead.email.toLowerCase();
  const emailDomain = emailKey.split("@")[1] ?? "";

  /* 2. Blocklists */
  if (BLOCKED_IPS.has(ip)) {
    return silentDrop("blocked-ip", { ip });
  }
  if (emailDomain && BLOCKED_EMAIL_DOMAINS.has(emailDomain)) {
    return silentDrop("blocked-email-domain", { ip, domain: emailDomain });
  }
  if (referer && BLOCKED_REFERRER_SUBSTRINGS.some((s) => referer.includes(s))) {
    return silentDrop("blocked-referrer", { ip, referer: referer.slice(0, 200) });
  }

  /* 3. Rate limits */
  if (overLimit(ipHits, ip, IP_LIMIT)) {
    return silentDrop("rate-limit-ip", { ip });
  }
  if (emailKey && overLimit(emailHits, emailKey, EMAIL_LIMIT)) {
    return silentDrop("rate-limit-email", { ip, email: emailKey });
  }

  /* 4. Validation */
  if (!lead.state || !lead.email || !lead.phone || !lead.first_name) {
    return NextResponse.json({ ok: false }, { status: 422 });
  }
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]{2,}$/.test(lead.email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address" },
      { status: 400 },
    );
  }
  const phoneDigits = usPhoneDigits(lead.phone);
  if (!phoneDigits) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid US phone number" },
      { status: 400 },
    );
  }
  lead.phone = phoneDigits;

  /* ---- Delivery. Both destinations are independent; a failure in either is
          logged and swallowed so the visitor still reaches /thank-you. ---- */
  if (isSupabaseConfigured()) {
    try {
      const { error } = await getSupabaseAdmin().from("leads").insert(lead);
      if (error) console.error("[lead] supabase insert failed", error.message);
    } catch (err) {
      console.error("[lead] supabase insert threw", err);
    }
  } else {
    console.log("[lead] Supabase not configured — skipping insert");
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (res.ok) {
        console.log("[lead] forwarded", { ip, email: emailKey, status: res.status });
      } else {
        /* A rejected webhook still leaves the lead in Supabase, so log enough
           to find it there and replay it. */
        const detail = (await res.text().catch(() => "")).slice(0, 200);
        console.error("[lead] webhook rejected", {
          ip,
          email: emailKey,
          status: res.status,
          detail,
        });
      }
    } catch (err) {
      console.error("[lead] webhook delivery failed", err);
    }
  } else {
    console.log("[lead] received (no LEAD_WEBHOOK_URL configured)", {
      state: lead.state,
      email: emailKey,
    });
  }

  return NextResponse.json({ ok: true });
}
