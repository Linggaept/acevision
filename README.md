# 🎬 AceVision

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge)
![TMDb API](https://img.shields.io/badge/TMDb-01D277?style=for-the-badge&logo=tmdb&logoColor=white)
![PieSocket](https://img.shields.io/badge/PieSocket%20API-FF6B6B?style=for-the-badge&logo=webrtc&logoColor=white)

AceVision adalah platform web untuk menjelajahi film terbaru, menonton trailer, mendapatkan rekomendasi film, dan berdiskusi dengan komunitas melalui chat realtime.
Dibangun menggunakan Next.js, Axios, Zustand, shadcn/ui, dan PieSocket dengan data dari TMDb.

---

## 🎥 Demo

https://acevision.vercel.app

---

## ✨ Fitur

### 🏠 Home
- Daftar **film populer terbaru** dari TMDb.
- Poster, judul, dan rating singkat.
- Klik film menuju halaman detail.

### 🎬 Detail Film
- Sinopsis, tanggal rilis, genre, rating.
- Trailer video (jika ada).
- **Film serupa** & **rekomendasi film**.

### 🔍 Pencarian
- Search bar di halaman home.
- **Realtime** dengan debounce.

### 📜 Pagination
- Pagination atau tombol **Load More**.

### 🌙 Dark Mode
- Toggle dark mode untuk UI nyaman.

### 🔑 Autentikasi
- Sign in & Sign up.

### 💬 Chat Publik
- Terhubung dengan pengguna lain secara **real-time**.
- Menggunakan **PieSocket API** sebagai backend WebSocket.
- Mendukung pengiriman teks.
- Dilengkapi **notifikasi pengguna bergabung/keluar**.

---

## 🛠 Tech Stack

- **Next.js** – Framework React modern
- **Axios** – HTTP client
- **Zustand** – State management
- **shadcn/ui** – Modern UI components
- **TMDb API** – Sumber data film
- **PieSocket API** – Realtime WebSocket server

---

## 🚀 Instalasi

```bash
# 1. Clone repository
git clone https://github.com/username/acevision.git
cd acevision

# 2. Install dependencies
npm install
# atau
yarn install

# 3. Buat file .env.local (salin dari .env.example)

# 4. Jalankan project
npm run dev
# atau
yarn dev