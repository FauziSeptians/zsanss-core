---
layout: home

hero:
  name: "Zisanss Core"
  text: "Standard Library for Modern Web"
  tagline: "Kumpulan utility, hooks, dan design pattern type-safe untuk mempercepat development frontend."
  actions:
    - theme: brand
      text: Get Started
      link: /api/functions/createStepper
    - theme: alt
      text: View API Docs
      link: /api/
    - theme: alt
      text: GitHub
      link: https://github.com/fauziseptians/zsanss-core

features:
  - title: 🛠️ Robust Utilities
    details: Dari format currency hingga object manipulation. Semua utilitas yang kamu butuhkan ada di sini, tanpa perlu install banyak library kecil.
    icon: ⚙️
  - title: ⚓ Modern Hooks
    details: Hooks siap pakai seperti useStepper, useSyncForm, dan usePagination yang dioptimasi untuk performa dan integrasi Zustand.
    icon: 🎣
  - title: 🏗️ Design Patterns
    details: Implementasi Builder dan Factory pattern yang mempermudah manajemen logic kompleks di sisi client.
    icon: 📐
  - title: ⚡ Type-Safe & Lightweight
    details: Ditulis full dengan TypeScript. Hanya import yang kamu gunakan berkat dukungan Tree-shaking yang maksimal.
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
</style>

## Kenapa Zisanss Core?

Zisanss Core diciptakan untuk meminimalisir duplikasi kode antar project. Fokus pada logic bisnis Anda, biarkan kami yang mengurus logic dasar yang repetitif.

```typescript
// Contoh penggunaan utility yang super simple
import { formatCurrency, createStepper } from '@zisanss/core';

const price = formatCurrency(50000); // Rp 50.000