import { useEffect, useState } from "react"

/**
 * Watches a set of section ids with an IntersectionObserver and reports which
 * one is currently most visible in the viewport. Drives `aria-current` on the
 * matching nav link in the header. Falls back to `null` (no active section)
 * before anything has intersected yet, e.g. at the very top of the page.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0 || typeof IntersectionObserver === "undefined") return

    const visibleRatios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let bestId: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of visibleRatios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }

        if (bestId !== null) setActiveId(bestId)
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -35% 0px" },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
