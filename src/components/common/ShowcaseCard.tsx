import { PenTool } from "lucide-react"
import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Chip } from "@/components/common/Chip"
import {
  ORIGINAL_DESIGNS,
  SHOWCASE_IMAGE_SIZE,
  SHOWCASE_IMAGES,
  categoryTierVars,
} from "@/data/brand"
import { piecePath } from "@/routes/paths"
import type { ShowcaseItem } from "@/types/content"

interface ShowcaseCardProps {
  item: ShowcaseItem
  /** -1 for the hidden duplicate pass of a shelf, so each piece is focused once. */
  tabIndex?: number
}

/**
 * One photographed piece: 4:5 photo, name and category chip. Shared by the
 * home gallery shelves and the category pages, so a piece looks the same
 * wherever it appears. Width comes from the parent. It opens the piece's own
 * page (`PiecePage`) rather than Instagram, where a given piece may not have
 * been posted and would have to be dug out of a mixed feed.
 */
export function ShowcaseCard({ item, tabIndex }: ShowcaseCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={piecePath(item.id)}
      tabIndex={tabIndex}
      className="spotlight group block overflow-hidden rounded-lg border-2 border-border bg-surface shadow-raised transition-[transform,border-color,box-shadow] duration-base ease-bounce hover:-translate-y-1 hover:border-primary hover:shadow-elevated"
      data-spotlight=""
      style={{ "--tier": `var(${categoryTierVars[item.category]})` } as CSSProperties}
    >
      {/* Width and height reserve the 4:5 box before the file arrives, so
          the shelf never reflows mid-scroll. `bg-surface-alt` is what
          shows during that gap. */}
      <div className="relative">
        <img
          src={SHOWCASE_IMAGES[item.id]}
          alt={item.alt}
          width={SHOWCASE_IMAGE_SIZE.width}
          height={SHOWCASE_IMAGE_SIZE.height}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full bg-surface-alt object-cover"
        />
        {/* Solid cream, not the translucent Chip tint: it sits on a
            photo, where a tint would take its contrast from whatever is
            underneath. The text is real, so it joins the link's
            accessible name rather than hiding behind the icon. */}
        {ORIGINAL_DESIGNS.has(item.id) && (
          <span className="type-chip absolute left-sp-3 top-sp-3 inline-flex items-center gap-sp-1 rounded-pill border-[1.5px] border-foreground bg-background px-sp-2 py-[4px] text-foreground shadow-pop">
            <PenTool className="size-3" aria-hidden="true" />
            {t("showcase.originalBadge")}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-sp-2 p-sp-4">
        <span className="type-h3 truncate text-body text-foreground">{item.name}</span>
        <Chip tierVar={categoryTierVars[item.category]}>{item.tag}</Chip>
      </div>
    </Link>
  )
}

export default ShowcaseCard
