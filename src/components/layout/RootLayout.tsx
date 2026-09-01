import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Outlet, useLocation } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"

/** Scrolls to the top of the page on every route change, respecting the user's reduced-motion preference. */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
  }, [pathname])

  return null
}

export function RootLayout() {
  const { t } = useTranslation()

  return (
    <>
      <ScrollToTop />
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
