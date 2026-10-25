"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Advisor hours, kept in Eastern Time (siteConfig.hoursET) and shown in every
 * US zone. The one-line summary follows the visitor's own zone; the full
 * table sits behind a tap so six zones never cost more than one line.
 */
const DAYS = siteConfig.hoursDays;
const ET_HOURS = siteConfig.hoursET;

type Zone = { abbr: string; name: string; offset: number };

/** Hawaii and Arizona skip daylight saving, so their gap to ET moves. */
function hawaiiOffset() {
  const hour = (timeZone: string) =>
    Number(
      new Intl.DateTimeFormat("en-US", { timeZone, hour: "numeric", hourCycle: "h23" }).format(
        new Date(),
      ),
    );
  const diff = hour("Pacific/Honolulu") - hour("America/New_York");
  return diff > 0 ? diff - 24 : diff;
}

function zones(hi: number): Zone[] {
  return [
    { abbr: "ET", name: "Eastern", offset: 0 },
    { abbr: "CT", name: "Central", offset: -1 },
    { abbr: "MT", name: "Mountain", offset: -2 },
    { abbr: "PT", name: "Pacific", offset: -3 },
    { abbr: "AKT", name: "Alaska", offset: -4 },
    { abbr: "HT", name: "Hawaii", offset: hi },
  ];
}

function zoneFor(tz: string, hi: number): Zone {
  const all = zones(hi);
  const pick = (abbr: string) => all.find((z) => z.abbr === abbr)!;
  if (tz === "Pacific/Honolulu") return pick("HT");
  if (tz === "America/Phoenix") return { abbr: "AZ", name: "Arizona", offset: hi + 3 };
  if (/Anchorage|Juneau|Sitka|Nome|Yakutat|Metlakatla/.test(tz)) return pick("AKT");
  if (/Los_Angeles/.test(tz)) return pick("PT");
  if (/Denver|Boise/.test(tz)) return pick("MT");
  if (/Chicago|Menominee|Indiana\/(Knox|Tell_City)|North_Dakota/.test(tz)) return pick("CT");
  return pick("ET");
}

function clock(hour: number) {
  const h = ((hour % 24) + 24) % 24;
  return `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;
}

const range = ([from, to]: readonly [number, number], offset: number) =>
  `${clock(from + offset)}–${clock(to + offset)}`;

const subscribe = () => () => {};
const SERVER_SNAPSHOT = "America/New_York|-6";
const clientSnapshot = () =>
  `${Intl.DateTimeFormat().resolvedOptions().timeZone}|${hawaiiOffset()}`;

function useZones() {
  const [tz, hi] = useSyncExternalStore(subscribe, clientSnapshot, () => SERVER_SNAPSHOT).split("|");
  return { all: zones(Number(hi)), local: zoneFor(tz, Number(hi)) };
}

function summary(zone: Zone) {
  return `${DAYS} ${range(ET_HOURS, zone.offset)} ${zone.abbr}`;
}

type Tone = "light" | "dark";

/** All zones in a tight two-column table. */
export function HoursTable({ tone = "light", className = "" }: { tone?: Tone; className?: string }) {
  const { all, local } = useZones();
  const rows = all.some((z) => z.abbr === local.abbr) ? all : [...all, local];
  const dark = tone === "dark";
  const strong = dark ? "text-white" : "text-brand-primary";
  const soft = dark ? "text-white/70" : "text-brand-primary/70";

  return (
    <table className={`w-full text-left text-[13px] tabular-nums ${className}`}>
      <thead>
        <tr className={`text-[11px] uppercase tracking-[0.08em] ${dark ? "text-white/55" : "text-brand-primary/50"}`}>
          <th scope="col" className="pb-1.5 font-semibold">
            Time zone
          </th>
          <th scope="col" className="pb-1.5 text-right font-semibold">
            {DAYS}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((z) => {
          const mine = z.abbr === local.abbr;
          return (
            <tr key={z.abbr} className={`border-t ${dark ? "border-white/15" : "border-brand-primary/12"}`}>
              <th scope="row" className={`py-1.5 pr-3 font-semibold ${strong}`}>
                {z.name}
                {mine && (
                  <span className={`ml-1.5 text-[11px] font-bold ${dark ? "text-brand-bright-soft" : "text-brand-accent"}`}>
                    You
                  </span>
                )}
              </th>
              <td className={`py-1.5 text-right ${mine ? strong : soft}`}>{range(ET_HOURS, z.offset)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/**
 * One line of hours in the visitor's zone; tapping it reveals every zone.
 * `popover` floats the table (topbar); `inline` opens it in the flow (footer).
 */
export function Hours({
  variant = "inline",
  tone = "dark",
  icon = false,
  className = "",
}: {
  variant?: "popover" | "inline";
  tone?: Tone;
  icon?: boolean;
  className?: string;
}) {
  const { local } = useZones();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open || variant !== "popover") return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, variant]);

  return (
    <div ref={wrapRef} className={`relative ${variant === "inline" ? "block" : "inline-block"} ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Advisor hours: ${summary(local)}. Show all time zones`}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 text-left ${variant === "inline" ? "min-h-[44px]" : ""} ${
          tone === "dark" ? "hover:text-white" : "hover:text-brand-primary"
        }`}
      >
        {icon && (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0 text-brand-bright" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        )}
        <span>{summary(local)}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={`size-2.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {variant === "popover" ? (
        <div
          id={panelId}
          hidden={!open}
          className="absolute left-0 top-full z-[60] mt-2 w-[14rem] rounded-xl border border-brand-primary/12 bg-white p-3.5 font-normal shadow-[0_12px_32px_-12px_#0e254773] sm:left-auto sm:right-0"
        >
          <HoursTable tone="light" />
          {siteConfig.hoursNote && <p className="mt-2 text-[11.5px] text-brand-primary/60">{siteConfig.hoursNote}</p>}
        </div>
      ) : (
        <div id={panelId} hidden={!open} className="max-w-[14rem] pb-2 font-normal">
          <HoursTable tone={tone} />
        </div>
      )}
    </div>
  );
}
