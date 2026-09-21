/* Collects candidate photo URLs from Pexels search pages. Pexels content
   is free for commercial use. Nothing is used until it has been looked at. */
const QUERIES = process.argv.slice(2);
for (const q of QUERIES) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(q)}/`;
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
  const html = await r.text();
  const ids = [...new Set([...html.matchAll(/images\.pexels\.com\/photos\/(\d+)\/([a-z0-9-]+\.jpe?g)/g)]
    .map(m => m[1] + "/" + m[2]))];
  console.log(`\n## ${q}  (${ids.length})`);
  ids.slice(0, 8).forEach(i => console.log("  " + i));
}
