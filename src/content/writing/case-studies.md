---
title: "What I've shipped for clients"
description: "Six production AI engagements across energy, insurance, medical imaging, SaaS, legal tech and search — the constraint that made each one hard, and what it took to ship."
date: 2026-07-31
draft: false
---

A list of technologies tells you what someone has touched. It doesn't tell you
what they'd do on day one of your problem.

So this is written the other way round. Six engagements from nearly four years of
consulting, each framed as the constraint that made it hard rather than the stack
it was built on — because the stack is rarely the interesting part. Every one of
these went to production for an enterprise client.

The clients are unnamed here and the details are deliberately at the level of the
problem rather than their implementation. What the systems had to survive is mine
to talk about; how their business works is not.

---

## A multinational utility — forecasting renewable output at scale

**The problem.** Predict generation for **200+ renewable plants** across the US,
Spain and the UK.

**The constraint.** Volume, and the fact that weather data is a mess. The pipeline
ingests **2 TB per day**, drawn from three separate meteorological sources —
ECMWF, GFS and WRF — that disagree about grids, formats and update cadence. At
that scale you don't get to hand-hold anything.

**What I did.** Designed distributed ML pipelines on AWS, and built the ingestion
and normalisation layer that turns three incompatible forecast sources into
something a model can consume — engineered for reproducibility and robustness in
production rather than for a good number in a notebook.

**Why that matters.** Forecasting energy output is a well-understood modelling
problem. Doing it every day, across three continents, on data that arrives late or
malformed, without a human babysitting it, is an engineering problem. The second
one is where projects die.

---

## An insurance group — LLM claims automation under privacy constraints

**The problem.** Automate claims processing: classify long documents and extract
the fields that matter.

**The constraint.** Identity documents — DNI, NIE, passport. Two hard consequences.
The accuracy bar is unforgiving, because a wrong identity field isn't a slightly
worse answer, it's a broken claim. And the data legally could not leave the
client's infrastructure, which rules out simply calling a commercial API.

**What I did.** Architected hierarchical document classification and extraction
pipelines in LangChain and LangGraph, reaching **over 90% accuracy on identity
field extraction**. Deployed open-source LLMs on private infrastructure to keep
the data inside the client's perimeter. Built an **LLM-as-judge evaluation
framework** so quality was measured continuously rather than asserted.

**Why that matters.** Most LLM projects have no idea whether they're getting
better or worse — there's a demo, then vibes. The evaluation harness is what turns
"it seems to work" into a number you can defend in a meeting, and it's usually the
first thing cut and the first thing missed.

---

## A defence-funded medical research programme — computer vision for radiology

**The problem.** Support radiologists reading spinal and abdominal imaging.

**The constraint.** Clinical decision support. The output isn't a prediction, it's
something a doctor will act on.

**What I did.** Built computer-vision models for hernia detection, vertebral
segmentation, and scoliosis and lordosis detection — delivered as a clinical web
application rather than handed over as weights and a notebook.

**Why that matters.** "Delivered as an application" is the whole sentence. A model
a clinician cannot use is a research artefact. Getting from one to the other is
most of the work and almost none of the credit.

---

## A SaaS platform — prediction that changes a decision

**The problem.** Help a workspace-management platform act on its own data.

**What I did.** Churn-prediction and occupancy-forecasting models feeding
retention, pricing and capacity decisions. Separately, led the generative-AI
workflows behind an automated content pipeline for their industry blog.

**Why that matters.** A churn model that nobody acts on is a dashboard. These were
built against specific decisions — who to intervene with, what to charge, how much
capacity to hold — which is what makes the difference between a model that gets
used and one that gets admired once.

---

## A legal-tech startup — long-document coherence in public tendering

**The problem.** Assisted generation of tender documentation, from scratch, as an
early-stage proprietary product.

**The constraint.** Tender documents are long, and they must stay internally
consistent across all of it. This is precisely where language models are weakest:
coherence degrades with length, and context management becomes the architecture
rather than a detail of it.

**What I did.** Early-stage build of the LLM tooling, working the long-document
coherence and context-management problem directly.

---

## A digital-marketing group — hierarchical NLP at ad scale

**The problem.** Rank and classify search-advertising keywords at volume.

**What I did.** A multi-stage hierarchical classifier built on RoBERTa,
fine-tuning Hugging Face models on digital-marketing data.

**Why that matters.** Not everything needs a generative model. A fine-tuned
encoder was the right tool here — cheaper, faster and more predictable than
prompting something larger. Knowing when *not* to reach for an LLM is part of the
job.

---

## And on my own time

The consulting work above is the bulk of it. Outside client hours I design, build
and operate my own AI products end to end, which is where I get to make every call
myself and live with all of it:

- **[Warren](/warren)** — a LangGraph multi-agent investment analyst that runs
  deterministic quantitative and valuation layers *before* any model is invoked,
  and declines to emit a recommendation when no credible thesis exists.
- **[Gollum](/gollum)** — an auction tracker that ranks lots by value for money
  rather than price, with on-demand vision analysis so per-call costs stay bounded.
- **The platform** — everything at manapple.dev runs on one server I own: push-to-main
  deploys, no inbound ports, single sign-on across every app. Written up in
  [Owning the whole stack](/writing/owning-the-stack).

Those are the systems I can show you in full, source and all — useful precisely
because the client work has to stay abstract.

---

## The pattern

Read together, the same instinct shows up: **decide what the system will refuse to
do, and how you'll know if it's wrong.** The claims pipeline got an evaluation
harness. Warren refuses to force a call. The forecasting pipeline was built for the
day the weather feed arrives malformed, not the day it arrives clean.

The generous, unbounded version of any of these is easier to build and demos
better. It also falls over the first time it meets real usage, real costs, or a
real question about why it said what it said.

If you're somewhere on that path — a prototype that works and a production story
that doesn't, or a model in production nobody can quite explain or afford — that's
the conversation I'm useful in. I'm at
[christopher.manzano@manapple.dev](mailto:christopher.manzano@manapple.dev), or
see [what working together looks like](/services).
