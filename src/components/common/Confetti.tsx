import { useState } from "react"
import type { CSSProperties } from "react"

const PIECE_COUNT = 40

// The three decorative accents. These are fills, never text, so using them here
// is exactly what they are for.
const TIER_VARS = ["--accent-vivid", "--gold", "--green-vivid", "--primary"] as const

/**
 * The burst that fires when the Konami code lands.
 *
 * Rendered only while celebrating, and never mounted at all under
 * `prefers-reduced-motion` — `useKonamiCode` refuses to arm in that case, so
 * this component is unreachable there.
 *
 * Pieces animate on `transform` and `opacity` only, and there is no blur on any
 * of them: moving blur is the one effect this design forbids outright.
 */
export function Confetti() {
  // A lazy `useState` initialiser rather than `useMemo`: the positions must be
  // drawn exactly once per mount, and `useMemo` is a performance hint React is
  // free to discard — recomputing would reshuffle the burst mid-flight.
  const [pieces] = useState(() =>
    Array.from({ length: PIECE_COUNT }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 400,
      duration: 1800 + Math.random() * 1400,
      dx: `${(Math.random() - 0.5) * 240}px`,
      dr: `${Math.random() * 720 - 360}deg`,
      size: 6 + Math.random() * 8,
      tier: TIER_VARS[index % TIER_VARS.length],
    })),
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-[-5vh] block rounded-sm"
          style={
            {
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size * 0.6}px`,
              backgroundColor: `hsl(var(${piece.tier}))`,
              animation: `confetti-fall ${piece.duration}ms var(--ease-out) ${piece.delay}ms both`,
              "--dx": piece.dx,
              "--dy": "105vh",
              "--dr": piece.dr,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
