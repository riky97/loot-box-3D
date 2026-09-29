import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { SectionHeading } from "@/components/common/SectionHeading"
import { ShowcaseCard } from "@/components/common/ShowcaseCard"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { ShowcaseItem } from "@/types/content"

const SHOWCASE_HEADING_ID = "showcase-heading"

// Written out in full on purpose. Tailwind keeps a `@layer components` class
// only if it finds the whole name in the source; building it as
// `shelf__track--${variant}` hid both names, the rules were dropped from the
// CSS, and the shelves shipped standing still.
const TRACK_CLASS = {
  a: "shelf__track--a",
  b: "shelf__track--b",
} as const

/**
 * Archetype: counter-scrolling shelves (DESIGN.md 11.4).
 *
 * Two full-bleed rows drifting in opposite directions at deliberately unequal
 * speeds, so they never sync into a visual beat. There is no grid here, which
 * is the point: the v1 bento grid left holes whenever the item count did not
 * divide by the column count.
 *
 * Both shelves pause on hover and on focus-within, and stop entirely under
 * `prefers-reduced-motion`, where they become swipeable instead.
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
  return (
    <div className="shelf">
      <ShelfTrack items={items} variant={variant} />
      <ShelfTrack items={items} variant={variant} ariaHidden />
    </div>
  )
}

/**
 * One pass of a shelf. Two identical passes are rendered and each translates by
 * -100% of its own width, so the second lands exactly where the first began
 * and the loop has no visible seam. The duplicate is hidden from assistive tech and removed
 * from the tab order so each tile is announced and focused once.
 */
function ShelfTrack({
  items,
  variant,
  ariaHidden,
}: {
  items: ShowcaseItem[]
  variant: "a" | "b"
  ariaHidden?: boolean
}) {
  return (
    <ul
      className={`shelf__track ${TRACK_CLASS[variant]} list-none`}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {items.map((item) => (
        <li key={item.id} className="w-[240px] shrink-0 sm:w-[280px]">
          <ShowcaseCard item={item} tabIndex={ariaHidden ? -1 : undefined} />
        </li>
      ))}
    </ul>
  )
}

export default ShowcaseSection
