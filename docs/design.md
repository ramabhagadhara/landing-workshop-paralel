# Design - Landing Page Workshop Komputasi Paralel (ticket LP-1)

## Architecture overview

A static single-page landing page. `src/main.jsx` mounts `App`, which renders five
independent, prop-less section components in a fixed order:

```
App
├── Navbar        <nav aria-label="Navigasi utama">
└── <main>
│   ├── Hero        <section id="tentang">      (h1)
│   ├── Agenda      <section id="agenda">       (h2 "Agenda")
│   └── Pendaftaran <section id="daftar">       (h2 "Pendaftaran")
└── Footer        <footer>
```

All content is hard-coded Indonesian text inside the components (no data fetching, no
state). Navigation uses plain anchor links to section ids. Each component imports its
own CSS file; global tokens live in `src/index.css`.

**Stack:** `react` - React 18 + Vite 5 (JSX, ES modules), Vitest 2 + React Testing Library + jest-dom in jsdom.

## Global rules for all modules

- Every text string below must be reproduced **exactly**, character for character,
  including the en dash `–` (U+2013) in agenda times, the middle dot `·` (U+00B7) in the
  hero info and footer, and the copyright sign `©` (U+00A9).
- Each quoted visible string must be the **entire text content of a single element**
  with no nested elements inside it (so `getByText('<exact string>')` matches it).
  Do not split strings across elements and do not add extra whitespace-visible
  characters.
- Components take **no props** in LP-1 (`export default function X()`).
- No component other than `App` renders `<main>`. No component renders an `<h3>` or
  deeper heading. Only `Hero` renders an `<h1>`.
- CSS class names are prefixed with the component's kebab-case name (`navbar-`, `hero-`,
  `agenda-`, `pendaftaran-`, `footer-`, `app-`). Use the CSS custom properties from
  `src/index.css` (below) instead of hard-coded colours.
- Tests: `import X from '../src/components/X.jsx'`, `render(<X />)`, query with
  `screen.getByRole` / `getByText` / `within`. No snapshots. No `data-testid` is needed
  except the ones explicitly listed (Agenda items).

## Scaffold (shared files, created before coding)

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

## Navbar

Files: `src/components/Navbar.jsx`, `src/components/Navbar.css`. Test: `tests/Navbar.test.jsx`.

```jsx
export default function Navbar()   // no props
```

Exact markup (class names may be extended, structure and text may not):

```jsx
<nav className="navbar" aria-label="Navigasi utama">
  <span className="navbar-logo">ParaLab Workshop</span>
  <ul className="navbar-links">
    <li><a className="navbar-link" href="#tentang">Tentang</a></li>
    <li><a className="navbar-link" href="#agenda">Agenda</a></li>
    <li><a className="navbar-link" href="#daftar">Daftar</a></li>
  </ul>
</nav>
```

- Root element: `<nav>`; `getByRole('navigation', { name: 'Navigasi utama' })` finds it.
- Logo text `ParaLab Workshop` is a `<span>`, **not** a link.
- Exactly three links (`getAllByRole('link')` has length 3) in order:
  `Tentang` -> `#tentang`, `Agenda` -> `#agenda`, `Daftar` -> `#daftar`.
  (`href` attribute values are exactly those strings.)
- No headings inside the navbar.
- Style: horizontal flex bar, logo left, links right, `flex-wrap: wrap`; logo in
  `--color-primary`, bold. Not sticky.

## Hero

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
- Subtitle text exactly: `Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.`
- Info text exactly: `Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer`
- Exactly one link: `getByRole('link', { name: 'Daftar Sekarang' })` with `href="#daftar"`.
  It is an `<a>`, not a `<button>`; there are no `button` roles in Hero.
- Style: CTA styled as a button: background `--color-accent`, text `--color-text`,
  `border-radius: var(--radius)`, padding, `display: inline-block`, no underline.
  Hero background may use `--color-primary` with light text, or light background with
  primary title.

## Agenda

Files: `src/components/Agenda.jsx`, `src/components/Agenda.css`. Test: `tests/Agenda.test.jsx`.

```jsx
export default function Agenda()   // no props
```

The component may define a module-level constant (not exported is fine):

```js
const AGENDA_ITEMS = [
  { time: '08.30 – 09.00', title: 'Registrasi dan pembukaan' },
  { time: '09.00 – 10.30', title: 'Dasar komputasi paralel dan terdistribusi' },
  { time: '10.45 – 12.00', title: 'Multi-agent AI untuk otomasi SDLC' },
  { time: '13.00 – 15.00', title: 'Hands-on: membangun pipeline agent paralel' },
];
```

