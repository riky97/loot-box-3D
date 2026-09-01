import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

interface CutCardProps {
  children: ReactNode
  /** Applied to the inner surface, not the 1px gradient frame. */
  className?: string
  /** Applied to the outer frame — use for layout, lift and glow. */
  frameClassName?: string
  /** Corner-cut size. Cards use the default; chips and small controls use less. */
  chamfer?: string
  /** Renders the diagonal accent tick that marks the cut as intentional. */
  withTick?: boolean
}

/**
 * The signature "sprue-cut" surface: a card whose top-right corner is chamfered
 * at 45°. `clip-path` removes borders, so the 1px edge is drawn as a padded
 * gradient frame behind an identically clipped inner surface.
 */
export function CutCard({
  children,
  className,
  frameClassName,
  chamfer,
  withTick = true,
}: CutCardProps) {
  return (
    <div
      className={cn("cut-frame shadow-card", frameClassName)}
      style={chamfer ? ({ "--chamfer": chamfer } as CSSProperties) : undefined}
    >
      <div className={cn("relative h-full w-full bg-card", className)}>{children}</div>
      {withTick ? <span aria-hidden="true" className="cut-tick" /> : null}
    </div>
  )
}
