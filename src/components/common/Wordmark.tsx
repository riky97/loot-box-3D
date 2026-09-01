import { cn } from "@/lib/utils"

interface WordmarkProps {
  className?: string
  /** Font size of the "LOOT BOX" half; the "3D" badge scales with it. */
  size?: "sm" | "lg"
}

/**
 * Text-only brand lockup: the name in the expanded display face, followed by a
 * chamfered "3D" badge in the mono face. No image asset involved, so it stays
 * crisp at any size and follows the palette.
 */
export function Wordmark({ className, size = "sm" }: WordmarkProps) {
  return (
    <span className={cn("group inline-flex items-center gap-sp-2", className)}>
      <span
        className={cn(
          "type-display uppercase leading-none tracking-h2 text-foreground",
          size === "sm" ? "text-[18px]" : "text-[22px]",
        )}
      >
        Loot Box
      </span>
      <span
        className={cn(
          "cut-shape type-chip inline-flex items-center px-[5px] py-[2px] text-primary",
          "shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.35)]",
          "transition-shadow duration-fast ease-out group-hover:shadow-glow-hot",
          "[--chamfer:6px]",
          size === "sm" ? "text-[13px]" : "text-[15px]",
        )}
      >
        3D
      </span>
    </span>
  )
}
