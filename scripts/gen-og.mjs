// Generates 1200x630 social share images into public/og/.
// Run: node scripts/gen-og.mjs   (sharp is a dev-time dependency only)
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/og");
mkdirSync(outDir, { recursive: true });

// Brand tokens — the DARK palette from src/styles/global.css. Share cards stay
// dark in both themes: they are read as images on someone else's timeline, not
// as part of the site, and the dark card is the stronger brand impression.
const INK = "#070a11";
const INK2 = "#131a26";
const FOG = "#eef2f8";
const FOG3 = "#92a0b5";
const BEACON = "#00e2a0";
const LINE = "#212b3b";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Text width is the one thing that silently breaks these cards: there is no
// layout engine here, so an over-long title just runs off the 1200px canvas.
// Estimate the rendered width from per-glyph averages and step the font size
// down until it fits the content box, rather than trusting the string length.
const MAX_W = 1040; // 1200 minus the 80px gutters

// Average advance width as a fraction of font-size, measured for the two
// families used below. Deliberately slightly generous.
const AVG = { sans: 0.55, mono: 0.6 };
const WIDE = /[MWmw@]/g; // glyphs well above the average
const NARROW = /[iljtfIr.,;:'! ]/g; // glyphs well below it

function estimateWidth(text, size, family) {
  const wide = (text.match(WIDE) ?? []).length;
  const narrow = (text.match(NARROW) ?? []).length;
  const normal = text.length - wide - narrow;
  return size * AVG[family] * (normal + wide * 1.5 + narrow * 0.45);
}

/** Largest size <= `size` at which `text` fits MAX_W. */
function fit(text, size, family) {
  let s = size;
  while (s > 12 && estimateWidth(text, s, family) > MAX_W) s -= 1;
  if (s < size) console.warn(`  ↳ shrank ${size}→${s}px to fit: "${text}"`);
  return s;
}

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

  <text x="80" y="300" font-family="ui-monospace, Menlo, monospace" font-size="${fit(eyebrow, 26, "mono")}" letter-spacing="2" fill="${BEACON}">${esc(eyebrow)}</text>
  <text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-size="${fit(title, 76, "sans")}" font-weight="700" fill="${FOG}">${esc(title)}</text>
  <text x="80" y="470" font-family="Arial, Helvetica, sans-serif" font-size="${fit(subtitle, 34, "sans")}" fill="${FOG3}">${esc(subtitle)}</text>

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
  {
    file: "services.png",
    eyebrow: "// services",
    title: "Work with me",
    subtitle: "Talks, mentoring and freelance AI consulting · ES / EN.",
  },
  {
    file: "academia.png",
    eyebrow: "// academia · bachelor thesis",
    title: "Deep RL for portfolios",
    subtitle: "Soft Actor-Critic + TCN · UC3M thesis, 2023 · DOI on Zenodo.",
  },
];

for (const p of pages) {
  const out = resolve(outDir, p.file);
  await sharp(Buffer.from(svg(p))).png().toFile(out);
  console.log("wrote", out);
}
