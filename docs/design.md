# Design - Landing Page Workshop Komputasi Paralel (tickets LP-1, LP-2)

## Architecture overview

A static single-page landing page. `src/main.jsx` mounts `App`, which renders five
section components in a fixed order:

```
App
├── Navbar        <nav aria-label="Navigasi utama">
└── <main>
│   ├── Hero        <section id="tentang">      (h1)
│   ├── Agenda      <section id="agenda">       (h2 "Agenda")
│   └── Pendaftaran <section id="daftar">       (h2 "Pendaftaran")  -- LP-2: registration form / thank-you
│         └── uses validatePendaftaran()  (pure function, src/components/validatePendaftaran.js)
└── Footer        <footer>
```

All content is hard-coded Indonesian text inside the components (no data fetching).
Navigation uses plain anchor links to section ids. Each component imports its own CSS
file; global tokens live in `src/index.css`.

LP-2 changes only the registration section: `Pendaftaran` becomes a stateful form
component (optional `onSubmit` prop), and a new pure module `validatePendaftaran`
holds the validation rules. Nothing is sent anywhere. `App` is unchanged (it renders
`<Pendaftaran />` with no props, as before).

**Stack:** `react` - React 18 + Vite 5 (JSX, ES modules), Vitest 2 + React Testing Library + jest-dom in jsdom.

## Module status for LP-2

| Module | Status | Coded/tested in this run |
|---|---|---|
| Navbar | (unchanged) | no |
| Hero | (unchanged) | no |
| Agenda | (unchanged) | no |
| validatePendaftaran | (new) | yes |
| Pendaftaran | (changed) | yes - `tests/Pendaftaran.test.jsx` is fully rewritten |
| Footer | (unchanged) | no |
| App | (unchanged) | no - `tests/App.test.jsx` keeps passing unchanged (see App section) |

No shared file changes in LP-2 (no new dependencies, no new design tokens;
`@testing-library/user-event` is **not** installed, so tests use `fireEvent`).

## Global rules for all modules

- Every text string below must be reproduced **exactly**, character for character,
  including the en dash `–` (U+2013) in agenda times and in `3–80`, the middle dot `·`
  (U+00B7) in the hero info and footer, and the copyright sign `©` (U+00A9).
- Each quoted visible string must be the **entire text content of a single element**
  with no nested elements inside it (so `getByText('<exact string>')` matches it).
  Do not split strings across elements and do not add extra whitespace-visible
  characters.
- Components take **no props**, except `Pendaftaran`, which (since LP-2) takes one
  optional prop `onSubmit`.
- No component other than `App` renders `<main>`. No component renders an `<h3>` or
  deeper heading. Only `Hero` renders an `<h1>`.
- CSS class names are prefixed with the component's kebab-case name (`navbar-`, `hero-`,
  `agenda-`, `pendaftaran-`, `footer-`, `app-`). Use the CSS custom properties from
  `src/index.css` (below) instead of hard-coded colours (exceptions: `#FFFFFF` card/input
  backgrounds and the error red `#B91C1C`, defined locally in `Pendaftaran.css`).
- Tests: `import X from '../src/components/X.jsx'`, `render(<X />)`, query with
  `screen.getByRole` / `getByText` / `within`. No snapshots. No `data-testid` is needed
  except the ones explicitly listed (Agenda items).

## Scaffold (shared files, created before coding) - unchanged in LP-2

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

## Navbar (unchanged)

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
- Subtitle text exactly: `Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.`
- Info text exactly: `Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer`
- Exactly one link: `getByRole('link', { name: 'Daftar Sekarang' })` with `href="#daftar"`.
  It is an `<a>`, not a `<button>`; there are no `button` roles in Hero.
- Style: CTA styled as a button: background `--color-accent`, text `--color-text`,
  `border-radius: var(--radius)`, padding, `display: inline-block`, no underline.

## Agenda (unchanged)

Files: `src/components/Agenda.jsx`, `src/components/Agenda.css`. Test: `tests/Agenda.test.jsx`.

```jsx
export default function Agenda()   // no props
```

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

- `<section id="agenda">`; one `h2` `Agenda`; one list with exactly 4 `listitem`s in the
  order above, each with `data-testid="agenda-item"` and separate time/title `<span>`s.
- No links in Agenda.

## validatePendaftaran (new)

File: `src/components/validatePendaftaran.js` (plain `.js`, no JSX, **no React import,
no DOM access**). Test: `tests/validatePendaftaran.test.jsx`.
(Deliberate deviation from `source_pattern`: this is a pure function, not a component.)

### Exports

```js
export const ERROR_MESSAGES = {
  nama: 'Nama wajib diisi (3–80 karakter).',
  email: 'Format email tidak valid.',
  nim: 'NIM harus 10 digit angka.',
};

export default function validatePendaftaran(data = {})   // also exported by name:
export { validatePendaftaran };                           // i.e. `export function` + default, both refer to the same function
```

