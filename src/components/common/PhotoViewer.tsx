import { useState } from "react"
import { useTranslation } from "react-i18next"

import { PhotoPlaceholder } from "@/components/common/PhotoPlaceholder"
import { cn } from "@/lib/utils"

interface PhotoViewerProps {
  photos: readonly string[]
  /** Describes the first photo; the others are announced by position. */
  alt: string
  /** Chip text for the placeholder shown when there are no photos. */
  placeholderLabel: string
  /** Aspect ratio of the main frame, e.g. `aspect-[4/3]`. */
  aspectClass: string
}

/**
 * A main photo with selectable thumbnails beneath it once there is more than
 * one. With no photos it shows `PhotoPlaceholder`, so a caller never has to
 * branch on whether the studio has supplied pictures yet.
 */
export function PhotoViewer({ photos, alt, placeholderLabel, aspectClass }: PhotoViewerProps) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  if (photos.length === 0) {
    return (
      <PhotoPlaceholder
        label={placeholderLabel}
        className={cn(aspectClass, "rounded-lg border-2 border-border")}
      />
    )
  }

  const current = Math.min(index, photos.length - 1)

  return (
    <div className="flex flex-col gap-sp-3">
      <img
        src={photos[current]}
        alt={
          current === 0
            ? alt
            : t("piecePage.photoCount", { index: current + 1, total: photos.length })
        }
        decoding="async"
        className={cn(
          aspectClass,
          "w-full rounded-lg border-2 border-border bg-surface-alt object-cover",
        )}
      />
      {photos.length > 1 ? (
        <ul className="flex list-none flex-wrap gap-sp-2">
          {photos.map((src, photoIndex) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(photoIndex)}
                aria-pressed={photoIndex === current}
                aria-label={t("piecePage.photoCount", {
                  index: photoIndex + 1,
                  total: photos.length,
                })}
                className={cn(
                  "block size-14 overflow-hidden rounded-md border-2 transition-colors duration-fast ease-out",
                  photoIndex === current
                    ? "border-primary"
                    : "border-border hover:border-foreground",
                )}
              >
                <img src={src} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default PhotoViewer
