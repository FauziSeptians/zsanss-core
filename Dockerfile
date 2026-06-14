# Stage 1: Build
FROM node:24-slim AS builder
WORKDIR /app

COPY package*.json ./

# Tambahkan flag --os=linux --cpu=x64 agar module rollup linux ikut terinstall
RUN npm install --os=linux --cpu=x64

COPY . .
RUN npm run docs:build 

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]