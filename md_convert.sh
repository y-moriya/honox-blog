#!/bin/bash

# app/routes/posts/配下の.mdファイルを変換するスクリプト

for file in app/routes/posts/*.md; do
    # ファイル名を取得
    filename=$(basename "$file")

    # 日付部分を抽出
    date_part=${filename:0:10}

    # 新しいファイル名を作成
    new_filename="${date_part:0:4}${date_part:5:2}${date_part:8:2}-${filename:11}"
    new_filename="${new_filename%.md}.mdx"

    # ファイルをリネーム
    mv "$file" "app/routes/posts/$new_filename"
done
