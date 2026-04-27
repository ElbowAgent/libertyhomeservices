# Liberty Home Services — Design Document

> For web developers rebuilding the site. Maintain these specs exactly to preserve brand consistency.

---

## 1. Overview

- **Type**: Single-page website (all sections on one scroll)
- **CSS Framework**: Tailwind CSS (utility-first)
- **Theme**: Dark background with orange accent
- **Sections (top to bottom)**:
  1. Navigation/Header
  2. Hero
  3. Our Story
  4. Why Choose Us
  5. Our Commitment
  6. Services (3-column grid)
  7. Featured Projects / Portfolio
  8. Testimonials
  9. Contact Form
  10. Footer

---

## 2. Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Brand Orange | `#E97524` | Primary CTAs, borders, accents, active states |
| Orange Hover | `#ff8c3a` | Hover variant of brand orange |
| Background Dark | `#070707` | Gradient endpoints, deepest backgrounds |
| Background Mid | `#0f0f0f` | Main page background |
| Card Background | `#1a1a1a` | Cards and containers |
| Background Alt | `#0a0a0a` | Alternate dark sections |
| Text Primary | `#ffffff` | All primary text |
| Text Secondary | `rgba(255,255,255,0.5)` | Secondary text, placeholders |
| Text Tertiary | `rgba(255,255,255,0.4)` | Muted/subtle text |
| Text Muted | `#9ca3af` | Gray muted text |
| Error | `#dc2626` | Form errors, destructive states |

