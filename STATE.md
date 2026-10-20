# Alliance Health Savings — STATE

**Mode:** build · **Status:** first build, deploying to Vercel.

Cloned from the American Healthcare Choice codebase (same chassis, same locked
survey/comparison/lead plumbing) and rebranded: navy + teal palette from the
supplied logo, Plus Jakarta Sans + Nunito Sans, new logo/favicon/OG, and all
photography and video regenerated for this brand. See BRAND.md.

## Still blank in src/lib/site-config.ts (site hides each one rather than faking it)
`legalName` · `phoneDisplay`/`phoneTel` (+`showPhone:false`) · `email` · `npn` · `socials`

## Lead pipeline
`POST /api/lead` is wired for Supabase + `LEAD_WEBHOOK_URL`. Neither is
configured for this brand yet — until they are, submissions validate, pass the
anti-spam checks and redirect to /thank-you, but are not stored. Needed:
- `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` (or service role key) for a NEW Supabase project with a `leads` table
- `LEAD_WEBHOOK_URL` — this brand's own Zapier catch hook
- `NEXT_PUBLIC_SITE_URL` once the domain is pointed

## Carrier logos
Inherited from the AHC build (public/carriers). Confirm appointments / permission before launch.
