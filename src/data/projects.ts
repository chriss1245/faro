export type ProjectStatus = "live" | "building" | "soon";

export interface StackGroup {
  label: string;
  items: string[];
}

export interface Project {
  /** URL-safe id — drives the internal detail route /[slug]. */
  slug: string;
  name: string;
  tagline: string;
  /** Short blurb for the home card. */
  description: string;
  /** Longer, indexable prose for the detail page (real text, not just screenshots). */
  overview: string[];
  /** Concrete things it does / engineering decisions worth reading. */
  highlights: string[];
  /** Grouped tech stack, rendered as sections on the detail page. */
  stack: StackGroup[];
  /** Live, public URL of the running app (external). */
  url?: string;
  /** Slug of the related blog post in the writing collection, if any. */
  blogSlug?: string;
  status: ProjectStatus;
  /** Short tags for the card. */
  tags: string[];
  /** Per-page SEO overrides. */
  seoTitle: string;
  seoDescription: string;
}

// Add the next project by appending an entry here — the detail page,
// sitemap entry and home card are all generated from this list.
export const projects: Project[] = [
  {
    slug: "warren",
    name: "warren",
    tagline: "Multi-agent AI investment analyst",
    description:
      "A LangGraph multi-agent system that pulls market data, runs numerical, fundamental and macro analysis, and synthesises a buy/sell thesis with entry, take-profit and stop-loss.",
    overview: [
      "Warren is a multi-agent investment analyst built on LangGraph. It pulls live market data for a portfolio and a set of candidate stocks, then runs numerical, fundamental and macro analysis alongside an intrinsic-value estimation before any language model is involved.",
      "Specialised agents each own a slice of the problem — data collection, quantitative screening, fundamentals, macro context and valuation. Their outputs are fed to LLMs (Gemini models) that synthesise a concrete buy/sell thesis: a direction, an entry price, a take-profit and a stop-loss — but only when a credible thesis actually exists, rather than forcing a call on every ticker.",
      "It ships with public sign-up and a read-only guest demo, so anyone can see the reasoning end to end without an account.",
    ],
    highlights: [
      "Deterministic quantitative and valuation layers run first; the LLM synthesises rather than invents the numbers.",
      "A thesis-driven Guardian loop decides whether a credible call exists before emitting entry / take-profit / stop-loss levels.",
      "Read-only guest mode exposes the full analysis without requiring sign-up.",
      "Runs fully self-hosted behind SSO, on the same infrastructure as the rest of the portfolio.",
    ],
    stack: [
      { label: "Orchestration", items: ["LangGraph", "Multi-agent", "Python"] },
      { label: "Reasoning", items: ["Gemini LLMs", "Structured output"] },
      { label: "Analysis", items: ["Quant screening", "Fundamentals", "Intrinsic valuation"] },
      { label: "Platform", items: ["FastAPI", "Authentik SSO", "Coolify"] },
    ],
    url: "https://warren.manapple.dev",
    blogSlug: "warren-investment-analyst",
    status: "live",
    tags: ["LangGraph", "Multi-agent", "Quant", "Valuation", "LLMs"],
    seoTitle: "Warren — Multi-agent AI investment analyst (LangGraph + Gemini)",
    seoDescription:
      "Warren is a LangGraph multi-agent system that runs quantitative, fundamental and macro analysis, then uses Gemini LLMs to synthesise a buy/sell thesis with entry, take-profit and stop-loss. Built by Christopher Manzano Vimos.",
  },
  {
    slug: "gollum",
    name: "gollum",
    tagline: "Auction tracker with automated alerting",
    description:
      "A Playwright scraping pipeline that tracks auctions and surfaces the best quality-for-price item — not just the cheapest — with self-hosted email alerts and on-demand LLM vision on the listing photos.",
    overview: [
      "Gollum is an auction tracker that answers a very specific question: which listing is the best quality for the price, rather than simply the cheapest? It was born from a real quest — finding the right necklace without overpaying.",
      "A Playwright scraping pipeline follows auctions over time and ranks items on a quality-for-price basis. When something worth acting on appears, it fires an alert through a self-hosted email service, so the whole loop runs without third-party notification providers.",
      "On demand, an LLM vision model reads the listing photographs to pull details that never make it into the structured text — condition, materials, hallmarks — and feeds them back into the ranking.",
    ],
    highlights: [
      "Ranks on quality-for-price instead of lowest price, so genuine bargains beat noise.",
      "Playwright pipeline tracks listings over time rather than taking a single snapshot.",
      "Alerts go out through a self-hosted mail server — no external notification SaaS.",
      "On-demand LLM vision reads listing photos to enrich the ranking signal.",
    ],
    stack: [
      { label: "Scraping", items: ["Playwright", "Python", "FastAPI"] },
      { label: "Ranking", items: ["Quality-for-price scoring"] },
      { label: "Vision", items: ["Gemini vision", "On-demand analysis"] },
      { label: "Alerting", items: ["Self-hosted email", "Authentik SSO"] },
    ],
    url: "https://gollum.manapple.dev",
    blogSlug: "gollum-auction-tracker",
    status: "live",
    tags: ["Scraping", "Ranking", "LLM vision", "Alerting"],
    seoTitle: "Gollum — Auction tracker with ranking and automated alerts",
    seoDescription:
      "Gollum is a Playwright scraping pipeline that tracks auctions and surfaces the best quality-for-price item, with self-hosted email alerts and on-demand LLM vision on listing photos. Built by Christopher Manzano Vimos.",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
