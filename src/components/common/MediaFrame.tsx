import { useEffect, useRef } from "react"

import type { LabMedia } from "@/data/brand"
import { cn } from "@/lib/utils"

interface MediaFrameProps {
  media: LabMedia
  /** What the clip or photo shows; read by screen readers. */
  alt: string
  /**
   * Replaces the default frame (16:9, bordered, raised) when the caller
   * draws its own, e.g. a piece page's 4:5 photo frame.
   */
  className?: string
}

const DEFAULT_FRAME =
  "aspect-video rounded-lg border-2 border-border shadow-raised"

/**
 * A photo or short clip: a lab step's timelapse, a lab section's opening
 * clip, a piece's turntable.
 *
 * A video is fetched only once it nears the screen (`preload="none"` until
 * then), plays muted and looped while visible and pauses when it leaves, so a
 * page of clips costs nothing for the ones nobody scrolls to. Under
 * `prefers-reduced-motion` it never starts on its own: it shows its poster and
 * native controls, and the visitor presses play.
 */
export function MediaFrame({ media, alt, className }: MediaFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") video.preload = "auto"
          // Autoplay can still be refused (data saver, low-power mode); the
          // poster simply stays, which is an acceptable resting state.
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: "200px 0px" },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [media])

  const frameClass = cn(
    "w-full overflow-hidden bg-surface-alt object-cover",
    className ?? DEFAULT_FRAME,
  )

  if (media.type === "image") {
    return <img src={media.src} alt={alt} loading="lazy" decoding="async" className={frameClass} />
  }

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <video
      ref={videoRef}
      src={media.src}
      poster={media.poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      controls={reduceMotion}
      className={frameClass}
    />
  )
}

export default MediaFrame
