import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * The eight drawn product silhouettes used on the showcase tiles. Each maps
 * 1:1 to one showcase item (see the mapping table in `ProductTile.tsx`), with
 * `figure` as the safe fallback for any future item id that doesn't have an
 * explicit assignment yet.
 */
export type SilhouetteShape =
  | "bust"
  | "figure"
  | "helmet"
  | "sword"
  | "gauntlet"
  | "trophy"
  | "dice"
  | "keychain"

interface ShapeDef {
  width: number
  height: number
  /** SVG path data for the solid silhouette. May contain multiple subpaths. */
  d: string
  fillRule?: "nonzero" | "evenodd"
}

// Simple, plausible geometric silhouettes — legible at tile scale, not
// intended as detailed illustration. Coordinates are in each shape's own
// local viewBox space.
const SHAPES: Record<SilhouetteShape, ShapeDef> = {
  bust: {
    width: 120,
    height: 140,
    d: "M60 8 C74 8 84 20 84 34 C84 44 79 51 72 55 L72 62 C92 66 104 82 104 104 L104 132 L16 132 L16 104 C16 82 28 66 48 62 L48 55 C41 51 36 44 36 34 C36 20 46 8 60 8 Z",
  },
  figure: {
    width: 120,
    height: 140,
    d: "M60 6 C72 6 82 16 82 28 C82 38 76 46 68 49 L70 56 L86 64 C96 68 100 78 98 90 L94 132 L78 132 L74 96 L60 100 L46 96 L42 132 L26 132 L22 90 C20 78 24 68 34 64 L50 56 L52 49 C44 46 38 38 38 28 C38 16 48 6 60 6 Z",
  },
  helmet: {
    width: 120,
    height: 100,
    d: "M60 8 C89 8 106 32 106 60 L106 90 L14 90 L14 60 C14 32 31 8 60 8 Z M30 66 L90 66 L90 77 L30 77 Z",
    fillRule: "evenodd",
  },
  sword: {
    width: 120,
    height: 140,
    d: "M56 6 L64 6 L67 92 L53 92 Z M38 92 L82 92 L82 101 L38 101 Z M53 101 L67 101 L67 128 L53 128 Z M60 134 A7 7 0 1 0 60.02 134 Z",
  },
  gauntlet: {
    width: 120,
    height: 140,
    d: "M40 70 C40 56 49 42 60 42 C71 42 80 56 80 70 C80 81 73 90 64 92 L64 104 L56 104 L56 92 C47 90 40 81 40 70 Z M46 134 L46 96 L74 96 L74 134 Z",
  },
  trophy: {
    width: 120,
    height: 140,
    d: "M40 12 L80 12 L78 42 C78 56 70 64 60 66 C50 64 42 56 42 42 Z M28 18 C21 18 16 25 19 34 C22 43 33 47 40 44 L40 22 C36 19 32 18 28 18 Z M92 18 C99 18 104 25 101 34 C98 43 87 47 80 44 L80 22 C84 19 88 18 92 18 Z M54 66 L66 66 L66 96 L54 96 Z M36 96 L84 96 L84 110 L36 110 Z",
  },
  dice: {
    width: 120,
    height: 140,
    d: "M60 10 L102 34 L60 58 L18 34 Z M18 34 L60 58 L60 116 L18 92 Z M102 34 L60 58 L60 116 L102 92 Z",
  },
  keychain: {
    width: 120,
    height: 140,
    d: "M60 6 A15 15 0 1 0 60.02 6 Z M60 14 A7 7 0 1 0 60.02 14 Z M30 42 L90 42 C99 42 106 49 106 58 L106 118 C106 127 99 134 90 134 L30 134 C21 134 14 127 14 118 L14 58 C14 49 21 42 30 42 Z",
    fillRule: "evenodd",
  },
}

interface ProductSilhouetteProps {
  shape: SilhouetteShape
  /** CSS custom property name for the hue, e.g. `--primary`. */
  hueVar: string
  className?: string
}

/**
 * A solid, gradient-filled product silhouette with a lightened upper-left rim
 * and print striations clipped to its own outline — the detail that sells
 * "3D printed" on a CSS/SVG-only showcase tile.
 */
export function ProductSilhouette({ shape, hueVar, className }: ProductSilhouetteProps) {
  const uid = useId().replace(/[:]/g, "")
  const gradId = `silhouette-grad-${uid}`
  const clipId = `silhouette-clip-${uid}`
  const stripeId = `silhouette-stripe-${uid}`
  const def = SHAPES[shape] ?? SHAPES.figure
  const fillRule = def.fillRule ?? "nonzero"

  return (
    <svg
      viewBox={`0 0 ${def.width} ${def.height}`}
      className={cn("h-full w-full overflow-visible", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={`hsl(var(${hueVar}) / 0.95)`} />
          <stop offset="100%" stopColor={`hsl(var(${hueVar}) / 0.35)`} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={def.d} fillRule={fillRule} />
        </clipPath>
        <pattern id={stripeId} patternUnits="userSpaceOnUse" width="8" height="3">
          <rect width="8" height="1.5" fill="hsl(var(--foreground) / 0.1)" />
        </pattern>
      </defs>

      {/* Lightened rim on the upper-left edge — a duplicate path offset up-left. */}
      <path
        d={def.d}
        fillRule={fillRule}
        fill="none"
        stroke="hsl(var(--foreground) / 0.25)"
        strokeWidth={1.5}
        transform="translate(-1.5,-1.5)"
      />

      {/* The solid gradient-filled body. */}
      <path d={def.d} fillRule={fillRule} fill={`url(#${gradId})`} />

      {/* Print striations, clipped to the silhouette outline only. */}
      <g clipPath={`url(#${clipId})`}>
        <rect x={0} y={0} width={def.width} height={def.height} fill={`url(#${stripeId})`} />
      </g>
    </svg>
  )
}

export default ProductSilhouette
