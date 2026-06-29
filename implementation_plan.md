# Rencana Implementasi: Frontend Ekstensi Chrome MindGuard (Fase 2)

Rencana ini berfokus untuk menyulap UI templat dasar ekstensi Chrome Anda saat ini menjadi antarmuka **premium bertaraf UNESCO Hackathon (Sleek Dark Theme, Smooth Animations, Cerdas dalam DOM Highlights)**.

## User Review Required

> [!TIP]
> Kita akan menggunakan Google Fonts (Inter & Outfit) dan SVG Icons kustom di dalam ekstensi. Kita juga akan memanfaatkan fitur **Chrome Side Panel API** terbaru agar detail penjelasan analisis nampak luas dan nyaman dibaca berdampingan dengan halaman berita.
> Kami akan men-generate logo ekstensi premium bertema "Security Shield + Brain Intellect" menggunakan alat pembuat gambar AI dan memuatnya sebagai ikon resmi ekstensi.

---

## Proposed Changes

Perubahan di bawah ini dikelompokkan berdasarkan file frontend:

### 1. Ekstensi Manifest & Background

#### [MODIFY] [manifest.json](file:///D:/unesco/frontend/manifest.json)
- Menambahkan aset ikon kustom (16x16, 48x48, 128x128px) yang di-downscale dari gambar beresolusi tinggi yang di-generate AI.
- Menambahkan izin `scripting` jika diperlukan untuk pembersihan DOM tingkat lanjut.

#### [MODIFY] [background.js](file:///D:/unesco/frontend/background.js)
- Menyederhanakan pembukaan Side Panel saat ikon diklik.
- Menangani komunikasi pesan dua-arah antara halaman web aktif, popup, dan panel samping.

### 2. Antarmuka Popup (`popup.html` & `popup.js`)

#### [MODIFY] [popup.html](file:///D:/unesco/frontend/popup.html)
- **Desain Premium:** Mengubah popup kecil menjadi panel ramping bertema *slate dark-blue* dengan efek transparansi (*glassmorphism*).
- Menambahkan animasi loading (*spinning pulse*) yang estetik saat proses ekstraksi & analisis teks berlangsung.

#### [MODIFY] [popup.js](file:///D:/unesco/frontend/popup.js)
- Mengelola state UI: "Siap Pindai" ➔ "Sedang Mengekstrak Konten" ➔ "Analisis AI Sedang Berjalan" ➔ "Selesai".
- Komunikasi dengan backend FastAPI secara asinkron.

### 3. Antarmuka Panel Samping (`sidepanel.html` & `sidepanel.js`)

#### [MODIFY] [sidepanel.html](file:///D:/unesco/frontend/sidepanel.html)
- **Desain Premium:** 
  - Gradasi latar belakang gelap (*Deep Slate Dark Theme*) dengan teks kontras tinggi.
  - **Manipulation Score Meter:** Menggunakan elemen SVG circular ring yang bergerak dinamis sesuai skor (0-100).
  - Kartu taktik manipulasi dengan border kiri berwarna neon (merah untuk manipulasi berat, jingga untuk sedang).
  - Kolom tips berpikir kritis dengan warna latar belakang biru neon redup yang ramah di mata.

#### [MODIFY] [sidepanel.js](file:///D:/unesco/frontend/sidepanel.js)
- Menerima respons dari backend FastAPI dan memicu penggambaran SVG skor secara dinamis (*animated circle gauge*).
- Scroll otomatis ke kartu taktik tertentu saat pengguna mengklik teks highlight kuning di halaman web asli.

### 4. DOM Highlighter (`content.js` & `content.css`)

#### [MODIFY] [content.js](file:///D:/unesco/frontend/content.js)
- **Ekstraktor Cerdas:** Menyempurnakan pembersihan teks berita (menghindari teks menu, footer, sidebar iklan) sebelum dikirim ke AI.
- **Safe DOM Highlighter:** Algoritma rekursif yang dimodifikasi agar penandaan kalimat manipulasi menggunakan elemen `<mark>` kustom secara mulus tanpa merusak navigasi web asli.

#### [MODIFY] [content.css](file:///D:/unesco/frontend/content.css)
- Efek *highlight* yang elegan (transparan kuning/merah lembut dengan garis bawah putus-putus) serta efek transisi membesar (*scale zoom*) saat kursor diarahkan ke kalimat tersebut.

---

## Verification Plan

### Manual Verification
1. Muat ulang folder ekstensi di `chrome://extensions/`.
2. Klik ikon MindGuard, lalu tekan "Scan Current Page".
3. Pastikan indikator loading berputar estetik.
4. Pastikan panel samping terbuka dan skor manipulasinya berputar mengisi lingkaran (gauge animation).
5. Buka tab berita, klik kalimat yang di-highlight kuning, pastikan panel samping secara mulus bergeser (*scroll*) menyoroti kartu penjelasan yang cocok.
