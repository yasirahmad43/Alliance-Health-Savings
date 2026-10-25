import { siteConfig } from "@/lib/site-config";
import { HoursTable } from "@/components/Hours";

/**
 * Advisor hours in every US time zone, as a card on /contact. The posted
 * hours are Eastern (siteConfig.hoursET); HoursTable converts them and marks
 * the visitor's own zone.
 */
export default function AdvisorHours({ className = "" }: { className?: string }) {
  return (
    <div className={`card p-6 sm:p-8 ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="font-display text-xl font-bold text-white">Advisor hours</h3>
        <p className="text-sm text-white/65">{siteConfig.hours}</p>
      </div>

      <HoursTable tone="dark" className="mt-5 text-[14px]" />

      {siteConfig.hoursNote && (
        <p className="mt-5 text-[13.5px] leading-relaxed text-white/60">{siteConfig.hoursNote}</p>
      )}
    </div>
  );
}
