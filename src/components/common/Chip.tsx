import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface ChipProps {
  children: ReactNode
  /**
   * Name of the CSS custom property holding the chip's hue, e.g. `--accent`.
   * Defaults to the muted foreground so a chip is never colourless.
   */
  hueVar?: string
  className?: string
}

/** Small mono label in a category or accent hue — the page's "machine voice" tag. */
export function Chip({ children, hueVar = "--muted-foreground", className }: ChipProps) {
  return (
    <span
      className={cn("chip", className)}
      style={{ "--tier": `var(${hueVar})` } as CSSProperties}
    >
      {children}
    </span>
  )
}
