import type { CSSProperties } from "react"
import { useTranslation } from "react-i18next"

import { BrandMark } from "@/components/common/BrandMark"
import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { HeroStat } from "@/types/content"

const HERO_HEADING_ID = "hero-heading"

/**
 * Archetype: centred monolith (DESIGN.md 11.1).
 *
 * The headline is the whole composition — there is no hero illustration. The
 * brand mark sits behind it as an oversized watermark, and the stats become a
 * ticker strip on the section's bottom edge rather than a row of columns.
 */
export function HeroSection() {
  const { t } = useTranslation()
  const stats = useContentList<HeroStat>("hero.stats")

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby={HERO_HEADING_ID}
      className="relative isolate flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: "min(92vh, 900px)",
        paddingTop: "calc(var(--header-h) + var(--sp-10))",
      }}
    >
      {/* Watermark. Sized to the shell, kept far below text contrast, and the
          only element in the hero that takes a parallax offset — the headline
          never moves, so the depth cue costs no legibility. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <BrandMark
          variant="full"
          className="w-[72%] max-w-[52rem] text-foreground opacity-[0.07]"
        />
      </div>

      <div className="shell relative flex flex-col items-center gap-sp-6 pb-sp-10 text-center">
        <p
          className="type-eyebrow animate-drop-in text-primary"
          style={{ "--enter-delay": "0ms" } as CSSProperties}
        >
          {t("hero.eyebrow")}
        </p>

        <h1 id={HERO_HEADING_ID} className="type-hero text-foreground">
          {[t("hero.titleLine1"), t("hero.titleLine2"), t("hero.titleLine3")].map(
            (line, index) => (
              // The trailing space matters: three block-level spans otherwise
              // concatenate into one run ("Collezionabilistampatiin 3D") in the
              // accessible name, which is what a screen reader announces.
              <span
                key={line}
                className="animate-word-reveal block"
                style={{ "--enter-delay": `${80 + index * 60}ms` } as CSSProperties}
              >
                {line}{" "}
              </span>
            ),
          )}
        </h1>

        {/* Caveat placement 1 of 2. The second and last is the footer sign-off. */}
        <p
          className="type-accent animate-drop-in -mt-sp-2 text-primary"
          style={{ "--enter-delay": "280ms" } as CSSProperties}
        >
          {t("hero.annotation")}
        </p>

        <p
          className="type-lead animate-drop-in mx-auto max-w-measure-hero text-foreground-dim"
          style={{ "--enter-delay": "340ms" } as CSSProperties}
        >
          {t("hero.subtitle")}
        </p>

        <div
          className="animate-drop-in flex w-full flex-col items-center gap-sp-3 sm:w-auto sm:flex-row"
          style={{ "--enter-delay": "420ms" } as CSSProperties}
        >
          <Button asChild size="lg" className="btn-pop w-full sm:w-auto">
            <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramGlyph className="size-4" />
              {t("hero.ctaSecondary")}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="btn-pop-outline w-full border-2 border-foreground sm:w-auto"
          >
            {/* Targets the gallery, not the process section: the label reads
                "Scopri la collezione", and a link has to land where its own
                text says it does. "Come funziona" stays reachable from the
                nav, and the gallery sits directly above it in the scroll
                order anyway. */}
            <a href={`#${SECTION_IDS.showcase}`}>{t("hero.ctaPrimary")}</a>
          </Button>
        </div>
      </div>

      {/* Ticker strip: a marquee where it cannot fit, a static justified row
          where it can. */}
      <div className="relative border-y-2 border-border bg-surface-alt py-sp-3">
        <div className="ticker md:hidden">
          <TickerTrack stats={stats} />
          <TickerTrack stats={stats} ariaHidden />
        </div>
        <ul className="shell hidden list-none justify-center gap-sp-8 md:flex">
          {stats.map((stat) => (
            <li key={stat.label} className="flex items-baseline gap-sp-2">
              <span className="type-display text-h3 text-primary">{stat.value}</span>
              <span className="type-meta text-foreground-dim">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/**
 * One pass of the ticker. Two identical passes are rendered so the -50%
 * translation lands on a matching frame and the loop is seamless; the duplicate
 * is hidden from assistive tech so the stats are not announced twice.
 */
function TickerTrack({ stats, ariaHidden }: { stats: HeroStat[]; ariaHidden?: boolean }) {
  return (
    <ul
      className="ticker__track list-none"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {stats.map((stat) => (
        <li key={stat.label} className="flex shrink-0 items-baseline gap-sp-2">
          <span className="type-display text-h3 text-primary">{stat.value}</span>
          <span className="type-meta text-foreground-dim">{stat.label}</span>
        </li>
      ))}
    </ul>
  )
}

export default HeroSection
