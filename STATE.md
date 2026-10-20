# Alliance Health Savings — STATE

**Mode:** build · **Status:** LIVE on Vercel, awaiting operator values.

## Live
- Production: https://alliance-health-savings.vercel.app
- Vercel project `alliance-health-savings` (prj_ftW0CYzq4lBJeWlcz1nq1RRIqDV4, team yasirahmad43s-projects),
  linked to github.com/yasirahmad43/Alliance-Health-Savings — a push to `claude/sweet-carson-qwb59k`
  (the repo's default branch) redeploys production. Vercel Authentication applies to previews only.
- Env set: `NEXT_PUBLIC_SITE_URL` = https://alliance-health-savings.vercel.app (change when the domain is pointed).

## Verified 2026-10-20
- `next build` + `tsc --noEmit` clean, 75 routes.
- Zero horizontal scroll on 13 routes x 320/360/390/430px.
- Production returns 200 with Alliance branding; no "American Healthcare Choice" string anywhere in src.

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
