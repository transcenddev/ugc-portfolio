<!--
## What this is

A UGC creator portfolio for short-form video, talking-head reviews, product demos, and lifestyle b-roll. Content spans fitness & wellness, men's grooming, lifestyle & fashion, tech & gadgets, travel, and stories that connect.

## Tech Stack & Design System

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS with custom design tokens

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run lint      # lint codebase
```

## Content

Portfolio data, services, and process steps live in `content/portfolio.ts`.
Video assets are served from `public/assets/videos/browser-ready/`.
Poster images are served from `public/assets/posters/`. -->

# UGC Creator Portfolio

A personal UGC creator portfolio and single-page showcase featuring fitness, lifestyle, men's grooming, skincare, tech, and story-driven content.



## What this is

A UGC creator portfolio built to showcase short-form video, talking-head reviews, product demonstrations, lifestyle B-roll, and authentic storytelling.

The portfolio covers:

- Fitness & wellness
- Men's grooming & skincare
- Lifestyle & fashion
- Tech & gadgets
- Travel
- Story-driven creator content

The site is designed around a simple editorial approach: **authentic content, thoughtful visuals, and real experiences.**

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Custom design tokens

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev          # start development server
npm run build        # create production build
npm run lint         # lint the codebase
npm run videos:push  # upload all media to Vercel Blob
npm run videos:push -- <path>  # upload a single file, e.g. fitness_wellness/clip.mp4
```

## Content

Portfolio data, services, and process steps are managed in:

```text
content/portfolio.ts
```

Local media lives under `public/assets/`:

```text
public/assets/videos/browser-ready/<category>/<file>.mp4
public/assets/testimonials/<file>.mp4
public/assets/posters/<category>/<file>.webp
```

Clips marked `featured` are spotlit in Selected Work; clips marked `hidden`
stay in the data but are excluded from every rendered list.

## Media (Vercel Blob)

In development, media is served from the local `public/assets/` paths. In
production, migrated media is served from Vercel Blob.

`content/portfolio.ts`'s `assetUrl()` leaves paths unchanged when
`NEXT_PUBLIC_ASSET_ORIGIN` is unset (local dev) and otherwise prefixes them
with that origin, rewriting the local tree to the Blob layout:

- `public/assets/videos/browser-ready/<category>/<file>.mp4` -> `videos/<category>/<file>.mp4`
- `public/assets/testimonials/<file>.mp4` -> `videos/testimonials/<file>.mp4`

The Blob tree drops the local `assets/` and `browser-ready` segments, so the
public path is a single `videos/` folder. Posters are not migrated and are
still served from the deployment.

### Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_ASSET_ORIGIN` | Vercel (Production) | Public Blob origin, e.g. `https://<store-id>.public.blob.vercel-storage.com`. Leave unset locally so dev uses `public/assets/`. |
| `BLOB_READ_WRITE_TOKEN` | `.env.local` (never committed) | Read-write token used only by `npm run videos:push` to upload media. |

Uploading media:

```bash
# .env.local must contain BLOB_READ_WRITE_TOKEN from the Vercel Blob store
npm run videos:push                              # all browser-ready videos + the testimonial
npm run videos:push -- fitness_wellness/clip.mp4 # a single file
```

## Project Focus

This project is both a working creator portfolio and an exploration of editorial web design, responsive interfaces, video presentation, and performance-conscious media handling.
