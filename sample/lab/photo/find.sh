#!/bin/bash
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
for q in "$@"; do
  enc=$(printf '%s' "$q" | sed 's/ /%20/g')
  echo "## $q"
  curl -s --max-time 40 -A "$UA" "https://www.pexels.com/search/$enc/" \
    | sed 's/\u002F/\//g' \
    | grep -oE 'images\.pexels\.com/photos/[0-9]+/[a-z0-9_-]+\.jpe?g' \
    | sort -u | head -10 | sed 's|^|   |'
done
