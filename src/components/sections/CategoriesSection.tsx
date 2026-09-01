import { useTranslation } from "react-i18next"

import { CutCard } from "@/components/common/CutCard"
import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { CategoryGlyph } from "@/components/graphics/CategoryGlyph"
import { categoryHueVars } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { CategoryItem } from "@/types/content"

const CATEGORIES_HEADING_ID = "categories-heading"

export function CategoriesSection() {
  const { t } = useTranslation()
  const items = useContentList<CategoryItem>("categories.items")

  return (
    <section
      id={SECTION_IDS.categories}
      aria-labelledby={CATEGORIES_HEADING_ID}
      className="section-pad bg-background"
    >
      <div className="shell flex flex-col gap-sp-8">
        <SectionHeading
          id={CATEGORIES_HEADING_ID}
          eyebrow={t("categories.eyebrow")}
          title={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />

        <div className="-mx-gutter flex snap-x snap-mandatory gap-sp-5 overflow-x-auto px-gutter pb-sp-2 md:mx-0 md:grid md:grid-cols-2 md:snap-none md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4">
          {items.map((item, index) => {
            const hueVar = categoryHueVars[item.id]
            return (
              <Reveal
                key={item.id}
                delayIndex={index}
                className="w-[78vw] shrink-0 snap-start md:w-auto md:shrink"
              >
                <CutCard
                  className="relative flex h-full min-h-[320px] flex-col justify-between p-sp-5 transition-shadow duration-base ease-out"
                  frameClassName="group/card h-full transition-transform duration-base ease-out hover:-translate-y-1 focus-within:-translate-y-1 hover:shadow-card-hover focus-within:shadow-card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ backgroundColor: `hsl(var(${hueVar}))` }}
                  />

                  {/* The tagline runs to a full phrase, so it is set as a mono
                      meta line rather than a chip — chips are reserved for the
                      short tags on the gallery tiles, where they stay on one line. */}
                  <p
                    className="type-meta flex items-start gap-sp-2"
                    style={{ color: `hsl(var(${hueVar}))` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-px w-4 shrink-0"
                      style={{ backgroundColor: `hsl(var(${hueVar}))` }}
                    />
                    {item.tagline}
                  </p>

                  <div
                    className="flex flex-1 items-center justify-center py-sp-6 opacity-80 transition-[filter,opacity] duration-base ease-out group-hover/card:opacity-100 group-focus-within/card:opacity-100"
                    style={{ color: `hsl(var(${hueVar}))` }}
                  >
                    <CategoryGlyph
                      category={item.id}
                      className="h-16 w-16 group-hover/card:drop-shadow-[0_0_10px_currentColor] group-focus-within/card:drop-shadow-[0_0_10px_currentColor]"
                    />
                  </div>

                  <div className="flex flex-col gap-sp-1">
                    <h3 className="type-h3 text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </CutCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection
