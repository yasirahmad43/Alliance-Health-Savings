/**
 * Lead-source attribution.
 *
 * Captured on first load and kept for the session, so the survey can report
 * where a visitor actually came from. Last-touch: a URL carrying a real source
 * overwrites the stored value, while internal navigation never resets someone
 * to "Direct".
 */

export type Attribution = {
  channel: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  msclkid: string | null;
  ttclid: string | null;
  referrer: string | null;
  landing_page: string | null;
};

const STORAGE_KEY = "ahc_attribution_v1";
/* Session storage is the working copy. A 30-day local copy keeps the original
 * ad source when someone clicks today and comes back to convert next week. */
const PERSIST_KEY = "ahc_attribution_first_v1";
const PERSIST_DAYS = 30;

const SEARCH_HOSTS =
  /(^|\.)(google|bing|yahoo|duckduckgo|ecosia|yandex|baidu|ask|aol|brave)\./i;
const SOCIAL_HOSTS =
  /(^|\.)(facebook|instagram|fb|t\.co|twitter|x\.com|linkedin|lnkd|youtube|reddit|pinterest|tiktok|threads|snapchat|whatsapp)\b/i;

function get(p: URLSearchParams, k: string): string | null {
  const v = p.get(k);
  return v && v.trim() ? v.trim().slice(0, 300) : null;
}

/** Readable channel bucket. Raw values are always kept alongside it. */
function classifyChannel(p: URLSearchParams, referrerHost: string): string {
  const src = (p.get("utm_source") || "").toLowerCase();
  const med = (p.get("utm_medium") || "").toLowerCase();
  const paidMedium = /cpc|ppc|paid|display|retarget|paid[-_]?social/.test(med);

  // Click IDs are the strongest paid signal.
  if (p.get("gclid") || p.get("gbraid") || p.get("wbraid")) return "Google";
  if (p.get("fbclid")) return "Facebook";
  if (p.get("msclkid")) return "Bing";
  if (p.get("ttclid")) return "TikTok";

  if (paidMedium) {
    if (/facebook|meta|\bfb\b/.test(src)) return "Facebook";
    if (/instagram|\big\b/.test(src)) return "Instagram";
    if (/google/.test(src)) return "Google";
    if (/bing|microsoft/.test(src)) return "Bing";
    if (/tiktok/.test(src)) return "TikTok";
    return src ? `Paid — ${src}` : "Paid — Other";
  }

  if (/facebook|meta|\bfb\b/.test(src)) return "Facebook";
  if (/instagram|\big\b/.test(src)) return "Instagram";
  if (/tiktok/.test(src)) return "TikTok";

  if (referrerHost) {
    if (SEARCH_HOSTS.test(referrerHost)) return "Organic / Direct";
    if (SOCIAL_HOSTS.test(referrerHost)) return "Organic / Direct";
    return "Referral";
  }

  return "Organic / Direct";
}

function build(): Attribution {
  const p = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  let referrerHost = "";
  try {
    referrerHost = referrer ? new URL(referrer).hostname : "";
  } catch {
    referrerHost = "";
  }
  // Our own domain as a referrer is just internal navigation.
  const external =
    referrerHost && referrerHost !== window.location.hostname ? referrer : "";

  return {
    channel: classifyChannel(p, external ? referrerHost : ""),
    utm_source: get(p, "utm_source"),
    utm_medium: get(p, "utm_medium"),
    utm_campaign: get(p, "utm_campaign"),
    utm_term: get(p, "utm_term"),
    utm_content: get(p, "utm_content"),
    gclid: get(p, "gclid") || get(p, "gbraid") || get(p, "wbraid"),
    fbclid: get(p, "fbclid"),
    msclkid: get(p, "msclkid"),
    ttclid: get(p, "ttclid"),
    referrer: external ? external.slice(0, 300) : null,
    landing_page: (window.location.pathname + window.location.search).slice(0, 300),
  };
}

function hasSignal(a: Attribution): boolean {
  return (
    a.channel !== "Organic / Direct" ||
    !!a.utm_source ||
    !!a.gclid ||
    !!a.fbclid ||
    !!a.msclkid ||
    !!a.ttclid ||
    !!a.referrer
  );
}

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Attribution;
  } catch {
    /* fall through to the longer-lived copy */
  }
  return readPersisted();
}

function readPersisted(): Attribution | null {
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as { at: number; a: Attribution };
    if (!saved?.at || Date.now() - saved.at > PERSIST_DAYS * 864e5) return null;
    return saved.a;
  } catch {
    return null;
  }
}

/** Run on every page load. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const current = build();
    const stored = readStored();
    if (hasSignal(current) || !stored) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
    // Only a real campaign click is worth remembering across visits.
    if (hasSignal(current)) {
      window.localStorage.setItem(
        PERSIST_KEY,
        JSON.stringify({ at: Date.now(), a: current }),
      );
    }
  } catch {
    /* storage unavailable — attribution is best-effort, never blocks a lead */
  }
}

/** Read attribution at submit time, falling back to a fresh capture. */
export function readAttribution(): Partial<Attribution> {
  if (typeof window === "undefined") return {};
  return readStored() ?? build();
}
