# 🏆 Ide Proyek Coding-Based untuk UNESCO Youth Hackathon 2026

> **Tema**: *"Play Your Part: Youth Designing the Future of Media and Information Literacy"*
> **Deadline Submisi**: 6 Juli – 16 Agustus 2026
> **Disusun**: 29 Juni 2026

---

## Daftar Isi

1. [Ringkasan Eksekutif](#ringkasan-eksekutif)
2. [Analisis Gap & Peluang](#analisis-gap--peluang)
3. [Ide #1: MindGuard — AI Emotional Manipulation Detector](#ide-1-mindguard--ai-emotional-manipulation-detector)
4. [Ide #2: BubbleBurst — Echo Chamber Visualizer & Escape Tool](#ide-2-bubbleburst--echo-chamber-visualizer--escape-tool)
5. [Ide #3: PreBunk Arena — Inoculation Training Platform](#ide-3-prebunk-arena--inoculation-training-platform)
6. [Ide #4: SourceTracer — News Provenance & Credibility Engine](#ide-4-sourcetracer--news-provenance--credibility-engine)
7. [Perbandingan Ide](#perbandingan-ide)
8. [Rekomendasi Strategi](#rekomendasi-strategi)
9. [Sumber Riset](#sumber-riset)

---

## Ringkasan Eksekutif

Laporan ini berisi **4 ide proyek coding-based** yang dirancang khusus untuk UNESCO Youth Hackathon 2026. Setiap ide:

- ✅ **Berbasis kode** (bukan organisasi, gerakan sosial, atau karya seni)
- ✅ **Mengatasi gap nyata** dalam ekosistem Media and Information Literacy (MIL)
- ✅ **Selaras dengan tema 2026** — merancang masa depan MIL, bukan hanya solusi reaktif
- ✅ **Berbeda dari pemenang 2024 & 2025** — menawarkan sudut pandang baru
- ✅ **Dapat dibangun dalam waktu hackathon** (~6 minggu) dengan MVP yang fungsional

### Pelajaran dari Pemenang Sebelumnya

| Tahun | Pemenang | Pendekatan |
|-------|----------|------------|
| 2024 | MAHW | Aplikasi mobile gamifikasi + AI fact-checking |
| 2024 | MILES | Mini-games untuk pemuda terpinggirkan |
| 2025 | Clickbait (Vietnam) | Board game detektif dengan framework 3C2B |
| 2025 | MIL Point (Indonesia) | Aplikasi mobile gamifikasi + prebunk quiz |
| 2025 | Mentes Libres (Kamerun) | AI verification tools untuk daerah konflik |

**Insight**: Proyek gamifikasi dan aplikasi mobile sudah banyak. Untuk 2026, diperlukan pendekatan yang **lebih visioner dan sistemik** — sesuai pergeseran tema dari "Building Solutions" (2025) ke "Designing the Future" (2026).

---

## Analisis Gap & Peluang

Berdasarkan riset dari World Economic Forum, UNESCO, ISD Global, dan Education Week, berikut gap kritis yang belum diselesaikan oleh teknologi yang ada:

| # | Gap | Deskripsi | Peluang |
|---|-----|-----------|---------|
| 1 | **Psychological Vulnerability Gap** | Tool yang ada fokus pada *fakta*, tetapi mengabaikan *manipulasi emosional* (fear-mongering, rage-bait, false urgency) | Deteksi teknik manipulasi, bukan hanya klaim palsu |
| 2 | **Algorithmic Echo Chamber** | Platform medsos mengurasi konten untuk engagement, membuat evaluasi independen sulit | Visualisasi bubble informasi + alat "melarikan diri" |
| 3 | **Speed Gap** | Misinformasi bermutasi lebih cepat dari kurikulum pendidikan | Pelatihan adaptif real-time berbasis tren |
| 4 | **Transparency Gap** | Kurangnya akses data dari platform medsos untuk melacak kampanye disinformasi | Infrastruktur open-source untuk verifikasi |
| 5 | **Adult Learning Gap** | Kebanyakan program MIL terbatas pada pendidikan formal, meninggalkan orang dewasa rentan | Platform edukasi lifelong learning |

---

## Ide #1: MindGuard — AI Emotional Manipulation Detector

### 🎯 Ringkasan

**MindGuard** adalah browser extension yang mendeteksi **teknik manipulasi emosional** dalam artikel berita dan postingan media sosial. Tidak seperti fact-checker yang menilai *benar/salah*, MindGuard menganalisis *bagaimana* sebuah konten mencoba mempengaruhi emosi pembaca.

> **Track Hackathon**: AI and MIL
> **Gap yang Ditangani**: Psychological Vulnerability Gap

### 🧠 Mengapa Ini Berbeda?

| Tool yang Ada | MindGuard |
|---------------|-----------|
| Fact-checker → *"Klaim ini salah"* | *"Artikel ini menggunakan 3 teknik manipulasi: fear appeal, false dichotomy, dan emotional anchoring"* |
| Binary (benar/salah) | Kontekstual (menjelaskan *bagaimana* kamu dimanipulasi) |
| Cek fakta setelah terpapar | Membangun kesadaran *saat* membaca |

### 🏗️ Arsitektur Teknis

```
┌──────────────────────────────────────────────────────────┐
│                   BROWSER EXTENSION                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐│
│  │Content Script│  │  Popup UI    │  │ Side Panel       ││
│  │(Extractor)   │  │(Score+Alert) │  │(Detailed Report) ││
│  └──────┬──────┘  └──────┬───────┘  └────────┬─────────┘│
│         │                │                    │          │
│         ▼                ▼                    ▼          │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Background Service Worker               │   │
│  │  ┌────────────┐  ┌─────────────┐  ┌───────────┐  │   │
│  │  │Text Parser  │  │Manipulation │  │Result     │  │   │
│  │  │& Segmenter  │  │Classifier   │  │Renderer   │  │   │
│  │  └──────┬─────┘  └──────┬──────┘  └─────┬─────┘  │   │
│  └─────────┼───────────────┼────────────────┼────────┘   │
│            │               │                │            │
└────────────┼───────────────┼────────────────┼────────────┘
             │               │                │
             ▼               ▼                ▼
      ┌─────────────────────────────────────────────┐
      │            BACKEND API (Cloud)               │
      │  ┌──────────┐  ┌───────────┐  ┌───────────┐ │
      │  │LLM API   │  │NLP Engine │  │Analytics  │ │
      │  │(Gemini/  │  │(Sentiment │  │Dashboard  │ │
      │  │ OpenAI)  │  │ + Rhetor.) │  │           │ │
      │  └──────────┘  └───────────┘  └───────────┘ │
      └─────────────────────────────────────────────┘
```

### 📋 Fitur Utama

#### 1. **Manipulation Score** (0-100)
Setiap halaman web yang dibaca pengguna mendapat skor manipulasi secara real-time:
- 🟢 **0-30**: Minimal manipulasi — konten informatif
- 🟡 **31-60**: Manipulasi sedang — beberapa teknik persuasi digunakan
- 🔴 **61-100**: Manipulasi tinggi — konten sangat emosional & bias

#### 2. **Inline Highlighting**
Teks yang mengandung teknik manipulasi di-highlight langsung di halaman web dengan warna berbeda sesuai jenis manipulasi:
- 🔴 **Fear Appeal** — Bahasa yang sengaja membangkitkan ketakutan
- 🟠 **False Dichotomy** — Menyederhanakan masalah menjadi hanya dua pilihan
- 🟡 **Emotional Anchoring** — Menggunakan emosi sebagai titik referensi
- 🟣 **Bandwagon Effect** — "Semua orang melakukan ini..."
- 🔵 **Authority Fallacy** — Menggunakan otoritas yang tidak relevan

#### 3. **Side Panel Explanation**
Panel samping yang menjelaskan *mengapa* teks tertentu dianggap manipulatif, lengkap dengan:
- Nama teknik manipulasi
- Penjelasan sederhana
- Contoh bagaimana teknik ini biasa digunakan
- Tips untuk "menangkal" efeknya

#### 4. **MIL Learning Mode**
Mode edukatif di mana pengguna bisa:
- Mempelajari setiap teknik manipulasi secara mendalam
- Melihat contoh-contoh dari berita nyata (dianonimkan)
- Mengerjakan quiz untuk menguji kemampuan deteksi

### 💻 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Extension Framework | Chrome Extension Manifest V3 / Firefox WebExtension |
| Frontend UI | HTML/CSS/JavaScript (Vanilla) |
| Content Extraction | Readability.js + Custom DOM Parser |
| NLP Processing | Google Gemini API / OpenAI API |
| Sentiment Analysis | Compromise.js + Custom Rhetorical Analyzer |
| Backend | Node.js / Python Flask (lightweight API) |
| Database | SQLite (local) + Firebase (analytics) |

### 🎯 Contoh Alur Penggunaan

```
1. User membuka artikel berita online
2. MindGuard otomatis menganalisis konten halaman
3. Icon extension berubah warna (🟢🟡🔴) sesuai skor
4. Teks manipulatif di-highlight langsung di halaman
5. User klik highlight → muncul penjelasan di side panel:

   ┌─────────────────────────────────────────┐
   │ ⚠️ FEAR APPEAL DETECTED                │
   │                                         │
   │ "Jika kita tidak bertindak sekarang,    │
   │  generasi kita akan hancur..."          │
   │                                         │
   │ 🔍 Teknik ini menggunakan ketakutan     │
   │    untuk mendorong tindakan impulsif    │
   │    tanpa pertimbangan rasional.         │
   │                                         │
   │ 💡 Tips: Tanyakan pada diri sendiri —   │
   │    "Apakah ada bukti konkret untuk      │
   │     klaim ini? Atau ini hanya mencoba   │
   │     membuat saya takut?"               │
   └─────────────────────────────────────────┘
```

### 🌍 Alignment dengan Tema UNESCO 2026

- **"Play Your Part"**: Setiap pengguna aktif berpartisipasi dalam mendeteksi manipulasi — bukan menunggu fact-checker
- **"Designing the Future"**: Membangun infrastruktur literasi emosional digital yang bisa berkembang seiring waktu
- **Visioner**: Menggeser paradigma dari "apakah ini fakta?" ke "bagaimana ini mencoba mempengaruhi saya?"

---

## Ide #2: BubbleBurst — Echo Chamber Visualizer & Escape Tool

### 🎯 Ringkasan

**BubbleBurst** adalah web application yang membantu pengguna **memvisualisasikan gelembung informasi** (echo chamber) mereka dan menyediakan alat untuk "melarikan diri" dari gelembung tersebut secara bertahap.

> **Track Hackathon**: AI and MIL / MIL Education
> **Gap yang Ditangani**: Algorithmic Echo Chamber Gap

### 🧠 Mengapa Ini Berbeda?

Kebanyakan tool MIL mengajarkan "bagaimana mengevaluasi satu konten". BubbleBurst mengambil pendekatan **meta-level** — membantu pengguna memahami *pola keseluruhan* dari apa yang mereka konsumsi, bukan hanya satu artikel.

| Pendekatan Konvensional | BubbleBurst |
|--------------------------|-------------|
| "Apakah artikel ini akurat?" | "Dari 100 artikel yang kamu baca bulan ini, 85% berasal dari perspektif yang sama" |
| Reaktif (per-konten) | Sistemik (pola konsumsi) |
| Teks/fakta saja | Visualisasi data interaktif |

### 🏗️ Arsitektur Teknis

```
┌────────────────────────────────────────────────────────┐
│                    FRONTEND (Web App)                   │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────────┐│
│  │ Dashboard    │ │ Bubble Map   │ │ Diversity        ││
│  │ (Overview)   │ │ (D3.js Viz)  │ │ Recommendations  ││
│  └──────┬──────┘ └──────┬───────┘ └────────┬─────────┘│
│         └───────────────┼──────────────────┘           │
│                         ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │              State Management (React)             │  │
│  └──────────────────────┬───────────────────────────┘  │
└─────────────────────────┼──────────────────────────────┘
                          │ REST API / WebSocket
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Server)                      │
│  ┌────────────┐ ┌──────────────┐ ┌───────────────────┐ │
│  │ Feed       │ │ Bias/Topic   │ │ Recommendation    │ │
│  │ Analyzer   │ │ Classifier   │ │ Engine            │ │
│  │ (Ingester) │ │ (LLM + NLP)  │ │ (Diversity Algo)  │ │
│  └────────────┘ └──────────────┘ └───────────────────┘ │
│  ┌────────────┐ ┌──────────────┐                       │
│  │ News API   │ │ User Profile │                       │
│  │ Aggregator │ │ Manager      │                       │
│  └────────────┘ └──────────────┘                       │
└─────────────────────────────────────────────────────────┘
```

### 📋 Fitur Utama

#### 1. **Bubble Map Visualization**
Peta visual interaktif yang menunjukkan "gelembung informasi" pengguna:
- Diagram jaringan (force-directed graph) di mana setiap node adalah topik/sumber
- Ukuran node = seberapa sering pengguna mengonsumsi konten dari sumber tersebut
- Warna node = spektrum perspektif (kiri-tengah-kanan untuk politik, atau kategori lain)
- Koneksi antar node = seberapa sering sumber-sumber tersebut saling merujuk

```
          ┌──────────────────────────────────────────┐
          │                                          │
          │     🔵🔵🔵                               │
          │    🔵🔵🔵🔵🔵     ← Kamu kebanyakan      │
          │   🔵🔵🔵🔵🔵🔵       membaca dari sini   │
          │    🔵🔵🔵🔵🔵                            │
          │     🔵🔵🔵                               │
          │              🟡🟡                        │
          │               🟡    ← Perspektif ini     │
          │                        jarang kamu baca  │
          │                    🔴                    │
          │                    ← Dan ini hampir      │
          │                       tidak pernah       │
          └──────────────────────────────────────────┘
```

#### 2. **Diversity Score** (0-100)
Skor yang mengukur seberapa beragam diet informasi pengguna:
- **Sumber**: Berapa banyak sumber berbeda yang dikonsumsi?
- **Perspektif**: Apakah ada keseimbangan sudut pandang?
- **Topik**: Apakah ada variasi topik atau hanya satu isu?
- **Format**: Apakah mengonsumsi teks, video, podcast, dsb?

#### 3. **"Escape Route" Recommendations**
Rekomendasi konten yang secara bertahap memperluas gelembung informasi pengguna:
- Bukan langsung konten dari "sisi lawan" (yang bisa menimbulkan reaksi negatif)
- Melainkan konten "bridge" — artikel/sumber yang mengeksplorasi nuansa dan complexity
- Disajikan dalam format yang menarik: "Hari ini, coba baca satu artikel dari perspektif berbeda"

#### 4. **Weekly Digest & Progress Tracker**
Laporan mingguan yang menunjukkan:
- Perubahan dalam keragaman konsumsi informasi
- Tren topik yang dikonsumsi vs. isu penting yang terlewat
- "Achievement badges" untuk mendorong perilaku konsumsi yang lebih sehat

### 💻 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend | React.js / Next.js |
| Visualisasi | D3.js + Canvas API |
| Styling | CSS3 + Framer Motion (animasi) |
| Backend | Node.js + Express |
| AI/NLP | Google Gemini API (klasifikasi topik & bias) |
| News Data | NewsAPI.org / GNews API / RSS Feed Parser |
| Database | PostgreSQL + Redis (cache) |
| Auth | OAuth 2.0 (Google Sign-In) |

### 📥 Metode Input Data

Karena akses API media sosial terbatas, BubbleBurst menggunakan pendekatan kreatif:

1. **Manual URL Paste** — User menempelkan URL artikel yang baru dibaca
2. **Browser History Import** (opsional, privacy-first) — Analisis riwayat browsing secara lokal
3. **RSS Feed Subscription** — User menambahkan RSS feed yang biasa mereka baca
4. **Bookmarks Import** — Analisis bookmark browser

### 🌍 Alignment dengan Tema UNESCO 2026

- **"Play Your Part"**: Mengajak setiap individu aktif mengevaluasi pola konsumsi informasi mereka sendiri
- **"Designing the Future"**: Membangun framework untuk diet informasi yang sehat — konsep yang sangat futuristik
- **Sistemik**: Tidak hanya mengatasi satu hoax, tetapi mengubah cara seluruh ekosistem informasi dikonsumsi

---

## Ide #3: PreBunk Arena — Inoculation Training Platform

### 🎯 Ringkasan

**PreBunk Arena** adalah platform web gamified yang menggunakan teori **inokulasi psikologis** — mengekspos pengguna pada versi "dilemahkan" dari teknik misinformasi *sebelum* mereka menemukannya di dunia nyata. Seperti vaksin, tetapi untuk pikiran.

> **Track Hackathon**: MIL Education
> **Gap yang Ditangani**: Speed Gap + Psychological Vulnerability Gap

### 🧠 Mengapa Ini Berbeda?

| Pendekatan Konvensional | PreBunk Arena |
|--------------------------|---------------|
| **Debunking** — Mengoreksi setelah terpapar | **Prebunking** — Membangun imunitas sebelum terpapar |
| Pasif (baca artikel edukasi) | Aktif (role-play sebagai pembuat hoax!) |
| Konten statis | Skenario AI-generated berdasarkan tren real-time |
| "Jangan percaya hoax" | "Begini cara hoax dibuat — sekarang kamu kebal" |

### 🔬 Basis Ilmiah

Teori inokulasi psikologis telah terbukti efektif dalam penelitian:
- **Cambridge University** — game "Bad News" mengurangi kerentanan terhadap misinformasi hingga 21%
- **Google Jigsaw** — kampanye prebunking di YouTube mengurangi kerentanan 5-10%
- **UNESCO** sendiri mempromosikan pendekatan prebunking dalam framework MIL terbaru

### 🏗️ Arsitektur Teknis

```
┌──────────────────────────────────────────────────┐
│              FRONTEND (Web App)                   │
│  ┌────────────┐ ┌──────────┐ ┌────────────────┐ │
│  │ Arena      │ │ Workshop │ │ Leaderboard &  │ │
│  │ (Game UI)  │ │ (Create  │ │ Progress       │ │
│  │            │ │  Mode)   │ │ Dashboard      │ │
│  └─────┬──────┘ └────┬─────┘ └───────┬────────┘ │
│        └──────────────┼───────────────┘          │
│                       ▼                          │
│  ┌──────────────────────────────────────────┐    │
│  │           Game Engine (JS)                │    │
│  │  ┌───────────┐ ┌───────────┐ ┌────────┐  │    │
│  │  │ Scenario  │ │ Scoring   │ │ Timer  │  │    │
│  │  │ Renderer  │ │ System    │ │ System │  │    │
│  │  └───────────┘ └───────────┘ └────────┘  │    │
│  └──────────────────────┬───────────────────┘    │
└─────────────────────────┼────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────┐
│                 BACKEND (Server)                  │
│  ┌────────────────┐  ┌──────────────────────┐    │
│  │ Scenario       │  │ Trending Misinfo     │    │
│  │ Generator      │  │ Tracker              │    │
│  │ (LLM-Powered)  │  │ (RSS + News API)     │    │
│  └────────────────┘  └──────────────────────┘    │
│  ┌────────────────┐  ┌──────────────────────┐    │
│  │ Adaptive       │  │ User Progress        │    │
│  │ Difficulty     │  │ & Spaced Repetition  │    │
│  │ Engine         │  │ Manager              │    │
│  └────────────────┘  └──────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### 📋 Fitur Utama

#### 1. **The Arena** — Mode Pertahanan
Pengguna dihadapkan pada konten yang *mungkin* mengandung manipulasi/misinformasi dan harus mengidentifikasi teknik yang digunakan:

```
┌─────────────────────────────────────────────────┐
│  📰 ROUND 3 / 10           ⏱️ 45 detik         │
│─────────────────────────────────────────────────│
│                                                 │
│  "Studi terbaru menunjukkan bahwa 97% ahli     │
│   setuju: produk X berbahaya bagi anak-anak.    │
│   Jangan tunggu sampai terlambat!"              │
│                                                 │
│  Teknik manipulasi apa yang digunakan?          │
│                                                 │
│  [A] 🎯 Appeal to Authority + Fear Appeal       │
│  [B] 🎭 Bandwagon Effect + Ad Hominem           │
│  [C] 📊 Cherry Picking + False Urgency          │
│  [D] 🔄 Whataboutism + Straw Man                │
│                                                 │
│─────────────────────────────────────────────────│
│  🏆 Score: 240   ❤️ Lives: 3   🔥 Streak: 5    │
└─────────────────────────────────────────────────┘
```

#### 2. **The Workshop** — Mode Serangan (Buat Hoax!)
Pengguna *berperan sebagai pembuat misinformasi* untuk memahami teknik dari sisi pembuat:
- Pilih topik viral saat ini
- Pilih teknik manipulasi yang akan digunakan
- Tulis konten misinformasi (dalam lingkungan aman)
- Sistem mengevaluasi seberapa "meyakinkan" kontennya
- Mendapat penjelasan edukatif tentang mengapa teknik itu efektif

> **Catatan etis**: Semua konten dibuat dalam sandbox tertutup dan diberi label jelas sebagai latihan edukatif.

#### 3. **Daily Challenge** — Misi Harian
- Setiap hari, sistem mengambil tren misinformasi terkini (dari Google Trends, RSS, News API)
- AI generate skenario baru berdasarkan tren tersebut
- Pengguna mengerjakan tantangan harian yang selalu *fresh* dan relevan
- Sistem spaced repetition memastikan teknik yang belum dikuasai muncul lebih sering

#### 4. **Skill Tree & Progression**
Sistem progression RPG-style:

```
LEVEL 1: Rookie Reader
├── Identify Fear Appeal ✅
├── Identify False Dichotomy ✅
└── Identify Emotional Anchoring ⬜

LEVEL 2: Critical Thinker
├── Detect Cherry-Picked Statistics ⬜
├── Recognize Appeal to Authority ⬜
└── Spot Misleading Headlines ⬜

LEVEL 3: MIL Guardian
├── Analyze Multi-Technique Manipulation ⬜
├── Evaluate Source Credibility ⬜
└── Counter-Argue Misinformation ⬜

LEVEL 4: MIL Master
├── Generate Counter-Narratives ⬜
├── Teach Others (Peer Mentoring) ⬜
└── Real-World Challenge Completion ⬜
```

### 💻 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend | HTML5 + CSS3 + Vanilla JavaScript (atau React) |
| Game Engine | Custom JS Game Logic + Canvas API |
| Animasi | GSAP / Lottie |
| Backend | Python (FastAPI) atau Node.js (Express) |
| AI Scenario Generation | Google Gemini API |
| Trending Data | Google Trends API + NewsAPI + RSS Parser |
| Spaced Repetition | Custom SM-2 Algorithm |
| Database | PostgreSQL + Redis |
| Deployment | Vercel (frontend) + Railway/Render (backend) |

### 🌍 Alignment dengan Tema UNESCO 2026

- **"Play Your Part"**: Literally "bermain" — gamifikasi membuat MIL menjadi partisipatif dan menyenangkan
- **"Designing the Future"**: Prebunking adalah pendekatan masa depan literasi media — proaktif, bukan reaktif
- **Berbasis riset ilmiah**: Teori inokulasi adalah pendekatan yang didukung UNESCO sendiri

---

## Ide #4: SourceTracer — News Provenance & Credibility Engine

### 🎯 Ringkasan

**SourceTracer** adalah **open-source API + dashboard** yang memungkinkan siapa saja untuk melacak asal-usul (provenance) sebuah berita, menilai kredibilitas sumber, dan melihat bagaimana sebuah narasi menyebar lintas platform.

> **Track Hackathon**: AI and MIL / Open Track
> **Gap yang Ditangani**: Transparency Gap + Implementation Fragmentation

### 🧠 Mengapa Ini Berbeda?

SourceTracer bukan *produk akhir* — ini adalah **infrastruktur** yang bisa digunakan oleh developer, jurnalis, dan organisasi lain untuk membangun tool mereka sendiri. Ini menjawab tema "Designing the Future" dengan membangun *fondasi* untuk ekosistem MIL.

| Tool yang Ada | SourceTracer |
|---------------|-------------|
| Produk tertutup (NewsGuard, dll) | Open-source, gratis untuk semua |
| Menilai satu halaman | Melacak bagaimana narasi menyebar lintas sumber |
| Hanya end-user | API untuk developer + dashboard untuk publik |
| Satu perspektif | Agregasi multi-sumber |

### 🏗️ Arsitektur Teknis

```
┌──────────────────────────────────────────────────────┐
│                   PUBLIC DASHBOARD                    │
│  ┌────────────┐ ┌──────────────┐ ┌────────────────┐ │
│  │ Source      │ │ Narrative    │ │ Credibility    │ │
│  │ Profile     │ │ Spread Map   │ │ Report         │ │
│  └─────┬──────┘ └──────┬───────┘ └───────┬────────┘ │
└────────┼───────────────┼─────────────────┼──────────┘
         │               │                 │
         ▼               ▼                 ▼
┌──────────────────────────────────────────────────────┐
│                    REST API (Public)                   │
│  ┌────────────────┐  ┌────────────────────────┐      │
│  │ /api/check     │  │ /api/source/{domain}   │      │
│  │ (URL analysis) │  │ (Source profile)        │      │
│  ├────────────────┤  ├────────────────────────┤      │
│  │ /api/trace     │  │ /api/narrative/{id}    │      │
│  │ (Provenance)   │  │ (Spread tracking)      │      │
│  └────────┬───────┘  └───────────┬────────────┘      │
│           └──────────┬───────────┘                    │
│                      ▼                                │
│  ┌──────────────────────────────────────────────┐    │
│  │              ANALYSIS ENGINE                   │    │
│  │  ┌───────────┐ ┌──────────┐ ┌──────────────┐ │    │
│  │  │ Web       │ │ NLP      │ │ Credibility  │ │    │
│  │  │ Crawler   │ │ Pipeline │ │ Scorer       │ │    │
│  │  └───────────┘ └──────────┘ └──────────────┘ │    │
│  │  ┌───────────┐ ┌──────────┐ ┌──────────────┐ │    │
│  │  │ Claim     │ │ Source   │ │ Narrative    │ │    │
│  │  │ Extractor │ │ Graph DB │ │ Tracker      │ │    │
│  │  └───────────┘ └──────────┘ └──────────────┘ │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### 📋 Fitur Utama

#### 1. **Source Credibility Profile**
Untuk setiap domain berita, SourceTracer membangun profil komprehensif:

```json
{
  "domain": "example-news.com",
  "credibility_score": 72,
  "factors": {
    "transparency": 65,
    "correction_history": 80,
    "source_diversity": 70,
    "fact_check_record": 75,
    "ownership_clarity": 68
  },
  "classification": "Generally Reliable - Some Bias",
  "bias_direction": "center-left",
  "content_type": "news_outlet",
  "country": "ID",
  "last_updated": "2026-06-28"
}
```

#### 2. **Narrative Spread Map**
Visualisasi bagaimana sebuah narasi/klaim menyebar lintas sumber dan waktu:
- Timeline kapan masing-masing sumber mulai membahas narasi tersebut
- Graph yang menunjukkan sumber mana yang mengutip sumber mana
- Identifikasi "Patient Zero" — sumber pertama yang mempublikasikan narasi

#### 3. **Claim Verification API**
Endpoint publik yang bisa digunakan developer:
```
GET /api/check?url=https://some-article.com/story

Response:
{
  "url": "https://some-article.com/story",
  "source_credibility": 72,
  "claims_found": 3,
  "claims": [
    {
      "text": "Studi menunjukkan 90% pengguna...",
      "verification_status": "unverified",
      "similar_claims": ["url1", "url2"],
      "original_source": "url_original"
    }
  ]
}
```

#### 4. **Open-Source & Extensible**
- Kode di-release di GitHub dengan lisensi MIT
- Dokumentasi API lengkap
- SDK untuk JavaScript dan Python
- Plugin templates untuk WordPress, browser extension, dll.

### 💻 Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Frontend Dashboard | Next.js + D3.js |
| API Server | Python (FastAPI) |
| Web Crawling | Scrapy + BeautifulSoup |
| NLP & Claims | Google Gemini API + spaCy |
| Graph Database | Neo4j (relasi antar sumber) |
| Relational DB | PostgreSQL |
| Cache | Redis |
| Search Engine | Elasticsearch (pencarian klaim) |
| Deployment | Docker + Docker Compose |
| CI/CD | GitHub Actions |

### 🌍 Alignment dengan Tema UNESCO 2026

- **"Designing the Future"**: Membangun *infrastruktur* untuk masa depan MIL, bukan hanya satu produk
- **"Play Your Part"**: Mengundang seluruh komunitas developer untuk berkontribusi — open-source
- **Ecosystem approach**: Sejalan dengan rekomendasi WEF & UNESCO untuk pendekatan "whole-of-society"

---

## Perbandingan Ide

| Kriteria | MindGuard | BubbleBurst | PreBunk Arena | SourceTracer |
|----------|-----------|-------------|---------------|--------------|
| **Track** | AI and MIL | AI and MIL / Education | MIL Education | AI and MIL / Open |
| **Kompleksitas** | ⭐⭐⭐ Sedang | ⭐⭐⭐ Sedang | ⭐⭐⭐⭐ Tinggi | ⭐⭐⭐⭐⭐ Sangat Tinggi |
| **Wow Factor** | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 | 🔥🔥🔥🔥🔥 | 🔥🔥🔥 |
| **Keunikan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Feasibility (6 minggu)** | ✅ Sangat layak | ✅ Layak | ✅ Layak | ⚠️ Perlu scope down |
| **UNESCO Alignment** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Basis Ilmiah** | Kuat (rhetorical analysis) | Kuat (filter bubble theory) | Sangat Kuat (inoculation theory) | Kuat (provenance tracking) |
| **Potensi Dampak** | Individu | Individu | Individu + Komunitas | Ekosistem |

---

## Rekomendasi Strategi

### 🥇 Rekomendasi #1: **MindGuard** (Browser Extension)

**Alasan utama:**
- **Paling unik** — Belum ada pemenang hackathon UNESCO yang fokus pada deteksi manipulasi emosional
- **Wow factor tinggi** — inline highlighting langsung di halaman web sangat visual & impresif
- **Sangat feasible** — Browser extension bisa dibangun dalam 4-6 minggu
- **Alignment sempurna** — Menggeser paradigma MIL dari fakta ke psikologi

### 🥈 Rekomendasi #2: **PreBunk Arena** (Gamified Platform)

**Alasan utama:**
- **Basis ilmiah terkuat** — Teori inokulasi didukung Cambridge University & Google Jigsaw
- **UNESCO-friendly** — UNESCO aktif mempromosikan prebunking
- **Engagement tinggi** — Gamifikasi terbukti meningkatkan partisipasi
- **Konten selalu fresh** — AI-generated scenarios berdasarkan tren real-time

### 💡 Strategi Hybrid: **MindGuard + PreBunk Arena**

Ide paling kuat adalah **menggabungkan keduanya**:
1. **MindGuard** sebagai *defensive tool* — mendeteksi manipulasi saat browsing
2. **PreBunk Arena** sebagai *training ground* — membangun imunitas secara proaktif
3. Keduanya saling melengkapi: latihan di Arena meningkatkan kemampuan mengenali alert dari MindGuard

---

## Sumber Riset

| # | Sumber | URL |
|---|--------|-----|
| 1 | UNESCO Youth Hackathon 2026 | https://www.unesco.org/en/articles/unesco-youth-hackathon-2026?hub=750 |
| 2 | UNESCO Hackathon 2025 Winners | https://www.unesco.org/en/articles/global-youth-lead-way-media-and-information-literacy-meet-unesco-hackathon-2025-winners?hub=750 |
| 3 | UNESCO Hackathon 2024 Winners | https://www.unesco.org/en/articles/winners-unescos-youth-hackathon-2024-shape-future-media-and-information-literacy |
| 4 | vera.ai (EU Fact-Check Project) | https://www.veraai.eu/ |
| 5 | Full Fact AI | https://fullfact.org/ai/ |
| 6 | Skeptik - LLM Logical Fallacy Extension | https://dl.acm.org/doi/full/10.1145/3766891 |
| 7 | WEF - Rethinking Media Literacy 2025 | https://reports.weforum.org/docs/WEF_Rethinking_Media_Literacy_2025.pdf |
| 8 | ISD - Ecosystem Model for Information Integrity | https://www.isdglobal.org/publication/rethinking-media-literacy-a-new-ecosystem-model-for-information-integrity/ |
| 9 | UNESCO MIL Policy Gaps Brief | https://www.unesco.org/en/articles/new-unesco-issue-brief-reveals-global-gaps-media-and-information-literacy-policies-and-education |
| 10 | Education Week - Media Literacy vs Misinformation | https://www.edweek.org/teaching-learning/why-media-literacy-efforts-are-failing-to-keep-up-with-misinformation/2026/02 |
| 11 | NewsGuard AI Tracking Center | https://www.newsguardtech.com/special-reports/ai-tracking-center |
| 12 | Facticity AI Chrome Extension | https://chromewebstore.google.com/detail/facticity-ai-fact-checker/mlackneplpmmomaobipjjpebhgcgmocp |
| 13 | VeriTrust (Devpost) | https://devpost.com/software/veritrust |
| 14 | News Literacy Project - Checkology | https://newslit.org/our-checkology-virtual-classroom/ |

---

> **Catatan**: Laporan ini disusun pada 29 Juni 2026. Deadline submisi hackathon adalah **16 Agustus 2026** — masih ada waktu ~7 minggu untuk membangun MVP.
> 
> Dibuat dengan bantuan riset mendalam menggunakan sumber-sumber terpercaya dari UNESCO, World Economic Forum, dan komunitas akademis.
