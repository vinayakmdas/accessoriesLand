# Door Hingers

Modern, premium website for **Door Hingers** — auto parts, car accessories,
and automotive customization.

## Stack

React + Vite + Tailwind CSS v4 + React Router + Framer Motion + Lucide React + EmailJS.

## Getting started

```bash
npm install
npm run dev
```

## Configuration

1. **Business info** — edit `src/config/businessConfig.js` with the real phone,
   WhatsApp number, email, and social links. `legalName`, `address`, and `gstin`
   are already filled in from the supplied business card; update them if that
   card belongs to a different entity than Door Hingers.
2. **EmailJS** — copy `.env.example` to `.env` and fill in your EmailJS
   service ID, template ID, and public key from
   [dashboard.emailjs.com](https://dashboard.emailjs.com). Until these are
   set, the contact and CV forms will show a friendly error instead of
   silently failing.
3. **Images** — all images now live in `src/assets/images/` (hero, about,
   services, gallery) and are imported directly into the data files, so
   Vite bundles them at build time — no external image host involved.
   Each file currently holds a simple generated placeholder graphic.
   To use your own photos: keep the exact same filename and just overwrite
   the file (e.g. replace `src/assets/images/services/led-electrical/led-lights.svg`
   with your real headlight photo — even a `.jpg` works, just update the
   import line in `src/data/services.js` to match the new extension).

## Project structure

See `src/` for the feature-based layout: `components/` (reusable UI),
`sections/` (page sections), `pages/` (routed pages), `data/` (content),
`config/` (business info), `layouts/`, and `routes/`.

## Deploying to Vercel

Push to a Git repo and import into Vercel — `vercel.json` is already set up
for client-side routing. Remember to add the `VITE_EMAILJS_*` environment
variables in the Vercel project settings.
