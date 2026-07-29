// Academic work — the bachelor thesis plus the university case studies worth
// showing. Single source of truth for /academia and the home-page teaser.
//
// Everything here is public and citable: the thesis is archived on Zenodo with
// a DOI, and each case study points at its own public repository. Keep it that
// way — no unpublished coursework, no dead links.

export interface Thesis {
  title: string;
  /** e.g. "Bachelor Thesis" — shown as the work type. */
  kind: string;
  degree: string;
  institution: string;
  /** Human-readable defence date. */
  defended: string;
  /** ISO date, for JSON-LD and <time>. */
  datePublished: string;
  supervisor: string;
  /** Bare DOI, no URL prefix. */
  doi: string;
  /** Zenodo landing page. */
  recordUrl: string;
  /** Direct PDF. */
  pdfUrl: string;
  /** Public source code, if any. */
  codeUrl?: string;
  /** Lead-in sentence used on cards and in meta descriptions. */
  summary: string;
  /** Body paragraphs for the detail block. */
  abstract: string[];
  /** "What's actually in it" bullets — the contributions. */
  contributions: string[];
  /** Evaluation setup, rendered as a labelled table. */
  evaluation: { label: string; value: string }[];
  keywords: string[];
  license: { label: string; url: string };
}

export const thesis: Thesis = {
  title: "Reinforcement Learning in Portfolio Management",
  kind: "Bachelor Thesis",
  degree: "Bachelor in Data Science and Engineering",
  institution: "Universidad Carlos III de Madrid",
  defended: "September 2023",
  datePublished: "2023-09-05",
  supervisor: "Francisco Javier Nogales Martín",
  doi: "10.5281/zenodo.21541556",
  recordUrl: "https://zenodo.org/records/21541556",
  pdfUrl:
    "https://zenodo.org/api/records/21541556/files/Manzano-Vimos-2023-Reinforcement-Learning-in-Portfolio-Management.pdf/content",
  codeUrl: "https://github.com/chriss1245/reinforcement_learning_in_finance",
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
    {
      label: "Stated limitations",
      value: "Simulated environment; survivorship bias in the data",
    },
  ],
  keywords: [
    "Portfolio Management",
    "Deep Reinforcement Learning",
    "Soft Actor-Critic",
    "Temporal Convolutional Network",
    "Quantitative Finance",
    "Modern Portfolio Theory",
  ],
  license: {
    label: "CC BY-NC-ND 4.0",
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
  },
};

export interface AcademicProject {
  title: string;
  /** Short course/context line, e.g. "Statistical Learning · 2022". */
  context: string;
  year: string;
  description: string;
  /** Methods, rendered as chips. */
  methods: string[];
  repoUrl: string;
  /** Optional rendered report/notebook to read without cloning. */
  reportUrl?: string;
  /** Label for reportUrl, e.g. "Read the report". */
  reportLabel?: string;
}

// Newest first.
export const academicProjects: AcademicProject[] = [
  {
    title: "Topic modelling with Latent Dirichlet Allocation",
    context: "Topic modelling case study",
    year: "2022",
    description:
      "An applied LDA study on a corpus of tweets: fitting the generative topic model, choosing the number of topics, and reading the resulting topic-term distributions as something a human can actually interpret.",
    methods: ["LDA", "Topic modelling", "Bayesian inference", "R"],
    repoUrl: "https://github.com/chriss1245/latent_dirichlet_allocation-case-study",
    reportUrl:
      "https://htmlpreview.github.io/?https://github.com/chriss1245/latent_dirichlet_allocation-case-study/blob/master/index.html",
    reportLabel: "Read the write-up",
  },
  {
    title: "Stance detection on death-penalty tweets",
    context: "Natural language processing case study",
    year: "2022",
    description:
      "A Naive Bayes classifier that decides whether a tweet argues for or against the death penalty — text preprocessing, feature construction and evaluation on a hand-labelled Twitter corpus.",
    methods: ["Naive Bayes", "NLP", "Text classification", "R"],
    repoUrl: "https://github.com/chriss1245/death_penalty_nlp",
    reportUrl:
      "https://htmlpreview.github.io/?https://github.com/chriss1245/death_penalty_nlp/blob/master/Exercise.html",
    reportLabel: "Read the write-up",
  },
  {
    title: "Face recognition with FDA, PCA and k-NN",
    context: "Multivariate analysis assignment",
    year: "2020",
    description:
      "A classical face-recognition pipeline built from the statistics up, on 25 identities from the Faces96 database: PCA for dimensionality reduction on raw images, Fisher discriminant analysis for a class-separating projection, and k-NN for the decision — with an impostor set and a reject label, so unknown faces are turned away rather than forced into a class.",
    methods: ["PCA", "Fisher discriminant analysis", "k-NN", "R"],
    repoUrl: "https://github.com/chriss1245/face-recognizer_with_fda_pca_knn",
    reportUrl:
      "https://github.com/chriss1245/face-recognizer_with_fda_pca_knn/blob/master/Assignment%202%20Report.pdf",
    reportLabel: "Read the report (PDF)",
  },
];
