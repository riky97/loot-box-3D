# Loot Box 3D — Build Plan

This is the authoritative brief for building the Loot Box 3D landing site. It is
written to be **reproducible**: two independent build runs, given only this file,
should produce two sites that satisfy the same requirements while differing in
visual direction.

It exists because the project is being built twice on purpose (see
[Experiment setup](#10-experiment-setup)) and the comparison only means anything
if both runs start from an identical, written specification.

**Status:** placeholder content throughout. Every product name, statistic and
location value is invented and must be reviewed with the client before launch.

---

## 1. Brand and scope

| Field | Value |
| --- | --- |
| Brand | Loot Box 3D |
| Business | 3D-printing studio selling collectibles |
| Themes | anime, cosplay, gaming |
| Primary channel | Instagram [@loot.box.3d](https://instagram.com/loot.box.3d) |
| Deliverable | one-page landing site |
| Domain | lootbox3d.it |
| Ordering | via Instagram DM — there is no storefront |

**Out of scope.** Do not build: analytics, e-commerce or cart, CMS, contact form
with a backend, language switcher UI, blog, newsletter. Build only what section 5
lists.

---

## 2. Mandatory stack

Locked. Do not substitute.

- **Node** + **Vite** — build tooling
- **React** — UI
- **TypeScript** — chosen over plain JS for two concrete reasons: shadcn/ui ships
  first-class TS support, and i18n keys can be type-checked via
  `CustomTypeOptions` module augmentation so a typo in a translation key is a
  compile error rather than a blank string on the page.
- **Tailwind CSS v3.4** — *not* v4. v4 moves theme config into CSS and drops the
  `theme.extend` mapping this project depends on (section 4).
- **shadcn/ui** — component primitives, `new-york` style, `cssVariables: true`
- **React Router v7** — data router via `createBrowserRouter`
- **i18next + react-i18next** — copy externalisation

**Adding any dependency not listed here requires explicit approval first.**

---

## 3. Routing architecture

Only `/` ships today. The structure must accept new routes with **no refactor**.

```
src/
  routes/
    paths.ts          ROUTES + SECTION_IDS constants, no magic strings anywhere
    router.tsx        createBrowserRouter, lazy index route, errorElement, catch-all
  layouts/
    RootLayout.tsx    header + <Outlet /> + footer, shared by every future route
  pages/
    HomePage.tsx      composes the sections
    NotFoundPage.tsx
```

Requirements:

- The index route is lazy-loaded.
- An `errorElement` and a `*` catch-all both exist from day one.
- Section anchors come from `SECTION_IDS`; no hardcoded `"#contact"` strings.
- Adding `/shop` must mean adding one file plus one router entry. Nothing else.

---

## 4. Design tokens — the central constraint

**One file is the single source of truth for every design value:**
`src/styles/_tokens.scss`.

It declares SCSS variables and interpolates them (`#{$var}`) into `:root` CSS
custom properties. It must cover:

- **Palette** — primary, secondary, accent, background, text, states, plus the
  full shadcn semantic set. Colours stored as bare HSL triplets (`"20 94% 37%"`)
  so they work both as `hsl(var(--x))` and, in Tailwind, as
  `hsl(var(--x) / <alpha-value>)`.
- **Font families** — a heading face and a body face, at minimum.
- **Font-size scale** — with matching line-heights and letter-spacings.
- **Spacing scale**.
- Radii, shadows, motion durations and easings.

**The acceptance test:** changing the palette and the fonts of the entire site
must require editing *only this file*. A `grep` for literal hex colours, `rgb(`,
`hsl(` with literal numbers, or hardcoded `px` font sizes anywhere outside
`_tokens.scss` must return nothing.

### Tailwind's role

`tailwind.config.js` contains **no literal design values**. It only maps utility
names onto the custom properties:

```js
colors:   { primary: "hsl(var(--primary) / <alpha-value>)", /* … */ }
fontSize: { h2: ["var(--fs-h2)", { lineHeight: "var(--leading-h2)" }], /* … */ }
```

Tailwind reflects the tokens. It never duplicates them.

> **Known trap, do not repeat it.** Do not override Tailwind's numeric spacing
> scale (`1`, `2`, `4`…) with token values — shadcn primitives are built on it
> and `h-10` silently becomes 4.5rem, breaking every button and input. Expose the
> spacing tokens under distinct names instead (`sp-1`…`sp-14`) and leave the
> numeric scale untouched.

---

## 5. Required sections

In order, all on `/`:

1. **Hero** — brand promise, primary CTA to Instagram, secondary CTA to the
   showcase. The secondary label is "Scopri la collezione", so it must land on
   the gallery; "how it works" is reached from the nav.
2. **About** — who we are / what we do
3. **Categories** — anime, cosplay, gaming, other
4. **Showcase** — gallery of work
5. **How it works** — the ordering flow, ending on Instagram
6. **Contact + social** — Instagram given clear visual priority
7. **Footer**

---

## 6. Language rules

Two separate axes. Do not conflate them.

**All code in English** — file names, folder names, components, variables,
functions, props, types, comments, log messages, branch names, commit messages.

**All visible copy in Italian**, and **never hardcoded in a component**. Every
user-facing string resolves through i18next from `src/i18n/locales/it.json`.

The structure must accept a future `en.json` **without touching a single
component**. That means:

- Namespaced keys: `hero.title`, `contact.emailLabel`, …
- Structured lists via `returnObjects: true`, read through a typed
  `useContentList<T>(key)` helper — not by index-guessing.
- No language switcher UI. The plumbing exists; the control does not.

**Exception:** the brand wordmark ("loot box") is the mark itself, identical in
every locale, and stays out of the locale files.

---

## 7. Accessibility and quality bar

Non-negotiable:

- **WCAG AA** contrast on every text pair. Verify by computing it, not by eye.
- Every section is a `<section>` with `aria-labelledby` pointing at its heading.
- One `<h1>` per page; no heading levels skipped.
- Visible `:focus-visible` styling on every interactive element.
- Full keyboard operation, mobile menu included.
- `prefers-reduced-motion` honoured — animations, scroll reveals and marquees all
  neutralised.
- Decorative graphics carry `aria-hidden="true"`.
- Verified at **375 / 768 / 1440 px**.
- `npx tsc -b` and `npx vite build` both pass clean.

---

## 8. Brand assets

Reusable across both runs, in `public/brand/`:

| File | Size | Notes |
| --- | --- | --- |
| `logo-mark.png` | 512×394 | black + alpha mask |
| `logo-full.png` | 1024×646 | black + alpha mask |
| `docs/brand/logo-original.jpeg` | — | client's original file |

The PNGs are alpha masks extracted from the client's JPEG. They are rendered via
CSS `mask-image` with `background-color: currentColor`, so the artwork follows
the palette instead of carrying a baked-in background.

> ⚠️ **These are raster masks, not vectors.** Request SVG/AI/PDF from the
> designer, plus a horizontal lockup so the header can show the full logo.

---

## 9. Deployment

Static build, output `dist/`, build command `npm run build`. Configuration lives
in `netlify.toml`.

**Live at https://lootbox3d.it** (Netlify, custom domain registered at
Register.it). `www` 301-redirects to the apex, which is the primary domain, and
Let's Encrypt issues the certificate automatically.

DNS stays on Register's nameservers (`ns1/ns2.register.it`) and only the apex A
record points at Netlify (`75.2.60.5`); `www` is a CNAME to the apex and follows
it. This is deliberate: Register deletes mailboxes and their contents if the MX
record points away from their servers for seven days, so moving the zone to
Netlify DNS would put the project's future email at risk for no gain.

**Host: Netlify.** An SPA rewrite is mandatory — React Router owns the routes,
so every path must serve `index.html` or a hard refresh on `/qualcosa` returns a
404 from the CDN rather than reaching the router.

> **Why not Vercel.** Vercel's Hobby (free) plan forbids commercial use, and its
> fair-use guidelines name *"advertising the sale of a product or service"* as
> commercial — which is exactly what this site does. Netlify's terms carry no
> equivalent clause, so the question does not arise there. Note the asymmetry
> accurately: Vercel explicitly prohibits it; Netlify is simply silent, which is
> not the same as an explicit grant.

The config is deliberately portable — build command, publish directory and an
SPA fallback are all any static host needs — so moving is a small change, not a
rewrite.

## 10. Experiment setup

The site is built twice from this file. The **only** variable that changes is the
design-generating skill.

| | `master` | `exercise/rebuild-v2` |
| --- | --- | --- |
| Design generator | `frontend-design` | `web-design` |
| Method | taste-first, guidance only | spec-first, `DESIGN.md` before code |
| QA layer | `web-design-guidelines`, `vercel-react-best-practices` | identical |
| Plan | this file | this file |
| Brand assets | section 8 | identical |
| Italian copy | reused | reused |

Everything in sections 1–9 is held constant. Both runs are then compared on:

1. **System coherence** — do the tokens actually govern the page?
2. **Distinctiveness** — does it read as designed, or as a template?
3. **Accessibility** — measured, per section 7.
4. **Token maintainability** — how cleanly does the palette swap?
5. **Compositional variety** — how many distinct layout archetypes does the page
   use, and does any section repeat another's? `master` uses six archetypes with
   two splits and two grids among them; `DESIGN.md` §11 specifies seven distinct
   ones for this run.

The `exercise/rebuild-v2` run rebuilds `src/` from empty. It does not read the
existing implementation — that would contaminate the comparison.

> **Rejected: `brand-guidelines` (anthropics/skills).** Its name is misleading —
> it does not help author a brand identity, it applies *Anthropic's own* identity
> (`#d97757` orange, Poppins/Lora). Using it would have imported a third party's
> palette into a client's brand and, worse, made the two runs incomparable: the
> `master` palette is already cream-and-burnt-orange, so any convergence would
> have been impossible to attribute. `web-design` is the sole generator.
