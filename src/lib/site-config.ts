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
  /* Advisor hours, kept in Eastern Time. components/Hours.tsx converts them
     into every US zone and shows the visitor's own zone first, so change
     only these two values. */
  hours: "Mon–Fri 9am–6pm ET",
  hoursDays: "Mon–Fri",
  hoursET: [9, 18] as [number, number],
  hoursNote: "Closed Saturday and Sunday.",
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
