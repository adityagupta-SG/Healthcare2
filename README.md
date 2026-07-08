# Wellspring Family Clinic

A static, single-page marketing website for a fictional healthcare clinic. Built with plain HTML, CSS, and JavaScript — no build step, no package manager, no dependencies.

**Live site:** https://adityagupta-sg.github.io/Healthcare2/

![Wellspring Family Clinic screenshot](assets/screenshot.png)

## Features

- Responsive, mobile-first layout with a collapsible hamburger nav below 768px
- Custom inline SVG icon set (nav logo, trust badges, service icons) — no emoji icons
- Staggered hero load-in animation and scroll-triggered fade-ins (`IntersectionObserver`), both respecting `prefers-reduced-motion`
- Sections: Hero, How It Works, Services, Meet Our Care Team, Testimonials, FAQ (native accordion), Free New Patient Checklist opt-in, Appointment/Contact form, Footer
- Appointment form (name, email, phone) validates client-side then delivers real email via [FormSubmit](https://formsubmit.co) — no backend of our own. Checklist opt-in form (email) validates client-side only, for now. Both show inline errors — no `alert()` popups
- On-page SEO: canonical tag, Open Graph/Twitter cards, `MedicalClinic` + `FAQPage` JSON-LD structured data, `robots.txt`, and `sitemap.xml`
- Floating WhatsApp chat button (bottom-right, pulsing ring, respects `prefers-reduced-motion`) linking to a pre-filled `wa.me` chat

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (Flexbox/Grid, one responsive breakpoint at 768px)
- Vanilla JavaScript (no frameworks)
- Google Fonts ("Fraunces" for headings, "Inter" for body/UI)

## Project Structure

```
.
├── index.html        # Markup only — links style.css and script.js
├── style.css         # All styling, organized into numbered sections
├── script.js         # Nav toggle, scroll/hero animations, form validation, footer year
├── robots.txt        # Crawler access + sitemap reference
├── sitemap.xml        # XML sitemap for the single page
├── assets/
│   └── screenshot.png   # Site screenshot shown above, captured with Playwright
├── design-system/
│   └── wellspring-family-clinic/MASTER.md   # Design tokens/component reference for this site
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions workflow that deploys to GitHub Pages
```

## Running Locally

There's no build or install step. Just open `index.html` in a browser, or serve the folder with any static file server, e.g.:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions on every push to `main` (see `.github/workflows/deploy.yml`).

## Notes

The appointment form delivers real email via FormSubmit's AJAX endpoint (`https://formsubmit.co/ajax/...`) — no backend of our own. FormSubmit requires a one-time "Activate Form" confirmation click (emailed to the destination inbox) the first time a given origin submits to it; this is a per-domain requirement of the service, not something configured in this repo.

The checklist opt-in form still validates client-side only and logs to the browser console — a commented spot in `script.js` marks where a real email service integration would go if wired up later.
