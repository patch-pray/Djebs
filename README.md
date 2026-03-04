# Djeb's Atelier Website

Modern fashion e-commerce storefront built with React, TypeScript, and Vite.

## Live URL
https://djebs.vercel.app/

## Overview

This project is the official website for Djeb's atelier. It includes:

- Home landing page with hero section and featured products
- Product catalog with category filters
- Product detail pages with variants (size/color)
- Promo and drops pages
- Shopping cart (persistent in browser)
- Multi-language UI (French, English, Arabic with RTL support)
- Contact and brand information pages

## Tech Stack

- React 18 + TypeScript
- Vite 5
- React Router 6
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion
- Zustand (cart state)
- Vitest + Testing Library

## Project Structure

src/
- components/ → layout, navigation, reusable UI
- pages/ → route pages (home, products, promo, drops, etc.)
- lib/data/products.ts → product catalog source
- lib/i18n.tsx + lib/translations.ts → internationalization
- lib/cart.ts → persisted cart store
- assets/ → local images

public/
- hero-atelier.jpg → social share preview image
- favicon.ico, robots.txt, static assets

## Routes

- / → Home
- /products → Product listing
- /products/:slug → Product detail
- /promo → Promotions
- /drops → Drops
- /services, /about, /contact, /reseller, /showroom, /cart

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- npm run dev → run Vite dev server
- npm run build → production build
- npm run build:dev → development-mode build
- npm run preview → preview built app
- npm run lint → run ESLint
- npm run test → run tests once
- npm run test:watch → run tests in watch mode

## Internationalization

Language state is handled by `I18nProvider`.

- Supported locales: `fr`, `en`, `ar`
- Arabic automatically switches document direction to `rtl`

## Cart Behavior

Cart state is managed with Zustand and persisted in local storage.

- Add/remove items by product + size + color
- Quantity aggregation for identical variants
- Persistent cart key: `djebs-cart`

## SEO & Social Sharing

The app includes Open Graph and Twitter card metadata in index.html.

- Social preview image: /hero-atelier.jpg
- Production domain configured for share previews: https://djebs.vercel.app/

## Notes

- Ensure all public sharing assets remain inside `public/` for reliable crawlers.
- For preview updates on social apps, platform cache refresh may be required.
