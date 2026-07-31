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
/**
 * Questions people actually ask before enquiring.
 *
 * This block does double duty: it removes the friction that stops someone
 * sending the first email, and it is the single most extractable format for
 * AI answer engines — a direct question followed by a direct answer. It is
 * rendered as `FAQPage` JSON-LD on the services page.
 *
 * Keep answers factual and first-person. No invented figures: anything about
 * rates stays "quoted per engagement" until there is a public number to give.
 */
export const faq: Record<Lang, { q: string; a: string }[]> = {
  en: [
    {
      q: "What kind of work do you take on?",
      a: "Three things: talks and workshops, one-to-one mentoring, and freelance consulting on production AI. The consulting work is usually one of two shapes — a system that works in a notebook and needs to become something you can run and be on call for, or a model already in production that nobody can quite explain or afford.",
    },
    {
      q: "Do you work remotely?",
      a: "Yes. I'm based in Madrid, Spain, and work remotely with teams anywhere in a compatible timezone. For talks and workshops I also travel on-site.",
    },
    {
      q: "What languages do you work in?",
      a: "Spanish and English, both fully. Talks, workshops and written deliverables are available in either.",
    },
    {
      q: "How do you price your work?",
      a: "Per engagement rather than from a public rate card, because a 45-minute talk and a multi-week consulting engagement are not the same unit. Tell me the shape of the problem and I'll come back with a scope and a price.",
    },
    {
      q: "What does a typical engagement look like?",
      a: "It starts with a short call to work out whether I'm actually the right person — I'd rather say no early than bill you to find out. From there, a written scope with a defined deliverable. Talks run from 45 minutes to a full-day hands-on workshop, and workshops leave the team with a repository they keep.",
    },
    {
      q: "What technologies do you work with?",
      a: "Python across the board. LangGraph and multi-agent orchestration, LLM APIs with structured output, FastAPI services, and the operational half — containerised deploys, reverse proxying, SSO, Postgres, and CI that ships on push. I also come from a quantitative background: reinforcement learning, valuation models and time series.",
    },
    {
      q: "Can I see something you've actually built?",
      a: "Yes, and without creating an account. Warren and Gollum are both live and both have a read-only guest mode, so you can follow the full reasoning end to end. The write-ups on the blog cover the architecture decisions behind them.",
    },
  ],
  es: [
    {
      q: "¿Qué tipo de trabajo aceptas?",
      a: "Tres cosas: charlas y talleres, mentoría individual y consultoría freelance sobre IA en producción. La consultoría suele tener una de dos formas — un sistema que funciona en un notebook y necesita convertirse en algo que puedas operar y del que estés de guardia, o un modelo ya en producción que nadie sabe explicar del todo o cuyo coste se ha ido de las manos.",
    },
    {
      q: "¿Trabajas en remoto?",
      a: "Sí. Estoy en Madrid, España, y trabajo en remoto con equipos en cualquier franja horaria compatible. Para charlas y talleres también me desplazo presencialmente.",
    },
    {
      q: "¿En qué idiomas trabajas?",
      a: "Español e inglés, ambos sin limitaciones. Las charlas, los talleres y las entregas escritas están disponibles en cualquiera de los dos.",
    },
    {
      q: "¿Cómo calculas el precio?",
      a: "Por encargo, no con una tarifa pública, porque una charla de 45 minutos y una consultoría de varias semanas no son la misma unidad. Cuéntame la forma del problema y te respondo con un alcance y un precio.",
    },
    {
      q: "¿Cómo es un encargo típico?",
      a: "Empieza con una llamada corta para averiguar si soy de verdad la persona adecuada — prefiero decir que no pronto antes que cobrarte por descubrirlo. A partir de ahí, un alcance por escrito con un entregable definido. Las charlas van desde 45 minutos hasta un taller práctico de día completo, y los talleres dejan al equipo un repositorio que se queda.",
    },
    {
      q: "¿Con qué tecnologías trabajas?",
      a: "Python de principio a fin. LangGraph y orquestación multiagente, APIs de LLMs con salida estructurada, servicios en FastAPI, y la mitad operativa — despliegues en contenedores, proxy inverso, SSO, Postgres y CI que despliega al hacer push. Además vengo de un perfil cuantitativo: aprendizaje por refuerzo, modelos de valoración y series temporales.",
    },
    {
      q: "¿Puedo ver algo que hayas construido de verdad?",
      a: "Sí, y sin crearte una cuenta. Warren y Gollum están funcionando y ambos tienen modo invitado en solo lectura, así que puedes seguir el razonamiento completo. Los artículos del blog explican las decisiones de arquitectura que hay detrás.",
    },
  ],
};

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
