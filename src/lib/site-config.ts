/**
 * Single source of truth for everything brand- and operator-specific.
 * Nothing here is invented: values Daniel has not supplied stay empty and the
 * UI hides the corresponding element rather than shipping a placeholder.
 */
export const siteConfig = {
  name: "Alliance Health Savings",
  legalName: "", // TODO: supplied by client — used in the footer disclosure
  domain: "alliancehealthsavings.com",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://alliancehealthsavings.com",
  description:
    "Private PPO health coverage reviewed by a licensed advisor — available any day of the year, with pre-existing conditions covered.",

  /* Real number supplied by Daniel 2026-10-24. Set showPhone false to hide it everywhere. */
  phoneDisplay: "(910) 466-7914",
  phoneTel: "+19104667914",
  showPhone: true,

  email: "",
  /* Compact form used in the topbar, footer and thank-you page. */
  hours: "Mon–Fri 8am–8pm · Sat 9am–5pm ET",
  /* The same advisor hours written out in each continental zone, so a caller
     in Phoenix or Portland does not have to do the arithmetic. Derived from
     the Eastern hours above — change one and change the rest. */
  hoursByZone: [
    { zone: "Eastern", abbr: "ET", weekdays: "8:00am – 8:00pm", saturday: "9:00am – 5:00pm" },
    { zone: "Central", abbr: "CT", weekdays: "7:00am – 7:00pm", saturday: "8:00am – 4:00pm" },
    { zone: "Mountain", abbr: "MT", weekdays: "6:00am – 6:00pm", saturday: "7:00am – 3:00pm" },
    { zone: "Pacific", abbr: "PT", weekdays: "5:00am – 5:00pm", saturday: "6:00am – 2:00pm" },
  ] as { zone: string; abbr: string; weekdays: string; saturday: string }[],
  /* Alaska and Hawaii are served, but by callback rather than posted hours. */
  hoursNote: "Closed Sunday. Alaska and Hawaii are served by scheduled callback — tell us a time that works and an advisor will call then.",
  serviceArea: "All 50 states",
  npn: "", // blank = the licensing line is omitted entirely

  socials: {} as Record<string, string>,
  /* Real carrier marks (Wikimedia Commons / Wikipedia files, see
     public/carriers/SOURCES.md). Shown on Daniel's instruction; carrier
     appointments and trademark use are the operator's to confirm. */
  carriers: [
    { name: "UnitedHealthcare", logo: "/carriers/unitedhealthcare.svg" },
    { name: "Blue Cross Blue Shield", logo: "/carriers/bcbs.svg" },
    { name: "Aetna", logo: "/carriers/aetna.svg" },
    { name: "Cigna", logo: "/carriers/cigna.svg" },
    { name: "Humana", logo: "/carriers/humana.svg" },
    { name: "Anthem Blue Cross Blue Shield", logo: "/carriers/anthem.svg" },
    { name: "Oscar Health", logo: "/carriers/oscar.svg" },
    { name: "Molina Healthcare", logo: "/carriers/molina.svg" },
  ] as { name: string; logo: string }[],

  nav: [
    { label: "Compare", href: "/compare" },
    { label: "States", href: "/states" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  brand: {
    logo: "/brand/logo.png",
    /* The wordmark is navy + teal, so on dark grounds it sits on a white
       plate rather than being recoloured into an unreadable white version. */
    mark: "/brand/mark.png",
    ogImage: "/brand/og.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
