import { ArrowLeft } from "lucide-react"
import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { ShowcaseCard } from "@/components/common/ShowcaseCard"
import { SectionLink } from "@/components/layout/SectionLink"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS, categoryTierVars } from "@/data/brand"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight"
import { useContentList } from "@/i18n/useContentList"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { SECTION_IDS, categoryPath } from "@/routes/paths"
import type { CategoryItem, ShowcaseItem } from "@/types/content"

const CATEGORY_HEADING_ID = "category-heading"

/**
 * One category on its own page: what it covers, the gallery pieces filed
 * under it, and a way to ask for something similar.
 *
 * It exists because the Instagram profile mixes every kind of piece in one
 * feed, which made "Scopri la categoria" land somewhere unsorted. The pieces
 * come from `showcase.items`, so a photo added to the gallery shows up here
 * too, with no second list to keep in step.
 */
export function CategoryPage() {
  const { t } = useTranslation()
  const { categoryId } = useParams()
  const categories = useContentList<CategoryItem>("categories.items")
  const pieces = useContentList<ShowcaseItem>("showcase.items")

  const category = categories.find((item) => item.id === categoryId)

  useDocumentMeta({
    title: category ? t("categoryPage.metaTitle", { name: category.name }) : t("notFound.title"),
    description: category ? category.description : t("notFound.description"),
  })
  usePointerSpotlight()

  if (!category) return <NotFoundPage />

  const categoryPieces = pieces.filter((piece) => piece.category === category.id)
  const otherCategories = categories.filter((item) => item.id !== category.id)
  const titleWords = category.name.trim().split(/\s+/)
  const lastTitleWord = titleWords.pop()

  return (
    <section
      aria-labelledby={CATEGORY_HEADING_ID}
      className="section-pad bg-background"
      style={{ "--tier": `var(${categoryTierVars[category.id]})` } as CSSProperties}
    >
      <div className="shell">
        <SectionLink
          sectionId={SECTION_IDS.categories}
          className="type-meta inline-flex min-h-[44px] items-center gap-sp-2 text-foreground-dim transition-colors duration-fast ease-out hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("categoryPage.back")}
        </SectionLink>

        {/* The tier edge echoes the band this page was opened from. */}
        <header className="is-inview relative mt-sp-6 flex flex-col gap-sp-3 pl-sp-5">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-[6px] rounded-pill"
            style={{ backgroundColor: "hsl(var(--tier))" }}
          />
          <p className="type-eyebrow inline-block self-start border-b-2 border-primary pb-sp-1 text-primary">
            {t("categoryPage.eyebrow")}
          </p>
          <h1 id={CATEGORY_HEADING_ID} className="type-h1 text-foreground">
            {titleWords.length > 0 ? `${titleWords.join(" ")} ` : null}
            <span className="heading-mark">{lastTitleWord}</span>
          </h1>
          <p className="type-lead text-foreground-dim">{category.description}</p>
        </header>

        <h2 className="type-h3 mt-sp-10 text-foreground">{t("categoryPage.piecesTitle")}</h2>

        {categoryPieces.length > 0 ? (
          <>
            <ul className="mt-sp-5 grid list-none grid-cols-1 gap-sp-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryPieces.map((piece) => (
                <li key={piece.id}>
                  <ShowcaseCard item={piece} />
                </li>
              ))}
            </ul>
            <p className="type-meta mt-sp-5 max-w-measure-lead text-foreground-dim">
              {t("showcase.licenseNote")}
            </p>
          </>
        ) : (
          <p className="mt-sp-3 max-w-measure-body text-foreground-dim">
            {t("categoryPage.empty")}
          </p>
        )}

        <div className="mt-sp-10 flex flex-col gap-sp-4 rounded-lg border-2 border-border bg-surface p-sp-6 shadow-raised md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-sp-2">
            <h2 className="type-h3 text-foreground">{t("categoryPage.ctaTitle")}</h2>
            <p className="max-w-measure-body text-foreground-dim">{t("categoryPage.ctaText")}</p>
          </div>
          <Button asChild size="lg" className="btn-pop shrink-0">
            <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramGlyph className="size-4" />
              {t("categoryPage.ctaLabel")}
            </a>
          </Button>
        </div>

        <nav aria-labelledby="other-categories-heading" className="mt-sp-10">
          <h2 id="other-categories-heading" className="type-eyebrow text-muted-foreground">
            {t("categoryPage.othersTitle")}
          </h2>
          <ul className="mt-sp-4 flex list-none flex-wrap gap-sp-3">
            {otherCategories.map((item) => (
              <li key={item.id}>
                <Link
                  to={categoryPath(item.id)}
                  className="inline-flex min-h-[44px] items-center gap-sp-2 rounded-pill border-2 border-border bg-surface px-sp-4 font-semibold text-foreground transition-colors duration-fast ease-out hover:border-primary"
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: `hsl(var(${categoryTierVars[item.id]}))` }}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default CategoryPage
