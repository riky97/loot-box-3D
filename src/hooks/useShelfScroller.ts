import { useCallback, useEffect, useRef, type RefObject } from "react"

/** How long the shelf stays still after the visitor last touched it. */
const RESUME_AFTER_MS = 3000
/** Pointer travel beyond which a press counts as a drag, not a click. */
const DRAG_THRESHOLD_PX = 5
/** Quiet time after the last scroll event before the loop is re-centred. */
const SCROLL_IDLE_MS = 150
/** Tiles moved per arrow press. */
const TILES_PER_STEP = 2
/** A focus this soon after a press is treated as the press's, not the keyboard's. */
const POINTER_FOCUS_WINDOW_MS = 500
/** Used only if the duration token cannot be read. */
const FALLBACK_DURATION_S = 40

interface ShelfScrollerOptions {
  /** 1 drifts the content leftwards, -1 rightwards. */
  direction: 1 | -1
  /** Custom property holding the time one full loop takes, e.g. `--dur-shelf-a`. */
  durationVar: string
}

/**
 * Drives one gallery shelf: a native horizontal scroller that drifts on its
 * own and hands control to the visitor the moment they reach for it.
 *
 * The scroller must hold three identical tracks, the middle one being the
 * real content. Keeping the scroll position inside the middle copy (it is
 * shifted by one track width whenever it strays half a track out) makes the
 * loop endless in both directions without a visible seam.
 *
 * - Drift: a rAF loop advances `scrollLeft` at one track width per
 *   `durationVar`. Off under `prefers-reduced-motion`.
 * - Pauses while hovered, while a tile has keyboard focus, during a drag, and
 *   for `RESUME_AFTER_MS` after any wheel, touch, drag or arrow press.
 * - Mouse drag with a grab cursor; a drag never fires the tile's link.
 * - Touch and trackpad use the browser's own scrolling, momentum included.
 *
 * Hover and focus are read from the scroller's parent, so arrow buttons
 * placed beside the scroller count as "on the shelf" too.
 */
export function useShelfScroller(
  scrollerRef: RefObject<HTMLElement | null>,
  { direction, durationVar }: ShelfScrollerOptions,
) {
  const lastInteractionRef = useRef(Number.NEGATIVE_INFINITY)
  // Set by the effect, which owns the loop state the arrows need.
  const stepRef = useRef<((towards: 1 | -1) => void) | null>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const frame = scroller?.parentElement
    if (!scroller || !frame) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const durationS =
      parseFloat(getComputedStyle(scroller).getPropertyValue(durationVar)) || FALLBACK_DURATION_S

    const trackWidth = () => (scroller.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0
    let period = trackWidth()
    scroller.scrollLeft = period

    let hovered = false
    let keyboardFocused = false
    let dragging = false
    // Held as a float: `scrollLeft` rounds, and at under 1px per frame a
    // read-modify-write would round the drift away to nothing.
    let position = period
    let wasPaused = true

    const markInteraction = () => {
      lastInteractionRef.current = performance.now()
    }
    const isPaused = (now: number) =>
      reduceMotion ||
      hovered ||
      keyboardFocused ||
      dragging ||
      now - lastInteractionRef.current < RESUME_AFTER_MS

    /** Re-centres into the middle track; returns how far it moved. */
    const recentre = () => {
      // Never while a tile has keyboard focus: jumping a track would carry the
      // focused tile out of view.
      if (keyboardFocused || period === 0) return 0
      const left = scroller.scrollLeft
      if (left < period / 2) {
        scroller.scrollLeft = left + period
        return period
      }
      if (left > period * 1.5) {
        scroller.scrollLeft = left - period
        return -period
      }
      return 0
    }

    // -- Drift ----------------------------------------------------------------
    let rafId = 0
    let lastFrame = performance.now()
    const tick = (now: number) => {
      // Clamped so a backgrounded tab does not lurch forward on return.
      const dt = Math.min(now - lastFrame, 100) / 1000
      lastFrame = now

      if (isPaused(now)) {
        wasPaused = true
      } else {
        if (wasPaused) {
          position = scroller.scrollLeft
          wasPaused = false
        }
        position += (direction * period * dt) / durationS
        if (position < period / 2) position += period
        else if (position > period * 1.5) position -= period
        scroller.scrollLeft = position
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // -- Hover and keyboard focus --------------------------------------------
    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hovered = true
    }
    const onPointerLeave = () => {
      hovered = false
    }
    // Only keyboard focus pauses: Chrome also focuses a link or button on
    // mouse down, and that focus would otherwise hold the shelf still until a
    // click elsewhere. A focus that closely follows a press came from the
    // pointer. (`:focus-visible` would be the obvious test, but it proved
    // unreliable here and a drifting shelf must never carry a keyboard user's
    // focused tile out of view.)
    let pointerDownAt = Number.NEGATIVE_INFINITY
    const onFramePointerDown = () => {
      pointerDownAt = performance.now()
    }
    const onFocusIn = () => {
      keyboardFocused = performance.now() - pointerDownAt > POINTER_FOCUS_WINDOW_MS
    }
    const onFocusOut = (event: FocusEvent) => {
      if (!frame.contains(event.relatedTarget as Node | null)) keyboardFocused = false
    }

    // -- Mouse drag -----------------------------------------------------------
    let dragStartX = 0
    let dragStartScroll = 0
    let dragMoved = false

    const onPointerDown = (event: PointerEvent) => {
      markInteraction()
      if (event.pointerType !== "mouse" || event.button !== 0) return
      dragging = true
      dragMoved = false
      dragStartX = event.clientX
      dragStartScroll = scroller.scrollLeft
      window.addEventListener("pointermove", onPointerMove)
      window.addEventListener("pointerup", onPointerUp)
    }
    const onPointerMove = (event: PointerEvent) => {
      const dx = event.clientX - dragStartX
      if (!dragMoved && Math.abs(dx) < DRAG_THRESHOLD_PX) return
      if (!dragMoved) {
        dragMoved = true
        scroller.style.cursor = "grabbing"
      }
      scroller.scrollLeft = dragStartScroll - dx
      dragStartScroll += recentre()
    }
    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      dragging = false
      scroller.style.cursor = ""
      markInteraction()
      if (!dragMoved) return
      // The release lands on a tile: swallow the click it produces, so a drag
      // never opens the piece it happened to end on.
      const swallow = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
      }
      scroller.addEventListener("click", swallow, { capture: true, once: true })
      setTimeout(() => scroller.removeEventListener("click", swallow, { capture: true }), 0)
    }
    // Links and images are natively draggable, which would hijack the drag.
    const onDragStart = (event: DragEvent) => event.preventDefault()

    // -- Arrows ---------------------------------------------------------------
    // Where the last arrow press is heading, while its smooth scroll runs.
    // Rapid presses build on it rather than on the half-way position.
    let pendingTarget: number | null = null

    stepRef.current = (towards) => {
      const tile = scroller.querySelector<HTMLElement>("li")
      if (!tile) return
      markInteraction()
      const gap = parseFloat(getComputedStyle(tile.parentElement as HTMLElement).columnGap) || 0
      const delta = towards * (tile.offsetWidth + gap) * TILES_PER_STEP
      const current = scroller.scrollLeft
      const base = pendingTarget ?? current

      // Re-centre up front when the destination would leave the middle
      // track: presses faster than the scroll settles would otherwise run
      // into the end of the scroller before the idle re-centre gets a turn.
      let shift = 0
      if (!keyboardFocused && period > 0) {
        if (base + delta > period * 1.5) shift = -period
        else if (base + delta < period / 2) shift = period
      }
      if (shift !== 0) scroller.scrollLeft = current + shift

      pendingTarget = base + shift + delta
      scroller.scrollTo({ left: pendingTarget, behavior: reduceMotion ? "auto" : "smooth" })
    }

    // -- Touch, wheel and settling -------------------------------------------
    let idleTimer = 0
    const onScroll = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        pendingTarget = null
        if (isPaused(performance.now())) recentre()
      }, SCROLL_IDLE_MS)
    }

    // -- Resize: the tiles change width at the `sm` breakpoint ---------------
    const resizeObserver = new ResizeObserver(() => {
      const next = trackWidth()
      if (next === 0 || next === period) return
      const progress = scroller.scrollLeft / period
      period = next
      scroller.scrollLeft = progress * period
      position = scroller.scrollLeft
    })
    if (scroller.firstElementChild) resizeObserver.observe(scroller.firstElementChild)

    frame.addEventListener("pointerdown", onFramePointerDown, { capture: true })
    frame.addEventListener("pointerenter", onPointerEnter)
    frame.addEventListener("pointerleave", onPointerLeave)
    frame.addEventListener("focusin", onFocusIn)
    frame.addEventListener("focusout", onFocusOut)
    scroller.addEventListener("pointerdown", onPointerDown)
    scroller.addEventListener("dragstart", onDragStart)
    scroller.addEventListener("wheel", markInteraction, { passive: true })
    scroller.addEventListener("touchstart", markInteraction, { passive: true })
    scroller.addEventListener("touchend", markInteraction, { passive: true })
    scroller.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      stepRef.current = null
      cancelAnimationFrame(rafId)
      window.clearTimeout(idleTimer)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      frame.removeEventListener("pointerdown", onFramePointerDown, { capture: true })
      frame.removeEventListener("pointerenter", onPointerEnter)
      frame.removeEventListener("pointerleave", onPointerLeave)
      frame.removeEventListener("focusin", onFocusIn)
      frame.removeEventListener("focusout", onFocusOut)
      scroller.removeEventListener("pointerdown", onPointerDown)
      scroller.removeEventListener("dragstart", onDragStart)
      scroller.removeEventListener("wheel", markInteraction)
      scroller.removeEventListener("touchstart", markInteraction)
      scroller.removeEventListener("touchend", markInteraction)
      scroller.removeEventListener("scroll", onScroll)
    }
  }, [scrollerRef, direction, durationVar])

  /** Moves the shelf by a couple of tiles; -1 back, 1 forward. */
  const step = useCallback((towards: 1 | -1) => stepRef.current?.(towards), [])

  return { step }
}
