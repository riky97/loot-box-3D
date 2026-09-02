# DESIGN.md

> A loot box is a promise you can hold. The page should feel like the second before it opens.

Design specification for the Loot Box 3D landing page. Produced in Phase B of the
`web-design` skill workflow, from the brief in [`plan.md`](./plan.md).

**This file is the design authority. [`plan.md`](./plan.md) is the product
authority.** Where they disagree, `plan.md` wins, and the conflict is recorded in
[§10](#10-deviations-from-the-style-seed).

**Implementation note.** Every value below lands in `src/styles/_tokens.scss` as
SCSS variables interpolated into `:root` custom properties. The CSS shown here is
specification, not the shipping stylesheet — the shipping code references tokens
and never repeats a literal. See `plan.md` §4.

---

## 1. Visual Theme & Atmosphere

**Style**: Playful Creative — warm ground, saturated accents, generous radii
**Keywords**: bold, collectible, toy-like, tactile, energetic, hand-finished, arcade, warm
**Tone**: a display cabinet lit like an arcade — NOT corporate, NOT minimal-gallery, NOT cyberpunk-edgy
**Feel**: opening a blind box on a friend's kitchen table. Warm light, bright plastic, a little bit of a thrill.

**Interaction Tier**: **L2 — fluid interaction**
**Dependencies**: **CSS only.** IntersectionObserver for scroll reveals, `requestAnimationFrame` for pointer tracking. No GSAP, no Lenis, no WebGL. This is a hard constraint from `plan.md` §2 — adding an animation library requires explicit approval.

### Relationship to the brand mark

The logo is flat line art in near-black ink. It is rendered through CSS
`mask-image` with `background-color: currentColor`, so it inherits the palette
rather than carrying a baked background. In this direction the mark sits in
`--text` on warm ground, and flips to `--surface` when placed on a magenta or
gold fill.

---

## 2. Color Palette & Roles

Every pair used for text has been contrast-checked. Ratios are stated, not
assumed.

```css
:root {
  /* Backgrounds */
  --bg:             #FFF8F0;   /* warm cream page ground */
  --surface:        #FFFFFF;   /* cards, popovers */
  --surface-alt:    #FFEEE0;   /* alternating sections, deeper warm */
  --surface-hover:  #FFF3E8;   /* hovered surface */

  /* Borders */
  --border:         #F2DAC6;   /* default hairline, warm */
  --border-hover:   #D60039;   /* border adopts primary on hover */

  /* Text */
  --text:           #2A211E;   /* warm near-black — headings, key copy */
  --text-secondary: #5E524D;   /* body copy */
  --text-tertiary:  #7A6C66;   /* labels, meta, captions */

  /* Accent — primary */
  --primary:        #D60039;   /* CTAs, links, active state */
  --primary-hover:  #B80031;

  /* Accent — decorative only, NEVER text (see Color Rules) */
  --accent-vivid:   #FF3366;   /* the seed magenta: gradients, glows, shadow tints */
  --gold:           #FFD700;   /* fills and rules only */
  --green-vivid:    #00CC88;   /* fills and rules only */

  /* Accent — text-safe variants of the above */
  --gold-ink:       #8A6D00;   /* gold as readable text */
  --green:          #007A52;   /* green as readable text, success */

  /* RGB variants for rgba() */
  --bg-rgb:           255, 248, 240;
  --surface-rgb:      255, 255, 255;
  --text-rgb:          42,  33,  30;
  --primary-rgb:      214,   0,  57;
  --accent-vivid-rgb: 255,  51, 102;
  --gold-rgb:         255, 215,   0;
  --green-vivid-rgb:    0, 204, 136;

  /* Semantic */
  --success: #007A52;
  --error:   #C2001F;
  --warning: #8A6D00;
}
```

### Verified contrast

| Pair | Ratio | Verdict |
| --- | ---: | --- |
| `--text` on `--bg` | 14.94 | AAA |
| `--text-secondary` on `--bg` | 7.15 | AAA |
| `--text-tertiary` on `--bg` | 4.79 | AA |
| `--primary` on `--bg` | 5.09 | AA |
| `--primary` on `--surface` | 5.36 | AA |
| white on `--primary` (CTA) | 5.36 | AA |
| white on `--primary-hover` | 6.81 | AA |
| `--green` on `--bg` | 5.10 | AA |
| `--gold-ink` on `--bg` | 4.67 | AA |
| `--text` on `--gold` fill | 11.22 | AAA |
| `--text` on `--surface-alt` | 13.90 | AAA |
| `--accent-vivid` on `--bg` | 3.37 | **large text only — decorative** |

### Color Rules

1. **Zero hardcoded hex outside `_tokens.scss`.** Every colour is referenced through a custom property. A `grep` for `#[0-9a-fA-F]{6}` outside the token file must return nothing.
2. **`--accent-vivid`, `--gold` and `--green-vivid` are decoration, never text.** They fail AA on cream at body size. Use them as fills, rules, gradient stops, glow tints and shadow colours. When their hue must carry words, use `--primary`, `--gold-ink` and `--green` instead.
3. **Gold is a background, not a foreground.** `--text` on a `--gold` fill is 11.22 and excellent. `--gold` on cream is 1.33 and invisible.
4. **One accent per section.** Magenta leads; gold and green appear as the category coding and as small punctuation. Never all three competing in one viewport.
5. **The category colour coding is fixed**: anime → `--accent-vivid`, cosplay → `--gold`, gaming → `--green-vivid`, other → `--text-tertiary`. These tint borders, chips and card glows only; the card's own text stays `--text` / `--text-secondary`.

---

## 3. Typography Rules

```css
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Nunito:wght@400;500;600;700&family=Caveat:wght@600&display=swap');
```

**Font stacks:**

```css
--font-display: "Sora", "Trebuchet MS", system-ui, sans-serif;
--font-body:    "Nunito", system-ui, -apple-system, "Segoe UI", sans-serif;
--font-accent:  "Caveat", "Segoe Script", cursive;  /* strictly rationed, see below */
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- |
| Hero H1 | Sora | `clamp(2.75rem, 9vw, 5rem)` | 800 | 0.95 | -0.035em |
| Section H2 | Sora | `clamp(1.75rem, 4vw, 2.5rem)` | 800 | 1.05 | -0.025em |
| H3 | Sora | `1.375rem` | 700 | 1.2 | -0.01em |
| Lead | Nunito | `1.1875rem` | 500 | 1.6 | — |
| Body | Nunito | `1rem` | 400 | 1.7 | — |
| Label / eyebrow | Sora | `0.75rem` | 700 | 1.2 | 0.16em, uppercase |
| Chip | Sora | `0.6875rem` | 700 | 1.1 | 0.1em, uppercase |
| Meta | Nunito | `0.8125rem` | 600 | 1.4 | 0.02em |
| Accent (rationed) | Caveat | `1.25rem` | 600 | 1.3 | — |

### Typography Rules

- Display weight is **800**, never lighter. Playful Creative depends on heavy geometric headings; a 600 Sora heading reads as generic SaaS.
- Body line-height **1.7** minimum. The warm ground plus saturated accents is already busy; tight body copy makes it shouty.
- **Uppercase belongs to Sora labels only.** Never uppercase a Nunito paragraph.
- **Caveat is rationed to two placements on the entire page** — the hero's hand-annotation and the footer sign-off. It is seasoning. A third use makes the page look like a scrapbook.
- **NEVER use**: Inter, Roboto, Open Sans, Montserrat, Poppins, system-ui as a *display* face. They are the default-template signature this direction exists to avoid.

### Text Decoration

Decisions run against the skill's decision table for Playful Creative:

- **Hero H1 — layered drop shadow, no gradient.** The table permits both, but stacking them is explicitly forbidden, so one is chosen. Layered shadow wins: gradient text on a light ground makes contrast vary across the glyph, which conflicts with the AA bar in `plan.md` §7. The hard offset shadow also reads as sticker/toy, which is the point.
  ```css
  text-shadow: 3px 3px 0 var(--gold), 6px 6px 0 rgba(var(--text-rgb), 0.12);
  ```
- **Section H2 — no gradient, no shadow.** Instead a `--gold` highlight bar animates in behind the last word on scroll. Keeps H2 readable and gives the scroll reveal something to do.
- **Eyebrow labels** — `border-bottom: 2px solid var(--primary)`, inline-block, sized to the text.
- **Body paragraphs — no decoration of any kind.** Non-negotiable.

---

## 4. Component Stylings

### Buttons

```css
.btn {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9375rem;
  letter-spacing: 0.01em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  min-height: 48px;                 /* exceeds the 44px touch minimum */
  padding: 0 var(--sp-5);
  border-radius: var(--radius-pill);
  border: 2px solid transparent;
  cursor: pointer;
  transition:
    transform    var(--dur-fast) var(--ease-bounce),
    box-shadow   var(--dur-fast) var(--ease-out),
    background   var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out);
}

