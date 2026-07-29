// Personal site config. Single source of truth for name, contact and socials.
//
// Structural facts (name, email, handles) are shared; anything a reader sees in
// prose is per-locale. Use getSite(lang) rather than reaching in directly.

import type { Lang } from "../i18n/config";

const shared = {
  name: "Christopher Manzano Vimos",
  email: "christopher.manzano@manapple.dev",
  // Social handles — leave blank ("") to hide.
  socials: {
    github: "chriss1245",
    linkedin: "christopher-manzano-vimos",
  },
  // Path (in /public) to a downloadable CV PDF; leave "" to hide the button.
  cvPdf: "/christopher-manzano-vimos-cv.pdf",
  domain: "manapple.dev",
};

interface SiteText {
  role: string;
  location: string;
  /** Meta description default and the line under the hero headline. */
  tagline: string;
  /** Hero headline, split so the accented span can be underlined. */
  heroLead: string;
  heroAccent: string;
  /** Second hero paragraph. */
  heroBody: string;
}

const text: Record<Lang, SiteText> = {
  en: {
    role: "Data Scientist & AI Engineer",
    location: "Madrid, Spain",
    tagline:
      "I design, build and operate production AI systems end to end — from architecture to deployment.",
    heroLead: "I help you become part of the",
    heroAccent: "fourth industrial revolution",
    heroBody:
      "Data Scientist and AI Engineer. I design, build and operate production AI systems end to end — architecture, models, infrastructure and the on-call that comes with it. Talks, mentoring and consulting available.",
  },
  es: {
    role: "Data Scientist e Ingeniero de IA",
    location: "Madrid, España",
    tagline:
      "Diseño, construyo y opero sistemas de IA en producción de principio a fin — de la arquitectura al despliegue.",
    heroLead: "Te ayudo a formar parte de la",
    heroAccent: "cuarta revolución industrial",
    heroBody:
      "Data Scientist e Ingeniero de IA. Diseño, construyo y opero sistemas de IA en producción de principio a fin — arquitectura, modelos, infraestructura y las guardias que vienen detrás. Disponible para charlas, mentoría y consultoría.",
  },
};

export const getSite = (lang: Lang) => ({ ...shared, ...text[lang] });

export type Site = ReturnType<typeof getSite>;
