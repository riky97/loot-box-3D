import type { ReactNode } from "react"

import { useInView } from "@/hooks/useInView"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Id of the heading element, referenced by the section's `aria-labelledby`. */
  id: string
  eyebrow: string
  /** Plain text; the last word is marked automatically. Use `title` for nodes. */
  titleText?: string
  /** Full control over the heading content, when `titleText` is not enough. */
  title?: ReactNode
  subtitle?: string
  className?: string
  align?: "start" | "center"
}

/**
 * Eyebrow + H2. The H2 carries no gradient and no shadow; instead a gold bar
 * scales in behind its last word once the heading scrolls into view, which
 * keeps the heading at full contrast while still giving the reveal something
 * to do (DESIGN.md section 3).
 */
export function SectionHeading({
  id,
  eyebrow,
  titleText,
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
        isInView && "is-inview",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="type-eyebrow inline-block self-start border-b-2 border-primary pb-sp-1 text-primary">
        {eyebrow}
      </p>
      <h2 id={id} className="type-h2 text-foreground">
        {titleText ? <MarkedTitle text={titleText} /> : title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "text-foreground-dim max-w-measure-lead",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Splits the heading so only the final word carries the gold bar. Highlighting
 * the whole line would read as a marker pen; highlighting one word reads as
 * emphasis.
 */
function MarkedTitle({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)
  const last = words.pop()

  return (
    <>
      {words.length > 0 ? `${words.join(" ")} ` : null}
      <span className="heading-mark">{last}</span>
    </>
  )
}