/* Primary — the Instagram CTA */
.btn--primary            { background: var(--primary); color: var(--surface);
                           box-shadow: 0 4px 0 0 var(--primary-hover); }
.btn--primary:hover      { background: var(--primary-hover); transform: translateY(-2px);
                           box-shadow: 0 6px 0 0 #8F0026,
                                       0 10px 24px -8px rgba(var(--primary-rgb), 0.45); }
.btn--primary:active     { transform: translateY(2px); box-shadow: 0 2px 0 0 #8F0026; }
.btn--primary:focus-visible { outline: none;
                           box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary); }
.btn--primary:disabled   { background: var(--border); color: var(--text-tertiary);
                           box-shadow: none; transform: none; cursor: not-allowed; }

/* Secondary — outlined */
.btn--outline            { background: transparent; color: var(--text);
                           border-color: var(--text); box-shadow: 0 4px 0 0 var(--border); }
.btn--outline:hover      { background: var(--gold); border-color: var(--text);
                           transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--border); }
.btn--outline:active     { transform: translateY(2px); box-shadow: 0 2px 0 0 var(--border); }
.btn--outline:focus-visible { outline: none;
                           box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary); }
.btn--outline:disabled   { border-color: var(--border); color: var(--text-tertiary);
                           box-shadow: none; transform: none; cursor: not-allowed; }
