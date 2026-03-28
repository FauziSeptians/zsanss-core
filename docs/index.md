---
layout: home

hero:
  name: "Zsanss Core"
  text: "Core Library for Modern React"
  tagline: "Kumpulan utility, hooks, services, dan design pattern type-safe untuk mempercepat development frontend."
  actions:
    - theme: brand
      text: Mulai Eksplorasi
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/fauziseptians/zsanss-core

features:
  - title: 🛠️ Comprehensive Utilities
    details: Puluhan utilitas rapi untuk manipulasi Array, String, Number, dan Object (capitalize, formatCurrency, ObjectHandler) bagi alur kerja yang presisi.
    icon: ⚙️
  - title: ⚓ Advanced Modern Hooks
    details: Kumpulan kapabilitas reaktif siap pakai mulai dari useStepper, useSyncForm, useAutoCarousel hingga abstraksi useBaseInfiniteQuery.
    icon: 🎣
  - title: 📡 API Services
    details: Tersedianya abstraksi arsitektur BaseApiService OOP yang menyederhanakan komunikasi HTTP interaktif untuk proses CRUD mutakhir.
    icon: 🚀
  - title: 🏗️ Design Patterns
    details: Implementasi solid untuk Builder dan Factory pattern yang merapikan manajemen skenario *logic object* kompleks di sisi client.
    icon: 📐
  - title: ⚡ Sangat Ringan & Type-Safe
    details: Ditulis murni menggunakan TypeScript tulen. Mengeliminasi bundle tak kasat mata berkat dukungan performa Tree-shaking terbaik.
    icon: 🛡️
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3498db 30%, #9b59b6);
}

.vp-doc h1 {
  text-align: center;
}

.custom-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.custom-card {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.2s, box-shadow 0.2s;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.vp-doc h3 {
  margin-top: 0;
  color: var(--vp-c-brand);
}

/* Memperbaiki tinggi konten dan whitespace ekstra */
.vp-doc [class^="language-"] {
    margin: 0;
}
</style>

## 🌟 Kenapa Zsanss Core?

Zsanss Core diciptakan secara spesifik untuk meminimalisir tumpukan duplikasi kode (*boilerplate*) antar proyek aplikasi React kamu. Alihkan fokusmu seutuhnya ke arah pembentukan logika bisnis yang penting, dan biarkan pustaka ini membereskan rutinitas dasar dengan keamanan TypeScript!

---

## 💻 Pengalaman Penggunaan yang Mulus

Sederhana, bersih, dan memanjakan sintaks. Berikut adalah intipan kekuatan Zsanss Core:

<div class="custom-card-container">

<div class="custom-card">

### 🎣 Elegant Hooks
Memanggil fungsionalitas reaktif yang rumit cukup selangkah saja:

```tsx
import { useStepper, useOnlineStatus } from 'zsanss-core';

const { step, nextStep, prevStep } = useStepper({ 
    initialStep: 1, 
    maxStep: 3 
});

const isOnline = useOnlineStatus();
```

</div>

<div class="custom-card">

### ⚙️ Rich Utilities
Pemrosesan manipulasi data instan tanpa instalasi sub-package ekstra:

```tsx
import { formatCurrency, slugify } from 'zsanss-core';

const price = formatCurrency(50000); 
// "Rp 50.000"

const slug = slugify("React Sangat Keren"); 
// "react-sangat-keren"
```

</div>

<div class="custom-card">

### 🚀 Abstraksi Service OOP
Buat *controller* rute API berkelas di arsitektur aplikasimu:

```tsx
import { BaseApiService } from 'zsanss-core';

class SessionService extends BaseApiService<User> {
  constructor() {
    super('users', 'https://api.toko.com/v1');
  }
}

// Tinggal manfaatkan CRUD tanpa repot!
const myApi = new SessionService();
const product = await myApi.getById('1');
```

</div>

</div>

<br>
<br>

<div align="center">
  <p>Pilih fungsionalitas yang kamu butuhkan dan rasakan efisiensinya hari ini!</p>
  <br>
  <a class="VPButton VPButton--brand" href="/api/">Eksplorasi API Docs Selengkapnya →</a>
</div>
<br>