#!/bin/bash

# 画像ディレクトリのパス
IMAGE_DIR="public/static/images"

# jpg, jpeg, png ファイルを一覧にする
find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read FILE; do
  # WebP 形式に変換
  optimizt --webp "$FILE"

  # 元のファイルを削除
  rm "$FILE"
done
