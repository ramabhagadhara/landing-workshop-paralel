# Requirements - Landing Page Workshop Komputasi Paralel (ticket LP-1)

A single-page landing page for **Workshop Komputasi Paralel 2026**, organised by ParaLab, Program Studi Informatika. This run delivers ticket LP-1 only: the static page skeleton with a navbar, a hero, the agenda, a placeholder registration section and a footer, all in Indonesian. Later tickets (form, FAQ, countdown, mobile menu) build on this skeleton.

## Stack

React 18 + Vite 5, JavaScript (JSX), ES modules; tests with Vitest 2 + React Testing Library + jest-dom in a jsdom environment (stack profile `react`). The PRD names this stack explicitly. Only `react` and `react-dom` are runtime dependencies.

## User stories

1. As a prospective participant (student or lecturer), I want to see the event name, a short description, the date and the venue on the first screen so that I immediately understand what the event is, when it is and where it is.
2. As a prospective participant, I want a navbar with links to the page sections so that I can jump straight to the part I care about without scrolling.
3. As a prospective participant, I want to see the agenda with times and session titles so that I can plan my day.
4. As a prospective participant, I want a clear "Daftar Sekarang" call to action and a registration section so that I know how and when to register.
5. As a prospective participant, I want the organiser's contact email in the footer so that I can ask questions.
6. As an organiser sharing the link, I want the browser tab to show the event name so that the shared page is easy to recognise.

## Acceptance criteria

All visible text must match exactly, including the en dash `–` in times and the middle dot `·` in the info and footer text.

### Page / document
- AC-1: The page `<title>` (in the HTML entry file) is exactly `Workshop Komputasi Paralel 2026`. A test can check this by reading the HTML entry file as text, without a browser.
- AC-2: Rendering the root App component produces, in this DOM order: Navbar, Hero (`#tentang`), Agenda (`#agenda`), Pendaftaran (`#daftar`), Footer. **(Amended by LP-3, see LP3-AC-1.)**
- AC-3: The rendered App contains exactly one heading of level 1, and the level-2 headings appear in the order "Agenda", "Pendaftaran". No heading levels are skipped (no h3 without a preceding h2, etc.). **(Amended by LP-3, see LP3-AC-1.)**

### Navbar
- AC-4: The navbar is rendered as a navigation landmark (`role="navigation"`, i.e. a `<nav>` element) with the accessible name `Navigasi utama` (`getByRole('navigation', { name: 'Navigasi utama' })` finds it).
- AC-5: The navbar displays the logo text `ParaLab Workshop`.
- AC-6: The navbar contains exactly three links, in this order: **(Amended by LP-3, see LP3-AC-2.)**
  - `Tentang` with `href="#tentang"`
  - `Agenda` with `href="#agenda"`
  - `Daftar` with `href="#daftar"`
- AC-7: The navbar sits at the top of the page (it is the first section rendered by App).

### Hero
- AC-8: The hero is a section element with `id="tentang"`.
- AC-9: It contains a level-1 heading with text `Workshop Komputasi Paralel 2026`.
- AC-10: It shows the subtitle `Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.`
- AC-11: It shows the info text `Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer`.
- AC-12: It contains a link (an `<a>` element, role `link`, styled as a button) with text `Daftar Sekarang` and `href="#daftar"`.

### Agenda
- AC-13: The agenda is a section element with `id="agenda"`.
- AC-14: It contains a level-2 heading with text `Agenda`.
- AC-15: It contains a list (role `list`) with exactly four list items (role `listitem`), in this order, each showing its time and title as separate visible text:
  1. `08.30 – 09.00` — `Registrasi dan pembukaan`
  2. `09.00 – 10.30` — `Dasar komputasi paralel dan terdistribusi`
  3. `10.45 – 12.00` — `Multi-agent AI untuk otomasi SDLC`
  4. `13.00 – 15.00` — `Hands-on: membangun pipeline agent paralel`
- AC-16: Each list item contains both its own time and its own title (a test can use `within(item)` to find them).

### Pendaftaran (placeholder)
- AC-17: The registration section is a section element with `id="daftar"`.
- AC-18: It contains a level-2 heading with text `Pendaftaran`.
- AC-19: It shows the text `Pendaftaran dibuka 1 November 2026.` **(Superseded by LP-2, see LP2-AC-1.)**
- AC-20: It contains no form fields (the form arrives in LP-2). **(Superseded by LP-2, see LP2-AC-1.)**

