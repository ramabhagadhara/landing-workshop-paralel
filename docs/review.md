# Review - Landing Page Workshop Komputasi Paralel (ticket LP-1)

## Verdict

**approve**

## Build

`npm run build` (vite v5.4.21): succeeded. 42 modules transformed. Output was dist/index.html (0.42 kB), CSS (3.24 kB) and JS (144.97 kB).

## Tests

`npm test` (vitest v2.1.9): **6 of 6 test files passed, 29 of 29 tests passed**.

| Test file | Tests | Result |
|---|---|---|
| tests/Navbar.test.jsx | 5 | pass |
| tests/Hero.test.jsx | 5 | pass |
| tests/Agenda.test.jsx | 6 | pass |
| tests/Pendaftaran.test.jsx | 4 | pass |
| tests/Footer.test.jsx | 4 | pass |
| tests/App.test.jsx | 5 | pass |

None of the tests use snapshots. Every test imports its component from `../src/components/<Module>.jsx`.

## Conformance with design.md, requirements.md and stack conventions

| Module | Markup / text | Conventions | Styles / tokens | Result |
|---|---|---|---|---|
| Navbar | Same as design: `<nav aria-label="Navigasi utama">`, the logo is a `<span>`, 3 links in the right order with the right hrefs, no headings | default export `Navbar()`, no props, imports its own CSS | `--color-primary` bold logo, flex plus `flex-wrap`, not sticky | OK |
| Hero | Same as design: `section#tentang`, one h1, subtitle and info text exact (U+00B7 checked), CTA is an `<a href="#daftar">` | OK | CTA uses `--color-accent` / `--color-text` / `--radius`, `inline-block`, no underline. Background uses `--color-primary` with `--color-on-dark` text | OK |
| Agenda | Same as design: `section#agenda`, h2, one `ul` with 4 `li[data-testid="agenda-item"]`, separate time and title spans. Times use the en dash U+2013 (bytes checked) | OK | Cards with `--radius`, time in `--color-primary` bold, column stack under 480px | OK |
| Pendaftaran | Same as design: `section#daftar`, h2, exact text with trailing period, no form controls or links | OK | Centred card, `--radius`, white background | OK (see minor note 1) |
| Footer | Same as design: `<footer>`, exact copyright text (U+00A9, U+00B7), mailto link | OK | `--color-footer-bg`, `--color-on-dark` for text and link, centred | OK |
| App | Composition and order exactly as specified. Footer is outside `<main>` | Imports siblings via `./X.jsx` | Page-level layout only, `--content-max-width`, horizontal padding | OK |

Shared files: `index.html` has `lang="id"` and the exact title (AC-1). `src/index.css` contains exactly the design tokens. There are no runtime dependencies beyond react and react-dom, and no external fonts.

Accessibility: there is one h1 and the h2s come in order with no skipped levels. The navigation landmark has an accessible name. `main` and `contentinfo` landmarks are present. The page has no images, so alt text does not apply. Every link has descriptive text. `<html lang="id">` is set.

## Issues

No blocking issues. These minor, optional notes do not need code changes for LP-1:

1. `src/components/Pendaftaran.css` hard-codes `background: #ffffff`. The design asks for a "white background" but defines no white token, so this is acceptable. A future token such as `--color-surface` would be cleaner.
2. `src/components/Pendaftaran.css` sets `margin: 2rem auto` while `.app-main` already spaces its sections with `gap: 2.5rem`. The two add up and leave extra vertical space. This is cosmetic only.
3. `src/components/Agenda.css` gives each section horizontal padding (`padding: 3rem 1rem`) on top of the `.app-main` padding. The total horizontal padding at 360px is about 2rem per side plus the card padding. That is still well within width, so it causes no overflow, but AC-25 still needs a manual check in a browser.
