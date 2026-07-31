---
title: "Four systems, and what they'd cost you to get wrong"
description: "Case studies from production: a multi-agent investment analyst, an auction valuation engine, a course generator, and the platform all three run on."
date: 2026-07-31
draft: false
---

A portfolio that lists technologies tells you what someone has touched. It
doesn't tell you what they'd do on day one of your problem. So this is written
the other way round: four systems I designed, built and operate, each framed as
the brief it answered, the constraint that made it hard, and the decision I'd
defend in a review.

One thing up front, because I'd rather you hear it from me than wonder. These are
my own products, not client engagements under NDA — I built them, I pay for the
box they run on, and I'm the one woken up when they break. I think that makes
them *better* evidence, not worse: nothing here is a slide about work I helped
with. Every decision below is one I made and then had to live with.

---

## Warren — when the honest answer is "no signal"

**The brief.** Turn market data into an investment thesis a human can act on: a
direction, an entry price, a take-profit, a stop-loss.

**The constraint.** This is the category of problem where language models are most
seductive and most dangerous. Ask one to value a company and it will produce
something fluent, specific and unfalsifiable. Fluency is not analysis.

**What I built.** A LangGraph multi-agent system with a hard architectural rule:
**the numbers are computed before any model is invoked.** Specialised agents own
data collection, quantitative screening, fundamentals, macro context and intrinsic
valuation. Those layers are deterministic. Only then do the LLMs get involved, and
their job is narrowly defined — synthesise the computed evidence into a thesis.
They summarise; they don't estimate.

**The decision I'd defend.** A Guardian loop that can decline. Before Warren emits
entry and exit levels, it asks whether a credible thesis actually exists — and if
not, it says nothing for that ticker. Building a system that returns fewer answers
is an unnatural act; every instinct in product design pushes the other way. But a
recommendation engine that always recommends is a random number generator with
good manners, and the first time a user notices that, you've lost them for good.

**Transferable to you if:** you're putting a model anywhere near a decision with
money or liability attached, and you need to be able to explain — to a regulator,
a board, or a customer — where a specific number came from.

---

## Gollum — the metric nobody was measuring

**The brief.** It started narrow and personal: buy a particular piece of jewellery
at auction without overpaying.

**The constraint.** Every auction site sorts by price. Price is not the question.
The question is what something is worth relative to what it's being sold for, and
that number exists nowhere in the listing.

**What I built.** A Playwright scraping pipeline feeding a FastAPI service that
tracks lots and ranks them by **value for money rather than absolute price** —
which required deriving a comparable-value estimate from messy, inconsistent
listing data, since no auction house publishes one.

**The decision I'd defend.** Vision analysis is on-demand, not automatic. Gollum
can read a lot's photographs with a multimodal model to pull detail out of images
that never made it into the text description. That is genuinely useful and it
costs money per call, so it runs when a user asks for it on a specific lot — not
across every listing on every crawl. Unit economics are an architecture concern.
The cheapest time to decide what a feature costs at scale is before you've built
it into the ingest path.

**Transferable to you if:** the thing your users actually want to sort by isn't a
field in anyone's database, and someone has to derive it from unstructured source
data that fights back.

---

## Newton — pedagogy as an engineering constraint

**The brief.** Generate structured courses from source material, with the
retention mechanics — progress, streaks, experience points — that make people
finish them.

**The constraint.** Generating a plausible-looking syllabus is a demo you can
build in a weekend. Generating one with real pedagogical sequencing, where each
module depends on the last and difficulty ramps rather than lurches, is the actual
product.

**What I built.** A generation pipeline that treats course structure as a
first-class object rather than a formatting concern, paired with a progression
system designed around completion rather than engagement-for-its-own-sake.

**The decision I'd defend.** The entire MVP was built against **mock providers**
before it was ever pointed at a real model API. Every generation step runs behind
an interface with a fake implementation, so the full application could be built
and verified end to end with no API key, no latency and no per-call cost. This is
the single highest-leverage habit I have in LLM work. It makes the system testable
in CI, it makes the model a swappable dependency instead of a load-bearing wall,
and it means the day a better or cheaper model ships, adopting it is a
configuration change rather than a rewrite.

**Status:** feature-complete MVP, verified, not yet deployed. I'd rather show you
something honestly labelled than inflate its status.

**Transferable to you if:** you're building on a model API and you can already
feel the vendor lock-in forming, or your test suite has quietly become dependent
on a paid external service.

---

## The platform — the half of AI engineering nobody demos

**The brief.** Run all of the above, publicly, reliably, for one person's budget.

**The constraint.** Building models is half the job. The other half is operating
them, and it's the half that determines whether anything you built survives
contact with real users.

**What I built.** A single server running a self-hosted PaaS, with every app
deployed by **push-to-main** — a poller notices the commit and triggers the
deploy. No hot-patching a running container, ever; if a fix isn't in Git it
doesn't exist. Public traffic arrives through a tunnel, so the origin has **no
inbound ports open to the internet** and the edge terminates TLS. A single
self-hosted identity provider gives every app SSO, self-registration and a guest
account, so adding authentication to a new project is configuration rather than
code. One database engine, isolated per project by a provisioning script. Mail on
my own domain.

**The decision I'd defend.** Guest access as a first-class mode. Warren and Gollum
both let a stranger see the full reasoning without creating an account. Every
growth instinct says gate it and capture the email. But for a portfolio the goal
is not a mailing list — it's that the person evaluating me, who has maybe ninety
seconds and no patience, reaches the actual work. A signup wall in front of proof
is a signup wall in front of the only thing that matters.

**Transferable to you if:** you have models that work in a notebook and a
deployment story that doesn't exist yet, or you're paying for a stack of SaaS
dashboards that a single well-run box would replace.

---

## The pattern

Read together, the same instinct shows up four times: **decide what the system
will refuse to do.** Warren refuses to force a call. Gollum refuses to run
expensive analysis speculatively. Newton refuses to depend on a live API to be
testable. The platform refuses to accept a change that isn't in Git.

That's most of what production AI engineering is. The generous, unbounded version
of any of these systems is easier to build and demos better. It also falls over
the moment it meets real usage, real costs, or a real question about why it said
what it said.

If you're somewhere on that path — a prototype that works and a production story
that doesn't, or a model in production that nobody can quite explain — that's the
conversation I'm useful in. I'm reachable at
[christopher.manzano@manapple.dev](mailto:christopher.manzano@manapple.dev).
