# Liberty Home Services

Marketing site for Liberty Home Services (Calgary). Next.js 14 (App Router) + Tailwind, deployed on Vercel.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styles:** Tailwind CSS 3
- **Icons:** lucide-react
- **Animation:** framer-motion
- **Reviews:** Elfsight Google Reviews widget (third-party embed)
- **Hosting:** Vercel (auto-deploy from GitHub)

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx                       Root layout, metadata, favicon
  page.tsx                         Home: Hero → Reviews → Portfolio → About → CTA
  estimate/page.tsx                Quote estimator route (wraps EstimatorWizard)
  portfolio/page.tsx               Full portfolio gallery page
  globals.css                      Tailwind + base styles
components/
  Nav.tsx                          Fixed top nav, mobile drawer, "Get Estimate" pill
  Hero.tsx                         Hero with InstantEstimateCard on the right
  InstantEstimateCard.tsx          Glass card: 6 service chips → /estimate?service=<id>
  About.tsx                        Story / Why Choose Us / Commitment
  Portfolio.tsx                    3 featured projects with before/after overlay
  PortfolioGallery.tsx             Full gallery (used on /portfolio)
  Testimonials.tsx                 Elfsight Google Reviews widget embed
  Contact.tsx                      CTA section with phone + Get a Quote
  Footer.tsx                       4-column footer
  motion.tsx                       Shared framer-motion presets
  estimator/
    EstimatorWizard.tsx            5-step state machine, service stacking, skip-on-loopback
    Stepper.tsx                    5-dot progress indicator
    StepServiceSelect.tsx          Step 1 — pick from 6 services
    StepDetails.tsx                Step 2 — dispatches to per-service input UI
    StepLocation.tsx               Step 3 — address, postal, phone, contact prefs
    StepEmailGate.tsx              Step 4 — email reveal (skipped on loop-back)
    StepQuote.tsx                  Step 5 — bundled quote w/ remove + add cross-sell
    QuoteCard.tsx                  Single-service quote panel (used in Step 4)
    LivePricePreview.tsx           Sticky running estimate (above wizard, Steps 2–3)
    services/                      6 per-service input components + tier picker
lib/
  pricing.ts                       Canonical pricing data (mirrors price-model markdown)
  estimator.ts                     Pure pricing functions + confidence-narrowing range helper
  projects.ts                      Portfolio project data
public/
  images/                          Logo, hero/cta backgrounds, portfolio shots
scripts/
  screenshot-estimator.mjs         Playwright regression battery for the estimator
  screenshot.mjs / inspect-*.mjs   Existing portfolio + nav inspection scripts
```

## Design source of truth

`design-doc.md` documents colors, typography, spacing, components, and copy. Match it when modifying styles.

## Deploying to Vercel from GitHub

1. Push this `current/` folder to a new GitHub repo (or set this as the project root).
2. In Vercel: **Add New Project → Import Git Repository → select the repo**.
3. Framework preset auto-detects as **Next.js**. No env vars required.
4. **Deploy** — every push to `main` ships to production; PRs get preview URLs.

If the repo root is not this folder, set **Root Directory** in Vercel project settings to the path containing this `package.json`.

## Editing content

- Pricing data → `lib/pricing.ts` (mirrors `../../price-model/liberty-pricing-md.md`)
- Portfolio projects → `lib/projects.ts`
- Reviews → managed in the Elfsight dashboard for app `9153a3da-5c71-4d97-b526-ca65ff63e841`
- Contact details (phone, email, address) → `components/Footer.tsx` and `components/Contact.tsx`
- Service area → `SERVICE_AREAS` in `lib/pricing.ts`

## Estimator behavior

- **Stacking:** users can return to Step 5, click a cross-sell card, and add another service. The wizard skips Step 3 (location) and Step 4 (email gate) on subsequent runs since those answers are already collected.
- **Confidence narrowing:** the displayed range tightens as the user answers more questions — ±50% (Step 2), ±30% (Step 3), ±20% (Step 4), ±15% (Step 5). Tunable via `CONFIDENCE_PADDING` in `lib/estimator.ts`.
- **Specialty items:** Hot Tub / Spa is `contactOnly` — selecting it routes the user to the contact form rather than auto-pricing. Piano and Pool Table are demolition-only with stated prices.
- **Service prefill:** `/estimate?service=<id>` jumps straight to Step 2 with the chosen service preselected.

## Form backend

The estimator's Step 5 "Book Now" button currently routes to `/#contact?<query>` with all collected fields as query params. The Contact section reads them via standard form pre-fill. Wire submission to a backend (Resend, Formspree, Vercel serverless function, etc.) when ready — no server-side handler exists yet.