Test import: `import validatePendaftaran, { ERROR_MESSAGES } from '../src/components/validatePendaftaran.js';`

### Contract

- Parameter `data`: object `{ nama, email, nim, sesi }`, all strings. Any field that is
  `undefined` or `null` is treated as `''`. `data` itself defaults to `{}` (and `null`
  is treated as `{}`), so `validatePendaftaran()` returns all three error keys.
  Values are normalised with `String(value ?? '').trim()` before checking.
- Returns a **new plain object** containing only keys for invalid fields, each mapped to
  its exact message from `ERROR_MESSAGES`. Valid input returns `{}` (so
  `expect(result).toEqual({})` and `Object.keys(result).length === 0`).
  The input object is never mutated. Never throws for the inputs described here.
- Rules (on the trimmed value `v`):
  - `nama`: invalid unless `3 <= v.length <= 80`.
    Invalid: `""`, `"   "`, `"Al"`, `"  Al  "`, `'a'.repeat(81)`, `undefined`.
    Valid: `"Ani"`, `"  Ani  "`, `'a'.repeat(80)`.
  - `email`: invalid unless `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)`.
    Invalid: `""`, `"budi"`, `"budi@"`, `"budi@kampus"`, `"@kampus.ac.id"`,
    `"budi @kampus.ac.id"`, `"budi@@kampus.ac.id"`.
    Valid: `"budi@kampus.ac.id"`, `"  budi@kampus.ac.id  "`.
  - `nim`: invalid unless `/^[0-9]{10}$/.test(v)`.
    Invalid: `""`, `"123456789"`, `"12345678901"`, `"12345abcde"`, `"12345 67890"`, `"-123456789"`.
    Valid: `"2201234567"`, `" 2201234567 "`.
  - `sesi`: never validated, never an error key (whatever its value).
- Multiple invalid fields produce multiple keys in one result, e.g.
  `validatePendaftaran({ nama: '', email: '', nim: '', sesi: 'Offline' })` returns
  `{ nama: 'Nama wajib diisi (3–80 karakter).', email: 'Format email tidak valid.', nim: 'NIM harus 10 digit angka.' }`.

### What `tests/validatePendaftaran.test.jsx` must check

- `ERROR_MESSAGES` has exactly the three strings above (with en dash in `3–80`).
- Every valid/invalid example above for each field, testing one field at a time with the
  other fields valid (base valid data: `{ nama: 'Budi Santoso', email: 'budi@kampus.ac.id', nim: '2201234567', sesi: 'Offline' }`),
  asserting the error key is present with the exact message, or absent.
- Fully valid data (with `sesi` `'Offline'` and `'Online'`) returns `{}`.
- All three empty gives exactly the three keys; `validatePendaftaran()` and
  `validatePendaftaran({})` give the three keys; `sesi` is never a key (also for
  `sesi: ''` / `sesi: 'X'`).
- The input object is not mutated (e.g. untrimmed values stay untrimmed).
- Tests import nothing from React / Testing Library.

## Pendaftaran (changed)

Files: `src/components/Pendaftaran.jsx`, `src/components/Pendaftaran.css`. Test:
`tests/Pendaftaran.test.jsx` (**fully rewritten in this run**; the LP-1 assertions for
the placeholder text and "no form controls" (AC-19/AC-20) are removed).

```jsx
import { useState } from 'react';
import validatePendaftaran from './validatePendaftaran.js';
import './Pendaftaran.css';

export default function Pendaftaran({ onSubmit } = {})
```

### Props

| Prop | Type | Default | Meaning |
|---|---|---|---|
| `onSubmit` | `(data: { nama: string, email: string, nim: string, sesi: 'Offline' \| 'Online' }) => void` | `undefined` | Called exactly once after a valid submit. If not a function, it is ignored (no error). |

### State

- `values`: `{ nama: '', email: '', nim: '', sesi: 'Offline' }` initially (raw, untrimmed input).
- `errors`: `{}` initially; replaced **only** on submit with the result of `validatePendaftaran(values)`.
- `submittedNama`: `null` initially; set to the trimmed name on a valid submit.

### Behaviour

- `onChange` of each control updates only `values` (never `errors`): typing neither
  shows nor clears messages.
- Form `onSubmit` handler:
  1. `event.preventDefault()` (always, first).
  2. `const errs = validatePendaftaran(values); setErrors(errs);`
  3. If `Object.keys(errs).length > 0`: stop. Form stays, values are kept, `onSubmit` not called.
  4. Else build `data = { nama: values.nama.trim(), email: values.email.trim(), nim: values.nim.trim(), sesi: values.sesi }`,
     set `submittedNama = data.nama`, and if `typeof onSubmit === 'function'` call
     `onSubmit(data)` directly in the event handler (**not** inside a state updater
     function, so React StrictMode cannot call it twice).