### Footer
- AC-21: The footer is a `<footer>` element (role `contentinfo` when rendered at page level).
- AC-22: It shows the text `© 2026 ParaLab · Program Studi Informatika`.
- AC-23: It contains a link with text `paralab@kampus.ac.id` and `href="mailto:paralab@kampus.ac.id"`.

### Style and quality
- AC-24: Colours used: primary `#4F46E5`, accent `#F59E0B`, text `#111827`, background `#F9FAFB`, footer dark background `#1F2937`; system font stack only (no external fonts); rounded corners 12px.
- AC-25: Layout has no horizontal scroll from 360px to 1440px wide (manual check; not automated).
- AC-26: Every component has unit tests checking the text, links and roles above; tests run with `npm test` in jsdom with no browser, network or server, and `npm run build` succeeds.

## Assumptions

- The page title is set statically in the HTML entry file; it is verified by a test reading that file as text rather than by rendering in a browser.
- The "Daftar Sekarang" call to action is an anchor link styled as a button, not a `<button>` element, because it navigates to `#daftar`.
- Each agenda session is a list item; the time and title are shown as separate text elements inside it (exact markup left to the Design Agent).
- The navbar is a plain horizontal bar; it does not need to be sticky. Smooth scrolling is optional and not tested.
- All content is hard-coded in the components (no CMS, no data fetching); components may accept props with these texts as defaults, but the defaults must be exactly the PRD texts.
- The placeholder registration section is its own small component so LP-2 can replace it independently.

## Out of scope

- LP-2 Form pendaftaran dengan validasi (fields, validation, thank-you message).
- LP-3 FAQ accordion (including the extra "FAQ" navbar link).
- LP-4 Hitung mundur acara (countdown in the hero).
- LP-5 Menu mobile (hamburger menu below 768px).
- Any backend, database, login, payment or sending registration data anywhere.
- Hosting, domain, analytics, cookie banner, multi-language, confirmation emails.
- Automated visual/responsive testing in a real browser; responsiveness is checked manually.

# LP-2 Form pendaftaran dengan validasi

LP-2 replaces the LP-1 placeholder registration section with a client-side registration form. A visitor enters name, email, NIM and preferred session; the form validates on submit, shows Indonesian error messages under invalid fields, and on success swaps the form for a thank-you message. Nothing is sent to a server; the component only calls an optional `onSubmit` callback with the form data.

## Stack

Unchanged from LP-1: React 18 + Vite 5, JavaScript (JSX), Vitest 2 + React Testing Library + jest-dom in jsdom (stack profile `react`). No new runtime dependencies; validation is hand-written (no form or validation library), as the PRD forbids extra UI libraries and the logic is small.

## User stories

1. As a prospective participant, I want to register directly on the landing page so that I do not have to leave the page.
2. As a prospective participant, I want to choose between the Offline and Online session so that I can attend in the way that suits me.
3. As a prospective participant, I want clear error messages under each wrong field when I submit so that I know exactly what to fix.
4. As a prospective participant, I want a personal confirmation message after a valid submission so that I know my registration was accepted.
5. As a developer, I want the validation rules in a pure function so that I can test them without rendering any component.
6. As a developer integrating the page, I want an optional `onSubmit` callback receiving the form data so that a backend can be hooked up later without changing the form.

## Acceptance criteria

All visible text must match exactly, including the en dash `–` in `3–80`.

### Superseded LP-1 criteria
- LP2-AC-1: LP-1 criteria **AC-19** (text `Pendaftaran dibuka 1 November 2026.`) and **AC-20** (no form fields) are superseded and no longer hold. After LP-2 the text `Pendaftaran dibuka 1 November 2026.` must not appear anywhere on the page, and tests asserting AC-19/AC-20 must be removed or updated. All other LP-1 criteria (including AC-2, AC-3, AC-17, AC-18) still hold: the section keeps `id="daftar"` and its level-2 heading `Pendaftaran`, and it stays in the same position in the page order (between Agenda and Footer).

### Pure validation function
- LP2-AC-2: A pure function (no React, no DOM) takes a data object `{ nama, email, nim, sesi }` (strings) and returns an errors object. Keys are present only for invalid fields; a valid input returns an empty object `{}`. Error keys are `nama`, `email`, `nim` with these exact messages:
  - `nama`: `Nama wajib diisi (3–80 karakter).`
  - `email`: `Format email tidak valid.`
  - `nim`: `NIM harus 10 digit angka.`
