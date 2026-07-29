// Portfolio projects.
//
// Structure (slug, URL, status, stack items) is declared once; everything a
// reader sees in prose is per-locale. Stack group labels are UI keys rather than
// free text, so they translate through src/i18n/ui.ts and cannot drift out of
// sync with the items they head.
//
// Add a project by appending to `definitions` — the home card, detail page and
// sitemap entry are all generated from it, in both locales.

import type { Lang } from "../i18n/config";
import { useTranslations } from "../i18n/ui";

export type ProjectStatus = "live" | "building" | "soon";

/** Keys into the ui dictionary — see "stack.*" there. */
type StackLabelKey =
  | "stack.orchestration"
  | "stack.reasoning"
  | "stack.analysis"
  | "stack.platform"
  | "stack.scraping"
  | "stack.ranking"
  | "stack.vision"
  | "stack.alerting";

export interface StackGroup {
  label: string;
  items: string[];
}

interface ProjectText {
  tagline: string;
  /** Short blurb for the home card. */
  description: string;
  /** Longer, indexable prose for the detail page (real text, not screenshots). */
  overview: string[];
  /** Concrete things it does / engineering decisions worth reading. */
  highlights: string[];
  /** Short tags for the card. */
  tags: string[];
  /** Per-page SEO overrides. */
  seoTitle: string;
  seoDescription: string;
}

interface ProjectDef {
  /** URL-safe id — drives the internal detail route /[project]. */
  slug: string;
  name: string;
  /** Live, public URL of the running app (external). */
  url?: string;
  /** Slug of the related blog post in the writing collection, if any. */
  blogSlug?: string;
  status: ProjectStatus;
  stack: { labelKey: StackLabelKey; items: string[] }[];
  text: Record<Lang, ProjectText>;
}

export interface Project extends Omit<ProjectDef, "stack" | "text">, ProjectText {
  stack: StackGroup[];
}

