import { useEffect, useState } from "react"

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const

const CELEBRATION_MS = 8000

/**
 * The page's one hidden detail: the Konami code flips every rarity chip to its
 * legendary state for a few seconds. A brand built on loot boxes ought to have
 * a drop rate.
 *
 * Disabled under `prefers-reduced-motion` — the celebration is decorative, and
 * a burst of moving confetti is exactly what that preference asks us not to do.
 */
export function useKonamiCode() {
  const [isCelebrating, setIsCelebrating] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let progress = 0
    let timeoutId: number | undefined

    function handleKeyDown(event: KeyboardEvent) {
      // Never swallow keystrokes aimed at a field.
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return
      }

      const expected = SEQUENCE[progress]
      const pressed = expected.length === 1 ? event.key.toLowerCase() : event.key

      if (pressed !== expected) {
        // A wrong key restarts the run, but a correct first key still counts.
        progress = pressed === SEQUENCE[0] ? 1 : 0
        return
      }

      progress += 1
      if (progress < SEQUENCE.length) return

      progress = 0
      setIsCelebrating(true)
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => setIsCelebrating(false), CELEBRATION_MS)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.clearTimeout(timeoutId)
    }
  }, [])

  return isCelebrating
}