- LP2-AC-3 (Nama): leading/trailing whitespace is removed before checking. Trimmed length 3 to 80 inclusive is valid. Examples: `""`, `"   "`, `"Al"`, `"  Al  "` and an 81-character string are invalid; `"Ani"`, `"  Ani  "` and an 80-character string are valid. A missing/undefined value is treated as empty (invalid).
- LP2-AC-4 (Email): the trimmed value must match `local@domain.tld`: one `@`, non-empty part before it, a domain part containing a dot with non-empty text on both sides, and no whitespace anywhere (equivalent to `^[^\s@]+@[^\s@]+\.[^\s@]+$`). Examples: `""`, `"budi"`, `"budi@"`, `"budi@kampus"`, `"@kampus.ac.id"`, `"budi @kampus.ac.id"`, `"budi@@kampus.ac.id"` are invalid; `"budi@kampus.ac.id"` and `"  budi@kampus.ac.id  "` are valid.
- LP2-AC-5 (NIM): the trimmed value must be exactly 10 ASCII digits `0-9`. Examples: `""`, `"123456789"` (9), `"12345678901"` (11), `"12345abcde"`, `"12345 67890"`, `"-123456789"` are invalid; `"2201234567"` and `" 2201234567 "` are valid.
- LP2-AC-6 (Sesi): `sesi` is never an error key; it is always one of `Offline` / `Online` because it comes from a fixed choice.
- LP2-AC-7: Multiple invalid fields produce multiple keys in the same result (e.g. all three empty gives three keys).

### Form rendering (initial state)
- LP2-AC-8: Inside the `#daftar` section, below the heading `Pendaftaran`, a form is rendered with these controls, each associated with a visible label (findable with `getByLabelText` / `getByRole(..., { name })`):
  - text input labelled `Nama lengkap`
  - email input labelled `Email`
  - text input labelled `NIM`
  - a radio group with group label `Sesi` (a `fieldset` with legend `Sesi`, role `group` named `Sesi`) containing two radios labelled `Offline` and `Online`
  - a submit button with text `Kirim Pendaftaran`
- LP2-AC-9: Initially all text inputs are empty, the `Offline` radio is checked and `Online` is not, and no error messages are visible.
- LP2-AC-10: The form disables native browser validation (`noValidate`), so all validation feedback comes from the app's own messages.

### Validation on submit
- LP2-AC-11: Validation runs only when the `Kirim Pendaftaran` button is clicked (form submit); typing does not show or clear errors by itself.
- LP2-AC-12: On submit with invalid data, each invalid field shows its exact error message (LP2-AC-2) directly below that field; valid fields show no message. The form stays visible, entered values are kept, and `onSubmit` is not called.
- LP2-AC-13: Each invalid input gets `aria-invalid="true"` and is linked to its error message via `aria-describedby` (so `toHaveAccessibleDescription(<message>)` passes); valid inputs have no `aria-invalid="true"`.
- LP2-AC-14: On a later submit, messages for fields that are now valid disappear, and messages for still-invalid fields remain.
- LP2-AC-15: Submitting never performs a page reload or network request (the default form submit is prevented).

### Successful submit
- LP2-AC-16: On submit with valid data, the form (all fields and the button) is removed and replaced, inside the same `#daftar` section under the same `Pendaftaran` heading, by the message `Terima kasih, <nama>! Pendaftaranmu sudah kami terima.` where `<nama>` is the trimmed name. Example: name `"  Budi Santoso "` shows `Terima kasih, Budi Santoso! Pendaftaranmu sudah kami terima.`
- LP2-AC-17: The thank-you message is rendered in an element with `role="status"` so screen readers announce it.
- LP2-AC-18: If an `onSubmit` prop is given, it is called exactly once with `{ nama, email, nim, sesi }`, where `nama`, `email` and `nim` are trimmed strings and `sesi` is `"Offline"` or `"Online"` (the selected radio). Example: name `" Budi Santoso "`, email `"budi@kampus.ac.id"`, NIM `"2201234567"`, Online selected gives `{ nama: "Budi Santoso", email: "budi@kampus.ac.id", nim: "2201234567", sesi: "Online" }`.
- LP2-AC-19: If no `onSubmit` prop is given, a valid submit still shows the thank-you message without throwing.