```jsx
<section id="agenda" className="agenda">
  <h2 className="agenda-heading">Agenda</h2>
  <ul className="agenda-list">
    {AGENDA_ITEMS.map((item) => (
      <li key={item.time} className="agenda-item" data-testid="agenda-item">
        <span className="agenda-time">{item.time}</span>
        <span className="agenda-title">{item.title}</span>
      </li>
    ))}
  </ul>
</section>
```

- `<section id="agenda">`.
- Exactly one heading: `getByRole('heading', { level: 2, name: 'Agenda' })`.
- Exactly one list: `getByRole('list')`; it has exactly 4 `listitem`s, in the order
  above. Each `<li>` has `data-testid="agenda-item"`.
- Within each item, `within(item).getByText(time)` and `within(item).getByText(title)`
  both succeed; time and title are separate `<span>` elements, each containing only
  its string. Times use the en dash with a space on each side: `08.30 – 09.00`.
- No links in Agenda.
- Style: items as rounded cards (`--radius`) or rows; time in `--color-primary`, bold;
  stack time above title on narrow screens.

## Pendaftaran

Files: `src/components/Pendaftaran.jsx`, `src/components/Pendaftaran.css`. Test: `tests/Pendaftaran.test.jsx`.

```jsx
export default function Pendaftaran()   // no props
```

```jsx
<section id="daftar" className="pendaftaran">
  <h2 className="pendaftaran-heading">Pendaftaran</h2>
  <p className="pendaftaran-text">Pendaftaran dibuka 1 November 2026.</p>
</section>
```

- `<section id="daftar">`.
- Exactly one heading: `getByRole('heading', { level: 2, name: 'Pendaftaran' })`.
- Text exactly `Pendaftaran dibuka 1 November 2026.` (with the trailing period).
- No form controls: no `<form>`, `<input>`, `<select>`, `<textarea>`, `<button>`
  (`queryAllByRole('textbox')`, `queryAllByRole('button')`, `queryAllByRole('combobox')`
  are empty; `container.querySelector('form, input, select, textarea')` is null). No links.
- Style: centred card with `--radius`, white background.

## Footer

Files: `src/components/Footer.jsx`, `src/components/Footer.css`. Test: `tests/Footer.test.jsx`.

```jsx
export default function Footer()   // no props
```

```jsx
<footer className="footer">
  <p className="footer-copy">© 2026 ParaLab · Program Studi Informatika</p>
  <p className="footer-contact">
    <a className="footer-email" href="mailto:paralab@kampus.ac.id">paralab@kampus.ac.id</a>
  </p>
</footer>
```

- Root element `<footer>`; when rendered alone, `getByRole('contentinfo')` finds it.
- Text exactly `© 2026 ParaLab · Program Studi Informatika`.
- Exactly one link: `getByRole('link', { name: 'paralab@kampus.ac.id' })` with
  `href="mailto:paralab@kampus.ac.id"`.
- No headings.
- Style: background `--color-footer-bg`, text and link colour `--color-on-dark`,
  centred, padding.

## App

Files: `src/components/App.jsx`, `src/components/App.css`. Test: `tests/App.test.jsx`.

```jsx
import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Agenda from './Agenda.jsx';
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
        <Pendaftaran />
      </main>
      <Footer />
    </div>
  );
}
```

- Exactly this composition and order: Navbar, `<main>` containing Hero, Agenda,
  Pendaftaran, then Footer (outside `<main>`, so it keeps role `contentinfo`).
- Rendered App satisfies:
  - `getByRole('navigation', { name: 'Navigasi utama' })`, `getByRole('main')`,
    `getByRole('contentinfo')` each exist once.
  - DOM order (via `compareDocumentPosition` or by collecting
    `container.querySelectorAll('nav, section, footer')`): `nav`, `section#tentang`,
    `section#agenda`, `section#daftar`, `footer`. The `nav` is the first of these.
  - Exactly one `h1` (`getAllByRole('heading', { level: 1 })` length 1); h2 headings in
    order `Agenda`, `Pendaftaran` (length 2); no `h3`-`h6`.
  - Every link with an `href` starting with `#` points to an existing element id
    (`#tentang`, `#agenda`, `#daftar`).
- AC-1 (page title) is tested in `tests/App.test.jsx` by reading the shared entry file
  as text, without a browser:
  ```js
  import { readFileSync } from 'node:fs';
  import { resolve } from 'node:path';
  const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
  expect(html).toContain('<title>Workshop Komputasi Paralel 2026</title>');
  ```
  (Tests run from the repository root via `npm test`.) The App coder does not edit
  `index.html`; the scaffold creates it.
- `App.css`: page-level layout only (e.g. `.app-main` sections spaced, max width
  `--content-max-width`, horizontal padding so nothing overflows at 360px).
