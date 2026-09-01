import { ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { SectionHeading } from "@/components/common/SectionHeading"
import { ProductTile } from "@/components/showcase/ProductTile"
import { BRAND_LINKS } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { ShowcaseItem } from "@/types/content"

const SHOWCASE_HEADING_ID = "showcase-heading"

// Tile indices that span two rows on the desktop dense grid. With eight items
// a single tall tile fills exactly three rows of three, leaving no gaps.
const TALL_INDICES = new Set([0])

export function ShowcaseSection() {
  const { t } = useTranslation()
  const items = useContentList<ShowcaseItem>("showcase.items")

  // Marquee content: item names plus category names, doubled for a seamless loop.
  const categoryNames = Array.from(new Set(items.map((item) => item.category)))
  const marqueeWords = [...items.map((item) => item.name), ...categoryNames.map((c) => c.toUpperCase())]

  return (
    <section
      id={SECTION_IDS.showcase}
      aria-labelledby={SHOWCASE_HEADING_ID}
      className="section-pad relative overflow-hidden bg-plate"
    >
      <div aria-hidden="true" className="layer-strip absolute inset-x-0 top-0 h-[10px]" />
      <div aria-hidden="true" className="layer-strip absolute inset-x-0 bottom-0 h-[10px]" />


      <div className="shell relative flex flex-col gap-sp-8">
        <div className="flex flex-col gap-sp-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id={SHOWCASE_HEADING_ID}
            eyebrow={t("showcase.eyebrow")}
            title={t("showcase.title")}
            subtitle={t("showcase.subtitle")}
          />

          <a
            href={BRAND_LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="type-meta hidden shrink-0 items-center gap-sp-1 text-foreground transition-colors duration-fast ease-out hover:text-accent md:inline-flex"
          >
            {t("contact.instagramCta")}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        {/* Desktop / tablet dense grid. */}
        <div className="hidden gap-sp-5 md:grid md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[12rem] lg:grid-flow-row-dense">
          {items.map((item, index) => (
            <ProductTile key={item.id} item={item} tall={TALL_INDICES.has(index)} />
          ))}
        </div>

        {/* Mobile horizontal scroll-snap row. */}
        <div className="-mx-gutter flex snap-x snap-mandatory gap-sp-4 overflow-x-auto px-gutter pb-sp-2 md:hidden">
          {items.map((item) => (
            <div key={item.id} className="w-[72vw] shrink-0 snap-start">
              <ProductTile item={item} />
            </div>
          ))}
        </div>

        <p className="type-meta text-muted-foreground/70">{t("showcase.note")}</p>
      </div>

      <div aria-hidden="true" className="marquee mt-sp-8">
        <div className="marquee__track animate-marquee">
          {[...marqueeWords, ...marqueeWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={
                (index + 1) % 3 === 0
                  ? "type-display shrink-0 text-[40px] leading-none text-primary"
                  : "type-display type-outline shrink-0 text-[40px] leading-none"
              }
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowcaseSection
