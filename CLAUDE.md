# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, single-page healthcare clinic marketing site ("Wellspring Family Clinic") — no build step, no package manager, no dependencies. Three plain files: `index.html`, `style.css`, `script.js`.

## Running / Testing

There is no build or test tooling. To preview changes, open `index.html` directly in a browser (or use a simple local server if testing relative paths). There are no lint/test/build commands configured.

## Architecture

- `index.html` — semantic markup only. No inline `<style>` or `<script>`; it links `style.css` and `script.js`. Sections appear in page order and correspond to anchor IDs used for nav/scroll: `#home` (hero), `#services`, `#testimonials`, `#contact` (appointment form), then a footer (no anchor).
- `style.css` — organized as one file with numbered `/* ===== N. Section ===== */` comment blocks in this order: Reset & Base, Utility/Layout, Buttons, Navbar, Hero, Services, Testimonials, Contact/Appointment Form, Footer, Scroll Fade-in Animation, Media Queries. Mobile-first; the single breakpoint is `768px`, where the navbar collapses into a hamburger menu (`.nav-menu.open`).
- `script.js` — one file, four independent behaviors under `// ===== Section =====` comments: mobile nav toggle, `IntersectionObserver`-based scroll fade-in (targets any element with class `.fade-in`, adds `.visible` once, then unobserves), appointment form validation/submission, and footer year injection.

## Conventions to preserve

- Keep markup/CSS/JS separated across the three files — do not reintroduce inline `<style>`/`<script>` in `index.html`.
- Scroll-triggered animations use the `.fade-in` / `.visible` class pair driven by `IntersectionObserver` in `script.js`; respect `prefers-reduced-motion` (already handled in `style.css`, which disables the transition and forces visibility).
- The appointment form (`#appointmentForm` in `index.html`, handled in `script.js`) validates fields client-side only (name required, email regex, phone regex) and shows errors inline via per-field `.field-error` spans — never use `alert()`. On successful submit it logs the collected data to the console and shows `#formSuccess`; there is a clearly commented spot in `script.js` marking where a real `fetch('/api/appointments', ...)` POST would be added — no backend currently exists.
- Color palette: teal/blue primary (`#0d7377`, `#0d3b40`, `#14a3ad`) with a coral/amber accent (`#ff8552`) reserved for primary CTA buttons. Keep new UI within this palette.
- Font is Google Fonts "Inter", loaded via `<link>` in `index.html`'s `<head>`.