### Page-level and quality
- LP2-AC-20: The rendered App still contains exactly one h1, the level-2 headings in order `Agenda`, `Pendaftaran`, and no skipped heading levels (the form and thank-you message add no headings above h2 level; any added heading must be h3 or lower). **(Heading order amended by LP-3, see LP3-AC-1.)**
- LP2-AC-21: Form styling uses the LP-1 design tokens (primary `#4F46E5` for the button, 12px rounded corners, system fonts); error text is visually distinct (e.g. red) and the form fits 360px wide without horizontal scroll (manual check).
- LP2-AC-22: Unit tests cover the pure validation function directly (all examples above) and the form component with React Testing Library (initial state, errors, error clearing, success message, `onSubmit` payload, no `onSubmit`). Tests use `fireEvent` or `@testing-library/user-event` only if already installed; no new dependencies are required. `npm test` and `npm run build` pass.

## Assumptions

- "Nama wajib diisi (3–80 karakter)." covers both empty and too-short/too-long names; there is one message for all name failures.
- Email validity uses the simple `^[^\s@]+@[^\s@]+\.[^\s@]+$` rule on the trimmed value, not full RFC 5322.
- All text values (name, email, NIM) are trimmed before validation and before being passed to `onSubmit` and the thank-you message.
- The "Sesi" choice is a radio group (not a select); values passed on are exactly `"Offline"` and `"Online"`.
- Validation is on submit only (no live/on-blur validation); errors from the last submit stay until the next submit.
- After success there is no "register again" button; the thank-you message stays until the page is reloaded.
- The heading `Pendaftaran` and the section id `daftar` remain visible in both form and success states; only the content below the heading changes.
- The registration form replaces the LP-1 placeholder component in App; the placeholder component and its tests can be removed or rewritten by the Design Agent.
- No duplicate-registration checks and no persistence (no localStorage).

## Out of scope

- LP-1 work beyond the superseded placeholder criteria (already built).
- LP-3 FAQ accordion, LP-4 Hitung mundur acara, LP-5 Menu mobile.
- Sending registration data to any server, email confirmation, storing data (including localStorage).
- Live (as-you-type or on-blur) validation, checking that the email domain exists, checking NIM against a real student database.
- A "register again" / reset flow after successful submission.

# LP-3 FAQ accordion

LP-3 adds a "Pertanyaan Umum" (FAQ) section with four questions in an accordion: each question is a button that reveals its answer, at most one answer is open at a time, and clicking an open question closes it. The navbar gains a fourth link "FAQ" to `#faq`. All content is static and in Indonesian.

## Stack

Unchanged from LP-1/LP-2: React 18 + Vite 5, JavaScript (JSX), Vitest 2 + React Testing Library + jest-dom in jsdom (stack profile `react`). No new runtime dependencies; the accordion is hand-written with React state (no UI library, no `<details>` element).

## User stories

1. As a prospective participant, I want to read answers to common questions (cost, laptop, certificate, absence) on the page so that I can decide to register without contacting the organiser.
2. As a prospective participant, I want the questions collapsed by default and to open only the one I click so that the section stays short and easy to scan.
3. As a prospective participant, I want a "FAQ" link in the navbar so that I can jump straight to the questions.
4. As a screen-reader user, I want each question to be a button that announces whether it is expanded so that I know when an answer is shown.

## Acceptance criteria

All visible text must match exactly, including the trailing full stops in the answers.

### Changes to earlier criteria
- LP3-AC-1: LP-1 **AC-2** is amended: the App renders, in this DOM order, Navbar, Hero (`#tentang`), Agenda (`#agenda`), FAQ (`#faq`), Pendaftaran (`#daftar`), Footer. LP-1 **AC-3** and LP-2 **LP2-AC-20** are amended: the page still has exactly one h1, the level-2 headings now appear in the order `Agenda`, `Pertanyaan Umum`, `Pendaftaran`, and no heading level is skipped. Tests asserting the old order must be updated.
- LP3-AC-2: LP-1 **AC-6** is amended: the navbar (`Navigasi utama`) contains exactly four links, in this order:
  - `Tentang` with `href="#tentang"`
  - `Agenda` with `href="#agenda"`
  - `FAQ` with `href="#faq"`
  - `Daftar` with `href="#daftar"`
  All other LP-1 navbar criteria (AC-4, AC-5, AC-7) still hold. All LP-2 criteria for the registration form still hold unchanged.

### FAQ section rendering (initial state)
- LP3-AC-3: The FAQ is a section element with `id="faq"` containing a level-2 heading with text `Pertanyaan Umum`.
- LP3-AC-4: The section contains exactly four question buttons (role `button`, `type="button"`), in this order, whose accessible names are exactly:
  1. `Apakah workshop ini gratis?`
  2. `Perlu membawa laptop?`
  3. `Apakah ada sertifikat?`
  4. `Bagaimana jika berhalangan hadir?`
