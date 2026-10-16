# Design - Landing Page Workshop Komputasi Paralel (tickets LP-1, LP-2, LP-3)

## Architecture overview

A static single-page landing page. `src/main.jsx` mounts `App`, which renders six
section components in a fixed order:

```
App
├── Navbar        <nav aria-label="Navigasi utama">          -- LP-3: 4th link "FAQ"
└── <main>
│   ├── Hero        <section id="tentang">      (h1)
│   ├── Agenda      <section id="agenda">       (h2 "Agenda")
│   ├── Faq         <section id="faq">          (h2 "Pertanyaan Umum", h3 per question)  -- LP-3 (new)
│   └── Pendaftaran <section id="daftar">       (h2 "Pendaftaran")  -- LP-2: registration form / thank-you
│         └── uses validatePendaftaran()  (pure function, src/components/validatePendaftaran.js)
└── Footer        <footer>
```

All content is hard-coded Indonesian text inside the components (no data fetching).
Navigation uses plain anchor links to section ids. Each component imports its own CSS
file; global tokens live in `src/index.css`.

LP-3 adds a new stateful `Faq` accordion component (optional `items` prop), adds the
`FAQ` link to `Navbar`, and inserts `<Faq />` between `<Agenda />` and `<Pendaftaran />`
in `App`. No new dependencies, no new design tokens, no shared-file changes.

**Stack:** `react` - React 18 + Vite 5 (JSX, ES modules), Vitest 2 + React Testing Library + jest-dom in jsdom.

## Module status for LP-3

| Module | Status | Coded/tested in this run |
|---|---|---|
| Navbar | (changed) | yes - add `FAQ` link; `tests/Navbar.test.jsx` updated (3 -> 4 links) |
| Hero | (unchanged) | no |
| Agenda | (unchanged) | no |
| Faq | (new) | yes - `src/components/Faq.jsx`, `src/components/Faq.css`, `tests/Faq.test.jsx` |
| validatePendaftaran | (unchanged) | no |
| Pendaftaran | (unchanged) | no |
| Footer | (unchanged) | no |
| App | (changed) | yes - render `<Faq />`; `tests/App.test.jsx` updated (page order, heading order, nav link count, h3 rule) |

No shared file changes in LP-3. `@testing-library/user-event` is **not** installed, so
tests use `fireEvent`.

## Global rules for all modules

- Every text string below must be reproduced **exactly**, character for character,
  including the en dash `–` (U+2013) in agenda times and in `3–80`, the middle dot `·`
  (U+00B7) in the hero info and footer, the copyright sign `©` (U+00A9), and the
  question marks / trailing full stops in the FAQ.
- Each quoted visible string must be the **entire text content of a single element**
  with no nested elements inside it (so `getByText('<exact string>')` matches it).
  Do not split strings across elements and do not add extra whitespace-visible
  characters.
- Components take **no props**, except `Pendaftaran` (optional `onSubmit`, since LP-2)
  and `Faq` (optional `items`, since LP-3).
- No component other than `App` renders `<main>`. Only `Hero` renders an `<h1>`.
  Only `Faq` renders `<h3>` elements (one per question, since LP-3). No component
  renders `<h4>`-`<h6>`.
- CSS class names are prefixed with the component's kebab-case name (`navbar-`, `hero-`,
  `agenda-`, `faq-`, `pendaftaran-`, `footer-`, `app-`). Use the CSS custom properties from
  `src/index.css` (below) instead of hard-coded colours (exceptions: `#FFFFFF` card/input
  backgrounds and the error red `#B91C1C`, defined locally in component CSS).
- Tests: `import X from '../src/components/X.jsx'`, `render(<X />)`, query with
  `screen.getByRole` / `getByText` / `within`. No snapshots. No `data-testid` is needed
  except the ones explicitly listed (Agenda items).

## Scaffold (shared files, created before coding) - unchanged in LP-3

