# Product / Marketing Context — Wellspring Family Clinic

## What this is

A static, single-page marketing site for "Wellspring Family Clinic" — a fictional family
healthcare clinic used as a course/portfolio project. No build step, no CMS, no backend,
no analytics wired up yet. Three files: `index.html`, `style.css`, `script.js`, deployed via
GitHub Pages.

**Placeholder business details** (not real — don't try to verify/contact them):
address `123 Maple Avenue, Springfield, ST 12345`, phone `(555) 123-4567`, email
`hello@wellspringclinic.example`. Treat these as stand-ins; don't flag them as SEO/NAP errors,
but do note they'd need replacing before any real launch.

## Business context

- **What it does:** Family healthcare clinic — general checkups, pediatrics, cardiology,
  emergency/urgent care. Positioning: "Compassionate Care, Close to You."
- **Ideal visitor:** A local family or individual searching for a nearby family clinic that
  takes walk-ins/new patients — not a B2B or SaaS audience.
- **Primary conversion goal:** Get the visitor to submit the appointment request form
  (`#appointmentForm` in `index.html`, client-side only — see note below).
- **Trust signals already on page:** 24/7 support line, certified doctors, "10,000+ patients"
  claim, four written testimonials with star ratings.

## Current state / constraints

- **No backend:** the appointment form validates client-side and logs to console on submit —
  there is no real lead capture, email delivery, or CRM. Any lead-magnet or SEO recommendation
  that assumes a backend, email service, or analytics platform needs to flag that as a
  prerequisite rather than assume it exists.
- **No blog, no additional pages, no sitemap/robots.txt today** — it's one HTML page with anchor
  sections (`#home`, `#services`, `#testimonials`, `#contact`) plus a footer.
- **No Search Console / analytics access** — audits should rely on what's inspectable in the
  code and public tools (PageSpeed Insights, Rich Results Test), not assume GSC data is available.
- **Single audience, single page** — no keyword cannibalization or multi-page architecture
  concerns; on-page SEO work here is about optimizing this one page well, not a page-mapping
  exercise.

## Brand voice & design constraints

See `design-system/wellspring-family-clinic/MASTER.md` for the full design system (colors,
type, components) and the repo's `CLAUDE.md` for file-structure conventions. Key points any
marketing or lead-gen recommendation should respect:

- Palette: teal/blue primary (`#0d7377`, `#0d3b40`, `#14a3ad`) + coral accent (`#ff8552`,
  reserved for primary CTAs only).
- Font: Inter only, no second typeface.
- Tone: warm, reassuring, plain-spoken healthcare marketing — not clinical/corporate, not
  hype-driven.
- Markup/CSS/JS must stay separated across the three files; no inline `<style>`/`<script>`.

## Notes for seo-audit / lead-magnets skills

- Since there's no backend or email infrastructure, any lead magnet plan must include what
  minimal infrastructure (e.g. a form endpoint or third-party form service) would be needed
  to actually collect emails — don't assume it's already there.
- SEO audit focus areas that actually apply here: title/meta description quality (already has
  both), heading hierarchy, image alt text (icons are emoji today, not `<img>` — flag if that's
  a concern for a real launch), mobile-friendliness, Core Web Vitals for a static page, and
  whether a sitemap/robots.txt should be added before going live.
