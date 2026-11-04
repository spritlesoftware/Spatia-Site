#!/usr/bin/env bash
# Encode a source clip into a web-ready, muted, loop-friendly MP4 plus a poster
# frame, ready to upload to the media CDN.
#
#   scripts/encode-video.sh <input> <output.mp4> [height=720] [crf=28]
#
# Output: <output.mp4> (H.264, no audio, fast start) and <output>-poster.jpg.
# Aim for under ~4 MB per clip; raise crf or lower height if it comes out larger.
set -euo pipefail

in="${1:?input file}"
out="${2:?output .mp4}"
height="${3:-720}"
crf="${4:-28}"
poster="${out%.mp4}-poster.jpg"

ffmpeg -y -v error -i "$in" \
  -vf "scale=-2:${height}:flags=lanczos" \
  -c:v libx264 -preset slow -crf "$crf" -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart \
  "$out"

# Poster from 1s in, so it skips any fade from black
ffmpeg -y -v error -ss 1 -i "$out" -frames:v 1 -q:v 4 "$poster"

ls -lh "$out" "$poster" | awk '{print $5, $9}'