| File | Key content |
|---|---|
| `package.json` | as in the profile; `"name": "landing-workshop-paralel"` |
| `vite.config.js` | `plugins: [react()]`, `test: { environment: 'jsdom', globals: true, setupFiles: './tests/setup.js' }` |
| `tests/setup.js` | `import '@testing-library/jest-dom/vitest'` |
| `index.html` | `<html lang="id">`, `<meta charset="UTF-8" />`, `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`, `<title>Workshop Komputasi Paralel 2026</title>` (exactly this, on one line), `<div id="root"></div>`, `<script type="module" src="/src/main.jsx"></script>` |
| `src/main.jsx` | `import React from 'react'; import { createRoot } from 'react-dom/client'; import App from './components/App.jsx'; import './index.css';` then `createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)` |
| `src/index.css` | reset + design tokens (below) |

### Design tokens (`src/index.css`)

```css
:root {
  --color-primary: #4F46E5;
  --color-accent: #F59E0B;
  --color-text: #111827;
  --color-bg: #F9FAFB;
  --color-footer-bg: #1F2937;
  --color-on-dark: #F9FAFB;
  --radius: 12px;
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --content-max-width: 1080px;
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: var(--font-sans); color: var(--color-text); background: var(--color-bg); line-height: 1.6; }
img { max-width: 100%; }
```

No external fonts, no `@import` of web fonts. Layout must not overflow horizontally from
360px to 1440px (use `max-width`, `flex-wrap`, percentage/`rem` widths, no fixed widths
above 360px).

## Navbar (changed)

Files: `src/components/Navbar.jsx`, `src/components/Navbar.css`. Test: `tests/Navbar.test.jsx`
(**updated in this run**).

```jsx
export default function Navbar()   // no props
```

Exact markup (class names may be extended, structure and text may not). The only change
from LP-1 is the new `FAQ` list item between `Agenda` and `Daftar`:

```jsx
<nav className="navbar" aria-label="Navigasi utama">
  <span className="navbar-logo">ParaLab Workshop</span>
  <ul className="navbar-links">
    <li><a className="navbar-link" href="#tentang">Tentang</a></li>
    <li><a className="navbar-link" href="#agenda">Agenda</a></li>
    <li><a className="navbar-link" href="#faq">FAQ</a></li>
    <li><a className="navbar-link" href="#daftar">Daftar</a></li>
  </ul>
</nav>
```

- Root element: `<nav>`; `getByRole('navigation', { name: 'Navigasi utama' })` finds it.
- Logo text `ParaLab Workshop` is a `<span>`, **not** a link.
- Exactly four links (`getAllByRole('link')` has length 4), each in its own `<li>`
  (list has exactly 4 `listitem`s), in order:
  `Tentang` -> `#tentang`, `Agenda` -> `#agenda`, `FAQ` -> `#faq`, `Daftar` -> `#daftar`.
  (`href` attribute values are exactly those strings; link text is exactly `FAQ`, uppercase.)
- No headings inside the navbar.
- Style: unchanged (horizontal flex bar, logo left, links right, `flex-wrap: wrap` so four
  links still fit at 360px; logo in `--color-primary`, bold; not sticky). Adjust the link
  gap in `Navbar.css` only if needed for 360px.

### What the updated `tests/Navbar.test.jsx` must check

Keep the existing landmark and logo tests. Replace the "three links" tests with:
links within the nav have length 4, texts `['Tentang', 'Agenda', 'FAQ', 'Daftar']`,
hrefs `['#tentang', '#agenda', '#faq', '#daftar']`; `getByRole('link', { name: 'FAQ' })`
has `href="#faq"` (plus the other three by name); the list has 4 `listitem`s; no headings.

## Hero (unchanged)

Files: `src/components/Hero.jsx`, `src/components/Hero.css`. Test: `tests/Hero.test.jsx`.

```jsx
export default function Hero()   // no props
```

```jsx
<section id="tentang" className="hero">
  <h1 className="hero-title">Workshop Komputasi Paralel 2026</h1>
  <p className="hero-subtitle">Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.</p>
  <p className="hero-info">Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer</p>
  <a className="hero-cta" href="#daftar">Daftar Sekarang</a>
</section>
```

