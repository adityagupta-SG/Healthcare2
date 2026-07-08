# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, single-page healthcare clinic marketing site ("Wellspring Family Clinic") — no build step, no package manager, no dependencies. Three plain files: `index.html`, `style.css`, `script.js`.

## Running / Testing

There is no build or test tooling. To preview changes, open `index.html` directly in a browser (or use a simple local server if testing relative paths). There are no lint/test/build commands configured.

## Architecture

- `index.html` — semantic markup only. No inline `<style>` or `<script>`; it links `style.css` and `script.js`. Sections appear in page order and correspond to anchor IDs used for nav/scroll: `#home` (hero), `#how-it-works` (3-step process, no nav entry), `#services`, `#team` (care team), `#testimonials`, `#faq` (native `<details>` accordion), `#resource` (free checklist opt-in, no nav entry), `#contact` (appointment form), then a footer (no anchor). A fixed floating WhatsApp widget (`.whatsapp-widget`) sits outside `<main>`, after the footer: a toggle button (`#whatsappToggle`) opens a chat panel (`#whatsappPanel`) with quick-question links and a main "Start chat" CTA, all pointing to `https://wa.me/6581388171` with pre-filled messages.
- `style.css` — organized as one file with numbered `/* ===== N. Section ===== */` comment blocks: Reset & Base, Utility/Layout, Icons, Buttons, Navbar, Hero, How It Works, Services, Team, Testimonials, FAQ, Free Resource (Lead Magnet), Contact/Appointment Form, Footer, Scroll Fade-in & Hero Reveal Animation, Floating WhatsApp Widget, Media Queries. Mobile-first; the single breakpoint is `768px`, where the navbar collapses into a hamburger menu (`.nav-menu.open`).
- `script.js` — one file, behaviors under `// ===== Section =====` comments: mobile nav toggle, `IntersectionObserver`-based scroll fade-in (targets any element with class `.fade-in`, adds `.visible` once, then unobserves), appointment form validation/submission (FormSubmit), checklist opt-in form validation/submission, WhatsApp panel open/close (toggle, close button, Escape key, click-outside), and footer year injection.
- `design-system/wellspring-family-clinic/MASTER.md` — living reference for the actual shipped design tokens/components; keep it in sync whenever the palette, type, or component styling changes here.

## Conventions to preserve

- Keep markup/CSS/JS separated across the three files — do not reintroduce inline `<style>`/`<script>` in `index.html`.
- Scroll-triggered animations use the `.fade-in` / `.visible` class pair driven by `IntersectionObserver` in `script.js`; the hero uses a separate CSS-only staggered `.reveal` / `.reveal-1..5` load-in animation. Both respect `prefers-reduced-motion` (handled in `style.css`, which disables the transitions/animation and forces visibility).
- Icons are inline SVGs (`.icon` / `.icon-lg` classes, stroke-based, `currentColor`) — never emoji, per the established icon system across nav/hero/services.
- The appointment form (`#appointmentForm`) validates fields client-side, then POSTs to FormSubmit (`https://formsubmit.co/ajax/...`) for real email delivery — no backend of our own. Shows `#formSuccess` or `#formError` depending on the response; never use `alert()`. FormSubmit requires a one-time "Activate Form" click (emailed to the destination inbox) per origin the form is submitted from.
- The checklist opt-in form (`#checklistForm`) still validates client-side only and logs to the console; script.js has a commented spot marking where a real email service integration would go if wired up later.
- Color palette: deep pine (`#1F3A2E`), forest moss (`#2F6B52`), soft sage (`#6FAE86`), warm limestone background (`#F2EFE4`), burnt amber accent (`#CD7B3A`, reserved for primary CTA buttons). Keep new UI within this palette — do not reintroduce the old teal/coral scheme.
- Typography pairs two families, loaded via `<link>` in `index.html`'s `<head>`: **Fraunces** (serif, headings/display only — `h1`, `h2`, `h3`, eyebrow labels, step numbers) and **Inter** (sans, body copy/labels/buttons). Don't use Fraunces for body text or Inter for headings.
