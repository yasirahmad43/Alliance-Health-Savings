# Alliance Health Savings — STATE

**Mode:** build · **Status:** LIVE on Vercel, awaiting operator values.

## Live
- Production: https://alliancehealthsavings.com (www 308-redirects to apex); also https://alliance-health-savings.vercel.app
- Vercel project `alliance-health-savings` (prj_ftW0CYzq4lBJeWlcz1nq1RRIqDV4, team yasirahmad43s-projects),
  linked to github.com/yasirahmad43/Alliance-Health-Savings — a push to `claude/sweet-carson-qwb59k`
  (the repo's default branch) redeploys production. Vercel Authentication applies to previews only.
- DNS at Squarespace (2026-10-21): A @ 216.150.1.1 / 216.150.16.1, CNAME www -> 81bc12a1e901ebd0.vercel-dns-016.com. Vercel reports configured.
- Env set: `NEXT_PUBLIC_SITE_URL` = https://alliancehealthsavings.com, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` (insert-only).

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
- Supabase project `alliance-health-savings` / ref `fcrkrofyyjvmpplrnrwh` (us-east-1), created by Daniel in the dashboard 2026-10-21
  (MCP `create_project` timed out at the cost-confirmation step every time).
- `public.leads` from `supabase/migrations/0001_leads.sql`: 26 columns, RLS on, one INSERT-only policy for anon/authenticated.
  Verified with an insert as role `anon` inside a rolled-back transaction; table left empty.
- `apply_migration` and multi-statement `execute_sql` time out on this project; single statements work.
- `LEAD_WEBHOOK_URL` set (Zapier catch hook 11706715/41nve99) on 2026-10-22, production redeployed.
- End-to-end verified 2026-10-22: POST https://alliancehealthsavings.com/api/lead from a Vercel sandbox -> 200 {ok:true},
  row stored in Supabase with every field, runtime log `[lead] forwarded` (webhook fetch completed; the route does not log Zapier's status code).
- Test row `test.lead@d1techcreative.com` (id 72bf47bc…) is still in `leads`: the MCP delete timed out (destructive SQL needs a confirmation
  this session can't show). Delete it in the dashboard.

## Carrier logos
Inherited from the AHC build (public/carriers). Confirm appointments / permission before launch.
