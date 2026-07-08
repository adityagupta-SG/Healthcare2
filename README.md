# Wellspring Family Clinic

A static, single-page marketing website for a fictional healthcare clinic. Built with plain HTML, CSS, and JavaScript — no build step, no package manager, no dependencies.

**Live site:** https://adityagupta-sg.github.io/Healthcare2/

## Features

- Responsive, mobile-first layout with a collapsible hamburger nav below 768px
- Scroll-triggered fade-in animations (`IntersectionObserver`), respecting `prefers-reduced-motion`
- Client-side validated appointment request form (name, email, phone) with inline error messages — no `alert()` popups
- Sections: Hero, Services, Testimonials, Appointment/Contact form, Footer

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox/Grid, one responsive breakpoint at 768px)
- Vanilla JavaScript (no frameworks)
- Google Fonts ("Inter")

## Project Structure

```
.
├── index.html   # Markup only — links style.css and script.js
├── style.css    # All styling, organized into numbered sections
├── script.js    # Nav toggle, scroll animations, form validation, footer year
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

The appointment form validates and logs submissions to the browser console — there is no backend yet. A clearly marked spot in `script.js` indicates where a real API call (`fetch('/api/appointments', ...)`) would be wired in.
