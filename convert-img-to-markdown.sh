#!/bin/bash

# Set the target directory
TARGET_DIR="./app/routes/posts"

# Loop through all .mdx files in the target directory
find "$TARGET_DIR" -type f -name "*.mdx" | while read -r file; do
  # Use sed to replace img tags with the desired format, ignoring width and height attributes
  sed -i -E 's|<img [^>]*src="([^"]+)" [^>]*alt="([^"]+)"[^>]*>|<a href="\1" rel="noopener noreferrer">![\2](\1)</a>|g' "$file"
done

echo "Conversion completed for all .mdx files in $TARGET_DIR."