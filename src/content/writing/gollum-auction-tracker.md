---
title: "gollum — hunting value-for-money at auction"
description: "How a very specific quest — buying a necklace without overpaying — turned into an auction tracker that ranks value, not price."
date: 2026-06-27
draft: false
---

**gollum** started with a real problem. I wanted to buy a particular kind of
necklace, and the online auctions I was watching made it maddeningly hard to
answer one question: *which listing is actually the best deal?* The cheapest
item is rarely the best value, and comparing dozens of listings by hand — each
with different condition, weight, materials and photos — doesn't scale past the
first evening.

So I built a tool that watches the auctions for me and ranks them the way I'd
want to: by **quality-for-price**, not by price alone.

## Watching the auctions

Under the hood, gollum runs a **Playwright** scraping pipeline. Auction sites are
JavaScript-heavy and change often, so a headless browser that actually renders
the page turned out to be far more robust than trying to reverse-engineer their
APIs. It tracks the listings I care about, follows them as bids move, and keeps a
tidy record of what's out there right now.

## Ranking value, not price

The interesting part isn't the scraping — it's the *ranking*. A cheap listing
with poor condition and vague photos shouldn't beat a slightly pricier one that's
clearly a better object. gollum scores listings so the best value floats to the
top, which is exactly the judgement I was making by hand, just faster and
without the fatigue.

To go further, I added **on-demand LLM vision**: point it at a listing and it
reads the photos — condition, materials, details the text description leaves
out — and folds that into the picture. It's opt-in per listing, so it only spends
effort where I'm genuinely interested.

## Telling me when it matters

A tracker is only useful if it reaches you at the right moment. gollum sends
**alerts through an email service I host myself** — the same infrastructure story
I'll write about separately. When something worth my attention appears, it lands
in my inbox instead of me refreshing a page.

It's a small, sharp tool built for one job, and it does that job well. That's the
kind of software I like: born from a real need, and genuinely used.
