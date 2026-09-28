// Shapes for the structured (array/object) i18n content consumed via
// `useContentList` — these mirror the JSON structures in `src/i18n/locales/it.json`.

export interface HeroStat {
  value: string
  label: string
}

export interface AboutPillar {
  title: string
  description: string
}

export type CategoryId = "anime" | "cosplay" | "gaming" | "other"

export interface CategoryItem {
  id: CategoryId
  name: string
  description: string
  tagline: string
  /** Catalogue size, revealed when the band expands. PLACEHOLDER figure. */
  count: string
}

export interface ShowcaseItem {
  /** Also the key into `SHOWCASE_IMAGES` in `src/data/brand.ts`. */
  id: string
  name: string
  category: CategoryId
  tag: string
  /** Describes the photo for screen readers; lives here because it is copy. */
  alt: string
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
}
