// UI strings. Longer prose lives with its content in src/data/*; this file is
// for chrome: navigation, buttons, section headings, labels.
//
// Adding a key to `en` makes TypeScript demand it in `es` too, so a forgotten
// translation is a build-time error rather than an English word on a Spanish
// page.

import type { Lang } from "./config";

const en = {
  // Navigation
  "nav.work": "Work",
  "nav.academia": "Academia",
  "nav.services": "Services",
  "nav.writing": "Blog",
  "nav.cv": "CV",
  "nav.contact": "Get in touch",
  "nav.home": "home",
  "nav.switchLang": "Ver en español",

  // Home
  "home.eyebrow": "Data Scientist · building in public",
  "home.intro": "I'm",
  "home.ctaWork": "See my work",
  "home.ctaCv": "Read the CV",
  "home.work.eyebrow": "portfolio",
  "home.work.title": "Selected work",
  "home.work.note": "A small set today, growing fast. Each one is something I'm actually running.",
  "home.academia.eyebrow": "academia",
  "home.academia.title": "Research",
  "home.academia.cta": "View academic work",

  // Focus chips
  "focus.llm": "LLM-powered analysis",
  "focus.quant": "Quant & fundamentals",
  "focus.infra": "Self-hosted infra",
  "focus.public": "Shipping in public",

  // Projects
  "project.status.live": "Live",
  "project.status.building": "Building",
  "project.status.soon": "Coming soon",
  "project.view": "View project",
  "project.launch": "Launch",
  "project.readWriteup": "Read the write-up",
  "project.overview": "overview",
  "project.howItWorks": "how it works",
  "project.stack": "stack",
  "project.back": "← Back to all work",
  "project.breadcrumb": "Work",

  // Stack group labels
  "stack.orchestration": "Orchestration",
  "stack.reasoning": "Reasoning",
  "stack.analysis": "Analysis",
  "stack.platform": "Platform",
  "stack.scraping": "Scraping",
  "stack.ranking": "Ranking",
  "stack.vision": "Vision",
  "stack.alerting": "Alerting",

  // Academia
  "academia.eyebrow": "academia",
  "academia.title": "Research & academic work",
  "academia.thesisEyebrow": "bachelor thesis",
  "academia.degree": "Degree",
  "academia.institution": "Institution",
  "academia.supervisor": "Supervisor",
  "academia.doi": "DOI",
  "academia.readPdf": "Read the thesis (PDF)",
  "academia.record": "Zenodo record",
  "academia.code": "Source code",
  "academia.contributions": "what's in it",
  "academia.evaluation": "evaluation",
  "academia.licensedUnder": "Licensed",
  "academia.citeAs": "Cite as",
  "academia.caseStudies": "case studies",
  "academia.readReport": "Read the report",
  "academia.sourceOnGithub": "Source on GitHub",
  "academia.fullCv": "Read the full CV →",

  // Services
  "services.eyebrow": "services",
  "services.title": "Work with me",
  "services.navTitle": "Services",
  "services.rateLabel": "Rate",
  "services.rateOnRequest": "On request",
  "services.formatLabel": "Format",
  "services.cta": "Ask about this",
  "services.contactTitle": "Something else in mind?",
  "services.contactBody":
    "If your case does not fit neatly into one of these, write to me anyway and we will figure out the right shape.",
  "services.contactCta": "Send me an email",

  // CV
  "cv.eyebrow": "curriculum vitae",
  "cv.download": "Download PDF",
  "cv.experience": "Experience",
  "cv.education": "Education",
  "cv.skills": "Skills",
  "cv.languages": "Languages",
  "cv.readIt": "Read it",
  "cv.readMore": "Read more",

  // Writing
  "writing.eyebrow": "blog",
  "writing.title": "Blog",
  "writing.heading": "Building, out loud.",
  "writing.lead": "Notes and stories from designing, breaking and shipping the things in my portfolio.",
  "writing.seoDescription": "Stories from building data products in public.",
  "writing.empty": "No posts yet — the first one is on its way.",
  "writing.englishOnlyNotice":
    "The posts are written in English — translating them well takes more care than it takes to write them, so for now they stay in the original.",
  "writing.readPost": "Read",
  "writing.back": "← All posts",

  // Contact
  "contact.title": "Let's build something.",
  "contact.body": "Open to interesting data problems and collaborations.",
  "contact.cta": "Say hello",

  // Footer / misc
  "footer.builtWith": "built with Astro",
  "notFound.eyebrow": "404",
  "notFound.title": "Lost at sea.",
  "notFound.body": "This page drifted off the map — but the beacon's still on.",
  "notFound.cta": "Back home",
} as const;

/** Every key in `en` must exist in `es`. */
type UIDict = Record<keyof typeof en, string>;

