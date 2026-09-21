#!/bin/bash
# usage: sheet.sh <name> <id> <id> ...   -> lab/photo/<name>-sheet.png
name="$1"; shift
dir="lab/photo/thumbs/$name"
rm -rf "$dir"; mkdir -p "$dir"
i=0
for id in "$@"; do
  i=$((i+1)); n=$(printf %02d $i)
  curl -s --max-time 30 -o "$dir/raw-$n.jpg" \
    "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=460&h=300&fit=crop"
  ffmpeg -hide_banner -loglevel error -y -i "$dir/raw-$n.jpg" \
    -vf "scale=460:300:force_original_aspect_ratio=increase,crop=460:300,drawtext=text='$n  $id':x=10:y=10:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.7:boxborderw=7" \
    "$dir/t-$n.jpg" 2>/dev/null
done
rows=$(( (i + 3) / 4 ))
ffmpeg -hide_banner -loglevel error -y -i "$dir/t-%02d.jpg" \
  -filter_complex "tile=4x${rows}:margin=6:padding=6:color=0x201d2e" -frames:v 1 "lab/photo/$name-sheet.png"
echo "lab/photo/$name-sheet.png  ($i tiles)"
