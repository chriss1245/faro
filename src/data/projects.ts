export type ProjectStatus = "live" | "building" | "soon";

export interface Project {
  name: string;
  tagline: string;
  description: string;
  href?: string;
  status: ProjectStatus;
  tags: string[];
}

// Add the next project by appending an entry here.
export const projects: Project[] = [
  {
    name: "warren",
    tagline: "AI investment analyst",
    description:
      "A multi-agent system, built on LangGraph, that pulls market data for my portfolio and candidate stocks and runs numerical, fundamental and macro analysis plus intrinsic-value estimation. LLMs synthesise it into a buy/sell thesis — entry, take-profit and stop-loss — when a credible one exists. Public sign-up, plus a read-only guest demo.",
    href: "https://warren.manapple.dev",
    status: "live",
    tags: ["LangGraph", "Multi-agent", "Quant", "Valuation", "LLMs"],
  },
  {
    name: "gollum",
    tagline: "Auction tracker with automated alerting",
    description:
      "A Playwright scraping pipeline that tracks auctions and surfaces the best quality-for-price item instead of just the cheapest, sending alerts through a self-hosted email service. On-demand LLM vision reads the listing photos. Born from a real quest: finding the right necklace without overpaying.",
    href: "https://gollum.manapple.dev",
    status: "live",
    tags: ["Scraping", "Ranking", "LLM vision", "Alerting"],
  },
];
