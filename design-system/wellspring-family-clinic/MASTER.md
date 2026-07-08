# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

> **Source of truth:** This file mirrors the *actual, shipped* design of Wellspring Family Clinic
> (see `/style.css`, `/index.html`, and the repo's `CLAUDE.md`) — it was hand-corrected from the
> ui-ux-pro-max generic recommendation to match the real site instead of proposing a new brand.
> Prefer these values over any generic `--design-system` suggestion for this project.

---

**Project:** Wellspring Family Clinic
**Category:** Healthcare marketing site — static, single page, no build step (`index.html` / `style.css` / `script.js`)
**Generated:** 2026-07-08 (corrected to match live site)

---

## Global Rules

### Color Palette

| Role | Hex | Used for |
|------|-----|----------|
| Primary teal | `#0d7377` | Links, icon accents, focus outlines, borders, secondary CTA text/border |
| Deep teal | `#0d3b40` | Headings, footer/nav background, gradient start |
| Light teal | `#14a3ad` | Hero gradient end, highlight accents |
| Coral/amber accent | `#ff8552` | Primary CTA buttons only, testimonial star/quote accents |
| White | `#ffffff` | Card/section backgrounds, text on dark/coral surfaces |

**Color notes:** Teal/blue is the primary brand color; coral (`#ff8552`) is reserved exclusively
for primary CTA buttons — do not use it for anything else, and do not introduce new hues outside
this palette. There are **no CSS custom properties** defined for these colors today (`style.css`
uses raw hex throughout) — match that existing convention unless the user explicitly asks to
refactor to CSS variables.

### Typography

- **Font:** Inter (single family for both headings and body), loaded via Google Fonts `<link>` in `index.html`'s `<head>`
- **Fallback stack:** `system-ui, -apple-system, Segoe UI, Roboto, sans-serif`
- **Mood:** clean, approachable, trustworthy, unfussy — no second display face

Do **not** introduce a second typeface (e.g. Figtree/Noto Sans from a generic healthcare
recommendation) — this site intentionally uses one font family everywhere.

### Spacing & Shape (as actually used)

| Element | Value |
|---------|-------|
| Buttons (CTA, nav toggle) | pill-shaped, `border-radius: 999px` |
| Cards (services) | `border-radius: 16px` |
| Testimonial cards | `border-radius: 20px` |
| Form inputs | `border-radius: 10px` |
| Avatar/icon circles | `border-radius: 50%` |
| Card shadow (rest) | `0 4px 20px rgba(13, 59, 64, 0.06)` |
| Card shadow (hover) | `0 12px 30px rgba(13, 59, 64, 0.12)` |
| Transitions | `0.15s–0.2s ease` on transform/box-shadow/background/border-color |

### Breakpoint

Mobile-first with a **single breakpoint at `768px`**, where the navbar collapses into a
hamburger menu (`.nav-menu.open`). Do not add extra breakpoints without a clear need — the
existing CSS is organized around this one cutover.

---

## Component Specs (match existing implementation)

### Buttons

```css
/* Primary CTA (coral accent — reserved for primary actions only) */
.btn-primary {
  background: #ff8552;
  color: #ffffff;
  border-radius: 999px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
  cursor: pointer;
}
.btn-primary:hover {
  box-shadow: 0 6px 16px rgba(255, 133, 82, 0.35);
}

/* Secondary button (teal outline/text) */
.btn-secondary {
  background: transparent;
  color: #0d7377;
  border: 2px solid #0d7377;
  border-radius: 999px;
}
```

### Cards (services)

```css
.service-card {
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(13, 59, 64, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.service-card:hover {
  box-shadow: 0 12px 30px rgba(13, 59, 64, 0.12);
}
```

### Form Inputs (appointment form)

```css
.form-input {
  border-radius: 10px;
  font-family: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.form-input:focus {
  border-color: #0d7377;
  box-shadow: 0 0 0 3px rgba(13, 115, 119, 0.15);
}
```

Errors show inline via per-field `.field-error` spans — **never `alert()`**.

### Focus States

```css
:focus-visible {
  outline: 3px solid #0d7377;
}
```

---

## Style Guidelines

**Style:** Accessible, warm healthcare marketing — high contrast, generous whitespace, no dark
mode (site is light-only today; don't add a dark theme unless asked).

**Key effects already in place:** visible focus outlines, `prefers-reduced-motion` support
(disables the fade-in transition and forces visibility — see `style.css` scroll fade-in section),
`IntersectionObserver`-driven `.fade-in`/`.visible` scroll reveal in `script.js`.

### Page Pattern (actual section order)

`#home` (hero) → `#services` → `#testimonials` → `#contact` (appointment form) → footer (no anchor)

This order is fixed by the nav/scroll anchors already wired up in `index.html` — don't reorder
sections without updating the nav links too.

---

## Anti-Patterns (Do NOT Use)

- ❌ Introducing a second typeface — this site uses Inter only
- ❌ Using the coral accent (`#ff8552`) for anything but primary CTA buttons
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

- [ ] No new colors introduced outside the documented palette
- [ ] Only Inter is used for type; no second typeface added
- [ ] Coral (`#ff8552`) used only for primary CTA buttons
- [ ] Markup/CSS/JS stay split across `index.html` / `style.css` / `script.js`
- [ ] Section order and anchor IDs (`#home`, `#services`, `#testimonials`, `#contact`) preserved
- [ ] Form errors shown inline (`.field-error`), never via `alert()`
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover/focus transitions in the existing 0.15–0.2s range
- [ ] Text contrast ≥ 4.5:1
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive at the single `768px` breakpoint; no horizontal scroll on mobile
