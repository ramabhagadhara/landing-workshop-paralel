# landing-workshop-paralel

Landing page satu halaman untuk **Workshop Komputasi Paralel 2026**, yang diselenggarakan oleh ParaLab, Program Studi Informatika. **Tiket LP-1** menyediakan kerangka halaman statis berbahasa Indonesia: navbar, hero, agenda, bagian pendaftaran, dan footer. **Tiket LP-2** mengganti placeholder pendaftaran dengan formulir pendaftaran di sisi klien (nama, email, NIM, sesi) yang divalidasi saat dikirim, menampilkan pesan error berbahasa Indonesia, dan menampilkan ucapan terima kasih jika data valid. Tidak ada data yang dikirim ke server. **Tiket LP-3** menambahkan bagian FAQ "Pertanyaan Umum" berbentuk accordion (empat pertanyaan, paling banyak satu jawaban terbuka) dan tautan "FAQ" di navbar. Tiket berikutnya (LP-4 hitung mundur, LP-5 menu mobile) belum dikerjakan.

**Stack:** React 18 + Vite 5 (JavaScript/JSX, ES modules). Pengujian memakai Vitest 2, React Testing Library, dan jest-dom di lingkungan jsdom. Dependensi runtime hanya `react` dan `react-dom`. Validasi dan accordion ditulis sendiri, tanpa library formulir atau UI.

## Modul

Kode modul ada di `src/components/` (komponen `.jsx` beserta file `.css` dengan nama yang sama), dan tesnya ada di `tests/<Modul>.test.jsx`. Semua komponen tidak menerima props, kecuali `Pendaftaran` dan `Faq`.

- **Navbar** (LP-1, diubah di LP-3): `<nav aria-label="Navigasi utama">` berisi logo "ParaLab Workshop" dan empat tautan, yaitu Tentang, Agenda, FAQ, dan Daftar (`#tentang`, `#agenda`, `#faq`, `#daftar`).
- **Hero** (LP-1): `<section id="tentang">` berisi judul h1, subjudul, info tanggal/lokasi, dan tautan CTA "Daftar Sekarang" ke `#daftar`.
- **Agenda** (LP-1): `<section id="agenda">` berisi h2 "Agenda" dan daftar empat sesi. Setiap sesi menampilkan waktu dan judulnya.
- **Faq** (LP-3, baru): `<section id="faq">` berisi h2 "Pertanyaan Umum" dan accordion empat pertanyaan. Setiap pertanyaan adalah `<button type="button">` di dalam h3 dengan `aria-expanded` dan `aria-controls`. Jawaban yang tertutup tetap ada di DOM dengan atribut `hidden`. Komponen ini menerima prop opsional `items` dan juga mengekspor `FAQ_ITEMS`.
- **validatePendaftaran** (LP-2): fungsi murni di `validatePendaftaran.js` (tanpa React/DOM) yang menerima `{ nama, email, nim, sesi }` dan mengembalikan objek error. Objek kosong `{}` berarti data valid.
- **Pendaftaran** (LP-1, diubah di LP-2): `<section id="daftar">` berisi h2 "Pendaftaran" dan formulir (Nama lengkap, Email, NIM, radio Sesi Offline/Online, tombol "Kirim Pendaftaran"). Jika data valid, formulir diganti pesan `role="status"` "Terima kasih, <nama>! Pendaftaranmu sudah kami terima.". Komponen ini menerima prop opsional `onSubmit(data)`.
- **Footer** (LP-1): `<footer>` berisi teks hak cipta dan tautan email `paralab@kampus.ac.id`.
- **App** (LP-1, diubah di LP-3): menyusun Navbar, `<main>` (berisi Hero, Agenda, Faq, Pendaftaran), lalu Footer, dalam urutan itu. Urutan h2 di halaman: Agenda, Pertanyaan Umum, Pendaftaran.

Token desain (warna, radius 12px, font sistem) didefinisikan sebagai CSS custom properties di `src/index.css`.

## Aturan validasi (LP-2)

Semua nilai di-trim sebelum diperiksa. Validasi hanya berjalan saat formulir dikirim.

| Field | Aturan | Pesan error |
|---|---|---|
| `nama` | panjang 3 sampai 80 karakter | `Nama wajib diisi (3–80 karakter).` |
| `email` | cocok dengan `^[^\s@]+@[^\s@]+\.[^\s@]+$` | `Format email tidak valid.` |
| `nim` | tepat 10 digit angka | `NIM harus 10 digit angka.` |
| `sesi` | tidak divalidasi (`Offline` / `Online`) | - |

## FAQ accordion (LP-3)

| Pertanyaan | Jawaban |
|---|---|
| Apakah workshop ini gratis? | Ya, gratis untuk mahasiswa dan dosen. |
| Perlu membawa laptop? | Ya, untuk sesi hands-on. |
| Apakah ada sertifikat? | Ya, sertifikat elektronik dikirim lewat email. |
| Bagaimana jika berhalangan hadir? | Rekaman sesi akan dibagikan ke peserta terdaftar. |

Saat halaman dimuat, semua pertanyaan tertutup. Mengklik pertanyaan yang tertutup akan membukanya dan menutup pertanyaan lain yang sedang terbuka. Mengklik pertanyaan yang sedang terbuka akan menutupnya. Ikon +/− hanya dekoratif (`aria-hidden="true"`).

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

### Contoh pemakaian

```js
import validatePendaftaran from './src/components/validatePendaftaran.js';

validatePendaftaran({ nama: 'Al', email: 'budi@kampus', nim: '2201234567', sesi: 'Offline' });
// { nama: 'Nama wajib diisi (3–80 karakter).', email: 'Format email tidak valid.' }
```

```jsx
<Pendaftaran onSubmit={(data) => console.log(data)} />
// setelah submit yang valid:
// { nama: 'Budi Santoso', email: 'budi@kampus.ac.id', nim: '2201234567', sesi: 'Online' }
```

```jsx
import Faq, { FAQ_ITEMS } from './src/components/Faq.jsx';

<Faq />                                                    // empat pertanyaan bawaan (FAQ_ITEMS)
<Faq items={[{ question: 'Q1?', answer: 'A1.' }]} />       // daftar kustom menggantikan bawaan
```

`App` merender `<Pendaftaran />` tanpa `onSubmit` dan `<Faq />` tanpa `items`, jadi data pendaftaran tidak dikirim ke mana pun dan FAQ memakai isi bawaan.

## Menjalankan tes

```bash
npm test
```

Tes berjalan di jsdom tanpa browser, jaringan, atau server. Perintah yang sama berlaku di PowerShell.
