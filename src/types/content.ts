// Shapes for the structured (array/object) i18n content consumed via
// `useContentList` — these mirror the JSON structures in `src/i18n/locales/it.json`.

/**
 * One entry of the hero strip: a short claim and what it means. Every entry
 * must be true of the studio today; the strip once carried made-up delivery
 * and print-hour counts, and a number there is read as a fact.
 */
export interface HeroHighlight {
  value: string
  label: string
}

export interface AboutPillar {
  title: string
  description: string
}

export type CategoryId = "anime" | "gadget" | "gaming" | "other"

export interface CategoryItem {
  id: CategoryId
  name: string
  description: string
  tagline: string
}

/**
 * Technical details shown on a piece's own page. Every field is optional and
 * an absent one is simply not shown: these are facts about a real object, so
 * a field stays empty until the studio supplies the real value.
 */
export interface ShowcaseSpecs {
  material?: string
  size?: string
  printTime?: string
  finish?: string
}

export interface ShowcaseItem {
  /** Also the key into `SHOWCASE_IMAGES` in `src/data/brand.ts`, and the URL slug. */
  id: string
  name: string
  category: CategoryId
  tag: string
  /** Describes the photo for screen readers; lives here because it is copy. */
  alt: string
  /** A few lines about the piece, for its own page. */
  description?: string
  specs?: ShowcaseSpecs
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
}
