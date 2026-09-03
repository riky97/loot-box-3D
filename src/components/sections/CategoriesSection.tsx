import { ArrowRight } from "lucide-react"
import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import { SectionHeading } from "@/components/common/SectionHeading"
import { BRAND_LINKS, categoryTierVars } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { CategoryItem } from "@/types/content"

const CATEGORIES_HEADING_ID = "categories-heading"

/**
 * Archetype: expanding full-width bands (DESIGN.md 11.3).
 *
 * Not a card grid. Each category is an edge-to-edge horizontal band that
 * expands on hover or focus to reveal its description and catalogue size.
 *
 * On touch and below `md:` every band renders permanently expanded — see the
 * `.band-body` rules in `main.scss`. Hover is not reachable without a pointer,
 * and content hidden behind it on mobile is a defect, not a design.
 */
export function CategoriesSection() {
  const { t } = useTranslation()
  const items = useContentList<CategoryItem>("categories.items")

  return (
    <section
      id={SECTION_IDS.categories}
      aria-labelledby={CATEGORIES_HEADING_ID}
      className="section-pad bg-surface-alt"
    >
      <div className="shell">
        <SectionHeading
          id={CATEGORIES_HEADING_ID}
          eyebrow={t("categories.eyebrow")}
          titleText={t("categories.title")}
          subtitle={t("categories.subtitle")}
        />
      </div>

      <ul className="mt-sp-8 list-none border-y-2 border-border">
        {items.map((item, index) => (
          <li key={item.id} className="border-b-2 border-border last:border-b-0">
            <a
              href={BRAND_LINKS.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="band group relative block bg-background transition-colors duration-base ease-out hover:bg-surface focus-visible:bg-surface"
              style={{ "--tier": `var(${categoryTierVars[item.id]})` } as CSSProperties}
            >
              {/* Tier edge: 6px at rest, 12px once the band is open. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[6px] transition-[width] duration-base ease-out group-hover:w-[12px] group-focus-within:w-[12px]"
                style={{ backgroundColor: "hsl(var(--tier))" }}
              />

              {/* A BLOCK wrapper, deliberately. As a flex item the `.band-body`
                  grid gets no space to distribute and its `1fr` track resolves
                  to zero, so the band never opens. The row below carries the
                  resting height and centres itself; the body is a plain sibling. */}
              <div className="shell pl-sp-4">
                <div className="flex min-h-band-rest items-center gap-sp-4">
                  <span
                    aria-hidden="true"
                    className="type-display text-h3 tabular-nums text-border"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h3 flex-1 text-foreground">{item.name}</h3>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary transition-transform duration-base ease-bounce group-hover:translate-x-1 group-focus-within:translate-x-1"
                  />
                </div>

                <div className="band-body">
                  <div>
                    <p className="max-w-measure-body text-foreground-dim">
                      {item.description}
                    </p>
                    <p className="type-meta pb-sp-5 pt-sp-2 text-muted-foreground">
                      {item.count}
                    </p>
                  </div>
                </div>
              </div>

              <span className="sr-only">{t("categories.openLabel")}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoriesSection
