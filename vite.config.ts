import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "node:path";
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts({
    tsconfigPath: "./tsconfig.app.json",
    include: ["lib"],
    insertTypesEntry: true
  })],
  resolve: {
    alias: [{
      find: "@",
      replacement: path.resolve(__dirname, "lib")
    }]
  },
  build: {
      copyPublicDir: false,
      lib: {
        name: "zsanss-core",
        fileName: "zsanss-core",
        entry: path.resolve(__dirname, "./src/lib/main.ts"),
        formats: ["es", "umd"]
      }
    },
})
