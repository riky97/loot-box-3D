import { useTranslation } from "react-i18next"

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
 * scrolls, with a 2px extrusion progress bar riding its bottom edge. Desktop
 * shows the full in-page nav plus the Instagram CTA; below 1024px it
 * collapses to the wordmark and a hamburger opening `MobileNav`.
 */
export function SiteHeader() {
  const { t } = useTranslation()
  const { progress, isScrolled } = useScrollProgress()
  const activeId = useActiveSection(WATCHED_SECTION_IDS)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-header transition-[background-color,box-shadow] duration-base ease-out",
        isScrolled
          ? "bg-background/72 shadow-header backdrop-blur-[14px] backdrop-saturate-150"
          : "bg-transparent shadow-none",
      )}
    >
      <div className="shell grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
        <a href={ROUTES.home} className="justify-self-start">
          <Wordmark />
        </a>

        <MainNav activeId={activeId} className="hidden justify-self-center lg:flex" />

        <div className="hidden justify-self-end lg:block">
          <Button asChild size="sm" className="cut-shape [--chamfer:6px]">
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
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-grad-extrude"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  )
}

export default SiteHeader
