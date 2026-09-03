import { useId } from "react"
import type { CSSProperties } from "react"

import { BrandMark } from "@/components/common/BrandMark"

interface PlaceholderTileProps {
  /** Custom property name from `_tokens.scss`, e.g. `--tier-anime`. */
  tierVar: string
  /** Rendered into the corner so each tile is visibly a stand-in. */
  label: string
}

/**
 * Stand-in artwork for a catalogue item.
 *
 * The client has supplied no product photography. Rather than linking a
 * third-party photo host — which broke on every tile, adds a licensing question
 * to a client deliverable and leaves the page dependent on someone else's CDN —
 * each tile draws itself: a tier-tinted ground, a hatch, and the brand mark.
 *
 * It is deliberately not a flat colour block, and it says SEGNAPOSTO on it so
 * nobody mistakes it for the real catalogue.
 *
 * TODO: replace with the client's photography. Swapping is contained to this
 * component and the `ShowcaseSection` tile that renders it.
 */
export function PlaceholderTile({ tierVar, label }: PlaceholderTileProps) {
  // useId keeps the pattern id unique when many tiles share a page.
  const patternId = `hatch-${useId().replace(/:/g, "")}`

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[4/5] w-full overflow-hidden bg-surface-alt"
      style={{ "--tier": `var(${tierVar})` } as CSSProperties}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern
            id={patternId}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="14"
              stroke="hsl(var(--tier))"
              strokeOpacity="0.28"
              strokeWidth="4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="hsl(var(--tier) / 0.10)" />
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <BrandMark className="w-[46%] text-foreground opacity-25" />
      </div>

      <span className="type-chip absolute bottom-sp-2 left-sp-2 rounded-pill bg-surface/85 px-sp-2 py-[3px] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
