import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface BrandMarkProps {
  className?: string
  /** `mark` is the chest symbol alone; `full` is the complete stacked lockup. */
  variant?: "mark" | "full"
}

// Aspect ratios of the exported assets, so the element reserves its height
// before the image loads and never shifts the layout.
const ASSETS = {
  mark: { url: "/brand/logo-mark.png", ratio: "512 / 394" },
  full: { url: "/brand/logo-full.png", ratio: "1024 / 646" },
} as const

/**
 * The Loot Box 3D logo artwork.
 *
 * The supplied file is a raster logo drawn in one ink on a flat cream ground
 * (`docs/brand/logo-original.jpeg`). Rather than placing it as an image — which
 * would carry that cream rectangle onto every surface — the ink is extracted to
 * an alpha mask and painted with `currentColor`. The logo therefore follows the
 * palette in `_tokens.scss` and sits cleanly on any background.
 *
 * TODO: swap both assets for the designer's vector file when it is available;
 * a raster mask cannot be redrawn for very large display sizes.
 */
export function BrandMark({ className, variant = "mark" }: BrandMarkProps) {
  const asset = ASSETS[variant]

  return (
    <span
      aria-hidden="true"
      className={cn("block w-full bg-current", className)}
      style={
        {
          aspectRatio: asset.ratio,
          maskImage: `url("${asset.url}")`,
          WebkitMaskImage: `url("${asset.url}")`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        } as CSSProperties
      }
    />
  )
}