const es: UIDict = {
  // Navegación
  "nav.work": "Proyectos",
  "nav.academia": "Academia",
  "nav.services": "Servicios",
  "nav.writing": "Blog",
  "nav.cv": "CV",
  "nav.contact": "Hablemos",
  "nav.home": "inicio",
  "nav.switchLang": "View in English",

  // Home
  "home.eyebrow": "Data Scientist · construyendo en público",
  "home.intro": "Soy",
  "home.ctaWork": "Ver proyectos",
  "home.ctaCv": "Ver el CV",
  "home.work.eyebrow": "portfolio",
  "home.work.title": "Proyectos destacados",
  "home.work.note": "Pocos por ahora, pero creciendo. Todos están funcionando de verdad.",
  "home.academia.eyebrow": "academia",
  "home.academia.title": "Investigación",
  "home.academia.cta": "Ver el trabajo académico",

  // Chips de enfoque
  "focus.llm": "Análisis con LLMs",
  "focus.quant": "Cuantitativo y fundamentales",
  "focus.infra": "Infraestructura propia",
  "focus.public": "Construyendo en público",

  // Proyectos
  "project.status.live": "En producción",
  "project.status.building": "En desarrollo",
  "project.status.soon": "Próximamente",
  "project.view": "Ver proyecto",
  "project.launch": "Abrir",
  "project.readWriteup": "Leer el artículo",
  "project.overview": "resumen",
  "project.howItWorks": "cómo funciona",
  "project.stack": "stack",
  "project.back": "← Volver a proyectos",
  "project.breadcrumb": "Proyectos",

  // Etiquetas del stack
  "stack.orchestration": "Orquestación",
  "stack.reasoning": "Razonamiento",
  "stack.analysis": "Análisis",
  "stack.platform": "Plataforma",
  "stack.scraping": "Scraping",
  "stack.ranking": "Ranking",
  "stack.vision": "Visión",
  "stack.alerting": "Alertas",

  // Academia
  "academia.eyebrow": "academia",
  "academia.title": "Investigación y trabajo académico",
  "academia.thesisEyebrow": "trabajo de fin de grado",
  "academia.degree": "Titulación",
  "academia.institution": "Universidad",
  "academia.supervisor": "Tutor",
  "academia.doi": "DOI",
  "academia.readPdf": "Leer la memoria (PDF)",
  "academia.record": "Registro en Zenodo",
  "academia.code": "Código fuente",
  "academia.contributions": "qué contiene",
  "academia.evaluation": "evaluación",
  "academia.licensedUnder": "Licencia",
  "academia.citeAs": "Cómo citarlo",
  "academia.caseStudies": "casos prácticos",
  "academia.readReport": "Leer el informe",
  "academia.sourceOnGithub": "Código en GitHub",
  "academia.fullCv": "Ver el CV completo →",

  // Servicios
  "services.eyebrow": "servicios",
  "services.title": "Trabaja conmigo",
  "services.navTitle": "Servicios",
  "services.rateLabel": "Tarifa",
  "services.rateOnRequest": "A consultar",
  "services.formatLabel": "Formato",
  "services.cta": "Preguntar por esto",
  "services.contactTitle": "¿Tienes otra cosa en mente?",
  "services.contactBody":
    "Si tu caso no encaja del todo en ninguno de estos, escríbeme igualmente y le damos la forma que necesite.",
  "services.contactCta": "Escríbeme un email",

  // CV
  "cv.eyebrow": "curriculum vitae",
  "cv.download": "Descargar PDF",
  "cv.experience": "Experiencia",
  "cv.education": "Formación",
  "cv.skills": "Competencias",
  "cv.languages": "Idiomas",
  "cv.readIt": "Leerlo",
  "cv.readMore": "Leer más",

  // Blog
  "writing.eyebrow": "blog",
  "writing.title": "Blog",
  "writing.heading": "Construyendo en voz alta.",
  "writing.lead":
    "Notas e historias de diseñar, romper y poner en producción las cosas de mi portfolio.",
  "writing.seoDescription": "Historias de construir productos de datos en público.",
  "writing.empty": "Todavía no hay artículos — el primero está en camino.",
  "writing.englishOnlyNotice":
    "Los artículos están escritos en inglés — traducirlos bien cuesta más que escribirlos, así que por ahora se quedan en el original.",
  "writing.readPost": "Leer",
  "writing.back": "← Todos los artículos",

  // Contacto
  "contact.title": "Construyamos algo.",
  "contact.body": "Abierto a problemas de datos interesantes y a colaboraciones.",
  "contact.cta": "Saluda",

  // Pie / varios
  "footer.builtWith": "hecho con Astro",
  "notFound.eyebrow": "404",
  "notFound.title": "Perdido en el mar.",
  "notFound.body": "Esta página se salió del mapa — pero el faro sigue encendido.",
  "notFound.cta": "Volver al inicio",
};

export const ui: Record<Lang, UIDict> = { en, es };

/** `const t = useTranslations(lang); t("nav.cv")` */
export function useTranslations(lang: Lang) {
  return function t(key: keyof UIDict): string {
    return ui[lang][key];
  };
}

export type TFunction = ReturnType<typeof useTranslations>;
