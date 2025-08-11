# 🎬 AceVision

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=react&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge)
![TMDb API](https://img.shields.io/badge/TMDb-01D277?style=for-the-badge&logo=tmdb&logoColor=white)

AceVision adalah platform web untuk menjelajahi film terbaru, menonton trailer, dan mendapatkan rekomendasi film.  
Dibangun menggunakan **Next.js**, **Axios**, **Zustand**, dan **shadcn/ui** dengan data dari [TMDb](https://www.themoviedb.org/).

---

## 🎥 Demo

![AceVision Demo](docs/demo/acevision-demo.gif)

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
- **Akun default**:
Email : john@mail.com
Password : changeme


---

## 🛠 Tech Stack

- **Next.js** – Framework React modern
- **Axios** – HTTP client
- **Zustand** – State management
- **shadcn/ui** – Modern UI components
- **TMDb API** – Sumber data film

---

## 🚀 Instalasi

1. **Clone repository**
 ```bash
 git clone https://github.com/username/acevision.git
 cd acevision
2. **Install dependencies**
 npm install
3. **Buat file .env.local**
 copy isinya dari .env.example
4. **Jalankan project**
 npm run dev
# atau
 yarn dev
5. **buka di browser**
 http://localhost:3000