- After success the form is not rendered anymore; there is no reset/"register again".
- No `fetch`, no `localStorage`, no network.

### Markup - form state (`submittedNama === null`)

```jsx
<section id="daftar" className="pendaftaran">
  <h2 className="pendaftaran-heading">Pendaftaran</h2>
  <form className="pendaftaran-form" aria-label="Formulir pendaftaran" noValidate onSubmit={handleSubmit}>
    <div className="pendaftaran-field">
      <label className="pendaftaran-label" htmlFor="pendaftaran-nama">Nama lengkap</label>
      <input
        id="pendaftaran-nama" name="nama" type="text" className="pendaftaran-input"
        autoComplete="name" value={values.nama} onChange={...}
        aria-invalid={errors.nama ? 'true' : undefined}
        aria-describedby={errors.nama ? 'pendaftaran-nama-error' : undefined}
      />
      {errors.nama && <p id="pendaftaran-nama-error" className="pendaftaran-error">{errors.nama}</p>}
    </div>

    <div className="pendaftaran-field">
      <label className="pendaftaran-label" htmlFor="pendaftaran-email">Email</label>
      <input
        id="pendaftaran-email" name="email" type="email" className="pendaftaran-input"
        autoComplete="email" value={values.email} onChange={...}
        aria-invalid={errors.email ? 'true' : undefined}
        aria-describedby={errors.email ? 'pendaftaran-email-error' : undefined}
      />
      {errors.email && <p id="pendaftaran-email-error" className="pendaftaran-error">{errors.email}</p>}
    </div>

    <div className="pendaftaran-field">
      <label className="pendaftaran-label" htmlFor="pendaftaran-nim">NIM</label>
      <input
        id="pendaftaran-nim" name="nim" type="text" inputMode="numeric" className="pendaftaran-input"
        value={values.nim} onChange={...}
        aria-invalid={errors.nim ? 'true' : undefined}
        aria-describedby={errors.nim ? 'pendaftaran-nim-error' : undefined}
      />
      {errors.nim && <p id="pendaftaran-nim-error" className="pendaftaran-error">{errors.nim}</p>}
    </div>

    <fieldset className="pendaftaran-fieldset">
      <legend className="pendaftaran-legend">Sesi</legend>
      <div className="pendaftaran-radio">
        <input id="pendaftaran-sesi-offline" type="radio" name="sesi" value="Offline"
               checked={values.sesi === 'Offline'} onChange={...} />
        <label htmlFor="pendaftaran-sesi-offline">Offline</label>
      </div>
      <div className="pendaftaran-radio">
        <input id="pendaftaran-sesi-online" type="radio" name="sesi" value="Online"
               checked={values.sesi === 'Online'} onChange={...} />
        <label htmlFor="pendaftaran-sesi-online">Online</label>
      </div>
    </fieldset>

    <button type="submit" className="pendaftaran-submit">Kirim Pendaftaran</button>
  </form>
</section>
```

Exact rules:
- Ids, `name`s, `type`s and texts exactly as above. Inputs have **no** `required`,
  `pattern`, `minLength` or `maxLength` attributes (so 11-digit NIM / 81-char names
  can be typed and validated by the app). The form has the `novalidate` attribute
  (`noValidate` in JSX).
- Valid inputs have **no** `aria-invalid` attribute at all and no `aria-describedby`.
- The error `<p>` is rendered directly after its input, inside the same
  `.pendaftaran-field` div; its entire text is the exact message. Its id is
  `pendaftaran-<field>-error`.
- The form has role `form` with name `Formulir pendaftaran`.
- No headings other than the `h2`, no links, exactly one `button`.
- The text `Pendaftaran dibuka 1 November 2026.` is **not rendered** anywhere.
- No `role="status"` element exists in the form state.

### Markup - success state (`submittedNama !== null`)

```jsx
<section id="daftar" className="pendaftaran">
  <h2 className="pendaftaran-heading">Pendaftaran</h2>
  <p className="pendaftaran-success" role="status">
    {`Terima kasih, ${submittedNama}! Pendaftaranmu sudah kami terima.`}
  </p>
</section>
```

- The `<form>`, all inputs, the fieldset and the button are removed (not just hidden).
- Message example: name typed `"  Budi Santoso "` -> `Terima kasih, Budi Santoso! Pendaftaranmu sudah kami terima.`

### Style (`Pendaftaran.css`)

