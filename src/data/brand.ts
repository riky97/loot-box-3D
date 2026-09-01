import type { CategoryId } from "@/types/content"

// External brand destinations. PLACEHOLDER — confirm with the client before launch.
export const BRAND_LINKS = {
  instagram: "https://www.instagram.com/loot.box.3d/",
} as const

/**
 * The accent hue each product category is drawn in. Values are CSS custom
 * property names from `_tokens.scss`, consumed as `hsl(var(--...))`, so the
 * category coding follows any palette change made in the token file.
 */
export const categoryHueVars: Record<CategoryId, string> = {
  anime: "--primary",
  cosplay: "--accent",
  gaming: "--rarity-rare",
  other: "--brand-violet",
}