```

The solid offset shadow (`0 4px 0`) rather than a blur is deliberate: it is the
toy/sticker vocabulary, and it costs nothing to paint.

### Cards

```css
.card {
  position: relative;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);          /* 20px */
  padding: var(--sp-6);
  overflow: hidden;
  transition: transform var(--dur-base) var(--ease-bounce),
              border-color var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out);
}

/* Spotlight layer — --mx/--my are written by a rAF-throttled pointermove */
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
  background: radial-gradient(
    260px circle at var(--mx, 50%) var(--my, 50%),
    rgba(var(--tier-rgb, var(--accent-vivid-rgb)), 0.16),
    transparent 65%
  );
}

.card:hover,
.card:focus-within        { transform: translateY(-4px);
                            border-color: rgb(var(--tier-rgb, var(--primary-rgb)));
                            box-shadow: var(--shadow-elevated); }
.card:hover::before,
.card:focus-within::before { opacity: 1; }
.card:focus-within        { outline: none;
                            box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary); }
```

### Navigation

```css
.nav {
  position: fixed;
  inset-block-start: 0;
  inline-size: 100%;
  block-size: var(--header-h);
  display: flex;
  align-items: center;
  background: transparent;
  border-bottom: 2px solid transparent;
  transition: background var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}

/* Scrolled state — toggled by an IntersectionObserver sentinel, not a scroll listener */
.nav[data-scrolled="true"] {
  background: rgba(var(--bg-rgb), 0.88);
  backdrop-filter: blur(12px);              /* ≤ 14px per the performance rules */
  border-bottom-color: var(--border);
}

.nav__link {
  position: relative;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-secondary);
  padding: var(--sp-2) 0;
  transition: color var(--dur-fast) var(--ease-out);
}
.nav__link::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  block-size: 3px;
  border-radius: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--dur-base) var(--ease-bounce);
}
.nav__link:hover,
.nav__link[aria-current="true"]        { color: var(--text); }
.nav__link:hover::after,
.nav__link[aria-current="true"]::after { transform: scaleX(1); }
.nav__link:focus-visible { outline: none; border-radius: var(--radius-sm);
                           box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary); }
```

### Links

```css
.link {
  color: var(--primary);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  text-decoration-color: rgba(var(--primary-rgb), 0.35);
  transition: text-decoration-color var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out);
}
.link:hover         { color: var(--primary-hover); text-decoration-color: currentColor; }
.link:focus-visible { outline: none; border-radius: var(--radius-sm);
                      box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary); }
