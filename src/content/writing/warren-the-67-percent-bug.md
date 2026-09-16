---
title: "warren — the 67% bug, and teaching an analyst to fear the state"
description: "A ranking that looked brilliant was dividing Brazilian reais by US dollars. Fixing it led to honest scoring, and to a risk the numbers could never see: the government."
date: 2026-09-16
draft: false
---

Last week I asked **warren** to rank seven oil majors. It picked Petrobras with
90% confidence, and the deciding factor was a *67% free-cash-flow yield*. That is
not a valuation, that is a typo by the universe. Petrobras is cheap, but not
*that* cheap — the real figure is around 13%.

I like these moments. A confident wrong answer is the most useful bug report a
system can produce, because it tells you exactly where it stopped thinking.

## What actually happened

Petrobras reports its accounts in Brazilian reais. Its ADR trades in New York in
dollars. The market-data feed returns free cash flow in the *reporting* currency
and market cap in the *listing* currency, and warren was dividing one by the
other without noticing they were different units. 94 billion reais over 136
billion dollars is 0.69. The EV/EBITDA of 1.85 that "confirmed" the story was the
same mistake made upstream by the data provider — enterprise value assembled from
a dollar market cap plus real-denominated debt.

Eni (euros) and Canadian Natural (Canadian dollars) had the same problem,
smaller and quieter, which is worse: a 20% distortion doesn't jump out of a
table the way 67% does.

While tracing it I found a second, latent bug: the *other* data provider was
handing over free cash flow **per share**, and warren stored it in the field
everything else treated as a **total**. Had that provider been the primary
source, every FCF yield would have been ~0% instead of ~67%. Two ways to be
wrong, one field.

## The fix, and the rule behind it

The change itself is boring, which is how fixes should be. Every snapshot now
carries its reporting currency; the service converts statement aggregates into
the listing currency with the live FX rate *before* any ratio is built, rebuilds
EV/EBITDA from converted parts, and records what it did in a `data_notes` list
that flows all the way to the analyst prompt. If no FX rate is available, the
figure is dropped and the drop is noted. A missing number is honest; a wrong
number with two decimals is not.

The rule underneath: **no packet builder divides two numbers that were never in
the same unit.** There is now exactly one `fcf_yield()` function, and it refuses.

## Ranking with half the information

The same review turned up quieter dishonesty in the scoring.

The signal provider warren uses for insider trades and earnings surprises only
covers US issuers. For every foreign company those fields came back empty — and
the score treated *empty* as *zero*, silently docking every ADR 45 out of 93
points on one of its three sub-scores. "We don't know" was being read as "bad".
Scores now renormalise over the factors actually present and report their own
coverage, so a 70 built on six inputs reads differently from a 70 built on two.

Earnings growth of +580% (Eni) was being credited as strong growth. It is a
single-quarter rebound off a depressed base. It is now flagged as exactly that.
An MLP pipeline operator was being valued on a Graham number against integrated
producers; it now gets its own lens. And the analyst prompt was told, in so many
words, that a low multiple on a state-influenced issuer is usually a *governance
premium*, not a bargain.

That last line is where the interesting part starts.

## The risk the numbers can't see

Petrobras trades at a P/E of 5 for a reason, and the reason is not in any
financial statement. The Brazilian state holds a voting majority, has replaced
the CEO twice in two years, and has a documented habit of setting fuel prices
for political rather than commercial ends. None of that shows up in ROE.

The failure mode I most want warren to avoid is the Venezuela one: a genuinely
good business, correctly identified as cheap, that gets hollowed out because the
state decided it should. PDVSA's collapse was visible years in advance — purges,
royalty hikes, forced contract renegotiations — to anyone who was looking at the
*owner* rather than the *balance sheet*. YPF in 2012 was the same film with
Argentine subtitles.

So warren now scores **Sovereign Interference Risk**, 0 to 100, from three
blocks — and, deliberately, no free text:

- **Country.** The World Bank's Worldwide Governance Indicators as percentile
  ranks: rule of law, regulatory quality, corruption, stability, and the
  five-year trend. Pure data. Venezuela's rule of law sits at the 0th
  percentile; Norway's at the 98th. That single number already separates the
  two stories.
- **State link.** A fixed ten-question questionnaire built on the thresholds
  MSCI and the OECD use for state-owned enterprises: what share of the votes
  does the state hold, directly or through its vehicles; is there a golden
  share; does the government appoint the CEO; how many times in ten years has
  it interfered in *this* company's economics; do minorities have real
  protections; how many expropriation disputes has the country faced in this
  sector. Every answer carries evidence, a source URL, a confidence and *who*
  answered it.
- **Regulation.** An industry prior — utilities, banks, oil & gas, telecoms,
  defence run hot — escalated when the country's regulatory quality is weak.

The composition borrows the one robust finding in the expropriation
literature: it is the *interaction* of state exposure and weak institutions
that predicts trouble, not either alone. A 67% state stake in Norway is an
arm's-length shareholder. The same stake in Argentina is a policy instrument.
Equinor scores 37; Petrobras 72; YPF 84; a PDVSA-shaped company 94.

## Who answers the questionnaire

Three layers, in order of trust.

A **curated seed** of forty-odd well-known state-linked issuers — the Petrobras,
Equinor, Eni, Aramco, Deutsche Telekom, Gazprom, YPF tier — with sources.

Then **web research**: warren runs a handful of targeted searches, fetches the
pages, and hands the excerpts to the model with one instruction that matters —
*answer only from these excerpts, quote the sentence, cite the URL, or leave it
null*. The model does not get to write notes. It gets to fill a form, and a
blank on the form counts as risk, not as zero.

And on top, **manual correction**. Every answer in the UI has a *Correct*
button. Whatever I set wins over research forever, until I clear it. This was a
hard requirement, and the right one: the data that matters most should be the
data a human has looked at.

## The gate

Scores can be argued with. Some things shouldn't be.

If a company is domiciled where rule of law sits below the 10th percentile —
or below the 20th *and* the state controls it — warren blocks it. Not "ranks it
low": blocks it. Composite zero, verdict *avoid*, and if the language model
picked it as the winner anyway, the verdict is overruled and a caveat says so.
In the stock analyzer a blocked name becomes a sell with zero position size,
whatever the thesis argued. Above the gate, the score is an explicit deduction
shown as its own line, so the ranking stays explainable.

The point of the gate is that it removes a decision from the moment of
temptation. When something looks like a P/E of 2, that is exactly when you want
a rule you wrote on a calm day.

## Where this leaves warren

Three pull requests, stacked: the currency fix, the honest scoring, and the
sovereign risk layer. Fifty-odd new tests. A ranking table that now shows FCF
yield, issuer country, score coverage, and either a *blocked* badge or a small
`SIR 72` chip next to the verdict.

Petrobras still comes out on top of that particular quant ranking — a P/E of 5
and a 41% margin of safety are real — but the analyst now sees a 13% cash
yield instead of 67%, sees *Brazil* and *state-dominant* and *three
interventions in ten years* in the packet, and is told to name the governance
discount rather than call it mispricing. That is the right answer. It just took
a bad one to get there.

The system will produce more confident wrong answers. That is what systems do.
What I can promise is that each one gets traced to its root, fixed at the
source, and written up here — because a tool that only speaks when it can
defend what it says has to be built by someone who does the same.
