import { Expand } from "lucide-react"
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
  /**
   * Show the photo at its own ratio, uncropped, instead of filling the frame;
   * `aspectClass` then sizes only the placeholder. For images with text.
   */
  natural?: boolean
  /** When set, a link under the photo opens it full size in a new tab. */
  enlargeLabel?: string
}

/**
 * A main photo with selectable thumbnails beneath it once there is more than
 * one. With no photos it shows `PhotoPlaceholder`, so a caller never has to
 * branch on whether the studio has supplied pictures yet.
 */
export function PhotoViewer({
  photos,
  alt,
  placeholderLabel,
  aspectClass,
  natural = false,
  enlargeLabel,
}: PhotoViewerProps) {
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
          !natural && aspectClass,
          "w-full rounded-lg border-2 border-border bg-surface-alt",
          natural ? "h-auto" : "object-cover",
        )}
      />
      {enlargeLabel ? (
        <a
          href={photos[current]}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[44px] items-center gap-sp-2 self-start font-semibold text-primary underline-offset-4 hover:underline"
        >
          <Expand className="size-4" aria-hidden="true" />
          {enlargeLabel}
        </a>
      ) : null}
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