```

### Tags / Chips

```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-1);
  font-family: var(--font-display);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  color: var(--text);                                   /* 11.22 on gold, 14.94 on cream */
  background: rgba(var(--tier-rgb, var(--gold-rgb)), 0.22);
  border: 1.5px solid rgba(var(--tier-rgb, var(--gold-rgb)), 0.55);
}
```

Chip text is always `--text`, never the tier colour — that is what keeps the
rarity coding legible at 11px.

### Section heading with gold highlight

```css
.heading__mark {
  position: relative;
  display: inline-block;
  z-index: 0;
}
.heading__mark::before {
  content: "";
  position: absolute;
  inset-inline: -0.15em;
  inset-block-end: 0.06em;
  block-size: 0.42em;
  z-index: -1;
  border-radius: 3px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--dur-slow) var(--ease-bounce);
}
.is-inview .heading__mark::before { transform: scaleX(1); }
```

---

## 5. Layout Principles

**Container**

- Max width: `76rem`
- Gutter: `1.25rem` mobile / `2rem` tablet / `2.5rem` desktop
- Narrow variant (text-heavy blocks): `52rem`

**Spacing scale** (`--sp-1` … `--sp-14`)

| Token | Value |
| --- | --- |
| `--sp-1` | 0.25rem |
| `--sp-2` | 0.5rem |
| `--sp-3` | 0.75rem |
| `--sp-4` | 1rem |
| `--sp-5` | 1.5rem |
| `--sp-6` | 2rem |
| `--sp-8` | 3rem |
| `--sp-10` | 4.5rem |
| `--sp-12` | 6.5rem |
| `--sp-14` | 8.5rem |

> Exposed under `sp-*` names in Tailwind. **Do not override Tailwind's numeric
> scale** — see the trap documented in `plan.md` §4.

- Section padding: `--sp-10` mobile → `--sp-12` tablet → `--sp-14` desktop
- Component gap: `--sp-6`
- Card internal padding: `--sp-6`

**Radii**

```css
--radius-sm:   8px;
--radius:      14px;
--radius-lg:   20px;
--radius-pill: 999px;
```

Generous radii are load-bearing in this direction. Nothing on the page is a
sharp rectangle except the layer-line rules.

**Grid — the showcase is deliberately uneven**

```css
.showcase {
  display: grid;
  gap: var(--sp-5);
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  grid-auto-flow: dense;                 /* dense fills the holes a tall tile leaves */
}
.showcase__item--wide { grid-column: span 2; }
.showcase__item--tall { grid-row: span 2; }
```

> **Count the cells before shipping.** The v1 build left holes here: 8 items with
> 2 double-height tiles is 10 cells in a 3-column grid, which does not divide.
> `grid-auto-flow: dense` mitigates it; the item count must still be checked
> against the column count at every breakpoint.

---

## 6. Depth & Elevation

Depth in this direction is **hard offset**, not soft blur. Blur appears only in
the final elevated level.

| Level | Treatment | Use |
| --- | --- | --- |
| Flat | none | page ground, section backgrounds |
| Rule | `0 2px 0 0 var(--border)` | dividers, inactive outlined buttons |
| Pop | `0 4px 0 0 <darker tint>` | buttons at rest, chips |
| Raised | `0 4px 0 0 var(--border), 0 8px 20px -10px rgba(var(--text-rgb), 0.18)` | cards at rest |
| Elevated | `0 6px 0 0 var(--border), 0 18px 34px -14px rgba(var(--text-rgb), 0.22)` | cards on hover, mobile sheet |
| Glow | `0 0 0 2px rgba(var(--primary-rgb), 0.35), 0 10px 30px -10px rgba(var(--accent-vivid-rgb), 0.45)` | the Instagram CTA panel only |

```css
--shadow-raised:   0 4px 0 0 var(--border),
                   0 8px 20px -10px rgba(var(--text-rgb), 0.18);
--shadow-elevated: 0 6px 0 0 var(--border),
                   0 18px 34px -14px rgba(var(--text-rgb), 0.22);
--shadow-glow:     0 0 0 2px rgba(var(--primary-rgb), 0.35),
                   0 10px 30px -10px rgba(var(--accent-vivid-rgb), 0.45);
