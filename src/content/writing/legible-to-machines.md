---
title: "Making myself legible to machines"
description: "I was blocking every AI crawler that could have recommended me. Here is what I found in my own robots.txt, and what I changed."
date: 2026-07-31
draft: false
---

More and more, people don't find a specialist by scrolling a results page. They
ask an assistant — *"who can help me get an LLM pipeline into production?"* — and
read the three names it gives back. I wanted to know what it would take to be one
of those names.

So I started where any engineer should: by checking what my own site actually
serves. It was not what I thought.

## The file I never wrote

My repository has a `robots.txt` that says, in full, *allow everyone*. But the
file being served to the internet was several dozen lines long, and I had written
none of it. My CDN was injecting a "managed content" block **above** my own rules:

```
User-agent: *
Content-Signal: search=yes, ai-train=no, use=reference

User-agent: ClaudeBot        Disallow: /
User-agent: GPTBot           Disallow: /
User-agent: Google-Extended  Disallow: /
User-agent: CCBot            Disallow: /
```

This is a sensible default for a publisher who sells subscriptions. For someone
whose entire business case is *be findable*, it was a door I had bolted without
noticing.

The detail that matters: in `robots.txt`, a rule for a **named** user-agent beats
the wildcard group. My `User-agent: *` / `Allow: /` sat right below the block and
did precisely nothing for the bots named above them. Two files, same path, and the
one I had written was the one being ignored.

## What each line was actually costing

It's worth being precise, because these crawlers do not all do the same job and
the internet is full of confident nonsense about them.

**`Google-Extended`** was the expensive one. It governs whether your content can
be used for Gemini training *and grounding*. Notably, it does **not** affect
Google Search ranking or AI Overviews — those run off plain Googlebot. So blocking
it is pure downside if what you want is to be quoted by Gemini: all of the cost,
none of the protection.

**`GPTBot`** covers OpenAI's *training* crawl. Interestingly, the agents that
serve ChatGPT's live browsing — `OAI-SearchBot` and `ChatGPT-User` — were never in
the block list. That was the one channel still reaching me.

**`ClaudeBot`** was blocked outright.

I removed the managed block entirely. My own `robots.txt` is served now, and it
says what I always meant it to say.

## Yes, including the training crawlers

I let the training bots in deliberately, and I want to be straight about the
trade.

The argument for blocking them is real: a model trained on your writing can
reproduce your ideas without sending anyone back to you. For a newspaper, that's
an existential problem.

For me it's the opposite problem. I am not trying to protect a back catalogue —
I'm trying to become a known quantity. There is a meaningful difference between a
model that can *retrieve* a page about me when someone asks, and a model that
simply *knows* who Christopher Manzano is, the way it knows any other public
practitioner. The first requires me to win a retrieval race every single time.
The second is durable.

I write things worth being trained on. Blocking that seemed like optimising for a
risk I don't have at the expense of the outcome I want.

## Why the site was never the main lever

The more uncomfortable finding was that fixing my own site is table stakes, not
strategy.

When these systems answer a *recommend me someone* question, the pages they pull
from are overwhelmingly third-party: roundups, forum threads, conference
listings, editorial reviews. In one sample of tens of thousands of URLs cited for
recommendation-style prompts, comfortably **over 40% were "best of" lists**. Your
own homepage is the least persuasive document in the room, because everybody's
homepage says they're excellent.

That reframes the work. "Be recommended by an AI" is not a metadata problem. It
is the old problem — *be the person other people mention* — with a new reader.
The lever is a citable thesis with a DOI, substantive answers in the places
practitioners actually argue, talks with a speaker page carrying my name, repos
whose READMEs point home.

The site's job is narrower than I assumed: when something does send a crawler my
way, be unambiguous. State plainly who I am, what I build, for whom, and where.
Models extract sentences, not impressions. A hero line about joining the fourth
industrial revolution is a slogan; *"Data Scientist and AI Engineer in Madrid who
designs, builds and operates production AI systems"* is a fact something can
repeat.

## One thing I skipped

`llms.txt` — the proposed convention for handing models a curated summary of your
site. I read the field data before implementing it: across hundreds of millions of
AI bot requests, the file is fetched a vanishingly small number of times. The
major crawlers just read your HTML. It has found a genuine home in developer
documentation, where coding assistants are pointed at it directly, but as a
visibility play it is currently cargo cult. I'd rather spend the hour on a repo
README that links back here.

## While I was in there

Two smaller repairs, both the kind that hide for months. `www.manapple.dev` had no
DNS record at all — the apex worked, so I had never typed the other one. It now
resolves and issues a permanent redirect to the canonical apex, which keeps the
address bar honest and avoids the site competing with itself for its own name.

The pattern behind all three fixes is the same, and it's the reason I run my own
infrastructure in the first place: **the config you wrote and the config being
served are different objects until you check.** I only found the crawler block by
requesting my own `robots.txt` over the public internet, the way a crawler does,
instead of trusting the file in my editor.

That's a habit, not a task. Ask the system what it thinks it's doing. It will
occasionally tell you something you'd rather not hear.
