/**
 * Instagram glyph, drawn inline: the installed `lucide-react` build ships no
 * branded icon set, so the outline is hand-drawn in that library's stroke style
 * (round linecap/linejoin) to stay visually consistent with the other icons.
 *
 * Pass `stroke` through `className` (it inherits `currentColor`) or override it
 * with an SVG paint server for the gradient treatment used on the contact card.
 */
interface InstagramGlyphProps {
  className?: string
  strokeWidth?: number
  /** SVG paint for the stroke, e.g. `url(#gradient-id)`. Defaults to `currentColor`. */
  stroke?: string
}

export function InstagramGlyph({
  className,
  strokeWidth = 2,
  stroke = "currentColor",
}: InstagramGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
