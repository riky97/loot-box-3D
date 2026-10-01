// Shapes for the structured (array/object) i18n content consumed via
// `useContentList` — these mirror the JSON structures in `src/i18n/locales/it.json`.

import type { LabSectionId } from "@/routes/paths"

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
  /** Section of the lab page the pillar opens, from `LAB_SECTION_IDS`. */
  labSection: LabSectionId
}

export type CategoryId = "anime" | "film" | "gadget" | "gaming" | "other"

export interface CategoryItem {
  id: CategoryId
  name: string
  description: string
  tagline: string
}

/**
 * Technical details shown on a piece's own page. Every field is optional and
 * an absent or empty one is simply not shown: these are facts about a real
 * object, so a field stays empty until the studio supplies the real value.
 * `it.json` lists all of them as "" for every piece, as a form to fill in
 * (see `showcase._schedaTecnicaGuida` there).
 */
export interface ShowcaseSpecs {
  material?: string
  /** The printer it was made on, e.g. "Bambu Lab A1". */
  printer?: string
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

/*
 * Lab page (`/laboratorio`). Every text field may be left as "" in it.json:
 * an empty field is not shown, and an entry with an empty name or title is
 * skipped entirely, so the locale can carry blank templates to fill in.
 * See `lab._guida` in it.json.
 */

export interface LabMaterial {
  /** Key into `LAB_MATERIAL_PHOTOS` in brand.ts. */
  id: string
  name: string
  /** One line on the card, e.g. "robusto, per pezzi da esterno". */
  summary: string
  /** Short technical description, shown in the detail panel. */
  technical: string
  /** What the studio uses it for, shown in the detail panel. */
  uses: string
  /** Anything else, e.g. the PLA variants. */
  notes: string
  /** Print settings, one per entry, e.g. "Temperatura ugello: 190-230 °C". */
  printParams: string[]
  pros: string[]
  cons: string[]
}

/**
 * A tool or product shown with a photo under a step, e.g. acrylics, brushes.
 * Kept in one flat list (`lab.tools.items`) rather than nested in each step:
 * i18next types every key path of it.json, and an array inside an array of
 * steps pushed that past TypeScript's instantiation depth limit.
 */
export interface LabTool {
  /** `LabStep.id` of the step this tool appears under. */
  step: string
  /** Key into `LAB_TOOL_PHOTOS` in brand.ts. */
  id: string
  name: string
  description: string
}

export interface LabStep {
  /** Key into `LAB_MEDIA` in brand.ts; also keeps React keys stable. */
  id: string
  title: string
  description: string
  /** Products used in this step (brands, primers, paints, varnishes). */
  products: string
  /** Describes the step's video or photo, once one exists in `LAB_MEDIA`. */
  mediaAlt: string
}

export interface LabPrinter {
  /** Key into `LAB_PRINTER_PHOTOS` in brand.ts. */
  id: string
  name: string
  technology: string
  notes: string
  /** Describes the printer's photo, once one exists in `LAB_PRINTER_PHOTOS`. */
  photoAlt: string
}

export interface HowItWorksStep {
  number: string
  title: string
  description: string
}
