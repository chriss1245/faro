// CV content, extracted from the page so it can be translated.
//
// Organisation names, periods and technology names are shared; prose is keyed by
// locale. Skill *items* are mostly proper nouns (AWS, LangGraph, MLflow) and stay
// as-is; only genuinely translatable ones live in the per-locale lists.

import type { Lang } from "../i18n/config";

interface Client {
  name: string;
  points: string[];
}

interface Job {
  role: string;
  org: string;
  period: string;
  summary: string;
  clients: Client[];
}

interface EducationEntry {
  title: string;
  org: string;
  period: string;
  note?: string;
  /** Optional route key appended to the note as a link (e.g. "/academia"). */
  noteRoute?: string;
}

interface SkillGroup {
  label: string;
  items: string[];
}

interface LanguageEntry {
  name: string;
  level: string;
}

interface CvText {
  summary: string;
  experience: Job[];
  education: EducationEntry[];
  skills: SkillGroup[];
  languages: LanguageEntry[];
}

const cv: Record<Lang, CvText> = {
  en: {
    summary:
      "Data scientist and AI engineer with end-to-end ownership of production AI systems: architecture, key technical decisions, deployment and operation. Nearly four years shipping ML, NLP and Generative AI for clients in energy, insurance, SaaS, legal tech and medical imaging (US DoD-funded research). Experienced deploying open-source LLMs on private infrastructure and building agentic pipelines with LangChain and LangGraph. Outside client work I design, build and operate my own AI products end to end at manapple.dev.",
    experience: [
      {
        role: "AI & Machine Learning Engineer · AI Consultant",
        org: "WhiteBoxML",
        period: "Madrid · Sept 2022 — Present",
        summary:
          "End-to-end technical ownership of production AI systems for enterprise clients: architecture, delivery and functional leadership. Coordinated and mentored engineers, defining quality standards for ML, NLP and GenAI systems built for scalability, maintainability and business value.",
        clients: [
          {
            name: "Iberdrola — renewable-energy forecasting (AWS)",
            points: [
              "Designed distributed ML pipelines forecasting output for 200+ renewable plants across the US, Spain and the UK, ingesting 2 TB of data daily.",
              "Built ingestion and normalization of meteorological data from ECMWF, GFS and WRF, engineered for reproducibility and robustness in production.",
            ],
          },
          {
            name: "Intermundial — LLM claims automation",
            points: [
              "Architected LangChain/LangGraph pipelines for hierarchical document classification and information extraction, reaching over 90% accuracy on identity fields (DNI, NIE, passport).",
              "Built an LLM-as-judge evaluation framework and deployed open-source LLMs on private infrastructure under data-privacy constraints.",
            ],
          },
          {
            name: "Nexudus — predictive models & GenAI (SaaS)",
            points: [
              "Churn-prediction and occupancy-forecasting models driving retention, pricing and capacity decisions.",
              "Led the Generative-AI workflows behind automated content for the Flexspace Observatory blog.",
            ],
          },
          {
            name: "Bid Genius — LLM assistant for public tendering",
            points: [
              "Early-stage build of a proprietary LLM tool for assisted generation of tender documentation — solving long-document coherence and context management.",
            ],
          },
          {
            name: "JOT Internet Media — NLP keyword classification",
            points: [
              "Multi-stage hierarchical classifier based on RoBERTa for Google Ads keyword ranking, fine-tuning Hugging Face models on digital-marketing data.",
            ],
          },
          {
            name: "Fen (US Department of Defense) — medical AI research",
            points: [
              "Computer-vision models for hernia detection, vertebral segmentation and scoliosis/lordosis detection to support radiologists, delivered as a clinical web application.",
            ],
          },
        ],
      },
    ],
    education: [
      {
        title: "M.Sc. in Language Technologies (NLP)",
        org: "UNED",
        period: "2025 — Present",
      },
      {
        title: "B.Sc. in Data Science & Engineering",
        org: "Universidad Carlos III de Madrid",
        period: "2019 — 2023",
        note: "Thesis: Reinforcement Learning in Portfolio Management — a Soft Actor-Critic agent over a TCN encoder, benchmarked on 37 years of S&P 500 data.",
        noteRoute: "/academia",
      },
      {
        title: "42 Madrid",
        org: "Fundación Telefónica",
        period: "2021 — 2022",
        note: "Intensive, project-based software-engineering program focused on autonomy and technical judgment.",
      },
    ],
    skills: [
      {
        label: "GenAI & NLP",
        items: [
          "Open-source LLMs (private deployment)",
          "LangGraph",
          "Agentic workflows",
          "Agentic RAG",
          "Hugging Face",
          "Fine-tuning",
        ],
      },
      {
        label: "ML & Deep Learning",
        items: [
          "Predictive modeling",
          "Computer vision",
          "Time-series forecasting",
          "Reinforcement learning",
          "Experiment design",
        ],
      },
      {
        label: "MLOps & Cloud",
        items: ["AWS", "BigQuery", "Snowflake", "Databricks", "MLflow", "Distributed processing"],
      },
      {
        label: "Leadership",
        items: [
          "Technical mentoring",
          "Architecture decisions",
          "Project management",
          "Stakeholder communication",
        ],
      },
    ],
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Full professional (Trinity ISE II)" },
      { name: "French", level: "Basic" },
    ],
  },
  es: {
    summary:
      "Data scientist e ingeniero de IA con responsabilidad de principio a fin sobre sistemas de IA en producción: arquitectura, decisiones técnicas clave, despliegue y operación. Casi cuatro años entregando ML, PLN e IA generativa para clientes de energía, seguros, SaaS, legal tech e imagen médica (investigación financiada por el Departamento de Defensa de EE. UU.). Experiencia despegando LLMs de código abierto en infraestructura privada y construyendo pipelines agénticos con LangChain y LangGraph. Fuera del trabajo con clientes, diseño, construyo y opero mis propios productos de IA de principio a fin en manapple.dev.",
    experience: [
      {
        role: "Ingeniero de IA y Machine Learning · Consultor de IA",
        org: "WhiteBoxML",
        period: "Madrid · Sept. 2022 — Actualidad",
        summary:
          "Responsabilidad técnica de principio a fin de sistemas de IA en producción para clientes corporativos: arquitectura, entrega y liderazgo funcional. Coordinación y mentoría de ingenieros, definiendo estándares de calidad para sistemas de ML, PLN e IA generativa pensados para escalar, mantenerse y aportar valor de negocio.",
        clients: [
          {
            name: "Iberdrola — predicción de energía renovable (AWS)",
            points: [
              "Diseño de pipelines de ML distribuidos para predecir la producción de más de 200 plantas renovables en EE. UU., España y Reino Unido, ingiriendo 2 TB de datos al día.",
              "Construcción de la ingesta y normalización de datos meteorológicos de ECMWF, GFS y WRF, diseñada para ser reproducible y robusta en producción.",
            ],
          },
          {
            name: "Intermundial — automatización de siniestros con LLMs",
            points: [
              "Arquitectura de pipelines LangChain/LangGraph para clasificación jerárquica de documentos y extracción de información, superando el 90 % de acierto en campos de identidad (DNI, NIE, pasaporte).",
              "Construcción de un marco de evaluación con LLM como juez y despliegue de LLMs de código abierto en infraestructura privada bajo requisitos de privacidad de datos.",
            ],
          },
          {
            name: "Nexudus — modelos predictivos e IA generativa (SaaS)",
            points: [
              "Modelos de predicción de abandono y de ocupación para decisiones de retención, precios y capacidad.",
              "Dirección de los flujos de IA generativa detrás del contenido automatizado del blog Flexspace Observatory.",
            ],
          },
          {
            name: "Bid Genius — asistente LLM para licitación pública",
            points: [
              "Desarrollo inicial de una herramienta propia con LLMs para la generación asistida de documentación de licitaciones, resolviendo la coherencia en documentos largos y la gestión del contexto.",
            ],
          },
          {
            name: "JOT Internet Media — clasificación de keywords con PLN",
            points: [
              "Clasificador jerárquico multietapa basado en RoBERTa para el ranking de keywords de Google Ads, con fine-tuning de modelos de Hugging Face sobre datos de marketing digital.",
            ],
          },
          {
            name: "Fen (Departamento de Defensa de EE. UU.) — investigación en IA médica",
            points: [
              "Modelos de visión por computador para detección de hernias, segmentación vertebral y detección de escoliosis y lordosis como apoyo a radiólogos, entregados como aplicación web clínica.",
            ],
          },
        ],
      },
    ],
    education: [
      {
        title: "Máster en Tecnologías del Lenguaje (PLN)",
        org: "UNED",
        period: "2025 — Actualidad",
      },
      {
        title: "Grado en Ciencia e Ingeniería de Datos",
        org: "Universidad Carlos III de Madrid",
        period: "2019 — 2023",
        note: "TFG: Reinforcement Learning in Portfolio Management — un agente Soft Actor-Critic sobre un codificador TCN, evaluado con 37 años de datos del S&P 500.",
        noteRoute: "/academia",
      },
      {
        title: "42 Madrid",
        org: "Fundación Telefónica",
        period: "2021 — 2022",
        note: "Programa intensivo de ingeniería de software basado en proyectos, centrado en la autonomía y el criterio técnico.",
      },
    ],
    skills: [
      {
        label: "IA generativa y PLN",
        items: [
          "LLMs de código abierto (despliegue privado)",
          "LangGraph",
          "Flujos agénticos",
          "RAG agéntico",
          "Hugging Face",
          "Fine-tuning",
        ],
      },
      {
        label: "ML y deep learning",
        items: [
          "Modelado predictivo",
          "Visión por computador",
          "Predicción de series temporales",
          "Aprendizaje por refuerzo",
          "Diseño de experimentos",
        ],
      },
      {
        label: "MLOps y cloud",
        items: ["AWS", "BigQuery", "Snowflake", "Databricks", "MLflow", "Procesamiento distribuido"],
      },
      {
        label: "Liderazgo",
        items: [
          "Mentoría técnica",
          "Decisiones de arquitectura",
          "Gestión de proyectos",
          "Comunicación con stakeholders",
        ],
      },
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Profesional completo (Trinity ISE II)" },
      { name: "Francés", level: "Básico" },
    ],
  },
};

export const getCv = (lang: Lang): CvText => cv[lang];
