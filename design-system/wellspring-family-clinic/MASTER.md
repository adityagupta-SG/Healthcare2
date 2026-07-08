# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

> **Source of truth:** This file mirrors the *actual, shipped* design of Wellspring Family Clinic
> (see `/style.css`, `/index.html`, and the repo's `CLAUDE.md`). Prefer these values over any
> generic `--design-system` suggestion for this project.

---

**Project:** Wellspring Family Clinic
**Category:** Healthcare marketing site — static, single page, no build step (`index.html` / `style.css` / `script.js`)
**Generated:** 2026-07-08, rebranded 2026-07-08 (deep pine/moss/amber palette + Fraunces/Inter type)

---

## Global Rules

### Color Palette

| Role | Hex | Used for |
|------|-----|----------|
| Ink (deep pine) | `#1F3A2E` | Headings, footer/nav-adjacent dark text, hero gradient start, avatar/icon accent variant |
| Moss (primary) | `#2F6B52` | Links, icon accents, focus outlines, borders, secondary CTA text/border, hero gradient mid |
| Fern (light sage) | `#6FAE86` | Hero/resource gradient end, decorative highlights only |
| Stone (background wash) | `#F2EFE4` | Alternating section backgrounds, card fills |
| Amber (accent) | `#CD7B3A` | Primary CTA buttons only, testimonial stars/quote accent |
| White | `#ffffff` | Card/section backgrounds, text on dark/amber surfaces |

**Color notes:** Deep pine/moss/sage is the primary brand family, grounded in the "Wellspring"
name (a natural spring/source) rather than a generic clinical teal. Amber (`#CD7B3A`) is reserved
exclusively for primary CTA buttons — do not use it for anything else, and do not introduce new
hues outside this palette (including the old teal/coral scheme this replaced). There are **no CSS
custom properties** defined for these colors — `style.css` uses raw hex throughout — match that
existing convention unless the user explicitly asks to refactor to CSS variables.

### Typography

- **Display/headings:** Fraunces (serif, soft/low-contrast — not a stark high-contrast display face) — `h1`, `h2`, `h3`, hero eyebrow labels, step numbers only
- **Body/UI:** Inter (sans) — body copy, nav, labels, buttons
- **Fallback stacks:** Fraunces → `Georgia, serif`; Inter → `system-ui, -apple-system, Segoe UI, Roboto, sans-serif`
- **Mood:** warm, grounded, trustworthy — a deliberate display/body pairing, not one family used everywhere

Do **not** use Fraunces for body text or Inter for headings — the pairing is the point. Do not
introduce a third typeface.

### Spacing & Shape (as actually used)

| Element | Value |
|---------|-------|
| Buttons (CTA, nav toggle) | pill-shaped, `border-radius: 999px` |
| Cards (services) | `border-radius: 16px` |
| Testimonial cards | `border-radius: 20px` |
| Form inputs | `border-radius: 10px` |
| Avatar/icon circles | `border-radius: 50%` |
| Card shadow (rest) | `0 4px 20px rgba(31, 58, 46, 0.06)` |
| Card shadow (hover) | `0 12px 30px rgba(31, 58, 46, 0.12)` |
| Transitions | `0.15s–0.2s ease` on transform/box-shadow/background/border-color |

### Breakpoint

Mobile-first with a **single breakpoint at `768px`**, where the navbar collapses into a
hamburger menu (`.nav-menu.open`). Do not add extra breakpoints without a clear need — the
existing CSS is organized around this one cutover.

---

## Component Specs (match existing implementation)

### Buttons

```css
/* Primary CTA (amber accent — reserved for primary actions only) */
.btn-primary {
  background: #CD7B3A;
  color: #ffffff;
  border-radius: 999px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  cursor: pointer;
}
.btn-primary:hover {
  box-shadow: 0 6px 16px rgba(205, 123, 58, 0.35);
}

/* Secondary button (moss outline/text) */
.btn-secondary {
  background: transparent;
  color: #2F6B52;
  border: 2px solid #2F6B52;
  border-radius: 999px;
}
```

### Cards (services)

```css
.service-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(31, 58, 46, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.service-card:hover {
  box-shadow: 0 12px 30px rgba(31, 58, 46, 0.12);
}
```

### Form Inputs (appointment + checklist forms)

```css
.form-input {
  border-radius: 10px;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.form-input:focus {
  border-color: #2F6B52;
  box-shadow: 0 0 0 3px rgba(47, 107, 82, 0.15);
}
```

Errors show inline via per-field `.field-error` spans — **never `alert()`**.

### Focus States

```css
:focus-visible {
  outline: 3px solid #2F6B52;
}
```

### Icons

Inline SVG only (`.icon` / `.icon-lg`, stroke-based, `currentColor`) — logo mark, trust-strip
badges, service icons, FAQ chevron. Never emoji.

---

## Style Guidelines

**Style:** Accessible, warm healthcare marketing — high contrast, generous whitespace, no dark
mode (site is light-only today; don't add a dark theme unless asked).

**Key effects already in place:** visible focus outlines, `prefers-reduced-motion` support
(disables the fade-in transition/hero reveal animation and forces visibility), `IntersectionObserver`-driven
`.fade-in`/`.visible` scroll reveal, CSS-only staggered `.reveal`/`.reveal-1..5` hero load-in,
and an SVG wave-divider signature motif between major sections.

### Page Pattern (actual section order)

`#home` (hero) → How It Works (3-step, no nav anchor) → `#services` → `#team` (care team) →
`#testimonials` → `#faq` (native `<details>` accordion) → free checklist opt-in (no nav anchor) →
`#contact` (appointment form) → footer (no anchor)

This order is fixed by the nav/scroll anchors already wired up in `index.html` — don't reorder
sections without updating the nav links too.

---

## Anti-Patterns (Do NOT Use)

- ❌ Reintroducing the old teal/coral palette (`#0d7377`, `#0d3b40`, `#14a3ad`, `#ff8552`)
- ❌ Using Fraunces for body text or Inter for headings — the pairing is deliberate
- ❌ Using the amber accent (`#CD7B3A`) for anything but primary CTA buttons
- ❌ Reintroducing inline `<style>`/`<script>` in `index.html` — markup, CSS, and JS must stay in their three separate files
- ❌ `alert()` for form validation errors — use inline `.field-error` spans
- ❌ Adding breakpoints beyond the single `768px` cutover without a real need
- ❌ Emojis as icons — use SVG icons
- ❌ Missing `cursor: pointer` on clickable elements
- ❌ Layout-shifting hover transforms that cause reflow
- ❌ Instant state changes — keep the existing `0.15–0.2s ease` transitions
- ❌ Invisible focus states, or motion that ignores `prefers-reduced-motion`

---

## Pre-Delivery Checklist

Before delivering any UI code for this site, verify:

- [ ] No new colors introduced outside the documented pine/moss/sage/stone/amber palette
- [ ] Fraunces used only for headings/display; Inter only for body/UI — no third typeface
- [ ] Amber (`#CD7B3A`) used only for primary CTA buttons
- [ ] Markup/CSS/JS stay split across `index.html` / `style.css` / `script.js`
- [ ] Section order and anchor IDs preserved (`#home`, `#services`, `#team`, `#testimonials`, `#faq`, `#contact`)
- [ ] Form errors shown inline (`.field-error`), never via `alert()`
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover/focus transitions in the existing 0.15–0.2s range
- [ ] Text contrast ≥ 4.5:1
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at the single `768px` breakpoint; no horizontal scroll on mobile
