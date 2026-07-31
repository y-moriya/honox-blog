#!/bin/bash

IMAGE_DIR="public/static/images"

echo "=== 画像最適化処理を開始 ==="

# public/static/images 配下の .webp 画像をリサイズ・軽量化
find "$IMAGE_DIR" -type f -name "*.webp" | while read FILE; do
  convert "$FILE" -resize "1200x>" -quality 82 "$FILE.tmp" && mv "$FILE.tmp" "$FILE"
done

# hero.jpg の最適化
if [ -f "public/static/hero.jpg" ]; then
  convert "public/static/hero.jpg" -resize "1200x>" -quality 85 "public/static/hero.jpg.tmp" && mv "public/static/hero.jpg.tmp" "public/static/hero.jpg"
fi

# favicon.ico の最適化 (16,32,48px に絞り込み)
if [ -f "public/favicon.ico" ]; then
  convert "public/favicon.ico" -define icon:auto-resize=48,32,16 "public/favicon.ico.tmp" && mv "public/favicon.ico.tmp" "public/favicon.ico"
fi

echo "=== 画像最適化処理が完了しました ==="
