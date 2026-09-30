import { useId } from "react"

import { BrandMark } from "@/components/common/BrandMark"
import { cn } from "@/lib/utils"

interface PhotoPlaceholderProps {
  /** Shown in the corner, so nobody mistakes the stand-in for a real photo. */
  label: string
  /** Sets the aspect ratio and anything else about the box, e.g. `aspect-[4/3]`. */
  className?: string
  /**
   * Hide it from assistive tech. Use inside a control whose name comes from its
   * text, such as a card button: otherwise the chip becomes the first words of
   * the name ("Foto in arrivo PLA" instead of "PLA").
   */
  decorative?: boolean
}

/**
 * Stand-in for a photo the studio has not supplied yet: a green-tinted ground,
 * a diagonal hatch and the brand mark, with a "Foto in arrivo" chip. The same
 * treatment the gallery used before the real photography arrived, and for the
 * same reason: never a flat colour block (DESIGN.md, Don'ts).
 *
 * It disappears on its own once the photo is added to the matching map in
 * brand.ts; nothing else needs to change.
 */
export function PhotoPlaceholder({ label, className, decorative = false }: PhotoPlaceholderProps) {
  // useId keeps the pattern id unique when many placeholders share a page.
  const patternId = `hatch-${useId().replace(/:/g, "")}`

  return (
    <div
      aria-hidden={decorative ? "true" : undefined}
      className={cn("relative w-full overflow-hidden bg-surface-alt", className)}
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
              stroke="hsl(var(--primary))"
              strokeOpacity="0.16"
              strokeWidth="4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="hsl(var(--primary) / 0.06)" />
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <BrandMark className="w-[36%] max-w-[160px] text-foreground opacity-20" />
      </div>

      <span className="type-chip absolute bottom-sp-2 left-sp-2 rounded-pill bg-surface/90 px-sp-2 py-[3px] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export default PhotoPlaceholder
