import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { MainNav } from "@/components/layout/MainNav"
import { MobileNav } from "@/components/layout/MobileNav"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/common/Wordmark"
import { BRAND_LINKS } from "@/data/brand"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { ROUTES, SECTION_IDS } from "@/routes/paths"
import { cn } from "@/lib/utils"

const WATCHED_SECTION_IDS = Object.values(SECTION_IDS)

/**
 * Sticky site header: transparent over the hero, blurred once the reader
 * scrolls, with a 2px extrusion progress bar riding its bottom edge. From
 * 1280px it shows the full nav plus the Instagram CTA; from 1024px the nav
 * alone; below that it collapses to the wordmark and a hamburger opening
 * `MobileNav`.
 */
export function SiteHeader() {
  const { t } = useTranslation()
  const { progress, isScrolled } = useScrollProgress()
  const { pathname } = useLocation()
  const activeId = useActiveSection(WATCHED_SECTION_IDS, pathname)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-header transition-[background-color,box-shadow] duration-base ease-out",
        isScrolled
          ? "border-b-2 border-border bg-background/88 backdrop-blur-[12px]"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      {/* From `lg:` to `xl:` there is room for the six nav entries but not for
          the Instagram button too: with it, the entries wrapped onto two lines
          and squeezed the wordmark below ~1120px. The button is repeated in
          the hero and in Contatti, so it waits for `xl:`, and until then the
          nav sits right of a wordmark kept at its natural width. */}
      <div className="shell grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[auto_1fr] xl:grid-cols-[1fr_auto_1fr]">
        <a
          href={ROUTES.home}
          className="flex min-h-[44px] items-center justify-self-start"
        >
          <Wordmark label={t("common.brandName")} />
        </a>

        <MainNav
          activeId={activeId}
          className="hidden justify-self-end lg:flex xl:justify-self-center"
        />

        <div className="hidden justify-self-end xl:block">
          <Button asChild size="sm" className="btn-pop">
            <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramGlyph className="size-4" />
              {t("hero.ctaSecondary")}
            </a>
          </Button>
        </div>

        <div className="justify-self-end lg:hidden">
          <MobileNav />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-primary"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  )
}

export default SiteHeader
