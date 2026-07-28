// Generates 1200x630 social share images into public/og/.
// Run: node scripts/gen-og.mjs   (sharp is a dev-time dependency only)
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/og");
mkdirSync(outDir, { recursive: true });

// Brand tokens (mirror the site theme: ink background, beacon amber accent).
const INK = "#0b0f14";
const INK2 = "#111820";
const FOG = "#e6edf3";
const FOG3 = "#9fb0c0";
const BEACON = "#f5a623";
const LINE = "#243040";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ eyebrow, title, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="1" stop-color="${INK2}"/>
    </linearGradient>
    <radialGradient id="beam" cx="0.16" cy="0.12" r="0.9">
      <stop offset="0" stop-color="${BEACON}" stop-opacity="0.18"/>
      <stop offset="0.5" stop-color="${BEACON}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#beam)"/>
  <rect x="0" y="0" width="1200" height="8" fill="${BEACON}"/>

  <!-- beacon mark -->
  <g transform="translate(80,86)">
    <rect x="0" y="0" width="52" height="52" rx="12" fill="${INK2}" stroke="${LINE}"/>
    <circle cx="26" cy="26" r="8" fill="${BEACON}"/>
  </g>
  <text x="148" y="120" font-family="ui-monospace, Menlo, monospace" font-size="26" fill="${FOG}">Christopher Manzano</text>

  <text x="80" y="300" font-family="ui-monospace, Menlo, monospace" font-size="26" letter-spacing="2" fill="${BEACON}">${esc(eyebrow)}</text>
  <text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" fill="${FOG}">${esc(title)}</text>
  <text x="80" y="470" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="${FOG3}">${esc(subtitle)}</text>

  <text x="80" y="576" font-family="ui-monospace, Menlo, monospace" font-size="24" fill="${FOG3}">manapple.dev</text>
</svg>`;
}

const pages = [
  {
    file: "default.png",
    eyebrow: "// Data Scientist · AI Engineer",
    title: "Christopher Manzano",
    subtitle: "I build and operate production AI systems, end to end.",
  },
  {
    file: "warren.png",
    eyebrow: "// project · warren",
    title: "Multi-agent AI analyst",
    subtitle: "LangGraph + Gemini · quant, fundamentals and valuation.",
  },
  {
    file: "gollum.png",
    eyebrow: "// project · gollum",
    title: "Auction tracker + alerts",
    subtitle: "Playwright scraping, quality-for-price ranking, LLM vision.",
  },
];

for (const p of pages) {
  const out = resolve(outDir, p.file);
  await sharp(Buffer.from(svg(p))).png().toFile(out);
  console.log("wrote", out);
}
