---
name: mindguard-dev
description: Development workflow, commands, and architecture for the MindGuard AI Emotional Manipulation Detector. Use this skill when the user wants to run, test, edit, or deploy MindGuard.
---

# MindGuard Development Skill

## ⚠️ CRITICAL RULE: Implementation Plan
**You MUST always read and follow the latest approved implementation plan:**
👉 **[implementation_plan.md](file:///D:/unesco/implementation_plan.md)**

Prioritize the architecture, features, and verification steps defined in the implementation plan over any other ad-hoc design decisions.

This skill contains the blueprints, commands, and file locations for the MindGuard Chrome extension and FastAPI backend.

## Project Structure
- `D:/unesco/backend/`:
  - `main.py`: FastAPI server with async Google GenAI (Gemini) SDK integration.
  - `requirements.txt`: Python package dependencies.
- `D:/unesco/frontend/`:
  - `manifest.json`: Chrome Extension Manifest V3 configuration.
  - `content.js`: Content script for reading webpage content and drawing inline highlights.
  - `content.css`: CSS classes for highlight boxes.
  - `background.js`: Extension service worker that controls Chrome Side Panel API.
  - `popup.html` / `popup.js`: Small overlay popup when clicking extension icon.
  - `sidepanel.html` / `sidepanel.js`: Main analysis reporting panel.
  - `assets/`: Folder for extension icons.

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd D:/unesco/backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Konfigurasikan API Key Anda di berkas `.env`:
   Buka berkas `D:/unesco/backend/.env` dan ganti nilai `your_actual_api_key_here` dengan kunci API Gemini Anda yang sebenarnya. Pustaka `python-dotenv` akan memuatnya secara otomatis saat server dijalankan.
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### 2. Frontend Setup (Chrome Extension)
1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle switch in the top-right corner).
4. Click **Load unpacked** (button in the top-left corner).
5. Select the `D:/unesco/frontend/` folder.
6. The extension is now loaded! Pin it to your toolbar for easy access.

## Verification & Testing
- **Local API Endpoint:** `http://localhost:8000/docs` (Swagger UI for manual testing).
- **Test Payload:**
  ```json
  {
    "text": "Jika kita tidak bertindak sekarang, seluruh generasi kita akan hancur dan punah akibat krisis iklim ini! Jangan tunggu besok, belilah produk kami sekarang juga!"
  }
  ```
- **Expected API Response:** Returns JSON matching `MindGuardReport` schema with emotional manipulation details (e.g., Fear Appeal, False Urgency) and critical thinking tips.

## 🗓️ Development Timeline & Workflow
Ikuti alur kerja (step-by-step) berikut untuk menyelesaikan purwarupa (MVP) proyek MindGuard dalam sisa waktu sebelum batas akhir pengumpulan UNESCO Hackathon:

### Fase 1: Persiapan & Infrastruktur Dasar (Selesai)
- [x] Riset ide spesifik sesuai framework MIL UNESCO 2026.
- [x] Memilih MindGuard sebagai proyek utama karena visual impact tinggi & sangat feasible.
- [x] Inisialisasi struktur folder Frontend (Chrome Ext) dan Backend (FastAPI modular).
- [x] Konfigurasi environment & instalasi *dependencies* (termasuk .env).
- [x] Pembuatan server API asinkronus dengan SDK `google-genai`.

### Fase 2: Pengembangan Frontend Ekstensi (Fokus Saat Ini)
- [ ] Menggunakan library *Readability.js* pada `content.js` untuk memfilter teks berita dari iklan dan navbar secara cerdas.
- [ ] Menyempurnakan manipulasi DOM (Document Object Model) agar *inline highlight* warna dapat menyatu dengan aman tanpa merusak struktur web asli.
- [ ] Mendesain antarmuka *Side Panel* (Chrome Side Panel API) dengan estetika premium yang memuat detail analisis per kalimat.
- [ ] Menyelesaikan logika *Popup* UI untuk mengirim teks ke backend FastAPI.

### Fase 3: Integrasi & Penyempurnaan AI
- [ ] Menguji integrasi *end-to-end* komunikasi antara Ekstensi ↔ FastAPI ↔ Gemini API.
- [ ] Melakukan *Prompt Engineering* tahap lanjut dengan skill `senior-prompt-engineer`: Memastikan AI akurat mengenali ragam taktik (rage-bait, bandwagon, ad hominem) dengan false-positive rendah.
- [ ] Menerapkan mekanisme *caching* (misal Redis/local dictionary) di FastAPI agar artikel yang sama tidak diproses ulang untuk menghemat API.

### Fase 4: Polish, Demo, & Submission
- [ ] Melakukan pengujian QA di berbagai portal berita arus utama.
- [ ] Men-generate atau menyusun aset visual final (Logo Ekstensi 128x128px, Screenshot, Banner).
- [ ] Merekam presentasi demo (*Pitch Video*) yang menyoroti betapa kuatnya pengalaman "Mendeteksi secara Inline" bagi pengguna biasa.
- [ ] Dokumentasi akhir dan pengumpulan ke platform UNESCO Hackathon.
