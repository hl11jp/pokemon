curl "https://pokemon-bvko53ybk-hl11jp.vercel.app/api/revalidate" \
  -X POST \
  -H "Content-Type: application/json" \
  -d "[\"/pokemon/1\"]"