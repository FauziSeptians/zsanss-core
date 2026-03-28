import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

/**
 * Fungsi untuk struktur FLAT dengan filter ketat:
 * 1. Hanya mengambil file utama (tanpa embel-embel .Function, .Interface, dll)
 * 2. Menghapus prefix agar label di sidebar bersih
 */
const getSideBarItems = (prefix: string) => {
  const fullPath = path.resolve(__dirname, `../../docs/api`)

  if (!fs.existsSync(fullPath)) {
    console.warn(`[VitePress] Folder API tidak ditemukan: ${fullPath}`);
    return [];
  }

  return fs.readdirSync(fullPath)
    .filter((file) => {
      const isMd = file.endsWith('.md');
      const hasPrefix = file.toLowerCase().startsWith(prefix.toLowerCase());
      const isSystemFile = ['index.md', 'README.md', 'globals.md', 'modules.md'].includes(file);

      // KUNCI: Abaikan file yang mengandung tipe metadata di namanya
      const isExtraFile = file.includes('.Function.') ||
        file.includes('.Interface.') ||
        file.includes('.TypeAlias.') ||
        file.includes('.Class.');

      return isMd && hasPrefix && !isSystemFile && !isExtraFile;
    })
    .map((file) => {
      const fileName = file.replace('.md', '');

      // Hapus prefix untuk tampilan sidebar (contoh: 'hooks.useModal' -> 'useModal')
      // Kita pakai regex agar penghapusan prefix tidak case-sensitive
      const label = fileName.replace(new RegExp(`^${prefix}`, 'i'), '');

      return {
        text: label,
        link: `/api/${fileName}`
      };
    })
    .sort((a, b) => a.text.localeCompare(b.text));
}

export default defineConfig({
  title: "Zisanss Core",
  description: "zisanss core for utility website frontend",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // Update link nav agar mengarah ke file yang benar-benar ada
      { text: 'API Reference', link: '/api/modules' }
    ],

    sidebar: [
      {
        text: '⚓ Hooks',
        collapsed: false,
        items: getSideBarItems('hooks.')
      },
      {
        text: '🔢 Number Utils',
        collapsed: false,
        items: getSideBarItems('number.')
      },
      {
        text: '📦 Object Utils',
        collapsed: false,
        items: getSideBarItems('object.')
      },
      {
        text: '✍️ String Utils',
        collapsed: false,
        items: getSideBarItems('string.')
      },
      {
        text: '🌐 Services',
        collapsed: false,
        items: getSideBarItems('Services.')
      },
      {
        text: '🏗️ Design Patterns',
        collapsed: false,
        items: getSideBarItems('design-pattern.')
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MuhammadFauziSeptianaPutra' }
    ]
  }
})