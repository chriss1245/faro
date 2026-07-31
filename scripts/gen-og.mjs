// Generates 1200x630 social share images into public/og/.
// Run: node scripts/gen-og.mjs   (sharp is a dev-time dependency only)
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/og");
mkdirSync(outDir, { recursive: true });

// Brand tokens — the LIGHT palette from src/styles/global.css. The cards match
// the site's editorial register: warm paper, ink text, one blue rule. A share
// card is the first impression of the site, so it should not contradict it.
const PAPER = "#fbfaf8";
const PAPER2 = "#f5f3ef";
const INK = "#15181d";
const FOG3 = "#4d545e";
const FOG4 = "#656c77";
const BEACON = "#1d3f8f";
const LINE = "#dedad2";

const SERIF = "Source Serif 4, Georgia, Times New Roman, serif";
const SANS = "Inter, Helvetica, Arial, sans-serif";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Text width is the one thing that silently breaks these cards: there is no
// layout engine here, so an over-long title just runs off the 1200px canvas.
// Estimate the rendered width from per-glyph averages and step the font size
// down until it fits the content box, rather than trusting the string length.
const MAX_W = 1040; // 1200 minus the 80px gutters

// Average advance width as a fraction of font-size, measured for the two
// families used below. Deliberately slightly generous.
const AVG = { sans: 0.55, serif: 0.5 };
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
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PAPER}"/>
      <stop offset="1" stop-color="${PAPER2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="${BEACON}"/>

  <!-- wordmark: accent rule + name, mirroring the site nav -->
  <rect x="80" y="88" width="4" height="30" rx="2" fill="${BEACON}"/>
  <text x="100" y="112" font-family="${SERIF}" font-size="27" font-weight="600" fill="${INK}">Christopher Manzano</text>

  <line x1="80" y1="168" x2="1120" y2="168" stroke="${LINE}" stroke-width="1"/>

  <text x="80" y="268" font-family="${SANS}" font-size="${fit(eyebrow, 24, "sans")}" font-weight="600" letter-spacing="4" fill="${FOG4}">${esc(eyebrow.toUpperCase())}</text>
  <text x="80" y="378" font-family="${SERIF}" font-size="${fit(title, 78, "serif")}" font-weight="600" fill="${INK}">${esc(title)}</text>
  <text x="80" y="452" font-family="${SANS}" font-size="${fit(subtitle, 32, "sans")}" fill="${FOG3}">${esc(subtitle)}</text>

  <line x1="80" y1="530" x2="1120" y2="530" stroke="${LINE}" stroke-width="1"/>
  <text x="80" y="576" font-family="${SANS}" font-size="23" fill="${FOG4}">manapple.dev</text>
</svg>`;
}

const pages = [
  {
    file: "default.png",
    eyebrow: "Data Scientist · AI Engineer",
    title: "Christopher Manzano",
    subtitle: "I build and operate production AI systems, end to end.",
  },
  {
    file: "warren.png",
    eyebrow: "project · warren",
    title: "Multi-agent AI analyst",
    subtitle: "LangGraph + Gemini · quant, fundamentals and valuation.",
  },
  {
    file: "gollum.png",
    eyebrow: "project · gollum",
    title: "Auction tracker + alerts",
    subtitle: "Playwright scraping, quality-for-price ranking, LLM vision.",
  },
  {
    file: "services.png",
    eyebrow: "services",
    title: "Work with me",
    subtitle: "Talks, mentoring and freelance AI consulting · ES / EN.",
  },
  {
    file: "academia.png",
    eyebrow: "academia · bachelor thesis",
    title: "Deep RL for portfolios",
    subtitle: "Soft Actor-Critic + TCN · UC3M thesis, 2023 · DOI on Zenodo.",
  },
];

for (const p of pages) {
  const out = resolve(outDir, p.file);
  await sharp(Buffer.from(svg(p))).png().toFile(out);
  console.log("wrote", out);
}
