import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import { Chip } from "@/components/common/Chip"
import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { PlaceholderTile } from "@/components/common/PlaceholderTile"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS, categoryTierVars } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { ShowcaseItem } from "@/types/content"

const SHOWCASE_HEADING_ID = "showcase-heading"

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
        <p className="type-meta max-w-measure-lead text-muted-foreground">
          {t("showcase.note")}
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
 * One pass of a shelf. Two identical passes are rendered because the keyframes
 * translate by exactly -50%: the strip lands on a matching frame and the loop
 * has no visible seam. The duplicate is hidden from assistive tech and removed
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
  const { t } = useTranslation()

  return (
    <ul
      className={`shelf__track shelf__track--${variant} list-none`}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {items.map((item) => (
        <li key={item.id} className="w-[240px] shrink-0 sm:w-[280px]">
          <a
            href={BRAND_LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            tabIndex={ariaHidden ? -1 : undefined}
            className="spotlight group block overflow-hidden rounded-lg border-2 border-border bg-surface shadow-raised transition-[transform,border-color,box-shadow] duration-base ease-bounce hover:-translate-y-1 hover:border-primary hover:shadow-elevated"
            data-spotlight=""
            style={{ "--tier": `var(${categoryTierVars[item.category]})` } as CSSProperties}
          >
            <PlaceholderTile
              tierVar={categoryTierVars[item.category]}
              label={t("showcase.placeholderBadge")}
            />
            <div className="flex items-center justify-between gap-sp-2 p-sp-4">
              <span className="type-h3 truncate text-body text-foreground">{item.name}</span>
              <Chip tierVar={categoryTierVars[item.category]}>{item.tag}</Chip>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default ShowcaseSection