- `<section id="tentang">` (no `aria-label`; tests use `container.querySelector('section#tentang')`).
- Exactly one heading: `getByRole('heading', { level: 1, name: 'Workshop Komputasi Paralel 2026' })`.
- Exactly one link: `getByRole('link', { name: 'Daftar Sekarang' })` with `href="#daftar"`.
  It is an `<a>`, not a `<button>`; there are no `button` roles in Hero.

## Agenda (unchanged)

Files: `src/components/Agenda.jsx`, `src/components/Agenda.css`. Test: `tests/Agenda.test.jsx`.

```jsx
export default function Agenda()   // no props
```

`<section id="agenda">`; one `h2` `Agenda`; one list with exactly 4 `listitem`s
(`data-testid="agenda-item"`, separate time/title `<span>`s):
`08.30 – 09.00` / `Registrasi dan pembukaan`, `09.00 – 10.30` / `Dasar komputasi paralel dan terdistribusi`,
`10.45 – 12.00` / `Multi-agent AI untuk otomasi SDLC`, `13.00 – 15.00` / `Hands-on: membangun pipeline agent paralel`.
No links in Agenda.

## Faq (new)

Files: `src/components/Faq.jsx`, `src/components/Faq.css`. Test: `tests/Faq.test.jsx`.

```jsx
import { useState } from 'react';
import './Faq.css';

export const FAQ_ITEMS = [
  { question: 'Apakah workshop ini gratis?', answer: 'Ya, gratis untuk mahasiswa dan dosen.' },
  { question: 'Perlu membawa laptop?', answer: 'Ya, untuk sesi hands-on.' },
  { question: 'Apakah ada sertifikat?', answer: 'Ya, sertifikat elektronik dikirim lewat email.' },
  { question: 'Bagaimana jika berhalangan hadir?', answer: 'Rekaman sesi akan dibagikan ke peserta terdaftar.' },
];

export default function Faq({ items } = {})
```

Test import: `import Faq, { FAQ_ITEMS } from '../src/components/Faq.jsx';`

### Props

| Prop | Type | Default | Meaning |
|---|---|---|---|
| `items` | `Array<{ question: string, answer: string }>` | `undefined` -> `FAQ_ITEMS` | If `items` is an array it replaces the defaults entirely and is rendered in the given order (an empty array renders the heading and no questions). If `undefined` or not an array, `FAQ_ITEMS` is used. |

### State and behaviour

- `openIndex`: `number | null`, initially `null` (all collapsed).
- Clicking question `i`: `setOpenIndex((prev) => (prev === i ? null : i))`.
  So: clicking a closed question opens it and closes any other; clicking the open one
  closes it. At most one is open at any time.
- Buttons are `type="button"`; no `href`, no form, no hash change, no `preventDefault` needed.
- No animation; closed panels use only the `hidden` attribute.

### Markup

For each item at index `i` (0-based), with `open = openIndex === i`:

```jsx
<section id="faq" className="faq">
  <h2 className="faq-heading">Pertanyaan Umum</h2>
  <div className="faq-list">
    {list.map((item, i) => {
      const open = openIndex === i;
      return (
        <div key={i} className="faq-item">
          <h3 className="faq-question-heading">
            <button
              type="button"
              id={`faq-question-${i}`}
              className="faq-question"
              aria-expanded={open ? 'true' : 'false'}
              aria-controls={`faq-panel-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-icon" aria-hidden="true"></span>
            </button>
          </h3>
          <div id={`faq-panel-${i}`} className="faq-panel" hidden={!open}>
            <p className="faq-answer">{item.answer}</p>
          </div>
        </div>
      );
    })}
  </div>
