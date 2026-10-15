# landing-workshop-paralel

Landing page satu halaman untuk **Workshop Komputasi Paralel 2026**, yang diselenggarakan oleh ParaLab, Program Studi Informatika. Repositori ini mengerjakan **tiket LP-1 dari PRD**: kerangka halaman statis berbahasa Indonesia yang berisi navbar, hero, agenda, bagian pendaftaran (masih placeholder), dan footer. Tiket berikutnya (LP-2 formulir, LP-3 FAQ, LP-4 hitung mundur, LP-5 menu mobile) akan dibangun di atas kerangka ini.

**Stack:** React 18 + Vite 5 (JavaScript/JSX, ES modules). Pengujian memakai Vitest 2, React Testing Library, dan jest-dom di lingkungan jsdom. Dependensi runtime hanya `react` dan `react-dom`.

## Modul

Setiap modul adalah komponen React tanpa props di `src/components/<Modul>.jsx` (beserta file `.css` dengan nama yang sama). Tesnya ada di `tests/<Modul>.test.jsx`.

- **Navbar**: `<nav aria-label="Navigasi utama">` berisi logo "ParaLab Workshop" dan tiga tautan, yaitu Tentang, Agenda, dan Daftar (`#tentang`, `#agenda`, `#daftar`).
- **Hero**: `<section id="tentang">` berisi judul h1, subjudul, info tanggal/lokasi, dan tautan CTA "Daftar Sekarang" ke `#daftar`.
- **Agenda**: `<section id="agenda">` berisi h2 "Agenda" dan daftar empat sesi. Setiap sesi menampilkan waktu dan judulnya.
- **Pendaftaran**: `<section id="daftar">` berisi h2 "Pendaftaran" dan teks "Pendaftaran dibuka 1 November 2026.". Belum ada formulir karena formulir masuk di LP-2.
- **Footer**: `<footer>` berisi teks hak cipta dan tautan email `paralab@kampus.ac.id`.
- **App**: menyusun Navbar, `<main>` (berisi Hero, Agenda, Pendaftaran), lalu Footer, dalam urutan itu.

Token desain (warna, radius 12px, font sistem) didefinisikan sebagai CSS custom properties di `src/index.css`.

## Instalasi dan menjalankan

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (biasanya `http://localhost:5173`). Untuk membuat build produksi lalu melihat pratinjaunya:

```bash
npm run build
npm run preview
```

## Menjalankan tes

```bash
npm test
```

Tes berjalan di jsdom tanpa browser, jaringan, atau server. Perintah yang sama berlaku di PowerShell.
