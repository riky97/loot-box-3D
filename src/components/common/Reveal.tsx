import type { CSSProperties, ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger index; each step adds 60ms, capped so long grids never crawl. */
  delayIndex?: number
}

const STAGGER_STEP_MS = 60
const MAX_STAGGER_STEPS = 5

/**
 * Fades and lifts its children into place the first time they scroll into view.
 * The visual effect lives in `main.scss` under `[data-reveal]`, which is also
 * where `prefers-reduced-motion` neutralises it.
 */
export function Reveal({ children, className, delayIndex = 0 }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const delay = Math.min(delayIndex, MAX_STAGGER_STEPS) * STAGGER_STEP_MS

  return (
    <div
      ref={ref}
      data-reveal=""
      className={cn(isInView && "is-inview", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
