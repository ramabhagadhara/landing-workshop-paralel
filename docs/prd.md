# PRD - Landing Page Workshop Komputasi Paralel

# Ringkasan
Landing page satu halaman untuk acara Workshop Komputasi Paralel 2026 yang diadakan ParaLab, Program Studi Informatika. Halaman ini memperkenalkan acara, menampilkan agenda, menjawab pertanyaan umum, dan menerima pendaftaran peserta. Pekerjaan dipecah menjadi beberapa tiket kecil yang dikerjakan satu per satu oleh pipeline multi-agent SDLC.
# Tujuan
- Calon peserta langsung paham acara apa, kapan, dan di mana dalam satu layar pertama.
- Calon peserta bisa mendaftar tanpa meninggalkan halaman.
- Setiap tiket bisa dikerjakan, diuji, dan di-review secara terpisah lalu digabung bertahap.
# Non-tujuan
- Tidak ada backend, database, atau login. Data pendaftaran tidak dikirim ke server.
- Tidak ada CMS; konten ditulis langsung di kode.
- Tidak ada pembayaran atau tiket berbayar.
# Pengguna
- Mahasiswa dan dosen yang tertarik dengan komputasi paralel dan multi-agent AI.
- Panitia yang membagikan tautan halaman ini.
# Stack dan gaya
- React 18 + Vite, JavaScript (JSX). Test dengan Vitest dan React Testing Library, tanpa browser.
- Satu halaman (single page); navigasi memakai anchor link ke id bagian, misalnya #agenda.
- Warna: primer #4F46E5 (indigo), aksen #F59E0B (amber), teks #111827, latar #F9FAFB, latar gelap footer #1F2937.
- Font: system font stack (tanpa font eksternal). Sudut membulat 12px, tampilan bersih dan lega.
- Responsif: nyaman dibaca di lebar 360px sampai 1440px tanpa scroll horizontal.
- Bahasa konten: Indonesia.
# Kebutuhan non-fungsional
- Aksesibilitas dasar: satu h1 per halaman, urutan heading benar, semua tombol dan link punya teks yang jelas, form memakai label.
- Setiap komponen punya unit test yang mengecek teks, link, dan interaksi sesuai kriteria penerimaan.
- npm run build dan npm test harus lulus.
- Tidak memakai library UI tambahan selain React.
# Tiket
## LP-1 Halaman dasar: navbar, hero, agenda, footer
Prioritas: tinggi. Dipakai untuk demo end-to-end.
Membangun kerangka landing page beserta bagian-bagian statisnya.
Kriteria penerimaan:
- Judul tab browser: "Workshop Komputasi Paralel 2026".
- Navbar di bagian atas berisi teks logo "ParaLab Workshop" dan tiga link: "Tentang" ke #tentang, "Agenda" ke #agenda, "Daftar" ke #daftar. Elemen navigasi punya label aksesibilitas "Navigasi utama".
- Hero (bagian dengan id tentang) berisi heading level 1 "Workshop Komputasi Paralel 2026", subjudul "Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.", info "Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer", dan tombol berupa link "Daftar Sekarang" ke #daftar.
- Bagian Agenda (id agenda) berisi heading level 2 "Agenda" dan daftar empat sesi, masing-masing menampilkan jam dan judul: "08.30 – 09.00" Registrasi dan pembukaan; "09.00 – 10.30" Dasar komputasi paralel dan terdistribusi; "10.45 – 12.00" Multi-agent AI untuk otomasi SDLC; "13.00 – 15.00" Hands-on: membangun pipeline agent paralel.
- Bagian Pendaftaran sementara (id daftar) berisi heading level 2 "Pendaftaran" dan teks "Pendaftaran dibuka 1 November 2026." Bagian ini akan diganti form di LP-2.
- Footer berisi teks "© 2026 ParaLab · Program Studi Informatika" dan link email "paralab@kampus.ac.id" ke mailto:paralab@kampus.ac.id.
- Urutan bagian di halaman: Navbar, Hero, Agenda, Pendaftaran, Footer.
## LP-2 Form pendaftaran dengan validasi
Prioritas: tinggi.
Mengganti bagian Pendaftaran sementara dengan form.
Kriteria penerimaan:
- Field: "Nama lengkap" (wajib, 3 sampai 80 karakter setelah spasi dibuang), "Email" (format email valid), "NIM" (tepat 10 digit angka), "Sesi" (pilihan "Offline" atau "Online", default "Offline"). Tombol "Kirim Pendaftaran".
- Validasi saat tombol ditekan. Pesan error tampil di bawah field: "Nama wajib diisi (3–80 karakter).", "Format email tidak valid.", "NIM harus 10 digit angka."
- Jika valid: form diganti pesan "Terima kasih, <nama>! Pendaftaranmu sudah kami terima." Data tidak dikirim ke server; komponen menerima callback opsional onSubmit berisi data form.
- Logika validasi dipisah ke fungsi murni agar bisa diuji tanpa render.
## LP-3 FAQ accordion
Prioritas: sedang.
Kriteria penerimaan:
- Bagian FAQ (id faq) dengan heading level 2 "Pertanyaan Umum" dan empat pertanyaan: "Apakah workshop ini gratis?" (Ya, gratis untuk mahasiswa dan dosen.), "Perlu membawa laptop?" (Ya, untuk sesi hands-on.), "Apakah ada sertifikat?" (Ya, sertifikat elektronik dikirim lewat email.), "Bagaimana jika berhalangan hadir?" (Rekaman sesi akan dibagikan ke peserta terdaftar.).
- Setiap pertanyaan adalah tombol dengan aria-expanded. Klik membuka jawabannya; hanya satu jawaban terbuka pada satu waktu; klik lagi menutupnya.
- Navbar mendapat link tambahan "FAQ" ke #faq.
## LP-4 Hitung mundur acara
Prioritas: rendah.
Kriteria penerimaan:
- Di hero tampil "Acara dimulai dalam X hari Y jam Z menit" menuju 14 November 2026 pukul 08.30 WIB.
- Saat waktu acara sudah lewat, tampil "Acara sedang berlangsung atau sudah selesai."
- Waktu sekarang bisa disuntikkan (prop atau parameter) agar test deterministik; tampilan diperbarui setiap menit.
## LP-5 Menu mobile
Prioritas: rendah.
Kriteria penerimaan:
- Pada lebar di bawah 768px link navbar disembunyikan dan muncul tombol dengan label aksesibilitas "Buka menu".
- Tombol mengubah aria-expanded dan menampilkan atau menyembunyikan daftar link; labelnya berganti menjadi "Tutup menu" saat terbuka.
- Mengklik salah satu link menutup menu.
# Di luar cakupan
- Hosting dan domain.
- Analitik, cookie banner, dan multi-bahasa.
- Pengiriman email konfirmasi pendaftaran.
