# Abdalsalam Al Birawi — Portfolio

Personal portfolio: a space-themed, single-page site built with Next.js 16,
Tailwind CSS v4 and GSAP.

## Stack

- **Next.js 16** (App Router, TypeScript, static export-friendly)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **GSAP 3** + ScrollTrigger + SplitText for scroll and kinetic-type animation
- **Phosphor Icons**

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/
    page.tsx          the portfolio
    resume/page.tsx   plain, ATS-friendly resume
    globals.css       design tokens, surfaces, keyframes
  components/
    Motion.tsx        one GSAP provider driving every scroll animation
    Starfield.tsx     animated canvas star field
    interactive.tsx   cursor glow, spotlight cards, count-up, marquee
    vectors.tsx       inline SVG decoration
    Hero.tsx, Nav.tsx, Section.tsx, sections.tsx
  content/cv.ts       ALL copy lives here — both pages read from it
```

### Editing content

Every piece of text — roles, bullets, skills, education, contact details —
lives in `src/content/cv.ts`. Change it there and both the portfolio and the
resume page update together.

### Animation

Elements opt into motion declaratively:

| Attribute | Effect |
|-----------|--------|
| `data-reveal` | fade and rise on entry (`left` / `right` / `scale` variants) |
| `data-split` | kinetic type, per character (or `lines`) |
| `data-stagger` | reveal children in sequence |
| `data-parallax="-12"` | drift with scroll |
| `data-draw` | draw a rule from left to right |

Everything respects `prefers-reduced-motion`.

## Imagery

Space photography from NASA and ESA/Webb — see
[`public/images/CREDITS.md`](public/images/CREDITS.md).
