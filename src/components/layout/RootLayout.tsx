import { useTranslation } from "react-i18next"
import { Outlet, ScrollRestoration } from "react-router-dom"

import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"

export function RootLayout() {
  const { t } = useTranslation()

  return (
    <>
      {/* React Router's own scroll handling, which a hand-rolled "scroll to
          top on every route change" cannot match now that gallery tiles and
          category bands navigate in-app: Back and Forward restore the
          position the visitor left (the gallery, not the hero), a URL hash
          such as `/#contact` scrolls to its section, and any other navigation
          starts at the top. The `scroll-behavior` on `html` makes the jumps
          smooth, and the reduced-motion rule in `main.scss` makes them
          instant. */}
      <ScrollRestoration />
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