### Usage Rules
- **Never use light backgrounds.** The entire site is dark theme.
- **Orange (#E97524) is the only accent color.** No blues, greens, or secondary accent colors.
- Use white at varying opacity for hierarchy — never use gray text on dark backgrounds except `#9ca3af` for muted states.
- Gradient backgrounds: always `from-[#1a1a1a] to-[#0f0f0f]` (dark to darker).

---

## 3. Typography

### Font Stack
```
ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
```
- **No custom fonts.** Use system sans-serif only.
- Emoji support is intentional — include full font stack.

### Size Scale
| Use | Size | Rem |
|-----|------|-----|
| Hero H1 | 6xl | 3.75rem (60px) |
| Major section headings | 5xl | 3rem (48px) |
| Section headings | 4xl | 2.25rem (36px) |
| Card headings | 3xl | 1.875rem (30px) |
| Sub-headings | 2xl | 1.5rem (24px) |
| Large body | xl | 1.25rem (20px) |
| Body | base | 1rem (16px) |
| Secondary | sm | 0.875rem (14px) |
| Captions/meta | xs | 0.75rem (12px) |

### Weight Scale
| Weight | Value | Use |
|--------|-------|-----|
| Regular | 400 | Body text |
| Medium | 500 | Emphasized body |
| Semibold | 600 | Subheadings, button labels |
| Bold | 700 | Headings |

### Line Heights
- Headings: `1.25` (tight)
- Body paragraphs: `1.625` (relaxed)
- Default: `1.5`

### Letter Spacing
- Section labels / eyebrow text: `tracking-wider` (0.05em)

---

## 4. Layout & Spacing

### Container
- Max width: `1400px`, centered, full horizontal padding

### Responsive Breakpoints (Tailwind)
| Name | Min Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |

### Spacing System
All spacing follows Tailwind's default scale (multiples of 0.25rem):

```
4px  → gap-1 / p-1 / m-1
8px  → gap-2 / p-2 / m-2
12px → gap-3 / p-3 / m-3
16px → gap-4 / p-4 / m-4
24px → gap-6 / p-6 / m-6
32px → gap-8 / p-8 / m-8
40px → gap-10 / p-10 / m-10
48px → gap-12 / p-12 / m-12
```

**Mobile → Desktop pattern:**
- Padding: `p-6 sm:p-8` (24px → 32px)
- Gap: `gap-6 sm:gap-8` (24px → 32px)
- Card corners: `rounded-2xl sm:rounded-3xl` (16px → 24px)
- Container H-padding: `px-3 sm:px-4` (12px → 16px)

---

## 5. Components

### Navigation
**Behavior:**
- Fixed to top of viewport, full width
- `z-50` stacking

**Classes:**
```
fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4
```

**Links:** Home · About Us · Services · Portfolio · Contact Us

**Responsive:**
- Mobile: Hamburger icon; full nav hidden (`hidden lg:flex`)
- Desktop (lg+): Horizontal nav with `gap-6 xl:gap-8`
- Include a CTA button (Get Free Quote) in the nav bar

---

### Hero Section
**Layout:**
```
min-h-screen relative
```
- Full viewport height minimum
- Background: dark gradient or full-bleed image with dark overlay
- Large headline, subheadline, two CTA buttons

**Content:**
- H1: `Get Your Free Quote` — size 4xl → 6xl responsive
- Subheadline: brief description of services
- CTA 1 (Primary): "Get Free Quote"
- CTA 2 (Secondary): "Book Now"

---

### Service Cards

**Grid:**
```
grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8
```
(1 col mobile → 2 col sm → 3 col lg)

**Card:**
```
group relative overflow-hidden rounded-2xl sm:rounded-3xl
shadow-lg hover:shadow-2xl transition-all duration-300
aspect-[4/3] cursor-pointer
```

**Hover overlay (orange gradient reveals on hover):**
```css
position: absolute; inset: 0;
background: linear-gradient(to top, rgba(233,117,36,0.8), transparent);
opacity: 0; /* → 1 on group-hover */
transition: opacity 300ms;
z-index: 10;
```

**Text overlay (slides up on hover):**
```css
position: absolute; bottom: 0; left: 0; right: 0;
padding: 1.5rem;
transform: translateY(100%); /* → translateY(0) on group-hover */
transition: transform 300ms;
z-index: 20;
```

---

### Portfolio / Project Cards

```
group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
rounded-2xl sm:rounded-3xl p-6 sm:p-8
shadow-xl hover:shadow-2xl
transition-all duration-300 hover:-translate-y-2
border border-white/5
```

---

### Buttons

**Primary (filled orange):**
```
bg-[#E97524] text-white
px-6 sm:px-8 py-3 sm:py-4
rounded-lg sm:rounded-xl
font-semibold
hover:bg-[#ff8c3a]
transition-all duration-300
```

**Secondary (outlined orange):**
```
border-2 border-[#E97524] text-[#E97524]
px-6 sm:px-8 py-3 sm:py-4
rounded-lg
hover:bg-[#E97524] hover:text-white
transition-all duration-300
```

**Disabled state:** `opacity-50 cursor-not-allowed`

---

### Contact Form

**Container:**
```
bg-white/5 backdrop-blur-md
rounded-3xl p-6 sm:p-8
border border-white/10
shadow-2xl
max-w-[420px]
```

**Inputs:**
```
height: 3rem (h-12);
background: rgba(255,255,255,0.1);
border: 1px solid rgba(255,255,255,0.2);
color: white;
placeholder-color: rgba(255,255,255,0.5);
border-radius: 6px;
padding: 0.75rem;
transition: border-color 150ms;
focus: border-[#E97524];
backdrop-filter: blur(4px);
```

**Form vertical spacing:** `space-y-4`

**Heading:** "Get in Touch"
**Subtext:** "Fill out the form and we'll get back to you within 24 hours"

---

### Testimonial Cards

Display 3 customer reviews with:
- Reviewer name (bold)
- Time since review (e.g., "4 months ago") — muted text
- Review text in quotes
- Implied star rating (5-star)

**Reviewers:**
1. **Melody Guilloux** (4 months ago) — "Jordan was great to deal with. He came the same day and removed everything so efficiently."
2. **Gaurav Dhillon** (6 months ago) — "Best service and efficiency. Both men worked hard tearing down our bed frames with ease, fast and efficient!"
3. **Joel Birney** (11 months ago) — "Came by CRAZY quick, great price, and helped carry everything. 10/10"

---

### Footer

**Layout:** Horizontal flex, space-between, wraps on mobile

**Sections:**
1. Quick Links: Home · About Us · Services · Portfolio · Contact Us
2. Contact info (email: jordan@libertyhomeservices.ca)
3. Brand/logo element

---

## 6. Images & Assets

- All images are **embedded as Base64 PNG data URLs** (no external hosting)
- Aspect ratio for project/portfolio images: **4:3**
- Three portfolio images: Backyard Junk Removal, Deck & Lumber Removal, Garage Cleanout

When replacing images, maintain 4:3 aspect ratio and embed as Base64 or serve from the same origin.

---

## 7. Animations & Transitions

| Effect | Duration | Easing | Trigger |
|--------|----------|--------|---------|
| All transitions (default) | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Hover |
| Color transitions | 150ms | same | Focus/hover |
| Card lift | 300ms | same | Hover: `-translate-y-2` |
| Overlay fade in | 300ms | same | Hover: `opacity 0→1` |
| Text slide up | 300ms | same | Hover: `translateY(100%→0)` |

- Use `group` / `group-hover:` Tailwind pattern for parent-triggered child animations.
- Standard transition class: `transition-all duration-300`

---

## 8. Responsive Behavior

### Mobile (< 640px)
- Single-column layouts
- Nav: hamburger menu only
- Padding: `px-3` (12px), `p-6` (24px)
- Corner radius: `rounded-2xl` (16px)
- Text: smaller sizes (base, lg)

### Small (640px–1023px) `sm:`
- Cards: 2-column grid
- Padding increases: `sm:px-4`, `sm:p-8`
- Corner radius: `sm:rounded-3xl` (24px)
- Text grows slightly

### Large (1024px+) `lg:`
- Full horizontal navigation visible
- Cards: 3-column grid
- Max container width: 1400px
- Full spacing and text sizes

### Extra Large (1280px+) `xl:`
- Nav gap: `xl:gap-8`
- Fine-tuned spacing adjustments

---

## 9. Content

### Brand
- **Company Name:** Liberty Home Services
- **Founder:** Jordan Swaim
- **Founded:** 2022
- **Location:** Calgary, AB

### Core Services
1. **Junk Removal** — "Fast and efficient removal of unwanted items from your property. We handle everything from furniture to appliances with care and professionalism."
2. **Hauling Services** — "Professional hauling for residential and commercial needs. Safe transportation of your items wherever they need to go across Calgary."
3. **Snow Removal** — "Reliable snow clearing to keep your property safe and accessible throughout Calgary's winter months with prompt service."

### Section Copy

**Our Story:**
> "Founded by Jordan Swaim in 2022, Liberty Home Services was built on a commitment to exceptional service and customer satisfaction. What started as a junk removal service has grown into a comprehensive property maintenance company."

**Why Choose Us:**
> "As a locally owned Calgary business, we understand the unique needs of our community. We pride ourselves on transparent pricing, reliable service, and professionalism in every project."

**Our Commitment:**
> "From junk removal to snow clearing, we handle every project with professionalism and care. Customer satisfaction isn't just a goal—it's our guarantee. We're not satisfied until you're completely happy with our work."

**Services Subheading:**
> "Comprehensive solutions for all your property maintenance needs in Calgary"

**Portfolio Subheading:**
> "See how we've helped Calgary residents declutter and maintain their properties"

**Contact Form Subtext:**
> "Fill out the form and we'll get back to you within 24 hours"

### Contact Details
- **Email:** jordan@libertyhomeservices.ca
- **Response time:** Within 24 hours

### Brand Voice
- Professional yet approachable
- Local, community-focused
- Reliability and efficiency emphasized
- Key phrases: "fast and efficient", "customer satisfaction is our guarantee", "we're not satisfied until you're completely happy"

---

## 10. Technical Requirements

- **Mobile-first** development approach
- **Tailwind CSS** for styling (or equivalent utility-first framework)
- **Glassmorphism** elements: `backdrop-filter: blur`, `background: rgba(255,255,255,0.05–0.10)`
- **No external fonts** — system sans-serif stack only
- **Modern browser support** required: CSS Grid, Flexbox, CSS Custom Properties, `backdrop-filter`
- **Single page** — all content on one scrollable page with anchor navigation
- **Form** should post/submit contact requests; response within 24 hours promised

---

## 11. Design Summary Checklist

Before shipping, verify:

- [ ] Dark background (#0f0f0f or darker) throughout — no light sections
- [ ] Orange (#E97524) is the only accent color
- [ ] All cards use `hover:-translate-y-2` lift effect
- [ ] Service cards use orange gradient overlay on hover
- [ ] Navigation is fixed/sticky at top
- [ ] Mobile hamburger menu works at < 1024px
- [ ] 3-column service grid collapses to 1 on mobile
- [ ] All transitions are 300ms ease
- [ ] Form inputs have orange focus border
- [ ] Portfolio images maintain 4:3 aspect ratio
- [ ] Contact email (jordan@libertyhomeservices.ca) is correct
- [ ] "Calgary" appears in service area copy throughout
- [ ] Footer has quick links and contact info