- LP3-AC-5: Each question button is wrapped in a level-3 heading whose text equals the question (so `getByRole('heading', { level: 3, name: <question> })` finds it). No other headings are added inside the section.
- LP3-AC-6: The answers paired with the questions are exactly:
  1. `Ya, gratis untuk mahasiswa dan dosen.`
  2. `Ya, untuk sesi hands-on.`
  3. `Ya, sertifikat elektronik dikirim lewat email.`
  4. `Rekaman sesi akan dibagikan ke peserta terdaftar.`
- LP3-AC-7: Initially every question button has `aria-expanded="false"` and no answer is visible. Each answer panel is always present in the DOM but carries the `hidden` attribute while closed (so `expect(getByText(answer)).not.toBeVisible()` passes in jsdom).
- LP3-AC-8: Each question button has `aria-controls` equal to the `id` of its own answer panel; panel ids are unique on the page.

### Accordion interaction
- LP3-AC-9: Clicking a closed question sets its button to `aria-expanded="true"` and makes its answer visible (`toBeVisible()`, no `hidden` attribute).
- LP3-AC-10: Only one answer is open at a time: clicking a different question while one is open opens the clicked one and closes the previously open one (its button returns to `aria-expanded="false"` and its answer gets `hidden` again). Example: click `Apakah workshop ini gratis?`, then `Apakah ada sertifikat?` → only `Ya, sertifikat elektronik dikirim lewat email.` is visible and only the third button has `aria-expanded="true"`.
- LP3-AC-11: Clicking the currently open question again closes it, leaving all four answers hidden and all buttons `aria-expanded="false"`.
- LP3-AC-12: At any moment, the number of buttons with `aria-expanded="true"` is 0 or 1, and the visible answer (if any) belongs to that button.
- LP3-AC-13: Clicking a question does not navigate, submit a form or change the URL hash (buttons are `type="button"`).

### Data and quality
- LP3-AC-14: The FAQ component renders the four PRD question/answer pairs by default. It may accept an optional `items` prop (array of `{ question, answer }`) that replaces the defaults; when given, it renders exactly those items in order with the same accordion behaviour (a test can pass two custom items and check both render and toggle).
- LP3-AC-15: Styling uses the existing design tokens (primary `#4F46E5`, text `#111827`, 12px rounded corners, system fonts); question buttons span the content width, show an open/closed indicator that is decorative only (`aria-hidden="true"`, not part of the button's accessible name), and the section fits 360px wide without horizontal scroll (manual check).
- LP3-AC-16: Unit tests with React Testing Library cover the FAQ component (heading, four questions in order, initial collapsed state, open, switch between questions, close by second click, `aria-controls` linkage, custom `items`), the updated navbar (four links in order) and the App page order / heading order from LP3-AC-1. Tests use `fireEvent` or `@testing-library/user-event` only if already installed; no new dependencies. `npm test` and `npm run build` pass.

## Assumptions

- **Page placement:** the FAQ section is placed between Agenda and Pendaftaran (Navbar, Hero, Agenda, FAQ, Pendaftaran, Footer), following the PRD summary order "memperkenalkan acara, menampilkan agenda, menjawab pertanyaan umum, dan menerima pendaftaran", so questions are answered before the visitor reaches the form.
- **Navbar placement:** the "FAQ" link is inserted between "Agenda" and "Daftar" so the navbar order matches the page order.
- All questions start collapsed; none is open by default.
- Closed answers stay in the DOM with the `hidden` attribute (rather than being unmounted) so `aria-controls` always points to an existing element.
- Each question button sits inside an `h3`, following the WAI-ARIA accordion pattern; this keeps the heading hierarchy valid under the h2 `Pertanyaan Umum`.
- Keyboard support comes from native `<button>` elements (Enter/Space toggle, Tab order); no arrow-key navigation between questions.
- No open/close animation is required; if added, it must not affect the `hidden` state tests rely on.
- The FAQ is its own component; the Navbar change is a small edit to the existing Navbar component.

## Out of scope

- LP-1 and LP-2 work beyond the amended page-order, heading-order and navbar-link criteria above (already built).
- LP-4 Hitung mundur acara (countdown in the hero).
- LP-5 Menu mobile (hamburger menu below 768px).
- Opening multiple answers at once, "expand all / collapse all" controls, search or filtering of questions.
- Deep-linking to a specific question (e.g. `#faq-2` opening that answer) or remembering the open question across reloads.
- Arrow-key / Home / End keyboard navigation between accordion headers.
- Loading FAQ content from a CMS or server.
