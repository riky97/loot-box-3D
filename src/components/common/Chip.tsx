import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ChipProps {
  children: ReactNode
  /**
   * Custom property name from `_tokens.scss` (e.g. `--tier-anime`) used to tint
   * the fill and border. The label itself always stays `--foreground`.
   */
  tierVar?: string
  className?: string
}

/**
 * A small uppercase label on a tinted, pill-shaped fill.
 *
 * The text colour is deliberately NOT the tier colour: at 11px the decorative
 * hues fall below AA on cream (see DESIGN.md colour rule 2). The tier tints the
 * background and border; `--foreground` carries the words.
 */
export function Chip({ children, tierVar = "--gold", className }: ChipProps) {
  return (
    <span
      className={cn(
        "type-chip inline-flex items-center gap-sp-1 rounded-pill border-[1.5px] px-sp-2 py-[4px] text-foreground",
        className,
      )}
      style={
        {
          "--tier": `var(${tierVar})`,
          backgroundColor: "hsl(var(--tier) / 0.22)",
          borderColor: "hsl(var(--tier) / 0.55)",
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}
