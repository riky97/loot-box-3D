import { Chip } from "@/components/common/Chip"
import { ProductSilhouette, type SilhouetteShape } from "@/components/graphics/ProductSilhouette"
import { BRAND_LINKS, categoryHueVars } from "@/data/brand"
import { cn } from "@/lib/utils"
import type { ShowcaseItem } from "@/types/content"

/**
 * Showcase item id -> drawn silhouette. Falls back to `figure` so new content
 * (an item id added to the translation bundle without a matching shape) never
 * crashes the tile.
 */
const SHAPE_BY_ITEM_ID: Record<string, SilhouetteShape> = {
  "kitsune-mask": "bust",
  "chibi-ronin": "figure",
  "ranger-helm": "helmet",
  "obsidian-die": "dice",
  "cyber-katana": "sword",
  "moon-guardian": "gauntlet",
  "spirit-fox-keychain": "keychain",
  "custom-badge": "trophy",
}

/**
 * Print-spec values shown on each tile's caption. Machine values only — no
 * invented Italian prose — varied per tile so the grid doesn't repeat itself.
 */
const SPEC_BY_ITEM_ID: Record<string, [material: string, size: string, layer: string]> = {
  "kitsune-mask": ["PLA", "220 MM", "0.16 MM"],
  "chibi-ronin": ["PLA", "120 MM", "0.12 MM"],
  "ranger-helm": ["PETG", "260 MM", "0.20 MM"],
  "obsidian-die": ["RESIN", "30 MM", "0.05 MM"],
  "cyber-katana": ["PETG", "780 MM", "0.20 MM"],
  "moon-guardian": ["PLA", "340 MM", "0.16 MM"],
  "spirit-fox-keychain": ["PLA", "60 MM", "0.12 MM"],
  "custom-badge": ["RESIN", "80 MM", "0.08 MM"],
}

const DEFAULT_SPEC: [string, string, string] = ["PLA", "150 MM", "0.16 MM"]

interface ProductTileProps {
  item: ShowcaseItem
  /** Spans two grid rows on the desktop dense grid (indices 0 and 4). */
  tall?: boolean
  className?: string
}

export function ProductTile({ item, tall = false, className }: ProductTileProps) {
  const shape = SHAPE_BY_ITEM_ID[item.id] ?? "figure"
  const spec = SPEC_BY_ITEM_ID[item.id] ?? DEFAULT_SPEC
  const hueVar = categoryHueVars[item.category]
  const specLine = spec.join(" · ")
  const specLineCompact = spec.slice(0, 2).join(" · ")

  return (
    <a
      href={BRAND_LINKS.instagram}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${item.name} — ${item.tag}`}
      className={cn(
        "cut-frame group relative block shadow-card transition-shadow duration-base ease-out",
        "aspect-[4/5] lg:aspect-auto",
        tall && "aspect-[4/7] lg:row-span-2",
        "hover:shadow-card-hover focus-visible:shadow-card-hover",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden bg-card">
        {/* 1. Stage — single overhead key light. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(90% 70% at 50% 32%, hsl(var(--surface-2)) 0%, hsl(var(--plate)) 60%, hsl(var(--plate-deep)) 100%)",
          }}
        />

        {/* 2. Build-plate grid, low alpha, radially masked. */}
        <div
          aria-hidden="true"
          className="plate-grid absolute inset-0 opacity-[0.06]"
          style={{
            maskImage: "radial-gradient(80% 60% at 50% 60%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(80% 60% at 50% 60%, #000, transparent)",
          }}
        />

        {/* 3. Floor shadow. */}
        <div
          aria-hidden="true"
          className="absolute bottom-[18%] left-1/2 h-[26px] w-[62%] -translate-x-1/2 blur-[6px]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse, hsl(var(--shadow-base) / 0.75), transparent 70%)",
          }}
        />

        {/* 4-6. Object silhouette with rim glow, scaled and lifted on hover. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute bottom-[22%] left-1/2 w-[58%] -translate-x-1/2 sm:w-[52%]",
            "[--glow-alpha:0.5] transition-transform duration-base ease-out",
            "group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-hover:[--glow-alpha:0.8]",
            "group-focus-visible:-translate-y-0.5 group-focus-visible:scale-[1.04] group-focus-visible:[--glow-alpha:0.8]",
          )}
          style={{
            filter: `drop-shadow(0 0 46px hsl(var(${hueVar}) / var(--glow-alpha)))`,
            transition: "filter var(--dur-base) var(--ease-out)",
          }}
        >
          <ProductSilhouette shape={shape} hueVar={hueVar} />
        </div>

        {/* 7. Chrome overlay. */}
        <div className="absolute left-sp-3 top-sp-3">
          <Chip hueVar={hueVar}>{item.tag}</Chip>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-border bg-card/80 px-sp-3 py-sp-2 backdrop-blur-sm">
          <p className="type-h3 truncate text-sm text-foreground">{item.name}</p>
          <p className="type-meta mt-sp-1 text-muted-foreground">
            <span className="sm:hidden">{specLineCompact}</span>
            <span className="hidden sm:inline">{specLine}</span>
          </p>
        </div>

        {/* Bottom-edge extrusion rule, drawn in on hover/focus. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-grad-extrude",
            "transition-transform duration-base ease-out",
            "group-hover:scale-x-100 group-focus-visible:scale-x-100",
          )}
        />
      </div>
      <span aria-hidden="true" className="cut-tick" />
    </a>
  )
}

export default ProductTile