```

---

## 7. Animation & Interaction

**Motion Philosophy**: things arrive with a small overshoot, as if dropped onto the plate. Only `opacity` and `transform` are animated. Nothing animates while blurred.

**Tier**: L2

```css
--ease-out:    cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);   /* the overshoot */
--dur-fast: 150ms;
--dur-base: 260ms;
--dur-slow: 520ms;
--dur-hero: 900ms;
```

### Dependencies

None. No CDN, no animation library.

```
IntersectionObserver  → scroll reveals, nav scrolled state, marquee pause
requestAnimationFrame → pointer tracking for spotlight and magnetic CTA
CSS keyframes         → entrances, marquee, gradient drift
```

### Signature moments (L2 requires all six categories)

| # | Category | Placement | Implementation |
| --- | --- | --- | --- |
| 1 | Text — Hero H1 | hero headline | per-word mask reveal: `clip-path` inset + `translateY`, 60ms stagger |
| 2 | Text — Section H2 | every section heading | gold highlight bar scales in behind the last word on enter |
| 3 | Text — body / label | eyebrows and lead paragraphs | blur-to-sharp is **banned** (moving blur); use opacity + 12px rise, 40ms stagger |
| 4 | Element | primary CTA | magnetic hover — button translates up to 6px toward the cursor, rAF-throttled, `(hover: hover)` only |
| 5 | Component | category + showcase cards | SpotlightCard — `--mx/--my` radial gradient follows the pointer |
| 6 | Background | hero | slow gradient drift via `background-position`, 18s linear, plus a static SVG grain overlay |

That is 6 signature moments, inside the 10 ceiling.

### The one clever detail

A **Konami code easter egg**. `↑↑↓↓←→←→BA` anywhere on the page flips every
rarity chip to `LEGGENDARIO` for eight seconds and fires one burst of confetti
from the hero. Fits a brand built on loot boxes, costs no dependency, and is
invisible to anyone not looking for it.

Implementation notes: keydown listener on `window`, removed on unmount; the
confetti is ~40 absolutely-positioned divs animated on `transform` then removed;
the whole easter egg is skipped entirely under `prefers-reduced-motion`.

### Entrance Animation

```css
@keyframes drop-in {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to   { opacity: 1; transform: none; }
}

.animate-drop-in {
  animation: drop-in var(--dur-hero) var(--ease-bounce) both;
  animation-delay: var(--enter-delay, 0ms);
}

@keyframes word-reveal {
  from { opacity: 0; transform: translateY(0.5em); clip-path: inset(0 0 100% 0); }
  to   { opacity: 1; transform: none;              clip-path: inset(0 0 -10% 0); }
}
```

### Scroll Behavior

```js
// One shared, latched observer. Reveals never replay — replaying on scroll-up
// is the single most common way this pattern becomes annoying.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.classList.add("is-inview")
      observer.unobserve(entry.target)
    }
  },
  { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
)
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity var(--dur-slow) var(--ease-out),
              transform var(--dur-slow) var(--ease-bounce);
  transition-delay: var(--reveal-delay, 0ms);
}
[data-reveal].is-inview { opacity: 1; transform: none; }
```

Parallax is limited to the hero background layer, at a maximum offset of 40px,
driven by the same rAF loop as the pointer tracking.

### Hover & Focus States

Every interactive element carries both. The focus ring is uniform across the
page and never removed:

```css
:focus-visible {
  outline: none;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 6px var(--primary);
}
```

Hover transforms are capped at `translateY(-4px)` and `scale(1.02)`. Larger
movement makes a grid of cards feel unstable.

### Special Effects

```js
// Pointer tracking — one rAF loop for the whole page, not one per card.
let queued = false
function onPointerMove(event) {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    const card = event.target.closest("[data-spotlight]")
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    card.style.setProperty("--my", `${event.clientY - rect.top}px`)
  })
}
```

Gated behind `window.matchMedia("(hover: hover)").matches` so touch devices never
pay for it.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-reveal]              { opacity: 1; transform: none; }
  .heading__mark::before     { transform: scaleX(1); }
  .marquee__track            { animation: none; transform: none; }
  .marquee                   { overflow-x: auto; }
  .hero__bg                  { animation: none; background-position: 0 0; }
}
```

Under reduced motion the JS also skips: pointer tracking is not bound, parallax
is not started, and the Konami easter egg is disabled. Every reveal renders in
its final state — nothing is hidden behind an animation that will not run.

---

## 8. Do's and Don'ts

### Do

