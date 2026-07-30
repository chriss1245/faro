// Academic work — the bachelor thesis plus the university case studies worth
// showing. Single source of truth for /academia and the home-page teaser.
//
// Everything here is public and citable: the thesis is archived on Zenodo with
// a DOI, and each case study points at its own public repository. Keep it that
// way — no unpublished coursework, no dead links.
//
// Identifiers, dates and URLs are declared once; prose and keywords are keyed
// by locale. Use getThesis(lang) / getAcademicProjects(lang).

import type { Lang } from "../i18n/config";

interface ThesisText {
  /** e.g. "Bachelor Thesis" — the work type. */
  kind: string;
  degree: string;
  institution: string;
  /** Human-readable defence date. */
  defended: string;
  /** Lead-in sentence used on cards and in meta descriptions. */
  summary: string;
  /** Body paragraphs for the detail block. */
  abstract: string[];
  /** "What's actually in it" bullets — the contributions. */
  contributions: string[];
  /** Evaluation setup, rendered as a labelled table. */
  evaluation: { label: string; value: string }[];
  keywords: string[];
  licenseLabel: string;
}

const thesisShared = {
  title: "Reinforcement Learning in Portfolio Management",
  /** ISO date, for JSON-LD and <time>. */
  datePublished: "2023-09-05",
  supervisor: "Francisco Javier Nogales Martín",
  /** Bare DOI, no URL prefix. */
  doi: "10.5281/zenodo.21541556",
  /** Zenodo landing page. */
  recordUrl: "https://zenodo.org/records/21541556",
  /** Direct PDF. */
  pdfUrl:
    "https://zenodo.org/api/records/21541556/files/Manzano-Vimos-2023-Reinforcement-Learning-in-Portfolio-Management.pdf/content",
  /** Public source code. */
  codeUrl: "https://github.com/chriss1245/reinforcement_learning_in_finance",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
};

