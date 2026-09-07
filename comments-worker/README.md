# Anonymous comments backend

This folder contains the backend for guest comments on Maheswaran's static Astro site.

It is intentionally separate from GitHub Issues/Discussions so visitors do not need a GitHub account.

## Features

- Anonymous/guest comments
- Previous comments by article slug
- Replies through `parent_id`
- Like/unlike reactions
- Basic per-visitor rate limiting
- Optional moderation (`MODERATION = "on"` stores new comments as pending)
- CORS restricted to `https://maheswaran-pasupathi.github.io`

## One-time Cloudflare setup

From this folder, using a Cloudflare account with Workers + D1 enabled:

```bash
npm install -g wrangler
wrangler login
wrangler d1 create maheswaran-comments
```

Copy `wrangler.toml.example` to `wrangler.toml` and replace `REPLACE_WITH_D1_DATABASE_ID` with the database id returned by Cloudflare.

Then create the tables and deploy:

```bash
wrangler d1 execute maheswaran-comments --remote --file=schema.sql
wrangler deploy
```

Cloudflare will return a URL similar to:

```text
https://maheswaran-comments.<your-workers-subdomain>.workers.dev
```

That URL is the only remaining value needed by the Astro frontend.

## API

- `GET /health`
- `GET /comments?slug=<article-slug>`
- `POST /comments` JSON body: `{ "slug": "...", "author": "...", "body": "...", "parent_id": null }`
- `POST /react` JSON body: `{ "comment_id": 123 }`

The reaction endpoint toggles a like for the same visitor fingerprint.

## Moderation

Set this in `wrangler.toml`:

```toml
MODERATION = "on"
```

New comments then enter `pending` state and will not appear publicly until approved directly in D1 or through a future moderation UI.

For the first release, `MODERATION = "off"` is recommended while volume is low; rate limiting is still active.
