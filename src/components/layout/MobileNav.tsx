import { useState } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { NAV_ITEMS } from "@/components/layout/MainNav"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BRAND_LINKS } from "@/data/brand"
import { cn } from "@/lib/utils"

/** Three-bar menu glyph, drawn inline rather than a stock icon so the middle bar can carry the brand orange. */
function HamburgerIcon() {
  return (
    <span aria-hidden="true" className="flex w-4 flex-col items-stretch gap-[3px]">
      <span className="h-[2px] w-full rounded-full bg-foreground" />
      <span className="h-[2px] w-full rounded-full bg-primary" />
      <span className="h-[2px] w-full rounded-full bg-foreground" />
    </span>
  )
}

/** Mobile hamburger trigger + right-hand sheet with the full-voice nav and Instagram CTA. */
export function MobileNav() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("nav.openMenu")}
          // shadcn's icon size is 36px; the touch minimum is 44.
          className="size-11"
        >
          <HamburgerIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        closeLabel={t("nav.closeMenu")}
        className={cn(
          // No position utility here: the Sheet primitive is already `fixed`, and
          // overriding it would drop the panel into the document flow.
          "flex w-[min(88vw,360px)] flex-col overflow-hidden border-l-2 border-border bg-popover p-0 shadow-elevated",
        )}
      >
        <SheetTitle className="sr-only">{t("nav.menuLabel")}</SheetTitle>

        <nav
          aria-label={t("nav.menuLabel")}
          className="relative z-10 flex flex-1 flex-col justify-center px-gutter"
        >
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-baseline gap-sp-3 border-b border-border py-sp-4 first:border-t",
                "type-h3 text-foreground transition-colors duration-fast ease-out hover:text-primary",
              )}
            >
              <span className="type-meta text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <SheetFooter className="relative z-10 px-gutter pb-sp-6 pt-sp-3 sm:flex-col sm:space-x-0">
          <Button asChild size="sm" className="btn-pop w-full">
            <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramGlyph className="size-4" />
              {t("hero.ctaSecondary")}
            </a>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
