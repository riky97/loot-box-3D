import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { Wordmark } from "@/components/common/Wordmark"
import { BRAND_LINKS } from "@/data/brand"

/**
 * Archetype: baseline strip (DESIGN.md 11.7).
 *
 * An oversized outlined wordmark spans the full width as a baseline, with a
 * single thin row beneath it. No multi-column link farm — there are not enough
 * destinations to justify one, and the in-page nav already lives in the header.
 */
export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="overflow-hidden border-t-2 border-border bg-background">
      <div className="shell pt-sp-10">
        <div className="flex flex-col items-start gap-sp-3">
          <Wordmark variant="stacked" size="lg" label={t("common.brandName")} />
          <p className="text-foreground-dim">{t("footer.tagline")}</p>
        </div>
      </div>

      {/* The baseline: outlined, full-bleed, clipped by the footer's overflow so
          it reads as type sitting on the bottom edge of the page. */}
      <p
        aria-hidden="true"
        className="type-display type-outline pointer-events-none mt-sp-8 select-none whitespace-nowrap text-center leading-[0.8]"
        style={{ fontSize: "clamp(3.5rem, 15vw, 11rem)" }}
      >
        {t("common.brandName")}
      </p>

      <div className="shell flex flex-col gap-sp-3 border-t-2 border-border py-sp-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="type-meta text-muted-foreground">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>

        <a
          href={BRAND_LINKS.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="type-meta inline-flex min-h-[44px] items-center gap-sp-2 text-foreground-dim transition-colors duration-fast ease-out hover:text-primary"
        >
          <InstagramGlyph className="size-4" />
          {t("contact.instagramHandle")}
        </a>

        {/* Caveat placement 2 of 2, and the last one on the page. */}
        <p className="type-accent text-primary">{t("footer.signoff")}</p>
      </div>

      <div className="shell pb-sp-6">
        <p className="type-meta text-muted-foreground">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  )
}

export default SiteFooter
