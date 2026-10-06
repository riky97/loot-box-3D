import { ArrowLeft, PenTool, Play } from "lucide-react"
import { useState, type CSSProperties, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { MediaFrame } from "@/components/common/MediaFrame"
import { ShowcaseCard } from "@/components/common/ShowcaseCard"
import { SectionLink } from "@/components/layout/SectionLink"
import { Button } from "@/components/ui/button"
import {
  BRAND_LINKS,
  ORIGINAL_DESIGNS,
  SHOWCASE_EXTRA_IMAGES,
  SHOWCASE_IMAGE_SIZE,
  SHOWCASE_IMAGES,
  SHOWCASE_VIDEOS,
  categoryTierVars,
} from "@/data/brand"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight"
import { useContentList } from "@/i18n/useContentList"
import { cn } from "@/lib/utils"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { SECTION_IDS, categoryPath } from "@/routes/paths"
import type { CategoryItem, ShowcaseItem, ShowcaseSpecs } from "@/types/content"

const PIECE_HEADING_ID = "piece-heading"
const RELATED_LIMIT = 4

/** Display order of the optional spec rows; each shows only when filled in. */
const SPEC_KEYS: (keyof ShowcaseSpecs)[] = ["material", "printer", "size", "printTime", "finish"]

/**
 * One gallery piece on its own page: its photos, a technical sheet, who
 * designed it, and a way to ask for something similar.
 *
 * Replaces the old link to the Instagram profile, where a given piece may
 * never have been posted, or would have to be found in a mixed feed.
 */
export function PiecePage() {
  const { pieceId } = useParams()
  const pieces = useContentList<ShowcaseItem>("showcase.items")
  const piece = pieces.find((item) => item.id === pieceId)

  // Keyed on the id so the selected photo resets when moving to another
  // piece: the router reuses this component across `/galleria/*`.
  return piece ? <PieceDetail key={piece.id} piece={piece} pieces={pieces} /> : <PieceNotFound />
}

function PieceNotFound() {
  const { t } = useTranslation()
  useDocumentMeta({ title: t("notFound.title"), description: t("notFound.description") })
  return <NotFoundPage />
}

function PieceDetail({ piece, pieces }: { piece: ShowcaseItem; pieces: ShowcaseItem[] }) {
  const { t } = useTranslation()
  const categories = useContentList<CategoryItem>("categories.items")
  const [photoIndex, setPhotoIndex] = useState(0)

  useDocumentMeta({
    title: t("piecePage.metaTitle", { name: piece.name }),
    // `||`, not `??`: the locale ships every description as "" until filled.
    description: piece.description || piece.alt,
  })
  usePointerSpotlight()

  const category = categories.find((item) => item.id === piece.category)
  const isOriginal = ORIGINAL_DESIGNS.has(piece.id)
  const photos = [SHOWCASE_IMAGES[piece.id], ...(SHOWCASE_EXTRA_IMAGES[piece.id] ?? [])]
  const video = SHOWCASE_VIDEOS[piece.id]
  // The clip, when there is one, comes after the photos.
  const mediaCount = photos.length + (video ? 1 : 0)
  const showingVideo = video !== undefined && photoIndex === photos.length
  const related = pieces
    .filter((item) => item.category === piece.category && item.id !== piece.id)
    .slice(0, RELATED_LIMIT)
  const filledSpecs = SPEC_KEYS.filter((key) => piece.specs?.[key])

  return (
    <section
      aria-labelledby={PIECE_HEADING_ID}
      className="section-pad bg-background"
      style={{ "--tier": `var(${categoryTierVars[piece.category]})` } as CSSProperties}
    >
      <div className="shell">
        <SectionLink
          sectionId={SECTION_IDS.showcase}
          className="type-meta inline-flex min-h-[44px] items-center gap-sp-2 text-foreground-dim transition-colors duration-fast ease-out hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("piecePage.back")}
        </SectionLink>

        <div className="mt-sp-6 grid items-start gap-sp-8 md:grid-cols-2">
          <div className="flex flex-col gap-sp-3">
            <div className="overflow-hidden rounded-lg border-2 border-border bg-surface shadow-raised">
              {showingVideo ? (
                <MediaFrame
                  media={{ type: "video", ...video }}
                  alt={piece.videoAlt || piece.name}
                  className="aspect-[4/5]"
                />
              ) : (
                // Only the first photo has written alt text; the extras are
                // labelled by position, which the thumbnails also announce.
                <img
                  src={photos[photoIndex]}
                  alt={
                    photoIndex === 0
                      ? piece.alt
                      : t("piecePage.photoCount", { index: photoIndex + 1, total: mediaCount })
                  }
                  width={SHOWCASE_IMAGE_SIZE.width}
                  height={SHOWCASE_IMAGE_SIZE.height}
                  className="aspect-[4/5] w-full bg-surface-alt object-cover"
                />
              )}
            </div>

            {mediaCount > 1 ? (
              <ul className="flex list-none flex-wrap gap-sp-2">
                {[...photos, ...(video ? [video.poster] : [])].map((src, index) => {
                  const isVideo = video !== undefined && index === photos.length
                  return (
                    <li key={src}>
                      <button
                        type="button"
                        onClick={() => setPhotoIndex(index)}
                        aria-pressed={index === photoIndex}
                        aria-label={
                          isVideo
                            ? t("piecePage.videoLabel")
                            : t("piecePage.photoCount", { index: index + 1, total: mediaCount })
                        }
                        className={cn(
                          "relative block size-16 overflow-hidden rounded-md border-2 transition-colors duration-fast ease-out",
                          index === photoIndex ? "border-primary" : "border-border hover:border-foreground",
                        )}
                      >
                        <img src={src} alt="" className="size-full object-cover" loading="lazy" />
                        {isVideo ? (
                          <span className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                            <Play className="size-6 fill-background text-background" aria-hidden="true" />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          <div className="flex flex-col gap-sp-5">
            <header className="is-inview flex flex-col gap-sp-3">
              {isOriginal ? (
                <span className="type-chip inline-flex items-center gap-sp-1 self-start rounded-pill border-[1.5px] border-foreground bg-background px-sp-2 py-[4px] text-foreground shadow-pop">
                  <PenTool className="size-3" aria-hidden="true" />
                  {t("showcase.originalBadge")}
                </span>
              ) : null}
              <h1 id={PIECE_HEADING_ID} className="type-h1 text-foreground">
                {piece.name}
              </h1>
              {piece.description ? (
                <p className="type-lead text-foreground-dim">{piece.description}</p>
              ) : null}
            </header>

            <div>
              <h2 className="type-eyebrow text-muted-foreground">{t("piecePage.specsTitle")}</h2>
              <dl className="mt-sp-3 border-t-2 border-border">
                <SpecRow label={t("piecePage.specs.category")}>
                  {category ? (
                    <Link
                      to={categoryPath(category.id)}
                      className="inline-flex min-h-[44px] items-center gap-sp-2 font-semibold text-foreground underline decoration-2 underline-offset-4 transition-colors duration-fast ease-out hover:text-primary"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: "hsl(var(--tier))" }}
                      />
                      {category.name}
                    </Link>
                  ) : null}
                </SpecRow>
                <SpecRow label={t("piecePage.specs.type")}>{piece.tag}</SpecRow>
                {filledSpecs.map((key) => (
                  <SpecRow key={key} label={t(`piecePage.specs.${key}`)}>
                    {piece.specs?.[key]}
                  </SpecRow>
                ))}
              </dl>
              <p className="type-meta mt-sp-3 text-foreground-dim">
                {isOriginal ? t("piecePage.originalNote") : t("piecePage.thirdPartyNote")}
              </p>
            </div>

            <div className="flex flex-col gap-sp-3 rounded-lg border-2 border-border bg-surface p-sp-5 shadow-raised">
              <h2 className="type-h3 text-foreground">{t("piecePage.ctaTitle")}</h2>
              <p className="text-foreground-dim">{t("piecePage.ctaText")}</p>
              <Button asChild size="lg" className="btn-pop self-start">
                <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
                  <InstagramGlyph className="size-4" />
                  {t("piecePage.ctaLabel")}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
          <div className="mt-sp-12">
            <h2 className="type-h3 text-foreground">{t("piecePage.relatedTitle")}</h2>
            <ul className="mt-sp-5 grid list-none grid-cols-1 gap-sp-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <ShowcaseCard item={item} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    // A minimum height with light padding rather than heavy padding, so the
    // row holding the 44px category link stays close to the plain-text rows.
    <div className="flex min-h-[48px] items-center justify-between gap-sp-4 border-b-2 border-border py-sp-1">
      <dt className="type-meta text-muted-foreground">{label}</dt>
      <dd className="text-right text-foreground">{children}</dd>
    </div>
  )
}

export default PiecePage