const thesisText: Record<Lang, ThesisText> = {
  en: {
    kind: "Bachelor Thesis",
    degree: "Bachelor in Data Science and Engineering",
    institution: "Universidad Carlos III de Madrid",
    defended: "September 2023",
    summary:
      "A Deep Reinforcement Learning agent that manages a portfolio end to end — deciding not just how to rebalance, but whether to rebalance at all.",
    abstract: [
      "Most machine learning in finance ends up as a supplementary tool for a human expert: it forecasts a return, scores a signal, flags a risk, and a person still makes the call. This thesis asks what it takes to close that loop — to design a Deep Reinforcement Learning system that manages a portfolio as an independent decision-maker, optimising allocation rather than merely informing it.",
      "The agent is built on a Temporal Convolutional Network pre-trained on a supervised return-forecasting task and then transferred as a frozen state encoder, so the representation of market history is learned separately from the allocation policy. On top of it sits a Soft Actor-Critic (SACv2) agent, with actor variants that place either a Normal or a Dirichlet distribution over the portfolio simplex, and critic variants using bilinear and single-head attention mechanisms.",
      "Two design choices matter most. A confidence score lets the agent decide whether rebalancing is warranted at all, not only how to reallocate — which makes it agnostic to the granularity of the decision interval. And randomly permuting assets during training pushes the policy to be company-agnostic, learning from market structure instead of memorising tickers. Mixup augmentation across price channels rounds out the training recipe.",
    ],
    contributions: [
      "TCN backbone pre-trained on supervised return forecasting, then frozen and transferred as the state encoder — separating representation learning from policy learning.",
      "Soft Actor-Critic (SACv2) with Normal and Dirichlet actor variants over the portfolio simplex, so allocations are valid weights by construction.",
      "Critic variants built on bilinear and single-head attention mechanisms.",
      "A confidence score that lets the agent skip rebalancing, making it granularity-agnostic rather than tied to a fixed trading cadence.",
      "Random asset permutation during training to encourage company-agnostic policies, plus mixup augmentation across price channels.",
      "Benchmarked against equal-weight (with and without rebalancing), minimum-volatility and maximum-Sharpe efficient-frontier portfolios, and a random agent.",
    ],
    evaluation: [
      { label: "Universe", value: "S&P 500, chronological splits" },
      { label: "Training", value: "1986 – 2008" },
      { label: "Validation", value: "2009 – 2016" },
      { label: "Test", value: "2017 – 2023, unseen companies" },
      { label: "Baselines", value: "Equal-weight, min-volatility, max-Sharpe, random" },
      { label: "Stated limitations", value: "Simulated environment; survivorship bias in the data" },
    ],
    keywords: [
      "Portfolio Management",
      "Deep Reinforcement Learning",
      "Soft Actor-Critic",
      "Temporal Convolutional Network",
      "Quantitative Finance",
      "Modern Portfolio Theory",
    ],
    licenseLabel: "CC BY-NC-ND 4.0",
  },
  es: {
    kind: "Trabajo de Fin de Grado",
    degree: "Grado en Ciencia e Ingeniería de Datos",
    institution: "Universidad Carlos III de Madrid",
    defended: "Septiembre de 2023",
    summary:
      "Un agente de aprendizaje por refuerzo profundo que gestiona una cartera de principio a fin, decidiendo no solo cómo rebalancear, sino si conviene rebalancear.",
    abstract: [
      "Casi todo el machine learning aplicado a finanzas acaba siendo una herramienta de apoyo para un experto humano: predice un retorno, puntúa una señal, marca un riesgo, y la decisión sigue tomándola una persona. Esta tesis se pregunta qué hace falta para cerrar ese círculo: diseñar un sistema de aprendizaje por refuerzo profundo que gestione una cartera como decisor autónomo, optimizando la asignación en lugar de limitarse a informarla.",
      "El agente se construye sobre una Temporal Convolutional Network preentrenada en una tarea supervisada de predicción de retornos y transferida después como codificador de estado congelado, de modo que la representación del histórico de mercado se aprende por separado de la política de asignación. Encima se sitúa un agente Soft Actor-Critic (SACv2), con variantes de actor que colocan una distribución Normal o de Dirichlet sobre el simplex de la cartera, y variantes de crítico basadas en mecanismos bilineales y de atención de una cabeza.",
      "Hay dos decisiones de diseño que pesan más que el resto. Una puntuación de confianza permite al agente decidir si el rebalanceo tiene sentido, y no solo cómo reasignar, lo que lo vuelve indiferente a la granularidad del intervalo de decisión. Y permutar los activos al azar durante el entrenamiento empuja a la política a ser agnóstica a la empresa: aprende de la estructura del mercado en lugar de memorizar tickers. La receta de entrenamiento se completa con aumentación mixup entre canales de precio.",
    ],
    contributions: [
      "Backbone TCN preentrenado en predicción supervisada de retornos, congelado después y transferido como codificador de estado, separando el aprendizaje de la representación del de la política.",
      "Soft Actor-Critic (SACv2) con variantes de actor Normal y Dirichlet sobre el simplex de la cartera, de forma que las asignaciones son pesos válidos por construcción.",
      "Variantes de crítico construidas sobre mecanismos bilineales y de atención de una cabeza.",
      "Una puntuación de confianza que permite al agente no rebalancear, lo que lo hace agnóstico a la granularidad en lugar de atado a una cadencia fija de operación.",
      "Permutación aleatoria de activos durante el entrenamiento para favorecer políticas agnósticas a la empresa, más aumentación mixup entre canales de precio.",
      "Comparado con carteras de pesos iguales (con y sin rebalanceo), de mínima volatilidad y de máximo Sharpe en la frontera eficiente, y con un agente aleatorio.",
    ],
    evaluation: [
      { label: "Universo", value: "S&P 500, particiones cronológicas" },
      { label: "Entrenamiento", value: "1986 – 2008" },
      { label: "Validación", value: "2009 – 2016" },
      { label: "Test", value: "2017 – 2023, empresas no vistas" },
      { label: "Referencias", value: "Pesos iguales, mínima volatilidad, máximo Sharpe, aleatorio" },
      {
        label: "Limitaciones declaradas",
        value: "Entorno simulado; sesgo de supervivencia en los datos",
      },
    ],
    keywords: [
      "Gestión de carteras",
      "Aprendizaje por refuerzo profundo",
      "Soft Actor-Critic",
      "Temporal Convolutional Network",
      "Finanzas cuantitativas",
      "Teoría moderna de carteras",
    ],
    licenseLabel: "CC BY-NC-ND 4.0",
  },
};

export const getThesis = (lang: Lang) => ({ ...thesisShared, ...thesisText[lang] });
export type Thesis = ReturnType<typeof getThesis>;

interface AcademicProjectText {
  title: string;
  /** Short course/context line. */
  context: string;
  description: string;
  /** Methods, rendered as chips. */
  methods: string[];
  /** Label for reportUrl. */
  reportLabel?: string;
}

