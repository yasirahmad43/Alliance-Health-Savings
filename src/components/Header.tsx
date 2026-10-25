"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SurveyCTA from "@/components/SurveyCTA";
import { siteConfig } from "@/lib/site-config";
import { Hours } from "@/components/Hours";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Thin dark topbar, on the same rail as everything below it */}
      <div className="bg-brand-primary-strong text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-x-6 px-4 text-[13px] font-medium sm:justify-between sm:px-6">
          <p className="flex items-center gap-2 text-white/90">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-brand-accent" aria-hidden="true">
              <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            Licensed advisors in all 50 states
          </p>
          <div className="hidden items-center gap-6 text-white/75 sm:flex">
            <Hours variant="popover" icon />
            {siteConfig.showPhone && siteConfig.phoneTel && (
              <a href={`tel:${siteConfig.phoneTel}`} className="font-semibold text-white hover:text-white/80">
                {siteConfig.phoneDisplay}
              </a>
            )}
            <span>Apply any day of the year</span>
            <span aria-hidden="true" className="h-3.5 w-px bg-white/25" />
            <span>No pressure, ever.</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-300 ${
          scrolled ? "border-transparent shadow-[0_8px_30px_-12px_#0e254733]" : "border-brand-rule"
        }`}
      >
        <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-[5.25rem]">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} — home`}>
            <Image
              src={siteConfig.brand.logo}
              alt={siteConfig.name}
              width={1340}
              height={343}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const on = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={on ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${
                    on
                      ? "bg-brand-wash text-brand-primary"
                      : "text-brand-ink/75 hover:bg-brand-wash hover:text-brand-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <SurveyCTA formLocation="header-cta" className="btn-primary hidden sm:inline-flex">
              Find My Plan
            </SurveyCTA>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-11 items-center justify-center rounded-full text-brand-primary shadow-[inset_0_0_0_1.5px_var(--color-brand-rule-strong)] lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5" aria-hidden="true">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu — solid, never translucent over content */}
        {open && (
          <div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 flex flex-col overflow-y-auto border-t border-brand-rule bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
          >
            <div className="flex flex-col px-4 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex min-h-14 items-center justify-between border-b border-brand-rule text-lg font-semibold text-brand-primary"
                >
                  {item.label}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-brand-ink/40" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </Link>
              ))}
              <SurveyCTA
                formLocation="mobile-menu-cta"
                onActivate={() => setOpen(false)}
                className="btn-primary btn-lg mt-6 w-full"
              >
                Find My Plan
              </SurveyCTA>
              <p className="mt-4 text-center text-sm leading-relaxed text-brand-ink/60">
                Licensed advisors in all 50 states. No pressure, ever.
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
