# Review - LP-2 Form pendaftaran dengan validasi (incremental on LP-1)

**Verdict: approve**

Scope reviewed: `validatePendaftaran` (new) and `Pendaftaran` (changed). I also re-read the unchanged modules (Navbar, Hero, Agenda, Footer, App) to check for regressions.

## Build

`npm run build` (vite 5.4.21) passed: 43 modules transformed, `dist/index.html` 0.43 kB, CSS 4.43 kB, JS 148.23 kB. Exit code 0.

## Tests

`npm test` (vitest 2.1.9) passed: **7 files, 37 tests, 0 failures**. Exit code 0.

| Test file | Tests | Result |
|---|---|---|
| tests/validatePendaftaran.test.jsx | 6 | pass |
| tests/Pendaftaran.test.jsx | 6 | pass |
| tests/Navbar.test.jsx | 5 | pass |
| tests/Hero.test.jsx | 5 | pass |
| tests/Agenda.test.jsx | 6 | pass |
| tests/Footer.test.jsx | 4 | pass |
| tests/App.test.jsx | 5 | pass (unchanged, no LP-1 regression) |

## Design and requirements check

### validatePendaftaran (`src/components/validatePendaftaran.js`)
- Plain `.js`. It has no React import and no DOM access. It exports `ERROR_MESSAGES`, a named `validatePendaftaran` and a default export, and both exports are the same function. All of this matches the design.
- All three messages are exact, including the en dash U+2013 in `3–80`.
- `data = {}` defaults, and `data ?? {}` handles `null`. Each field is normalised with `String(value ?? '').trim()`. It returns a new object holding only the invalid keys, and never adds a `sesi` key. The input is not mutated.
- The rules match the spec: nama length 3..80, the email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, and the NIM regex `^[0-9]{10}$`. This covers LP2-AC-2..7.
- Tests cover every documented example, the default-argument and `{}` cases, `sesi` never being a key, and no mutation. They import nothing from React or Testing Library.

### Pendaftaran (`src/components/Pendaftaran.jsx`, `Pendaftaran.css`)
- The signature `Pendaftaran({ onSubmit } = {})` and the three pieces of state (`values`, `errors`, `submittedNama`) match the design.
- `onChange` updates only `values`. The submit handler calls `preventDefault()` first, then validates and sets errors, and stops if there are any. On success it builds trimmed data, sets `submittedNama`, and calls `onSubmit(data)` straight from the event handler (not inside a state updater), so StrictMode cannot call it twice. The `typeof` guard covers a missing prop. This covers LP2-AC-11..19.
- The form markup matches the design exactly: ids, `name`s, `type`s, `autoComplete`, `inputMode="numeric"` on NIM, `noValidate`, and `aria-label="Formulir pendaftaran"`. There are no `required`, `pattern`, `minLength` or `maxLength` attributes. Each error `<p>` sits directly after its input with id `pendaftaran-<field>-error`.
- In the success state the form is removed entirely and replaced by `<p role="status">` with the exact thank-you text. The `h2` stays inside `section#daftar`.
- The placeholder text `Pendaftaran dibuka 1 November 2026.` no longer appears anywhere in `src` (LP2-AC-1).
- No `fetch`, no `localStorage`, and no new dependencies (`package.json` is unchanged).

### Accessibility (form)
- Every text input has a visible `<label htmlFor>`. The radios are grouped in a `fieldset` with `legend` "Sesi", and each radio has its own label.
- Invalid inputs get `aria-invalid="true"` and an `aria-describedby` that points to the message. On valid inputs both attributes are left out entirely, not set to `"false"`.
- The success message uses `role="status"`, so screen readers announce it.
- Heading order is intact: the component's only heading is the h2, and App still has one h1 followed by the h2s Agenda and Pendaftaran (LP2-AC-20, checked by App.test.jsx). There are no links and exactly one button, so App's link checks are unaffected.
- Inputs show a visible focus outline in `--color-primary`.

### Styles / tokens
- All class names start with `pendaftaran-`. The CSS uses `var(--radius)`, `var(--color-primary)`, `var(--color-text)` and `var(--color-bg)`. `#FFFFFF` and `#B91C1C` are used only where the design allows them. Inputs use `width: 100%`, `max-width: 100%` and `font: inherit`. There are no fixed widths above 360px (the card is `max-width: 40rem; width: 100%`), and the fieldset wraps. This covers LP2-AC-21.

### Unchanged modules
- Navbar, Hero, Agenda, Footer and App still match the design, character for character. `index.html` keeps its title and `lang="id"`, and `src/index.css` keeps the tokens.

## Issues

None of these block approval:
1. (nit, Pendaftaran.css) The input border `rgba(17, 24, 39, 0.25)` and the card `box-shadow` `rgba(17, 24, 39, 0.08)` hard-code a translucent copy of `--color-text`. The design's rule is "use custom properties instead of hard-coded colours". These are low-alpha tints with no token equivalent, so they are acceptable. They could become a token in a later ticket.
2. (nit, tests/Pendaftaran.test.jsx) Design item 7 asks for a `defaultPrevented` check on both invalid and valid data. Both cases are covered, but inside the empty-submit and success tests rather than in a test of their own. No change needed.

No wrong tests were found.
