#!/bin/bash
set -e

echo "🚀 Zsanss-Core Publish Automation Workflow (GitHub)"
echo "Pastikan kamu sudah berada di branch 'main' yang paling up-to-date dan status clean."
echo "----------------------------------------------------"

# Meminta tipe versi rilis (patch, minor, atau major)
read -p "Berapa lompatan rilis ini? (pilih: patch / minor / major): " VERSION_TYPE

if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "❌ Error: Pilihan tipe versi tidak valid."
  exit 1
fi

echo "📦 Memperbarui versi di package.json..."
npm --no-git-tag-version version $VERSION_TYPE > /dev/null

NEW_VERSION=$(node -p "require('./package.json').version")
BRANCH_NAME="release/v$NEW_VERSION"

echo "🌿 Membuat Branch rilis khusus ($BRANCH_NAME)..."
git checkout -b $BRANCH_NAME

echo "💾 Menyusun dan merangkum versi terbaru (Commit)..."
git add package.json package-lock.json
git commit -m "chore(release): bump version to v$NEW_VERSION"

echo "☁️ Mendorong referensi ke GitHub..."
git push -u origin $BRANCH_NAME

echo "☁️ Membuka otomatis Pull Request (PR) via GitHub CLI..."

# Menggunakan perkakas GitHub CLI 'gh' untuk menciptakan objek Pull Request!
if command -v gh &> /dev/null; then
  gh pr create \
    --base main \
    --head $BRANCH_NAME \
    --title "Release v$NEW_VERSION" \
    --body "Automated Release Process 🚀. \n\nReview rilis versi \`v$NEW_VERSION\`. \n\n> **PENTING**: Ketika PR ini di *MERGE* ke \`main\`, jangan lupa dorong TAG ke GitHub menggunakan \`git tag v$NEW_VERSION\` dan \`git push origin v$NEW_VERSION\`. GitHub Actions akan otomatis me-release paket lib ini ke NPM Registry."
  echo "✅ PR telah berhasil di-submit ke GitHub Repo!"
else
  echo "⚠️ Command 'gh' tidak ditemukan. Harap pastikan kamu sudah menginstal GitHub CLI. Kamu bisa menjalankan instruksi Pull Request secara manual melalui browser."
fi

echo "----------------------------------------------------"
echo "✅ Workflow Selesai."
