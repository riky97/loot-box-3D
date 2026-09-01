import type { ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Id of the heading element, referenced by the section's `aria-labelledby`. */
  id: string
  eyebrow: string
  title: ReactNode
  subtitle?: string
  className?: string
  align?: "start" | "center"
}

/**
 * Eyebrow + H2 + the extrusion rule that underlines every section title.
 * The rule draws itself once the heading scrolls into view.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  align = "start",
}: SectionHeadingProps) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-sp-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="type-eyebrow text-accent">{eyebrow}</p>
      <h2 id={id} className="type-h2 text-foreground">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={cn("extrude-rule w-[72px]", isInView && "is-inview")}
      />
      {subtitle ? (
        <p className={cn("text-muted-foreground max-w-measure-lead", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
