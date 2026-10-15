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
- AC-2: Rendering the root App component produces, in this DOM order: Navbar, Hero (`#tentang`), Agenda (`#agenda`), Pendaftaran (`#daftar`), Footer.
- AC-3: The rendered App contains exactly one heading of level 1, and the level-2 headings appear in the order "Agenda", "Pendaftaran". No heading levels are skipped (no h3 without a preceding h2, etc.).

### Navbar
- AC-4: The navbar is rendered as a navigation landmark (`role="navigation"`, i.e. a `<nav>` element) with the accessible name `Navigasi utama` (`getByRole('navigation', { name: 'Navigasi utama' })` finds it).
- AC-5: The navbar displays the logo text `ParaLab Workshop`.
- AC-6: The navbar contains exactly three links, in this order:
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
- AC-19: It shows the text `Pendaftaran dibuka 1 November 2026.`
- AC-20: It contains no form fields (the form arrives in LP-2).

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
