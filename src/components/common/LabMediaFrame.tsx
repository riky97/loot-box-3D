import { useEffect, useRef } from "react"

import type { LabMedia } from "@/data/brand"

interface LabMediaFrameProps {
  media: LabMedia
  /** What the clip or photo shows; read by screen readers. */
  alt: string
}

/**
 * A timelapse or photo beside a lab-page step.
 *
 * A video is fetched only once it nears the screen (`preload="none"` until
 * then), plays muted and looped while visible and pauses when it leaves, so a
 * page of clips costs nothing for the ones nobody scrolls to. Under
 * `prefers-reduced-motion` it never starts on its own: it shows its poster and
 * native controls, and the visitor presses play.
 */
export function LabMediaFrame({ media, alt }: LabMediaFrameProps) {
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

  const frameClass =
    "aspect-video w-full overflow-hidden rounded-lg border-2 border-border bg-surface-alt object-cover shadow-raised"

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

export default LabMediaFrame