- ✅ Reference every colour, size, radius and duration through a token. `_tokens.scss` is the only file allowed to contain a literal design value.
- ✅ Keep `--text` on top of `--gold` and `--accent-vivid` fills. Those hues are backgrounds.
- ✅ Give every interactive element a visible hover **and** a visible `:focus-visible`.
- ✅ Use the solid offset shadow vocabulary (`0 4px 0`) as the default depth cue; save blurred shadows for the elevated level.
- ✅ Cap hover movement at 4px and 1.02 scale.
- ✅ Latch scroll reveals — reveal once, then unobserve.
- ✅ Let the logo mask inherit `currentColor` so the mark follows the palette.
- ✅ Check the showcase cell count against the column count at every breakpoint.

### Don't

- ❌ **Never put `--accent-vivid`, `--gold` or `--green-vivid` on cream as text.** They measure 3.37, 1.33 and 2.00. This is the single easiest way to fail the AA bar.
- ❌ **Never animate `filter: blur()`.** Static blur on a static element is fine; blur on anything that moves destroys frame rate.
- ❌ Never exceed `backdrop-filter: blur(14px)`, and never apply it over a large scrolling region.
- ❌ Never stack gradient text and text-shadow on the same element.
- ❌ Never decorate a body paragraph — no gradient, no shadow, no highlight.
- ❌ Never use Caveat more than twice on the page.
- ❌ Never set a display heading below weight 700.
- ❌ Never override Tailwind's numeric spacing scale; shadcn primitives are built on it.
- ❌ Never bind pointer tracking without a rAF throttle and a `(hover: hover)` gate.
- ❌ Never hardcode a user-facing string in a component — every word resolves through i18next (`plan.md` §6).
- ❌ Never ship a solid-colour block as an image placeholder.

---

## 9. Responsive Behavior

| Name | Width | Key changes |
| --- | --- | --- |
| Desktop | > 1024px | 12-column shell, hero splits 7/5, showcase 3–4 columns, inline nav |
| Tablet | 768–1024px | hero stacks with the object right-aligned at 60% width, showcase 2 columns, inline nav |
| Mobile | < 768px | single column, hero object above copy, showcase 1–2 columns, nav collapses to a sheet |

- **Touch targets: minimum 44×44px.** Buttons ship at 48px, which clears it with margin.
- **No horizontal overflow below 600px.** The marquee and the category rail scroll inside their own containers; the page body never does.
- **Collapsing strategy:** the hero object drops above the copy rather than shrinking below legibility. Stat dividers are `border-left` only from `sm:` up — below that the stats wrap and a hanging rule reads as an orphan (a bug found in the v1 build).
- **Mobile sheet:** the nav panel is a shadcn `Sheet`. Do not add a position utility to its className — the primitive is already `fixed`, and `relative` wins through tailwind-merge and drops the panel into document flow. This cost real debugging time in v1.
- Pointer-driven effects (spotlight, magnetic CTA, parallax) are disabled below `(hover: hover)`.

---

## 10. Deviations from the style seed

Recorded so the comparison against `master` stays honest.

| Seed value | Shipped value | Reason |
| --- | --- | --- |
| `--accent #FF3366` used freely | `#D60039` for text and fills; `#FF3366` demoted to decoration | white on `#FF3366` is 3.55 — the primary CTA would have failed AA |
| `--accent-2 #FFD700` as an accent | background-only, plus `#8A6D00` for text | 1.33 on cream |
| `--accent-3 #00CC88` as an accent | background-only, plus `#007A52` for text | 2.00 on cream |
| Border `#FFE0CC` | `#F2DAC6` | slightly deeper so the 2px card border is actually visible |
| Text `#2D2D2D` | `#2A211E` | warmed to sit with the cream ground instead of reading blue-grey against it |
| Hero H1 gradient **and** shadow | shadow only | the skill forbids stacking them; shadow preserves uniform contrast |
| Tier L2–L3 suggested | L2 | L3 requires GSAP/Three.js, which `plan.md` §2 gates behind explicit approval — approval was declined in favour of a zero-dependency build |
| Emoji permitted in Playful tone | not used | the brand mark is line art; emoji would compete with it |

**Image strategy.** The client has supplied no product photography. Showcase and
category tiles use Unsplash placeholders, declared in a single `const IMG` map at
the top of the data module and flagged in the UI copy as placeholder. Solid
colour blocks are not acceptable. Swapping to real photography must be a
one-file change.
