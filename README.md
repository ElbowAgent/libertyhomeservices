# Liberty Home Services

Marketing site for Liberty Home Services (Calgary). Single-page Next.js 14 (App Router) build with Tailwind CSS, deployed on Vercel.

## Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styles:** Tailwind CSS 3
- **Icons:** lucide-react
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
  layout.tsx       Root layout, fonts, metadata
  page.tsx         Composes the single-page sections
  globals.css      Tailwind + base styles
components/
  Nav.tsx          Fixed top nav with mobile drawer
  Hero.tsx         Hero with embedded ContactForm
  ContactForm.tsx  Quote form (4 fields + project type)
  About.tsx        Story / Why Choose Us / Commitment
  Services.tsx     3-card service grid (icons)
  Portfolio.tsx    3 featured projects with hover overlay
  Testimonials.tsx Google review cards
  Contact.tsx      CTA section with phone/quote buttons
  Footer.tsx       4-column footer with contact details
public/
  images/          Logo, hero/cta backgrounds, portfolio shots
```

## Design source of truth

`design-doc.md` documents colors, typography, spacing, components, and copy. Match it when modifying styles.

## Deploying to Vercel from GitHub

1. Push this `current/` folder to a new GitHub repo (or set this as the project root).
2. In Vercel, **Add New Project → Import Git Repository → select the repo**.
3. Framework preset auto-detects as **Next.js**. No env vars required.
4. **Deploy** — every push to `main` ships to production; PRs get preview URLs.

If the repo root is not this folder, set **Root Directory** in Vercel project settings to the path containing this `package.json`.

## Editing content

- Service descriptions / pricing → `components/Services.tsx`
- Portfolio projects → `components/Portfolio.tsx`
- Reviews → `components/Testimonials.tsx`
- Contact details (phone, email, address) → `components/Footer.tsx` and `components/Contact.tsx`

## Form backend

`ContactForm.tsx` currently only previews submission state. Wire it to a backend (Resend, Formspree, Vercel serverless function, etc.) by replacing the `handleSubmit` body.
