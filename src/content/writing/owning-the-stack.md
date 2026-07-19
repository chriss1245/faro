---
title: "Owning the whole stack"
description: "Why every app at manapple.dev runs on a single box I fully control — one PaaS, one database, one login, my own mail."
date: 2026-07-15
draft: false
---

Everything under **manapple.dev** — warren, gollum, this site — runs on a single
server that I own and operate. That's a deliberate choice. Building the models is
only half of being an AI engineer; the other half is *running* them, and I wanted
that whole loop under my own hands rather than rented from a dozen SaaS
dashboards.

Here's the shape of it.

## One box, managed like a platform

Instead of hand-wiring containers, I run a **self-hosted PaaS** on the box. Each
app is a resource it deploys, routes and keeps alive. Adding a new project is a
repeatable act, not a yak-shave: point it at a Git repo, give it a subdomain, and
it handles the reverse proxy and networking.

Deploys are **push-to-main**. The source of truth is the Git repo; I never edit a
running container to make a change stick. A small poller notices a new commit on
`main` and triggers the deploy. It keeps development and production cleanly
separated, and it means "ship it" is genuinely just `git push`.

## One front door

Public traffic comes in through a **tunnel** rather than exposing the origin
directly — the server has no open inbound ports to the internet, and the edge
handles TLS. Everything routes by hostname from there to the right app.

## One login for everything

The apps that need accounts sit behind a single **self-hosted identity provider**.
It gives me single sign-on, self-registration and a guest account across all the
apps at once — so a visitor logs in (or comes in as a guest) once, and every app
trusts that identity instead of demanding its own second login. Building it as a
shared layer meant I could add auth to a new app by configuration, not by
re-implementing sessions for the tenth time.

## One database, isolated per project

All the projects share **one Postgres server** (with `pgvector` for embeddings),
but each project gets its **own database and role** that can only reach its own
data. One thing to back up and patch, with the isolation of separate databases.

## My own mail

gollum's alerts and the platform's transactional email go out through a **mail
server I host myself** for the domain. It's the least glamorous part and the one I
learned the most from — deliverability is a genuine craft — but owning it means no
per-email pricing and no third party in the loop.

## Why bother?

Because the constraint is the point. Running your own infrastructure forces you to
understand it: networking, TLS, identity, storage, deliverability, the boring
operational reality behind every "just deploy it." That understanding makes me
better at the day job, where the systems are bigger but the questions are the
same. And it's mine — models, data and infrastructure, end to end.
