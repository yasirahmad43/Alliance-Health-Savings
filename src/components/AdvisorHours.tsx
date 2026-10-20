import { siteConfig } from "@/lib/site-config";

/**
 * Advisor hours written out in every continental time zone. The posted hours
 * are Eastern; everything else is the same window converted, so a caller in
 * Denver or Portland never has to work out whether anyone is at the desk.
 *
 * Laid out as a grid rather than a <table> so the phone view can stack each
 * zone into its own row without the sideways scroll a table forces.
 */
export default function AdvisorHours({ className = "" }: { className?: string }) {
  const zones = siteConfig.hoursByZone;
  if (!zones?.length) return null;

  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-xl font-bold text-white">Advisor hours</h3>
        <p className="text-sm text-white/65">Same window, every zone</p>
      </div>

      <dl className="mt-6 divide-y divide-white/12 border-y border-white/12">
        <div className="hidden grid-cols-[1fr_auto_auto] gap-x-8 py-2.5 sm:grid">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Time zone
          </span>
          <span className="text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Mon – Fri
          </span>
          <span className="text-right text-[11px] font-semibold uppercase tracking-[0.12em] text-white/45">
            Saturday
          </span>
        </div>

        {zones.map((z) => (
          <div
            key={z.abbr}
            className="grid gap-y-1.5 py-3.5 sm:grid-cols-[1fr_auto_auto] sm:items-baseline sm:gap-x-8 sm:gap-y-0"
          >
            <dt className="font-display text-[15px] font-semibold text-white">
              {z.zone}{" "}
              <span className="font-sans text-[13px] font-medium text-white/50">{z.abbr}</span>
            </dt>
            <dd className="flex items-baseline justify-between gap-4 text-[14.5px] tabular-nums text-white/80 sm:block sm:text-right">
              <span className="text-white/45 sm:hidden">Mon–Fri</span>
              <span className="whitespace-nowrap">{z.weekdays}</span>
            </dd>
            <dd className="flex items-baseline justify-between gap-4 text-[14.5px] tabular-nums text-white/80 sm:block sm:text-right">
              <span className="text-white/45 sm:hidden">Saturday</span>
              <span className="whitespace-nowrap">{z.saturday}</span>
            </dd>
          </div>
        ))}
      </dl>

      {siteConfig.hoursNote && (
        <p className="mt-5 text-[13.5px] leading-relaxed text-white/60">{siteConfig.hoursNote}</p>
      )}
    </div>
  );
}
