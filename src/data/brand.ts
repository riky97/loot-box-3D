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
  "balrog-bust": "/showcase/balrog-bust.webp",
  gengar: "/showcase/gengar.webp",
  "monza-circuit": "/showcase/monza-circuit.webp",
  "pokeball-switch-case": "/showcase/pokeball-switch-case.webp",
  "jurassic-park-raptor": "/showcase/jurassic-park-raptor.webp",
  "one-piece-bookends": "/showcase/one-piece-bookends.webp",
  "cat-glasses-stand": "/showcase/cat-glasses-stand.webp",
  "tcg-kallax-storage": "/showcase/tcg-kallax-storage.webp",
  "dragon-trainer-cake-topper": "/showcase/dragon-trainer-cake-topper.webp",
  "lugia-keychain": "/showcase/lugia-keychain.webp",
  "dino-pen-holder": "/showcase/dino-pen-holder.webp",
  "spiderman-mega-brick": "/showcase/spiderman-mega-brick.webp",
  "graded-card-case": "/showcase/graded-card-case.webp",
  "jiji-bookmark": "/showcase/jiji-bookmark.webp",
  "boromir-pen-holder": "/showcase/boromir-pen-holder.webp",
  "iphone-cover": "/showcase/iphone-cover.webp",
  "fellowship-sword": "/showcase/fellowship-sword.webp",
  bender: "/showcase/bender.webp",
  pikachu: "/showcase/pikachu.webp",
  "guinea-pig-keychain": "/showcase/guinea-pig-keychain.webp",
  "league-of-legends-logo": "/showcase/league-of-legends-logo.webp",
  "kratos-bust": "/showcase/kratos-bust.webp",
}

/**
 * Showcase items the studio designed itself, keyed by `ShowcaseItem.id`. Only
 * these carry the "Design originale" badge; everything else is a third-party
 * model printed without a commercial licence (see `showcase.licenseNote`).
 *
 * A fact about the piece, not copy, so it lives here and not in each locale,
 * where two languages could disagree about who designed something.
 *
 * Confirmed by the client on 2026-10-01. A badge on the wrong piece is a false
 * attribution on a public page, so add an id only on the client's word.
 */
export const ORIGINAL_DESIGNS: ReadonlySet<string> = new Set(["samehada", "cat-glasses-stand"])

/**
 * Extra photos for a piece's own page, after the main one in `SHOWCASE_IMAGES`:
 * details, other angles, the piece in use. Same format rules as the main photo
 * (560x700 WebP, metadata stripped). A piece with no entry shows one photo.
 *
 * Example, with the files placed in `public/showcase/`:
 *   "cat-glasses-stand": ["/showcase/cat-glasses-stand-2.webp", "/showcase/cat-glasses-stand-3.webp"],
 */
export const SHOWCASE_EXTRA_IMAGES: Record<string, readonly string[]> = {
  "league-of-legends-logo": ["/showcase/league-of-legends-logo-2.webp"],
}

/**
 * A short clip for a piece's own page, shown after its photos (a turntable,
 * the piece in use), keyed by `ShowcaseItem.id`; its alt is `videoAlt` on the
 * item in it.json. MP4 (H.264), 4:5 at 720x900, no audio track, metadata
 * stripped, a few seconds; `poster` is its first frame as 560x700 WebP. Files
 * live in `public/showcase/video/`. The gallery card keeps the still photo.
 */
export const SHOWCASE_VIDEOS: Record<string, { src: string; poster: string }> = {
  "kratos-bust": {
    src: "/showcase/video/kratos-bust.mp4",
    poster: "/showcase/video/kratos-bust.webp",
  },
}

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

export const LAB_MEDIA: Record<string, LabMedia> = {
  painting: {
    type: "video",
    src: "/laboratorio/pittura.mp4",
    poster: "/laboratorio/pittura-poster.webp",
  },
  "finishing-extra": { type: "image", src: "/laboratorio/lucidatura.webp" },
}

/**
 * Photos of each material for its detail panel on the lab page, keyed by
 * `LabMaterial.id` in it.json; the first one also shows on the card. A material
 * with no entry shows the "Foto in arrivo" placeholder on its card, and its
 * panel shows the text alone. 4:3 WebP, 1200x900, metadata stripped, in
 * `public/laboratorio/materiali/`.
 *
 * These are the makers' own product shots (Bambu Lab, Anycubic), used with the
 * client's agreement and with their copyright mark left visible: each is the
 * image area of the store photo, padded to 4:3 with its own background colour
 * rather than cropped, so the mark is never cut off.
 */
const materialPhoto = (id: string) => [`/laboratorio/materiali/${id}.webp`]

export const LAB_MATERIAL_PHOTOS: Record<string, readonly string[]> = {
  pla: materialPhoto("pla"),
  petg: materialPhoto("petg"),
  asa: materialPhoto("asa"),
  abs: materialPhoto("abs"),
  pc: materialPhoto("pc"),
  tpu: materialPhoto("tpu"),
  resina: materialPhoto("resina"),
}

/**
 * One photo per tool or product under a lab step, keyed by `LabTool.id` in
 * it.json. A tool with no entry shows the placeholder. Square WebP, 800x800,
 * metadata stripped, in `public/laboratorio/strumenti/`.
 *
 * Example:
 *   acrylics: "/laboratorio/strumenti/acrilici.webp",
 */
export const LAB_TOOL_PHOTOS: Record<string, string> = {
  acrylics: "/laboratorio/strumenti/acrilici.webp",
  brushes: "/laboratorio/strumenti/pennelli.webp",
}

/**
 * One photo per printer, keyed by `LabPrinter.id` in it.json, with its alt in
 * `photoAlt` there. A printer with no entry shows the placeholder. 4:3 WebP,
 * 1200x900, metadata stripped, in `public/laboratorio/stampanti/`.
 */
export const LAB_PRINTER_PHOTOS: Record<string, string> = {
  "bambu-h2s": "/laboratorio/stampanti/bambu-h2s.webp",
  "bambu-a1": "/laboratorio/stampanti/bambu-a1.webp",
  "anycubic-m5s": "/laboratorio/stampanti/anycubic-m5s.webp",
}

/**
 * An opening photo or clip beside a lab section's title, keyed by the
 * section's key in `LAB_SECTION_IDS`, with its alt in it.json as
 * `lab.<section>.mediaAlt`. 4:5 (a video at 720x900, no audio, with its first
 * frame as the poster), metadata stripped.
 */
export const LAB_SECTION_MEDIA: Partial<Record<"materials", LabMedia>> = {
  materials: {
    type: "video",
    src: "/laboratorio/materiali.mp4",
    poster: "/laboratorio/materiali-poster.webp",
  },
}

/** Intrinsic size of every file in `SHOWCASE_IMAGES`, used to reserve space. */
export const SHOWCASE_IMAGE_SIZE = { width: 560, height: 700 } as const
