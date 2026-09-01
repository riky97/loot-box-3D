import { BrandMark } from "@/components/common/BrandMark"
import { cn } from "@/lib/utils"

interface WordmarkProps {
  className?: string
  /**
   * `inline` pairs the chest symbol with the name for the header bar;
   * `stacked` uses the complete logo artwork as supplied.
   */
  variant?: "inline" | "stacked"
  size?: "sm" | "lg"
  /** Accessible name for the lockup. Supply the localized brand name. */
  label: string
}

// The wordmark is the mark itself, not copy: identical in every locale, so it
// stays out of the translation files. It is set in the brand display face,
// lowercase, matching the logo artwork.
const BRAND_WORD = "loot box"

/**
 * The brand lockup. The artwork is painted with `currentColor` (see BrandMark),
 * so both variants follow the palette rather than carrying a fixed background.
 */
export function Wordmark({ className, variant = "inline", size = "sm", label }: WordmarkProps) {
  if (variant === "stacked") {
    return (
      <span
        role="img"
        aria-label={label}
        className={cn("block text-foreground", size === "sm" ? "w-40" : "w-52", className)}
      >
        <BrandMark variant="full" />
      </span>
    )
  }

  return (
    <span
      role="img"
      aria-label={label}
      className={cn("group inline-flex items-center gap-sp-2 text-foreground", className)}
    >
      <BrandMark
        className={cn(
          "shrink-0 transition-transform duration-base ease-out group-hover:-translate-y-px",
          size === "sm" ? "w-9" : "w-11",
        )}
      />
      <span
        className={cn(
          "type-display leading-none tracking-h2",
          size === "sm" ? "text-[21px]" : "text-[28px]",
        )}
      >
        {BRAND_WORD}
      </span>
    </span>
  )
}