Card with `#FFFFFF` background, `border-radius: var(--radius)`; fields stacked, inputs
`width: 100%`, `max-width: 100%`, rounded `var(--radius)`, font `inherit`; submit button
background `var(--color-primary)`, white text, `border-radius: var(--radius)`, no fixed
widths above 360px; `.pendaftaran-error` colour `#B91C1C`, small font; invalid inputs
(`[aria-invalid="true"]`) get a `#B91C1C` border; fieldset without default heavy border
is fine. `.pendaftaran-success` styled as a highlighted box (e.g. border-left in
`--color-primary`).

### What the rewritten `tests/Pendaftaran.test.jsx` must check

Use `render`, `screen`, `within`, `fireEvent`, `createEvent` from `@testing-library/react`
and `vi.fn()` for callbacks. Fill fields with
`fireEvent.change(input, { target: { value: '...' } })`, choose a session with
`fireEvent.click(screen.getByRole('radio', { name: 'Online' }))`, submit with
`fireEvent.click(screen.getByRole('button', { name: 'Kirim Pendaftaran' }))`.

1. Structure: `container.querySelector('section#daftar')` exists; one
   `getByRole('heading', { level: 2, name: 'Pendaftaran' })`; no `h1`/`h3`-`h6`;
   `queryByText('Pendaftaran dibuka 1 November 2026.')` is null (LP2-AC-1).
2. Initial state (LP2-AC-8/9/10): `getByRole('form', { name: 'Formulir pendaftaran' })`
   exists and has attribute `novalidate`; `getByLabelText('Nama lengkap')` (type
   `text`), `getByLabelText('Email')` (type `email`), `getByLabelText('NIM')` (type
   `text`) all have value `''`; `getByRole('group', { name: 'Sesi' })` contains
   `radio` `Offline` (checked) and `radio` `Online` (not checked);
   `getByRole('button', { name: 'Kirim Pendaftaran' })` has `type="submit"`; none of
   the three error messages is in the document; no input has `aria-invalid`;
   `queryByRole('status')` is null. The heading precedes the form in DOM order.
3. Typing invalid data without submitting shows no error messages (LP2-AC-11).
4. Submit empty form: all three messages shown, each input has
   `aria-invalid="true"` and `toHaveAccessibleDescription(<its message>)`; each
   message element is the next element sibling of its input; `onSubmit` mock not
   called; form still present (LP2-AC-12/13).
5. Submit with only one field invalid (e.g. NIM `'123'`): only `NIM harus 10 digit angka.`
   shown; Nama/Email inputs have no `aria-invalid` attribute; entered values kept.
6. Error clearing (LP2-AC-14): submit empty, then fix Nama only and submit again ->
   Nama message gone (and `aria-invalid` removed), Email and NIM messages remain. Also:
   after errors are shown, changing a field without submitting does not remove its
   message.
7. Default prevented (LP2-AC-15): `const ev = createEvent.submit(form); fireEvent(form, ev);`
   then `expect(ev.defaultPrevented).toBe(true)` (both for invalid and valid data).
8. Success (LP2-AC-16/17/18): name `'  Budi Santoso '`, email `'budi@kampus.ac.id'`,
   NIM `'2201234567'`, click `Online`, submit -> `getByRole('status')` has text
   `Terima kasih, Budi Santoso! Pendaftaranmu sudah kami terima.`; `queryByRole('form')`
   / `container.querySelector('form')` null; no `textbox`, `radio` or `button` roles
   left; heading `Pendaftaran` still present inside `section#daftar`; `onSubmit`
   called exactly once with
   `{ nama: 'Budi Santoso', email: 'budi@kampus.ac.id', nim: '2201234567', sesi: 'Online' }`.
   A second case with default session sends `sesi: 'Offline'` and trims email/NIM with
   surrounding spaces.
9. No `onSubmit` (LP2-AC-19): `render(<Pendaftaran />)`, valid submit does not throw and
   shows the thank-you message.

## Footer (unchanged)

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

- Root `<footer>` (role `contentinfo`); text exactly `© 2026 ParaLab · Program Studi Informatika`;
  exactly one link `paralab@kampus.ac.id` -> `mailto:paralab@kampus.ac.id`; no headings.

## App (unchanged)

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

- No code change in LP-2: `<Pendaftaran />` is rendered without `onSubmit`.
- The existing `tests/App.test.jsx` remains valid after LP-2 and needs **no update**:
  the new form adds no `section`, `nav` or `footer` elements, no headings (so one h1,
  h2s `Agenda`, `Pendaftaran`, no h3-h6 still hold - LP2-AC-20), and no links (the
  in-page link checks are unaffected). It never asserted the superseded placeholder
  text. The Pendaftaran coder must keep it that way (no extra headings, sections or
  links inside `#daftar`).
- AC-1 (page title) stays tested in `tests/App.test.jsx` by reading `index.html` as text.
