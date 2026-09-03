import { useEffect } from "react"

const SPOTLIGHT_ATTRIBUTE = "data-spotlight"

/**
 * Makes every `[data-spotlight]` element track the pointer, writing `--mx`/`--my`
 * so the radial highlight in `.spotlight::before` follows the cursor.
 *
 * One listener and one rAF frame serve the whole page rather than one per card:
 * with a dozen tiles on screen, per-card listeners are the difference between a
 * smooth page and a janky one.
 *
 * Skipped entirely on touch (`hover: none`) and under `prefers-reduced-motion` —
 * neither can use the effect, and neither should pay for it.
 */
export function usePointerSpotlight() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!canHover || prefersReducedMotion) return

    let queued = false
    let latestEvent: PointerEvent | null = null

    function flush() {
      queued = false
      const event = latestEvent
      if (!event) return

      const target = event.target
      if (!(target instanceof Element)) return

      const card = target.closest(`[${SPOTLIGHT_ATTRIBUTE}]`)
      if (!(card instanceof HTMLElement)) return

      const rect = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`)
      card.style.setProperty("--my", `${event.clientY - rect.top}px`)
    }

    function handlePointerMove(event: PointerEvent) {
      latestEvent = event
      if (queued) return
      queued = true
      requestAnimationFrame(flush)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", handlePointerMove)
  }, [])
}