</section>
```

Exact rules:
- `<section id="faq">` without `aria-label` / `aria-labelledby`; exactly one `h2`
  with text `Pertanyaan Umum`; exactly one `h3` per item and no other headings.
- Each `h3` contains only its `button`; the button's text content (and therefore the
  `h3`'s text content and both accessible names) is **exactly** the question. The
  `.faq-icon` span is **empty** (no text, no `+`/`-` characters) and has
  `aria-hidden="true"`; the open/closed indicator is drawn purely in CSS
  (`.faq-question[aria-expanded="true"] .faq-icon::before` etc.).
- `getByRole('button', { name: q })` and `getByRole('heading', { level: 3, name: q })`
  both work; `getByText(q)` matches the `.faq-question-text` span.
- `aria-expanded` is always present as the string `"true"` or `"false"`.
- Panel ids: `faq-panel-0`, `faq-panel-1`, ...; button ids `faq-question-0`, ...
  `aria-controls` of button `i` is exactly `faq-panel-i`. (Only one `Faq` is rendered per
  page, so ids are unique.) Panels have no `role` attribute.
- Closed panel: the `<div>` has the `hidden` attribute (and the answer `<p>` inside it
  is therefore `not.toBeVisible()`). Open panel: no `hidden` attribute at all (React
  omits it for `hidden={false}`), answer `toBeVisible()`. All panels are always in the
  DOM (never unmounted).
- `getByText(answer)` matches the `<p className="faq-answer">` whose entire text is the
  answer. No links and no other buttons in the section.

### Style (`Faq.css`)

Section padded like Agenda, content constrained by `--content-max-width`. Each
`.faq-item` is a `#FFFFFF` card with `border-radius: var(--radius)` and a subtle border.
`.faq-question-heading` has `margin: 0` and inherits a normal font size. `.faq-question`:
`display: flex; justify-content: space-between; align-items: center; width: 100%;`
`background: none; border: 0; padding; text-align: left; font: inherit; color: var(--color-text);`
`cursor: pointer;` with a visible `:focus-visible` outline in `--color-primary`.
`.faq-question-text` may wrap (`min-width: 0`, `overflow-wrap: anywhere`).
`.faq-icon::before { content: "+"; color: var(--color-primary); }` and
`.faq-question[aria-expanded="true"] .faq-icon::before { content: "\2212"; }`.
No fixed widths above 360px.

### What `tests/Faq.test.jsx` must check

Use `render`, `screen`, `within`, `fireEvent` from `@testing-library/react`.
`const panelOf = (btn) => document.getElementById(btn.getAttribute('aria-controls'))`.

1. Structure (LP3-AC-3/5): `container.querySelector('section#faq')` exists;
   `getByRole('heading', { level: 2, name: 'Pertanyaan Umum' })`; exactly four
   level-3 headings, each found by `{ level: 3, name: <question> }`, and each containing
   the corresponding button; no h1, h4-h6; exactly 1 h2.
2. Questions (LP3-AC-4): `getAllByRole('button')` has length 4, text contents in the
   exact order above, each `type="button"`; each findable by `{ name: <question> }`.
   The `.faq-icon` / `[aria-hidden="true"]` element inside each button has empty text.
3. `FAQ_ITEMS` equals the four exact question/answer pairs (LP3-AC-6).
4. Initial state (LP3-AC-7/8): all buttons `aria-expanded="false"`; each
   `aria-controls` points to an existing element whose id is unique, that contains
   exactly its paired answer, and that has the `hidden` attribute; every answer
   `getByText(answer)` is in the document and `not.toBeVisible()`.
5. Open (LP3-AC-9): click `Apakah workshop ini gratis?` -> its `aria-expanded="true"`,
   panel has no `hidden` attribute, `Ya, gratis untuk mahasiswa dan dosen.` `toBeVisible()`;
   the other three answers not visible, other buttons `"false"`.
6. Switch (LP3-AC-10): then click `Apakah ada sertifikat?` -> only
   `Ya, sertifikat elektronik dikirim lewat email.` visible, only the third button
   `"true"`, first button back to `"false"` and its panel `hidden` again.
7. Close (LP3-AC-11): click the open question again -> all four `"false"`, all answers
   not visible.
8. Invariant (LP3-AC-12): after a click sequence (e.g. 1, 2, 2, 4, 3), after every click
   the count of `[aria-expanded="true"]` buttons is 0 or 1 and the only visible answer
   belongs to that button.
9. No navigation (LP3-AC-13): `window.location.hash` is unchanged after clicks and all
   buttons are `type="button"`.
