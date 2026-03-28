# 🚀 Zsanss Core

> Kumpulan utility, hooks, api services, dan design pattern type-safe untuk mempercepat development web modern (React/Next.js).

Zsanss Core adalah *Core UI Component Library* dan *Toolkit* yang dirancang khusus untuk meminimalisasi *boilerplate* (duplikasi kode yang sama berulang-ulang) pada project React skala besar. Ditulis menggunakan TypeScript (`strict` mode) dengan penekanan pada **Developer Experience (DX)** dan performa *tree-shaking*. 

## ✨ Fitur Utama

- **Comprehensive Utilities:** Manipulasi Arrays, Strings, Numbers, dan Objects secara mulus (`capitalize`, `formatCurrency`, `ObjectHandler`, dll).
- **Advanced Modern Hooks:** Mengelola state kompleks cukup dengan satu baris reaktif (`useStepper`, `useSyncForm`, `usePagination`, dll).
- **API Services Built in:** Mendukung abstraksi *Object-Oriented* Axios (`BaseApiService`) untuk kontrol komunikasi HTTP CRUD dinamis.
- **Implementasi Design Pattern:** *Builder* dan *Factory* model untuk merapikan instansiasi objek klien.
- **Super Ringan & Tanpa Bentrok:** Menggunakan konsep `peerDependencies` untuk memastikan tidak ada duplikasi engine React.

---

## 📦 Instalasi

Zsanss Core didistribusikan melalui [NPM](https://www.npmjs.com/). Kamu dapat memasangnya menggunakan package manager pilihanmu:

```bash
# Menggunakan NPM
npm install zsanss-core

# Menggunakan Yarn
yarn add zsanss-core

# Menggunakan PNPM
pnpm add zsanss-core
```

### ⚠️ Persyaratan (Peer Dependencies)
Pustaka ini didesain sebagai utilitas *UI Core Layer*. Agar eksekusi kode berjalan lancar tanpa mengalami *multiple instance conflict*, pastikan kamu sudah menanamkan beberapa pustaka ekosistem berikut ke dalam `package.json` kamu (aplikasi target):
- `react` (v18+)
- `react-dom` (v18+)
- `@tanstack/react-query` (v5+)
- `react-hook-form` (v7+)

---

## 💻 Contoh Penggunaan Singkat

Semua metode yang ada pada Zsanss Core memiliki tipe kembalian otomatis *(Inferred Types)* yang kokoh.

### 1. Memanggil Utilitas String & Format
```tsx
import { formatCurrency, capitalize, slugify } from 'zsanss-core';

console.log(formatCurrency(150000));     // Output: "Rp 150.000"
console.log(capitalize('hello world'));  // Output: "Hello world"
console.log(slugify('Produk Baru 2024'));// Output: "produk-baru-2024"
```

### 2. Mengolah Skenario State Hook Kompleks
```tsx
import { useStepper } from 'zsanss-core';

function Onboarding() {
  const { step, nextStep, prevStep } = useStepper({ 
    initialStep: 1, 
    maxStep: 4 
  });

  return (
    <div>
      <p>Langkah saat ini: {step}</p>
      <button onClick={prevStep}>Kembali</button>
      <button onClick={nextStep}>Lanjut</button>
    </div>
  )
}
```

### 3. Komunikasi Service OOP (Axios Abstraction)
```tsx
import { BaseApiService } from 'zsanss-core';

// Mengatur Controller otomatis
class UserService extends BaseApiService<User> {
  constructor() {
    super('users', 'https://api.domain.com/v1');
  }
}

const myServ = new UserService();
// Memanggil /users/1 dengan dukungan tipe balikan yang presisi!
const hero = await myServ.getById(1); 
```

---

## 📖 Dokumentasi Lengkap

Penjelasan menyeluruh tentang fungsionalitas parameter (tipe, opsional, maupun *fallback* eksekusi) dapat dieksplorasi secara visual pada **[Platform API Reference Kami](#)** (TBA pada Tautan Repo).

> Atau jalankan secara lokal untuk mengurai API Reference menggunakan Vitepress:
> ```bash
> npm run docs:dev
> ```

---

## 📜 Lisensi & Kontribusi

Berdasarkan [MIT License](LICENSE).  
Dirancang untuk efisiensi ekosistem oleh [@FauziSeptians](https://github.com/FauziSeptians). Silakan buka isian Pull Request atau Lembar Isu (*Issue*) apabila Anda mendeteksi potensi pembaruan kode.🚀
