import type { CategoryId } from "@/types/content"

// External brand destinations. PLACEHOLDER — confirm with the client before launch.
export const BRAND_LINKS = {
  instagram: "https://www.instagram.com/loot.box.3d/",
} as const

/**
 * The tier colour each product category is coded in. Values are CSS custom
 * property names from `_tokens.scss`, consumed as `hsl(var(--...))`, so the
 * coding follows any palette change made in the token file.
 *
 * These are decorative: they tint borders, band edges and spotlights only.
 * Band and chip text stays `--foreground`, which is what keeps 11px labels
 * legible — see DESIGN.md colour rule 5.
 */
export const categoryTierVars: Record<CategoryId, string> = {
  anime: "--tier-anime",
  cosplay: "--tier-cosplay",
  gaming: "--tier-gaming",
  other: "--tier-other",
}

/**
 * Gallery photography, keyed by `ShowcaseItem.id`.
 *
 * Paths, not copy, so they live here rather than in the locale files: a second
 * language translates the names and alt text but shows the same photos.
 *
 * Every file is 560x700 WebP (4:5, 2x the widest 280px tile) with all metadata
 * stripped — the originals are phone photos and several carry GPS coordinates.
 * Keep both properties when adding a photo.
 */
export const SHOWCASE_IMAGES: Record<string, string> = {
  samehada: "/showcase/samehada.webp",
  "cape-buttons": "/showcase/cape-buttons.webp",
  "vegeta-chibi": "/showcase/vegeta-chibi.webp",
  charizard: "/showcase/charizard.webp",
  "pokeball-card-box": "/showcase/pokeball-card-box.webp",
  "graded-card-case": "/showcase/graded-card-case.webp",
  "boromir-pen-holder": "/showcase/boromir-pen-holder.webp",
  bender: "/showcase/bender.webp",
  "resin-dragon": "/showcase/resin-dragon.webp",
  "cat-glasses-stand": "/showcase/cat-glasses-stand.webp",
  "fellowship-sword": "/showcase/fellowship-sword.webp",
  "trex-totoro": "/showcase/trex-totoro.webp",
}

/**
 * Showcase items the studio designed itself, keyed by `ShowcaseItem.id`. Only
 * these carry the "Design originale" badge; everything else is a third-party
 * model printed without a commercial licence (see `showcase.licenseNote`).
 *
 * A fact about the piece, not copy, so it lives here and not in each locale,
 * where two languages could disagree about who designed something.
 *
 * TEST DATA — four ids drawn at random to exercise the badge. The client has
 * not said which pieces are theirs yet, and a badge on the wrong piece is a
 * false attribution on a public page. Replace before this reaches master.
 */
export const ORIGINAL_DESIGNS: ReadonlySet<string> = new Set([
  "vegeta-chibi",
  "trex-totoro",
  "cape-buttons",
  "bender",
])

/** Intrinsic size of every file in `SHOWCASE_IMAGES`, used to reserve space. */
export const SHOWCASE_IMAGE_SIZE = { width: 560, height: 700 } as const