const definitions: ProjectDef[] = [
  {
    slug: "warren",
    name: "warren",
    url: "https://warren.manapple.dev",
    blogSlug: "warren-investment-analyst",
    status: "live",
    stack: [
      { labelKey: "stack.orchestration", items: ["LangGraph", "Multi-agent", "Python"] },
      { labelKey: "stack.reasoning", items: ["Gemini LLMs", "Structured output"] },
      {
        labelKey: "stack.analysis",
        items: ["Quant screening", "Fundamentals", "Intrinsic valuation"],
      },
      { labelKey: "stack.platform", items: ["FastAPI", "Authentik SSO", "Coolify"] },
    ],
    text: {
      en: {
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
        tags: ["LangGraph", "Multi-agent", "Quant", "Valuation", "LLMs"],
        seoTitle: "Warren — Multi-agent AI investment analyst (LangGraph + Gemini)",
        seoDescription:
          "Warren is a LangGraph multi-agent system that runs quantitative, fundamental and macro analysis, then uses Gemini LLMs to synthesise a buy/sell thesis with entry, take-profit and stop-loss. Built by Christopher Manzano Vimos.",
      },
      es: {
        tagline: "Analista de inversión multiagente con IA",
        description:
          "Un sistema multiagente en LangGraph que recoge datos de mercado, ejecuta análisis numérico, fundamental y macro, y sintetiza una tesis de compra/venta con entrada, objetivo y stop-loss.",
        overview: [
          "Warren es un analista de inversión multiagente construido sobre LangGraph. Recoge datos de mercado en vivo de una cartera y de un conjunto de valores candidatos, y después ejecuta análisis numérico, fundamental y macro junto con una estimación de valor intrínseco, todo antes de que intervenga ningún modelo de lenguaje.",
          "Cada agente especializado se encarga de una parte del problema: recogida de datos, cribado cuantitativo, fundamentales, contexto macro y valoración. Sus salidas alimentan a los LLMs (modelos Gemini), que sintetizan una tesis concreta de compra o venta: dirección, precio de entrada, objetivo de beneficio y stop-loss — pero solo cuando existe de verdad una tesis creíble, en lugar de forzar una recomendación para cada valor.",
          "Incluye registro público y una demo de invitado en modo lectura, así que cualquiera puede seguir el razonamiento completo sin crearse una cuenta.",
        ],
        highlights: [
          "Las capas cuantitativa y de valoración son deterministas y van primero; el LLM sintetiza, no se inventa los números.",
          "Un bucle Guardian basado en tesis decide si existe una recomendación creíble antes de emitir los niveles de entrada, objetivo y stop-loss.",
          "El modo invitado en solo lectura muestra el análisis completo sin necesidad de registrarse.",
          "Funciona autoalojado detrás de SSO, en la misma infraestructura que el resto del portfolio.",
        ],
        tags: ["LangGraph", "Multiagente", "Cuantitativo", "Valoración", "LLMs"],
        seoTitle: "Warren — Analista de inversión multiagente con IA (LangGraph + Gemini)",
        seoDescription:
          "Warren es un sistema multiagente en LangGraph que ejecuta análisis cuantitativo, fundamental y macro, y usa LLMs de Gemini para sintetizar una tesis de compra/venta con entrada, objetivo y stop-loss. Creado por Christopher Manzano Vimos.",
      },
    },
  },
  {
    slug: "gollum",
    name: "gollum",
    url: "https://gollum.manapple.dev",
    blogSlug: "gollum-auction-tracker",
    status: "live",
    stack: [
      { labelKey: "stack.scraping", items: ["Playwright", "Python", "FastAPI"] },
      { labelKey: "stack.ranking", items: ["Quality-for-price scoring"] },
      { labelKey: "stack.vision", items: ["Gemini vision", "On-demand analysis"] },
      { labelKey: "stack.alerting", items: ["Self-hosted email", "Authentik SSO"] },
    ],
    text: {
      en: {
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
        tags: ["Scraping", "Ranking", "LLM vision", "Alerting"],
        seoTitle: "Gollum — Auction tracker with ranking and automated alerts",
        seoDescription:
          "Gollum is a Playwright scraping pipeline that tracks auctions and surfaces the best quality-for-price item, with self-hosted email alerts and on-demand LLM vision on listing photos. Built by Christopher Manzano Vimos.",
      },
      es: {
        tagline: "Rastreador de subastas con alertas automáticas",
        description:
          "Un pipeline de scraping con Playwright que sigue subastas y saca a la superficie la mejor relación calidad-precio — no simplemente lo más barato — con alertas por email autoalojado y visión por LLM a demanda sobre las fotos del anuncio.",
        overview: [
          "Gollum es un rastreador de subastas que responde a una pregunta muy concreta: ¿qué anuncio ofrece la mejor calidad para el precio, en lugar de ser simplemente el más barato? Nació de una búsqueda real: encontrar el collar adecuado sin pagar de más.",
          "Un pipeline de scraping con Playwright sigue las subastas a lo largo del tiempo y ordena los artículos por relación calidad-precio. Cuando aparece algo que merece la pena, lanza un aviso a través de un servicio de email autoalojado, de modo que todo el ciclo funciona sin proveedores de notificaciones externos.",
          "A demanda, un modelo de visión lee las fotografías del anuncio para extraer detalles que nunca llegan al texto estructurado — estado, materiales, punzones — y los devuelve al ranking.",
        ],
        highlights: [
          "Ordena por calidad-precio en lugar de por precio mínimo, así los chollos de verdad destacan sobre el ruido.",
          "El pipeline de Playwright sigue los anuncios en el tiempo, en lugar de tomar una única foto fija.",
          "Las alertas salen por un servidor de correo propio — sin SaaS de notificaciones externo.",
          "La visión por LLM a demanda lee las fotos del anuncio para enriquecer la señal del ranking.",
        ],
        tags: ["Scraping", "Ranking", "Visión con LLM", "Alertas"],
        seoTitle: "Gollum — Rastreador de subastas con ranking y alertas automáticas",
        seoDescription:
          "Gollum es un pipeline de scraping con Playwright que sigue subastas y encuentra la mejor relación calidad-precio, con alertas por email autoalojado y visión por LLM a demanda sobre las fotos. Creado por Christopher Manzano Vimos.",
      },
    },
  },
];

export function getProjects(lang: Lang): Project[] {
  const t = useTranslations(lang);
  return definitions.map(({ stack, text, ...rest }) => ({
    ...rest,
    ...text[lang],
    stack: stack.map((g) => ({ label: t(g.labelKey), items: g.items })),
  }));
}

export const getProjectBySlug = (slug: string, lang: Lang) =>
  getProjects(lang).find((p) => p.slug === slug);

/** Slugs only — for getStaticPaths, where locale does not matter. */
export const projectSlugs = definitions.map((p) => p.slug);
