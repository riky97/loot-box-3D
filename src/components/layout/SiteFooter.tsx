import { useTranslation } from "react-i18next"

import { Wordmark } from "@/components/common/Wordmark"
import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { NAV_ITEMS } from "@/components/layout/MainNav"
import { BRAND_LINKS } from "@/data/brand"
import { cn } from "@/lib/utils"

/**
 * Site footer: three-column nav + follow block over a layer-line top edge,
 * a baseline copyright/credits row, and an oversized outline wordmark bleeding
 * off the bottom as the page's closing visual device.
 */
export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="relative overflow-hidden border-t border-border bg-popover">
      <span aria-hidden="true" className="layer-strip absolute inset-x-0 top-0 z-10 h-1" />

      <div className="shell relative z-10 pb-sp-6 pt-sp-10">
        <div className="grid gap-sp-8 md:grid-cols-[2fr_1fr_1fr]">
          <div className="flex flex-col gap-sp-3">
            <Wordmark size="lg" />
            <p className="text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>

          <div className="flex flex-col gap-sp-3">
            <p className="type-eyebrow text-muted-foreground">{t("footer.sectionsLabel")}</p>
            <nav aria-label={t("footer.sectionsLabel")} className="flex flex-col gap-sp-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground"
                >
                  {t(item.labelKey)}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-sp-3">
            <p className="type-eyebrow text-muted-foreground">{t("footer.followLabel")}</p>
            <a
              href={BRAND_LINKS.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-sp-2 text-sm text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground"
            >
              <InstagramGlyph className="size-4" />
              {t("contact.instagramHandle")}
            </a>
          </div>
        </div>

        <div className="mt-sp-6 flex flex-col gap-sp-1 border-t border-border pt-sp-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-muted-foreground">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="type-meta text-muted-foreground">{t("footer.credits")}</p>
        </div>
        <p className="type-meta mt-sp-3 text-muted-foreground/70">{t("footer.disclaimer")}</p>
      </div>

      <p
        aria-hidden="true"
        className={cn(
          "type-display type-outline pointer-events-none absolute inset-x-0 bottom-0 z-0",
          "translate-y-[45%] select-none whitespace-nowrap text-center leading-none",
        )}
        style={{ fontSize: "clamp(4rem, 16vw, 12rem)" }}
      >
        {t("common.brandName")}
      </p>
    </footer>
  )
}

export default SiteFooter
