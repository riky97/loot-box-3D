import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
}

/**
 * Reports whether the observed element has entered the viewport. The flag is
 * latched: once true it never flips back, so scroll-entrance effects play once
 * rather than replaying on every pass. Users who prefer reduced motion get
 * `true` immediately and never see the hidden state.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isInView }
}
