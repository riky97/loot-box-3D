import type { CategoryId } from "@/types/content"

// External brand destinations, confirmed by the client.
export const BRAND_LINKS = {
  instagram: "https://www.instagram.com/loot.box.3d/",
  /** Maker profile on Stimalo, the Italian 3D-printing marketplace. */
  stimalo: "https://stimalo.com/printer/loot-box-3d",
  email: "lootbox.3dprint@gmail.com",
  /**
   * Google Maps search for the town only: the site states no street address.
   * Swap for the studio's address or Google Business profile link if one is
   * published.
   */
  maps: "https://www.google.com/maps/search/?api=1&query=Abbiategrasso%2C%20MI",
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
  film: "--tier-film",
  gadget: "--tier-gadget",
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

/**
 * Extra photos for a piece's own page, after the main one in `SHOWCASE_IMAGES`:
 * details, other angles, the piece in use. Same format rules as the main photo
 * (560x700 WebP, metadata stripped). A piece with no entry shows one photo.
 *
 * Example, with the files placed in `public/showcase/`:
 *   "cat-glasses-stand": ["/showcase/cat-glasses-stand-2.webp", "/showcase/cat-glasses-stand-3.webp"],
 */
export const SHOWCASE_EXTRA_IMAGES: Record<string, readonly string[]> = {}

/**
 * Timelapses and photos for the lab page, keyed by `LabStep.id` in it.json.
 * A step with no entry shows no media. Files live in `public/laboratorio/`.
 *
 * Videos: 10-20 s, no audio track, MP4 (H.264) at about 720p, a few MB each.
 * They play muted and looped only while on screen. `poster` is the frame shown
 * before the video loads and, under reduced motion, instead of autoplay.
 *
 * Example:
 *   sanding: { type: "video", src: "/laboratorio/carteggiatura.mp4", poster: "/laboratorio/carteggiatura.webp" },
 *   cleaning: { type: "image", src: "/laboratorio/pulizia.webp" },
 */
export type LabMedia =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string }

export const LAB_MEDIA: Record<string, LabMedia> = {}

/**
 * Photos of each material for its detail panel on the lab page, keyed by
 * `LabMaterial.id` in it.json; the first one also shows on the card. A material
 * with no entry shows the "Foto in arrivo" placeholder. 4:3 WebP, 1200x900,
 * metadata stripped, in `public/laboratorio/materiali/`.
 *
 * Example:
 *   pla: ["/laboratorio/materiali/pla-1.webp", "/laboratorio/materiali/pla-2.webp"],
 */
export const LAB_MATERIAL_PHOTOS: Record<string, readonly string[]> = {}

/**
 * One photo per tool or product under a lab step, keyed by `LabTool.id` in
 * it.json. A tool with no entry shows the placeholder. Square WebP, 800x800,
 * metadata stripped, in `public/laboratorio/strumenti/`.
 *
 * Example:
 *   acrylics: "/laboratorio/strumenti/acrilici.webp",
 */
export const LAB_TOOL_PHOTOS: Record<string, string> = {}

/** Intrinsic size of every file in `SHOWCASE_IMAGES`, used to reserve space. */
export const SHOWCASE_IMAGE_SIZE = { width: 560, height: 700 } as const
