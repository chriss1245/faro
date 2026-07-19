---
title: "warren — an AI analyst that writes investment theses"
description: "A multi-agent system that only speaks when it has something to say: a defensible buy/sell thesis, or nothing at all."
date: 2026-07-02
draft: false
---

Most stock tools throw signals at you: buy, sell, some number in a box. I wanted
the opposite. **warren** is built around a single idea — it should only speak when
it can defend what it says. Either it produces a coherent **investment thesis**,
with an entry, a take-profit and a stop-loss, or it stays quiet. No thesis, no
noise.

## Why a multi-agent design

Reaching a real thesis means holding several very different kinds of analysis in
your head at once, and no single prompt does that well. So warren is a
**multi-agent system built on LangGraph**, where each agent owns one lens:

- **Quantitative** — price action and technical structure of the market data.
- **Fundamental** — the health and quality of the business itself.
- **Macro** — the wider context the position lives in.
- **Valuation** — an intrinsic-value estimate to anchor "is this actually cheap?"

A graph coordinates them, and the LLM layer synthesises their outputs into one
narrative rather than a pile of disconnected metrics. The structure matters:
splitting the work into specialised agents keeps each step focused and auditable,
which is exactly what you want when the output is a decision about money.

## Only speaks when it has something to say

The design choice I'm most attached to is the *silence*. warren looks at my
portfolio and at candidate stocks, and for many of them the honest answer is
"there's no credible thesis here right now." Saying that clearly is more valuable
than manufacturing a recommendation. When a genuine opportunity does line up, the
thesis comes with the levels to act on it.

## Built as a real product

warren isn't a notebook — it's live. It has public sign-up, and a **read-only
guest demo** so anyone can explore what the analysis looks like without creating
an account. I own the whole thing end to end: the agent architecture, the
deployment, the auth, the operations. That full-ownership loop — design it, ship
it, run it, watch it behave in production — is the part I find most rewarding.
