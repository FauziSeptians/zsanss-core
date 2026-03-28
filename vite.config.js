import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
var __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react(), tsconfigPaths(), dts({
            tsconfigPath: "./tsconfig.app.json",
            include: ["src/lib"],
            insertTypesEntry: true
        })],
    resolve: {
        alias: [{
                find: "@",
                replacement: path.resolve(__dirname, "src/lib")
            }]
    },
    build: {
        copyPublicDir: false,
        lib: {
            name: "zsanss-core",
            fileName: "zsanss-core",
            entry: path.resolve(__dirname, "./src/lib/main.ts"),
            formats: ["es", "umd"]
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime", "@tanstack/react-query", "react-hook-form"],
            output: {
                globals: {
                    "react": "React",
                    "react-dom": "ReactDOM",
                    "@tanstack/react-query": "ReactQuery",
                    "react-hook-form": "ReactHookForm"
                }
            }
        }
    },
});
