# Loot Box 3D — landing page

Single-page marketing site for **Loot Box 3D** ([@loot.box.3d](https://www.instagram.com/loot.box.3d/)),
a 3D-printing studio making collectibles themed on anime, cosplay and gaming.

Stack: Vite · React 19 · TypeScript · Tailwind CSS 3 · shadcn/ui · React Router 7 · i18next (SCSS for design tokens).

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (typecheck + production bundle), `npm run preview`, `npm run lint`.

## How the project is organised

```
src/
  styles/_tokens.scss     Design tokens — the single source of truth
  styles/main.scss        Global base styles + the recurring visual devices
  i18n/                   i18next setup, typed key augmentation, locales/
  routes/                 Route table (AppRouter) + paths & section ids
  pages/                  One file per route
  components/layout/      Header, footer, navigation, root layout
  components/sections/    The landing page sections
  components/common/      Cross-section primitives (CutCard, Chip, Reveal, …)
  components/graphics/    Inline SVG artwork
  components/ui/          shadcn/ui primitives
  data/                   Non-content constants (brand links, category hues)
  types/                  Shapes of the structured i18n content
```

## Changing the look

**All** colors, fonts, type sizes, spacing, radii, shadows and motion values live in
[`src/styles/_tokens.scss`](src/styles/_tokens.scss). `tailwind.config.js` contains no literal
design values — it only maps utility names onto the custom properties that file emits. Editing a
token there restyles the whole site, shadcn/ui components included.

Font families are the one thing that also needs a second edit: the Google Fonts `<link>` in
[`index.html`](index.html) must load whatever families the token file names.

## Brand assets

The palette is sampled directly from the supplied logo artwork: the cream ground is `#FEF5E6` and
the ink is `#190502`. The original file is kept for reference at
[`docs/brand/logo-original.jpeg`](docs/brand/logo-original.jpeg).

That file is a raster logo drawn in one ink on a flat cream ground, so placing it as an image would
carry the cream rectangle onto every surface. Instead the ink is extracted into two alpha masks in
`public/brand/` and painted with `currentColor` by
[`BrandMark`](src/components/common/BrandMark.tsx) — the logo therefore follows the palette and sits
cleanly on any background:

- `logo-mark.png` — the chest symbol alone, used beside the name in the header
- `logo-full.png` — the complete stacked lockup, used in the footer

⚠️ **These are raster masks.** Ask the designer for the vector original (SVG / AI / PDF) and swap
both assets when it arrives; a raster mask cannot be redrawn for very large display sizes. A
horizontal version of the lockup would also let the header show the full logo instead of the
symbol-plus-type pairing used today.

## Adding a page

1. Create the component under `src/pages/`.
2. Add its path to `ROUTES` in [`src/routes/paths.ts`](src/routes/paths.ts).
3. Add one object to the `children` array in [`src/routes/AppRouter.tsx`](src/routes/AppRouter.tsx)
   (the file marks the spot). The shared layout, scroll restoration and 404 handling come for free.

## Adding a language

The site currently ships Italian only, with no language switcher in the UI — but the plumbing is
ready. Copy `src/i18n/locales/it.json` to e.g. `en.json`, translate the values, and register it in
the `resources` map in [`src/i18n/config.ts`](src/i18n/config.ts). No component changes are needed:
every visible string is read through a translation key.

## Content status

⚠️ **All copy, product names, statistics, the e-mail address and the location are placeholders.**
They are written to be plausible for the brand, but must be reviewed and replaced with the real
content before launch. See the `_placeholderNotice` key in `src/i18n/locales/it.json`.
