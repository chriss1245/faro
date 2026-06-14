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
    tagline: "AI investment-analysis engine",
    description:
      "Pulls data for my portfolio and candidate stocks, then runs numerical, fundamental and macro analysis plus intrinsic-value estimation. LLMs synthesise it into an investment thesis — entry, take-profit and stop-loss — when a credible one exists.",
    href: "https://warren.manapple.dev",
    status: "building",
    tags: ["LLMs", "Quant", "Fundamental", "Macro", "Valuation"],
  },
  {
    name: "gollum",
    tagline: "Auctions tracker for best value-for-money",
    description:
      "Tracks auctions and surfaces the best quality-for-price item instead of just the cheapest. Born from a very real quest: finding the right necklace without overpaying.",
    href: "https://gollum.manapple.dev",
    status: "soon",
    tags: ["Scraping", "Ranking", "Price intel"],
  },
  {
    name: "openclaw",
    tagline: "Self-hosted AI assistant",
    description:
      "A self-hosted assistant running on open models. Part of my push to own my whole stack — models, data and infrastructure.",
    href: "https://openclaw.manapple.dev",
    status: "live",
    tags: ["Self-hosted", "Open models", "Infra"],
  },
];