10. Custom items (LP3-AC-14): `render(<Faq items={[{ question: 'Q1?', answer: 'A1.' }, { question: 'Q2?', answer: 'A2.' }]} />)`
    -> exactly two buttons `Q1?`, `Q2?` in order, none of the default questions present,
    both answers hidden; click `Q2?` shows `A2.`; click `Q1?` shows `A1.` and hides `A2.`;
    click `Q1?` again hides both.

## validatePendaftaran (unchanged)

File: `src/components/validatePendaftaran.js` (pure, no React, no DOM). Test:
`tests/validatePendaftaran.test.jsx`. Exports `ERROR_MESSAGES`
(`nama`: `Nama wajib diisi (3–80 karakter).`, `email`: `Format email tidak valid.`,
`nim`: `NIM harus 10 digit angka.`) and `validatePendaftaran(data = {})` (default and
named export) returning an object with keys only for invalid fields. No change in LP-3.

## Pendaftaran (unchanged)

Files: `src/components/Pendaftaran.jsx`, `src/components/Pendaftaran.css`. Test:
`tests/Pendaftaran.test.jsx`. `export default function Pendaftaran({ onSubmit } = {})`.
Renders `<section id="daftar">` with `h2` `Pendaftaran` and the LP-2 form
(`form` named `Formulir pendaftaran`, `noValidate`, inputs `Nama lengkap` / `Email` /
`NIM`, fieldset `Sesi` with radios `Offline` (default) / `Online`, button
`Kirim Pendaftaran`) or, after a valid submit, the `role="status"` message
`Terima kasih, <nama>! Pendaftaranmu sudah kami terima.` No headings other than the
h2, no links. No change in LP-3; all LP-2 criteria still hold.

## Footer (unchanged)

Files: `src/components/Footer.jsx`, `src/components/Footer.css`. Test: `tests/Footer.test.jsx`.

```jsx
<footer className="footer">
  <p className="footer-copy">© 2026 ParaLab · Program Studi Informatika</p>
  <p className="footer-contact">
    <a className="footer-email" href="mailto:paralab@kampus.ac.id">paralab@kampus.ac.id</a>
  </p>
</footer>
```

## App (changed)

Files: `src/components/App.jsx`, `src/components/App.css`. Test: `tests/App.test.jsx`
(**updated in this run**).

```jsx
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Agenda from './Agenda.jsx';
import Faq from './Faq.jsx';
import Pendaftaran from './Pendaftaran.jsx';
import Footer from './Footer.jsx';
import './App.css';

export default function App() {   // no props
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Hero />
        <Agenda />
        <Faq />
        <Pendaftaran />
      </main>
      <Footer />
    </div>
  );
}
```

- The only code change: import `Faq` and render `<Faq />` (no props) between
  `<Agenda />` and `<Pendaftaran />`. `App.css` unchanged.
- `<Pendaftaran />` is still rendered without `onSubmit`.

### What the updated `tests/App.test.jsx` must check

Keep the AC-1 title test and the landmark test (navigation `Navigasi utama`, `main`,
`contentinfo` each exactly once). Update:

1. Page order (LP3-AC-1): `container.querySelectorAll('nav, section, footer')` maps to
   `['nav', 'section#tentang', 'section#agenda', 'section#faq', 'section#daftar', 'footer']`;
   `main` contains `section#tentang`, `#agenda`, `#faq`, `#daftar` and no `nav`/`footer`.
2. Headings (LP3-AC-1): exactly one h1 (`Workshop Komputasi Paralel 2026`); h2 texts in
   order `['Agenda', 'Pertanyaan Umum', 'Pendaftaran']`; exactly four h3s, all inside
   `section#faq`; no h4-h6. No skipped levels: walking all `h1`-`h6` in DOM order,
   each heading's level is at most previous level + 1 (first is h1).
3. Links: every link whose `href` starts with `#` points to an existing element id
   (now at least 5: four nav links + `Daftar Sekarang`); the nav contains exactly 4
   links; `getByRole('link', { name: 'FAQ' })` has `href="#faq"` and
   `section#faq` exists; `Daftar Sekarang` -> `#daftar`.
4. The FAQ is collapsed on page load: within `section#faq` all 4 buttons have
   `aria-expanded="false"`.
