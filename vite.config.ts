import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
      copyPublicDir: false,
      lib: {
        name: "zsanss-core",
        fileName: "zsanss-core",
        entry: path.resolve(__dirname, "./lib/main.ts"),
        formats: ["es", "umd"]
      }
    },
})
