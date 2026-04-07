# Marc Joy Media

**We Dream in Public.** Afrofuturist multimedia studio (Seattle) — Kemetopolis, Sonic Cosmos, portfolio, and more.

**Site:** [marcjoy.com](https://marcjoy.com)

## Stack

React 19, Vite, TypeScript, Tailwind CSS v4, Motion, React Router.

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Opens the dev server (see terminal for URL; default port is **3000**).

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Deploy

Configured for **Netlify** (`netlify.toml` — SPA fallback to `index.html`). Connect the repo and use the default build command `npm run build`, publish directory `dist`.

## Env (optional)

If you add Gemini-powered features, copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`. The Vite config can expose it to the client where needed.