interface AcademicProjectDef {
  year: string;
  repoUrl: string;
  /** Optional rendered report/notebook to read without cloning. */
  reportUrl?: string;
  text: Record<Lang, AcademicProjectText>;
}

// Newest first.
const academicDefs: AcademicProjectDef[] = [
  {
    year: "2022",
    repoUrl: "https://github.com/chriss1245/latent_dirichlet_allocation-case-study",
    // The knitted report is published on the repo's own GitHub Pages, so no
    // third-party HTML renderer is involved.
    reportUrl: "https://chriss1245.github.io/latent_dirichlet_allocation-case-study/",
    text: {
      en: {
        title: "Topic modelling with Latent Dirichlet Allocation",
        context: "Topic modelling case study",
        description:
          "An applied LDA study on a corpus of tweets: fitting the generative topic model, choosing the number of topics, and reading the resulting topic-term distributions as something a human can actually interpret.",
        methods: ["LDA", "Topic modelling", "Bayesian inference", "R"],
        reportLabel: "Read the write-up",
      },
      es: {
        title: "Modelado de temas con Latent Dirichlet Allocation",
        context: "Caso práctico de modelado de temas",
        description:
          "Un estudio aplicado de LDA sobre un corpus de tuits: ajuste del modelo generativo de temas, elección del número de temas y lectura de las distribuciones tema-término resultantes como algo que una persona pueda interpretar de verdad.",
        methods: ["LDA", "Modelado de temas", "Inferencia bayesiana", "R"],
        reportLabel: "Leer el análisis",
      },
    },
  },
  {
    year: "2022",
    repoUrl: "https://github.com/chriss1245/death_penalty_nlp",
    reportUrl: "https://chriss1245.github.io/death_penalty_nlp/",
    text: {
      en: {
        title: "Stance detection on death-penalty tweets",
        context: "Natural language processing case study",
        description:
          "A Naive Bayes classifier that decides whether a tweet argues for or against the death penalty — text preprocessing, feature construction and evaluation on a hand-labelled Twitter corpus.",
        methods: ["Naive Bayes", "NLP", "Text classification", "R"],
        reportLabel: "Read the write-up",
      },
      es: {
        title: "Detección de postura en tuits sobre la pena de muerte",
        context: "Caso práctico de procesamiento de lenguaje natural",
        description:
          "Un clasificador Naive Bayes que decide si un tuit se posiciona a favor o en contra de la pena de muerte: preprocesado del texto, construcción de características y evaluación sobre un corpus de Twitter etiquetado a mano.",
        methods: ["Naive Bayes", "PLN", "Clasificación de texto", "R"],
        reportLabel: "Leer el análisis",
      },
    },
  },
  {
    year: "2020",
    repoUrl: "https://github.com/chriss1245/face-recognizer_with_fda_pca_knn",
    reportUrl:
      "https://github.com/chriss1245/face-recognizer_with_fda_pca_knn/blob/master/Assignment%202%20Report.pdf",
    text: {
      en: {
        title: "Face recognition with FDA, PCA and k-NN",
        context: "Multivariate analysis assignment",
        description:
          "A classical face-recognition pipeline built from the statistics up, on 25 identities from the Faces96 database: PCA for dimensionality reduction on raw images, Fisher discriminant analysis for a class-separating projection, and k-NN for the decision — with an impostor set and a reject label, so unknown faces are turned away rather than forced into a class.",
        methods: ["PCA", "Fisher discriminant analysis", "k-NN", "R"],
        reportLabel: "Read the report (PDF)",
      },
      es: {
        title: "Reconocimiento facial con FDA, PCA y k-NN",
        context: "Práctica de análisis multivariante",
        description:
          "Un pipeline clásico de reconocimiento facial construido desde la estadística, sobre 25 identidades de la base de datos Faces96: PCA para reducir dimensionalidad sobre las imágenes en bruto, análisis discriminante de Fisher para una proyección que separe clases, y k-NN para la decisión — con un conjunto de impostores y una etiqueta de rechazo, de modo que las caras desconocidas se descartan en lugar de forzarlas a una clase.",
        methods: ["PCA", "Análisis discriminante de Fisher", "k-NN", "R"],
        reportLabel: "Leer el informe (PDF)",
      },
    },
  },
];

export const getAcademicProjects = (lang: Lang) =>
  academicDefs.map(({ text, ...rest }) => ({ ...rest, ...text[lang] }));

export type AcademicProject = ReturnType<typeof getAcademicProjects>[number];
