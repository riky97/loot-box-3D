import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Outlet, useLocation } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"

/** About one second of frames: long enough for a lazy page to render its sections. */
const HASH_TARGET_MAX_FRAMES = 60

/**
 * On every route change, scrolls to the section named in the URL hash (a
 * `SectionLink` from a category page, or a shared `/#contact` link), or
 * to the top of the page when there is none. Respects reduced motion.
 *
 * Keyed on the pathname only: a `#id` click on the home page stays a native
 * in-page jump and never passes through here.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth"

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior })
      return
    }

    // The target may not exist yet while the page it lives on is still
    // rendering, so look for it on each frame for a short while.
    const targetId = decodeURIComponent(hash.slice(1))
    let frame = 0
    let handle = 0
    const seek = () => {
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior, block: "start" })
      } else if (frame++ < HASH_TARGET_MAX_FRAMES) {
        handle = requestAnimationFrame(seek)
      }
    }
    seek()

    return () => cancelAnimationFrame(handle)
    // `hash` is read when the page changes, not tracked: see the doc comment.
  }, [pathname])

  return null
}

export function RootLayout() {
  const { t } = useTranslation()

  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("common.skipToContent")}
      </a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

export default RootLayout
