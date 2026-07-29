// Freelance offering: talks, mentoring and consulting.
//
// No public prices — every CTA is a mailto with a pre-filled subject so an
// enquiry lands already labelled, and the rate is quoted per engagement.
// `emailSubject` is per-locale so the inbox shows the language to reply in.

import type { Lang } from "../i18n/config";

interface ServiceText {
  title: string;
  /** One line under the title. */
  tagline: string;
  description: string;
  /** Concrete deliverables / what the client walks away with. */
  bullets: string[];
  /** Delivery format, e.g. "Remote or on-site · 45–60 min". */
  format: string;
  /** Subject line for the mailto, already localized. */
  emailSubject: string;
}

interface ServiceDef {
  /** Anchor id, also used in the mailto tracking. */
  id: string;
  /** Inline SVG path data for the card icon (24x24, stroke-based). */
  icon: string;
  text: Record<Lang, ServiceText>;
}

export const services: ServiceDef[] = [
  {
    id: "talks",
    // Microphone
    icon: "M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8",
    text: {
      en: {
        title: "Talks & workshops",
        tagline: "For teams, universities and events",
        description:
          "Sessions on applied AI that are built from systems actually running in production, not from a vendor deck. I bring real architectures, the decisions behind them and the things that broke — which is usually the part people remember.",
        bullets: [
          "Production AI and MLOps: what changes between a notebook and a system you are on call for.",
          "LLMs and agentic pipelines: where they earn their keep and where they quietly cost you money.",
          "Reinforcement learning for decision-making, from my research on portfolio management.",
          "Hands-on workshop format available, with a repository the team keeps afterwards.",
        ],
        format: "Remote or on-site · from 45 min to a full-day workshop · Spanish or English",
        emailSubject: "Talk / workshop enquiry",
      },
      es: {
        title: "Charlas y talleres",
        tagline: "Para equipos, universidades y eventos",
        description:
          "Sesiones de IA aplicada construidas a partir de sistemas que están funcionando de verdad en producción, no de un catálogo comercial. Llevo arquitecturas reales, las decisiones que hay detrás y lo que se rompió — que suele ser la parte que la gente recuerda.",
        bullets: [
          "IA en producción y MLOps: qué cambia entre un notebook y un sistema del que estás de guardia.",
          "LLMs y pipelines agénticos: dónde aportan de verdad y dónde te cuestan dinero sin que se note.",
          "Aprendizaje por refuerzo para toma de decisiones, a partir de mi investigación en gestión de carteras.",
          "Formato taller práctico disponible, con un repositorio que el equipo se queda después.",
        ],
        format: "En remoto o presencial · desde 45 min hasta taller de día completo · español o inglés",
        emailSubject: "Consulta sobre charla / taller",
      },
    },
  },
  {
    id: "mentoring",
    // Two figures
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    text: {
      en: {
        title: "Mentoring",
        tagline: "For data scientists and AI engineers",
        description:
          "One-to-one sessions for people who can already train a model and now need to make it someone else's dependency. I have mentored engineers and set quality standards on client teams, and this is the same thing without the consultancy wrapper.",
        bullets: [
          "Career direction: moving from analysis into engineering, or from engineering into AI.",
          "Code and architecture review on your real project, not a toy exercise.",
          "Portfolio and CV review from the side of the table that does the hiring.",
          "Preparing for technical interviews in data science and AI engineering.",
        ],
        format: "Remote · 60 min sessions, one-off or recurring · Spanish or English",
        emailSubject: "Mentoring enquiry",
      },
      es: {
        title: "Mentoría",
        tagline: "Para data scientists e ingenieros de IA",
        description:
          "Sesiones uno a uno para quien ya sabe entrenar un modelo y necesita convertirlo en algo de lo que otros dependan. He hecho mentoría a ingenieros y he fijado estándares de calidad en equipos de cliente; esto es lo mismo sin el envoltorio de consultora.",
        bullets: [
          "Orientación profesional: pasar de análisis a ingeniería, o de ingeniería a IA.",
          "Revisión de código y arquitectura sobre tu proyecto real, no sobre un ejercicio de juguete.",
          "Revisión de portfolio y CV desde el lado de la mesa que contrata.",
          "Preparación de entrevistas técnicas de data science e ingeniería de IA.",
        ],
        format: "En remoto · sesiones de 60 min, puntuales o recurrentes · español o inglés",
        emailSubject: "Consulta sobre mentoría",
      },
    },
  },
  {
    id: "consulting",
    // Layered stack
    icon: "M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    text: {
      en: {
        title: "Freelance consulting",
        tagline: "From architecture to something that runs",
        description:
          "I take AI systems from an idea to production and stay for the part where it has to keep working. Nearly four years of client delivery in energy, insurance, SaaS, legal tech and medical imaging — and a portfolio of systems I host and operate myself, which is the honest test of whether the advice holds.",
        bullets: [
          "Architecture and technical due diligence on an AI system before you commit to building it.",
          "LLM and agentic pipelines: RAG, structured extraction, evaluation harnesses, LLM-as-judge.",
          "Open-source LLMs deployed on your own infrastructure when data cannot leave the building.",
          "Predictive modelling, computer vision and forecasting, taken through to deployment.",
          "Rescuing a proof of concept that works on a laptop and nowhere else.",
        ],
        format: "Remote, Madrid-based · by project or by retainer · Spanish or English",
        emailSubject: "Consulting enquiry",
      },
      es: {
        title: "Consultoría freelance",
        tagline: "De la arquitectura a algo que funciona",
        description:
          "Llevo sistemas de IA desde la idea hasta producción y me quedo para la parte en la que tienen que seguir funcionando. Casi cuatro años entregando para clientes de energía, seguros, SaaS, legal tech e imagen médica — y un portfolio de sistemas que alojo y opero yo mismo, que es la prueba honesta de si el consejo se sostiene.",
        bullets: [
          "Arquitectura y due diligence técnica de un sistema de IA antes de comprometerte a construirlo.",
          "Pipelines con LLMs y agénticos: RAG, extracción estructurada, marcos de evaluación, LLM como juez.",
          "LLMs de código abierto desplegados en tu propia infraestructura cuando los datos no pueden salir.",
          "Modelado predictivo, visión por computador y predicción de series, llevados hasta el despliegue.",
          "Rescatar una prueba de concepto que funciona en un portátil y en ningún otro sitio.",
        ],
        format: "En remoto, con base en Madrid · por proyecto o por retainer · español o inglés",
        emailSubject: "Consulta sobre consultoría",
      },
    },
  },
];

export const getServices = (lang: Lang) =>
  services.map(({ text, ...rest }) => ({ ...rest, ...text[lang] }));

export type Service = ReturnType<typeof getServices>[number];

/** Page-level intro copy for /services. */
export const servicesIntro: Record<Lang, { lead: string; seoDescription: string }> = {
  en: {
    lead: "I work with teams that need AI systems to actually reach production — and with people who want to build them. Talks, mentoring and consulting, in Spanish or English.",
    seoDescription:
      "Talks, workshops, mentoring and freelance AI consulting by Christopher Manzano Vimos — Data Scientist and AI Engineer in Madrid. Production AI, LLM and agentic pipelines, MLOps. Available in Spanish and English.",
  },
  es: {
    lead: "Trabajo con equipos que necesitan que sus sistemas de IA lleguen de verdad a producción, y con personas que quieren aprender a construirlos. Charlas, mentoría y consultoría, en español o en inglés.",
    seoDescription:
      "Charlas, talleres, mentoría y consultoría freelance de IA con Christopher Manzano Vimos — Data Scientist e Ingeniero de IA en Madrid. IA en producción, LLMs y pipelines agénticos, MLOps. Disponible en español e inglés.",
  },
};
