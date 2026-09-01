import { useEffect, useRef, useState } from "react"

interface ScrollProgress {
  /** Fraction of the document scrolled, from 0 to 1. Drives the header's progress bar `scaleX`. */
  progress: number
  /** True once the page has scrolled past the header's rest-state threshold. */
  isScrolled: boolean
}

const STUCK_THRESHOLD_PX = 24

/**
 * Tracks scroll position for the sticky header: how far through the document
 * the reader is (for the extrusion progress bar) and whether the page has
 * scrolled enough to switch the header into its blurred, bordered state.
 * The scroll listener is passive and reads are throttled to one per animation
 * frame so this never competes with the browser's own scroll handling.
 */
export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({ progress: 0, isScrolled: false })
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const readScrollState = () => {
      frameRef.current = null

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0

      setState({ progress, isScrolled: scrollTop > STUCK_THRESHOLD_PX })
    }

    const handleScroll = () => {
      if (frameRef.current !== null) return
      frameRef.current = requestAnimationFrame(readScrollState)
    }

    readScrollState()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return state
}
