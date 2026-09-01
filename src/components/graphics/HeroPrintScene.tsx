// Inline SVG "print in progress" hero object — an isometric build plate with a
// wireframe loot crate, its lower portion already printed in layered orange.
// No imagery; everything below is pure SVG/CSS, driven once by `animate-print-rise`.

const PLATE_ID = "hero-plate-clip"
const EXTRUDE_GRADIENT_ID = "hero-extrude-gradient"
const NOZZLE_GLOW_ID = "hero-nozzle-glow"

// Isometric ground rhombus (the build plate) shared by the plate fill, its
// outline and the grid clip-path.
const PLATE_POINTS = "200,70 344,152 200,234 56,152"

// Classic 3-rhombus isometric cube: a top face plus two projected side faces.
const CUBE_TOP = { top: [200, 150], right: [278, 194], bottom: [200, 238], left: [122, 194] }
const CUBE_HEIGHT = 148
const shift = (point: number[], dy: number) => [point[0], point[1] + dy]

const topTop = CUBE_TOP.top
const topRight = CUBE_TOP.right
const topBottom = CUBE_TOP.bottom
const topLeft = CUBE_TOP.left
const baseTop = shift(topTop, CUBE_HEIGHT)
const baseRight = shift(topRight, CUBE_HEIGHT)
const baseBottom = shift(topBottom, CUBE_HEIGHT)
const baseLeft = shift(topLeft, CUBE_HEIGHT)

// The printed portion covers the lower 42% of the crate's height.
const PRINTED_RATIO = 0.42
const printedTopY = topBottom[1] + CUBE_HEIGHT * (1 - PRINTED_RATIO)

const printedLeftFace = `M${topLeft[0]},${printedTopY} L${topBottom[0]},${printedTopY} L${baseBottom[0]},${baseBottom[1]} L${baseLeft[0]},${baseLeft[1]} Z`
const printedRightFace = `M${topBottom[0]},${printedTopY} L${topRight[0]},${printedTopY} L${baseRight[0]},${baseRight[1]} L${baseBottom[0]},${baseBottom[1]} Z`

const layerLineYs = Array.from(
  { length: Math.floor((baseBottom[1] - printedTopY) / 3) },
  (_, index) => printedTopY + index * 3,
)

export function HeroPrintScene() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={PLATE_ID}>
          <polygon points={PLATE_POINTS} />
        </clipPath>
        <linearGradient id={EXTRUDE_GRADIENT_ID} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="hsl(var(--brand-hot-deep))" />
          <stop offset="100%" stopColor="hsl(var(--brand-hot))" />
        </linearGradient>
        <filter id={NOZZLE_GLOW_ID} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Build plate. */}
      <polygon points={PLATE_POINTS} fill="hsl(var(--plate))" />
      <g clipPath={`url(#${PLATE_ID})`} stroke="hsl(var(--grid-line) / 0.25)" strokeWidth="1">
        {Array.from({ length: 13 }, (_, index) => (
          <line key={`h-${index}`} x1={20 + index * 24} y1="60" x2={20 + index * 24} y2="260" />
        ))}
        {Array.from({ length: 9 }, (_, index) => (
          <line key={`v-${index}`} x1="40" y1={80 + index * 22} x2="360" y2={80 + index * 22} />
        ))}
      </g>
      <polygon
        points={PLATE_POINTS}
        fill="none"
        stroke="hsl(var(--grid-line) / 0.25)"
        strokeWidth="1"
      />

      {/* Wireframe crate — hidden back edges at reduced opacity. */}
      <g fill="none" stroke="hsl(var(--accent))" strokeWidth="1">
        <g opacity="0.35">
          <line x1={topTop[0]} y1={topTop[1]} x2={topLeft[0]} y2={topLeft[1]} />
          <line x1={topTop[0]} y1={topTop[1]} x2={topRight[0]} y2={topRight[1]} />
          <line x1={topTop[0]} y1={topTop[1]} x2={baseTop[0]} y2={baseTop[1]} />
        </g>
        <polygon points={`${topTop.join(",")} ${topRight.join(",")} ${topBottom.join(",")} ${topLeft.join(",")}`} />
        <line x1={topLeft[0]} y1={topLeft[1]} x2={baseLeft[0]} y2={baseLeft[1]} />
        <line x1={topBottom[0]} y1={topBottom[1]} x2={baseBottom[0]} y2={baseBottom[1]} />
        <line x1={topRight[0]} y1={topRight[1]} x2={baseRight[0]} y2={baseRight[1]} />
        <line x1={baseLeft[0]} y1={baseLeft[1]} x2={baseBottom[0]} y2={baseBottom[1]} />
        <line x1={baseBottom[0]} y1={baseBottom[1]} x2={baseRight[0]} y2={baseRight[1]} />
      </g>

      {/* Printed portion — grows in once on mount, then settles. */}
      <g
        className="animate-print-rise"
        style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
      >
        <path d={printedLeftFace} fill={`url(#${EXTRUDE_GRADIENT_ID})`} />
        <path d={printedRightFace} fill={`url(#${EXTRUDE_GRADIENT_ID})`} />
        <g stroke="hsl(var(--background) / 0.35)" strokeWidth="1">
          {layerLineYs.map((y) => (
            <line key={y} x1={baseLeft[0]} y1={y} x2={baseRight[0]} y2={y} />
          ))}
        </g>
        <path
          d={printedLeftFace}
          fill="none"
          stroke="hsl(var(--accent) / 0.4)"
          strokeWidth="1"
        />
        <path
          d={printedRightFace}
          fill="none"
          stroke="hsl(var(--accent) / 0.4)"
          strokeWidth="1"
        />

        {/* Nozzle line at the print boundary, with a glowing dot at its lead end. */}
        <line
          x1={topLeft[0]}
          y1={printedTopY}
          x2={topRight[0]}
          y2={printedTopY}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
        />
        <circle
          cx={topRight[0]}
          cy={printedTopY}
          r="3"
          fill="hsl(var(--primary))"
          filter={`url(#${NOZZLE_GLOW_ID})`}
        />
      </g>
    </svg>
  )
}

export default HeroPrintScene
