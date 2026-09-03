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
 * PLACEHOLDER imagery.
 *
 * There is no `SHOWCASE_IMAGES` map: the client has supplied no photography,
 * and pointing the catalogue at a third-party photo host meant broken tiles, a
 * licensing question on a client deliverable, and a runtime dependency on
 * someone else's CDN. Each tile draws its own stand-in instead — see
 * `PlaceholderTile`.
 *
 * TODO: when the real photography arrives, add the files under `public/` and
 * swap `PlaceholderTile` for an `<img>` in `ShowcaseSection`.
 */
