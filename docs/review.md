# Review - LP-3 FAQ accordion (incremental on LP-1/LP-2), round 1

**Verdict: approve**

Scope reviewed: `Faq` (new), `Navbar` (changed), `App` (changed). I compared them with `docs/design.md` (Faq, Navbar, App sections), LP3-AC-1 to LP3-AC-16 in `docs/requirements.md`, the amended LP-1 criteria (AC-2, AC-3, AC-6), LP2-AC-20 and the stack conventions. Unchanged modules were covered by their existing tests, which still pass.

## Build

`npm run build` (vite 5.4.21) passed. 45 modules were transformed. Output sizes: `dist/index.html` 0.43 kB, CSS 5.46 kB, JS 149.55 kB. Exit code 0.

## Tests

`npm test` (vitest 2.1.9) passed: **8 files, 44 tests, 0 failures**. Exit code 0.

| Test file | Tests | Result |
|---|---|---|
| tests/Faq.test.jsx | 6 | pass (new) |
| tests/Navbar.test.jsx | 5 | pass (updated to 4 links) |
| tests/App.test.jsx | 6 | pass (updated page order and heading order) |
| tests/Pendaftaran.test.jsx | 6 | pass (no LP-2 regression) |
| tests/validatePendaftaran.test.jsx | 6 | pass |
| tests/Hero.test.jsx | 5 | pass |
| tests/Agenda.test.jsx | 6 | pass |
| tests/Footer.test.jsx | 4 | pass |

## Design and requirements check

### Faq (`src/components/Faq.jsx`, `src/components/Faq.css`)
- The default export `Faq({ items } = {})` and the named export `FAQ_ITEMS` match the design. The four question/answer pairs are exact, including the question marks and the trailing full stops (LP3-AC-4, LP3-AC-6).
- `items` replaces the defaults only when it is an array. Otherwise `FAQ_ITEMS` is used, as the design specifies (LP3-AC-14).
- The component renders `section#faq` with one h2 `Pertanyaan Umum`. Each question sits in its own `h3` that wraps a `type="button"` button, and the section has no other headings (LP3-AC-3, LP3-AC-5, LP3-AC-13).
- State is a single `openIndex` (null or index). The toggle `prev === i ? null : i` keeps at most one panel open and closes the open one on a second click (LP3-AC-9 to LP3-AC-12).
- `aria-expanded` is always set to the string `"true"` or `"false"`. Button `i` has `aria-controls="faq-panel-i"`, and that panel has the matching unique id (LP3-AC-7, LP3-AC-8).
- Panels are always in the DOM. A closed panel carries `hidden`; an open panel has no `hidden` attribute (LP3-AC-7, LP3-AC-9). `.faq-panel[hidden] { display: none; }` keeps the attribute working even though the panel has its own padding rule.
- The indicator span is empty and has `aria-hidden="true"`. The +/- is drawn in CSS with `::before`, so it is not part of the accessible name (LP3-AC-15).
- Styling: the CSS uses `--color-primary`, `--color-text`, `--radius` (12px) and `--content-max-width`. The only literal colour is the `#FFFFFF` card background, which the design allows. Class names all use the `faq-` prefix. Buttons are `width: 100%` and show a visible `:focus-visible` outline. Question text can wrap (`min-width: 0; overflow-wrap: anywhere`). There are no fixed widths, so the section should fit at 360px (still a manual check).
- No new dependencies are added and no `<details>` element is used.

### Navbar (`src/components/Navbar.jsx`, `src/components/Navbar.css`)
- The navbar has four links in this order: Tentang `#tentang`, Agenda `#agenda`, FAQ `#faq`, Daftar `#daftar`. The `<nav aria-label="Navigasi utama">` landmark and the `ParaLab Workshop` logo are unchanged (LP3-AC-2, AC-4, AC-5).
- `flex-wrap: wrap` is set on both the bar and the link list, so four links can wrap at 360px. The navbar has no headings.

### App (`src/components/App.jsx`, `src/components/App.css`)
- Render order is Navbar, then `<main>` containing Hero, Agenda, Faq and Pendaftaran, then Footer. This matches LP3-AC-1 and the design tree. Navbar is still the first thing rendered (AC-7).
- Headings: one h1, then h2s in the order Agenda, Pertanyaan Umum, Pendaftaran. The four h3s are all inside `#faq`, so no heading level is skipped.
- `App.css` needed no change for LP-3. The `.app-main > section` rules apply to the new section automatically.

### Accessibility
- The accordion uses native buttons (Enter, Space and Tab work), `aria-expanded` and `aria-controls`, and headings that wrap the buttons, following the WAI-ARIA accordion pattern. The decorative icon is hidden from assistive technology. Heading order is valid across the page.
- The changed modules have no images, so alt text does not apply.

## Issues

There are no blocking issues. One optional cosmetic note:

1. (Optional, cosmetic) `.faq` has `padding: 3rem 1rem`, and it sits inside `.app-main`, which already has `padding: 0 1rem`. On narrow screens that gives about 2rem of horizontal inset per side. This follows the design note "Section padded like Agenda" and does not cause horizontal scroll. It is not a defect.

All tests are correct for the requirements. None needs changing.
