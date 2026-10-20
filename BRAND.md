# BRAND.md — Alliance Health Savings

New roster entry. Domain: **alliancehealthsavings.com**

Built as a rebrand of the American Healthcare Choice chassis on Daniel's
instruction ("copy American Healthcare Choice, change branding colors, images
and videos"). Every locked conversion and plumbing rule from the healthcare
skill is inherited unchanged from that build: survey, thank-you, comparison,
/compare pages, lead API, anti-spam, attribution, disclosures, D1 credit.

## Palette — sampled from the supplied logo

| Token | Value | Role |
|---|---|---|
| `--brand-primary` | `#173966` | Logo navy — headers, dark bands, footer |
| `--brand-primary-strong` | `#0E2547` | Deeper navy — hero ground, overlays |
| `--brand-secondary` | `#1F5A96` | Mid navy — bars, hovers, map fills |
| `--brand-accent` | `#0B7F97` | Deep teal — buttons, links, accent text (4.7:1 on white) |
| `--brand-accent-strong` | `#096A7F` | Button hover |
| `--brand-bright` | `#22AEC7` | Logo teal — decorative only (rules, dots, badges) |
| `--brand-bright-soft` | `#3CC3DB` | Accent text on navy grounds (5.5:1) |
| `--brand-ink` | `#0D1C33` | Body text (navy-biased, never neutral grey) |
| `--brand-tint` / `--brand-canvas` | `#ECF6F9` / `#F4FAFB` | Teal-washed light bands |

No grey. No red. The logo's bright teal fails contrast as text on white, so it
never carries text there; the deep teal does.

## Type

- **Display — Plus Jakarta Sans** (700). Geometric, heavy, close to the logo wordmark.
- **Body — Nunito Sans** (400/600). Soft humanist, friendly and readable.

## Media

All photography (39 images) and all 16 page/section films were generated for
this brand only — see `public/media/CREDITS.md`. State landmark photos are
Wikimedia Commons (credits in `src/data/statePhotos.ts`).

## Separation from siblings

- **American Healthcare Choice** — same chassis, but navy + teal instead of
  navy + crimson, different type pairing, different logo, entirely new
  photography and video.
- **Pacific Healthcare Savings** — Pacific is teal + coral; Alliance has no
  warm accent at all and uses navy as its dominant ground.
- **America Healthcare Savings** — no red, no black.

## Open items (blank in config until Daniel supplies)

phone (`showPhone: false`) · email · legal name · NPN · Zapier webhook ·
Supabase project · carrier appointment confirmation · custom domain.
