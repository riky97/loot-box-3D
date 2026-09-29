import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { SectionHeading } from "@/components/common/SectionHeading"
import { ShowcaseCard } from "@/components/common/ShowcaseCard"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS } from "@/data/brand"
import { useShelfScroller } from "@/hooks/useShelfScroller"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { ShowcaseItem } from "@/types/content"

const SHOWCASE_HEADING_ID = "showcase-heading"

const SHELVES = {
  a: { direction: 1, durationVar: "--dur-shelf-a" },
  b: { direction: -1, durationVar: "--dur-shelf-b" },
} as const

/**
 * Archetype: counter-scrolling shelves (DESIGN.md 11.4).
 *
 * Two full-bleed rows drifting in opposite directions at deliberately unequal
 * speeds, so they never sync into a visual beat. There is no grid here, which
 * is the point: the v1 bento grid left holes whenever the item count did not
 * divide by the column count.
 *
 * The rows are real scrollers the visitor can take over: arrows, mouse drag,
 * swipe and trackpad all work, and the drift waits a few seconds after the
 * last touch before resuming. See `useShelfScroller`.
 */
export function ShowcaseSection() {
  const { t } = useTranslation()
  const items = useContentList<ShowcaseItem>("showcase.items")

  const half = Math.ceil(items.length / 2)
  const shelfA = items.slice(0, half)
  const shelfB = items.slice(half)

  return (
    <section
      id={SECTION_IDS.showcase}
      aria-labelledby={SHOWCASE_HEADING_ID}
      className="section-pad overflow-hidden bg-background"
    >
      <div className="shell">
        <SectionHeading
          id={SHOWCASE_HEADING_ID}
          eyebrow={t("showcase.eyebrow")}
          titleText={t("showcase.title")}
          subtitle={t("showcase.subtitle")}
        />
      </div>

      <div className="mt-sp-8 flex flex-col gap-sp-5">
        <Shelf items={shelfA} variant="a" />
        <Shelf items={shelfB} variant="b" />
      </div>

      {/* The axis flips back to centred here. */}
      <div className="shell mt-sp-8 flex flex-col items-center gap-sp-4 text-center">
        <Button asChild size="lg" className="btn-pop">
          <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
            <InstagramGlyph className="size-4" />
            {t("showcase.ctaLabel")}
          </a>
        </Button>
        {/* Explains the badge, and why the unbadged pieces are not for sale. */}
        <p className="type-meta max-w-measure-lead text-foreground-dim">
          {t("showcase.licenseNote")}
        </p>
      </div>
    </section>
  )
}

function Shelf({ items, variant }: { items: ShowcaseItem[]; variant: "a" | "b" }) {
  const { t } = useTranslation()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const { step } = useShelfScroller(scrollerRef, SHELVES[variant])
  const scrollerId = `showcase-shelf-${variant}`

  return (
    <div className="relative">
      {/* Three identical tracks; the middle one is the real content and the
          outer two exist so the loop never runs out in either direction. */}
      <div ref={scrollerRef} id={scrollerId} className="shelf">
        <ShelfTrack items={items} ariaHidden />
        <ShelfTrack items={items} />
        <ShelfTrack items={items} ariaHidden />
      </div>

      <button
        type="button"
        onClick={() => step(-1)}
        aria-controls={scrollerId}
        aria-label={t("showcase.prevLabel")}
        className="shelf__arrow left-sp-2 sm:left-gutter"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        aria-controls={scrollerId}
        aria-label={t("showcase.nextLabel")}
        className="shelf__arrow right-sp-2 sm:right-gutter"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  )
}

/**
 * One pass of a shelf. The copies either side of the real one are hidden from
 * assistive tech and removed from the tab order, so each tile is announced and
 * focused once.
 */
function ShelfTrack({ items, ariaHidden }: { items: ShowcaseItem[]; ariaHidden?: boolean }) {
  return (
    <ul className="shelf__track list-none" aria-hidden={ariaHidden ? "true" : undefined}>
      {items.map((item) => (
        <li key={item.id} className="w-[240px] shrink-0 sm:w-[280px]">
          <ShowcaseCard item={item} tabIndex={ariaHidden ? -1 : undefined} />
        </li>
      ))}
    </ul>
  )
}

export default ShowcaseSection
