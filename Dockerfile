# Stage 1: Build documentation menggunakan node slim agar lebih ringan
FROM node:20-slim AS builder
WORKDIR /app

# Copy package files untuk memanfaatkan layer caching
COPY package*.json ./
RUN npm install

# Copy source code lainnya
COPY . .

# Menjalankan build VitePress
# Pastikan di package.json ada script: "docs:build": "vitepress build docs"
RUN npm run docs:build 

# Stage 2: Serve dengan Nginx (Stage ini tetap pakai Alpine karena sangat kecil & stabil)
FROM nginx:stable-alpine

# Perbaikan: Menggunakan --from=builder (tanpa typo titik dua)
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]