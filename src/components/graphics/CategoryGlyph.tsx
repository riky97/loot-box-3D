import type { CategoryId } from "@/types/content"

interface CategoryGlyphProps {
  category: CategoryId
  className?: string
}

const sharedProps = (className?: string) => ({
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": "true" as const,
  className,
})

/** Spiky hair silhouette in profile, drawn as a single continuous polyline. */
function AnimeGlyph({ className }: { className?: string }) {
  return (
    <svg {...sharedProps(className)}>
      <polyline
        points="14,46 12,30 20,34 18,18 27,28 27,10 35,26 39,12 42,28 50,20 46,34 54,32 44,42 44,50 34,44 30,52 24,44 18,50"
      />
      <path d="M18,50 Q32,58 44,50" />
    </svg>
  )
}

/** Helmet / visor outline with one diagonal highlight stroke. */
function CosplayGlyph({ className }: { className?: string }) {
  return (
    <svg {...sharedProps(className)}>
      <path d="M14,34 C14,18 24,8 32,8 C40,8 50,18 50,34 C50,44 44,48 44,48 L20,48 C20,48 14,44 14,34 Z" />
      <path d="M14,34 L50,34" />
      <path d="M18,34 C18,42 24,46 32,46 C40,46 46,42 46,34" />
      <line x1="26" y1="14" x2="18" y2="30" />
    </svg>
  )
}

/** Isometric d-pad cross, drawn in wireframe. */
function GamingGlyph({ className }: { className?: string }) {
  return (
    <svg {...sharedProps(className)}>
      <path
        d="M26,14 L38,14 L38,22 L46,26 L46,38 L38,42 L38,50 L26,50 L26,42 L18,38 L18,26 L26,22 Z"
      />
      <path d="M26,14 L26,22 M38,14 L38,22 M46,26 L38,22 M46,38 L38,42 M26,42 L18,38 M26,22 L18,26" />
      <path d="M32,26 L38,29 L38,35 L32,38 L26,35 L26,29 Z" opacity="0.6" />
    </svg>
  )
}

/** Isometric cube with one face left open. */
function OtherGlyph({ className }: { className?: string }) {
  return (
    <svg {...sharedProps(className)}>
      <polyline points="32,10 50,20 50,42 32,52 14,42 14,20 32,10" />
      <line x1="32" y1="10" x2="32" y2="32" />
      <line x1="14" y1="20" x2="32" y2="32" />
      <line x1="32" y1="32" x2="32" y2="52" opacity="0.5" />
      <line x1="50" y1="42" x2="32" y2="32" opacity="0.5" />
    </svg>
  )
}

const glyphs: Record<CategoryId, (props: { className?: string }) => React.JSX.Element> = {
  anime: AnimeGlyph,
  cosplay: CosplayGlyph,
  gaming: GamingGlyph,
  other: OtherGlyph,
}

/** One of four hand-drawn category glyphs — not stock icons. */
export function CategoryGlyph({ category, className }: CategoryGlyphProps) {
  const Glyph = glyphs[category]
  return <Glyph className={className} />
}

export default CategoryGlyph
