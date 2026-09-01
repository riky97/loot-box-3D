import { useTranslation } from "react-i18next"

import { HeroPrintScene } from "@/components/graphics/HeroPrintScene"
import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS } from "@/data/brand"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { HeroStat } from "@/types/content"

const HERO_HEADING_ID = "hero-heading"

export function HeroSection() {
  const { t } = useTranslation()
  const stats = useContentList<HeroStat>("hero.stats")

  return (
    <section
      id={SECTION_IDS.hero}
      aria-labelledby={HERO_HEADING_ID}
      className="relative isolate overflow-hidden"
      style={{
        minHeight: "min(88vh, 860px)",
        paddingTop: "calc(var(--header-h) + var(--sp-10))",
      }}
    >
      {/* Build-plate stage: grid concentrated behind the hero object, plus the bottom fade. */}
      <div
        aria-hidden="true"
        className="plate-grid pointer-events-none absolute inset-0"
        style={{
          maskImage: "radial-gradient(70% 60% at 62% 45%, #000 0%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 62% 45%, #000 0%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px]"
        style={{ backgroundImage: "linear-gradient(transparent, hsl(var(--background)))" }}
      />

      <div className="shell relative flex flex-col gap-sp-10 pb-sp-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-sp-6 lg:pb-0">
        {/* Hero object: above the copy on mobile, right-aligned on tablet, col 8-12 on desktop. */}
        <div className="order-first h-[280px] w-full md:h-[340px] md:w-[60%] md:self-end md:justify-self-end lg:col-span-5 lg:col-start-8 lg:h-auto lg:w-full">
          <HeroPrintScene />
        </div>

        <div className="flex flex-col items-start gap-sp-6 lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <p
            className="type-eyebrow animate-fade-up text-accent"
            style={{ animationDelay: "0ms" }}
          >
            {t("hero.eyebrow")}
          </p>

          <h1
            id={HERO_HEADING_ID}
            className="type-hero animate-fade-up max-w-measure-hero text-balance"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-foreground">{t("hero.titleLead")}</span>
            <span className="text-primary">{t("hero.titleHighlight")}</span>
          </h1>

          <p
            className="type-lead animate-fade-up max-w-measure-hero text-foreground-dim"
            style={{ animationDelay: "160ms" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="animate-fade-up flex w-full flex-col gap-sp-3 sm:w-auto sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              asChild
              size="lg"
              className="cut-shape w-full [--chamfer:6px] sm:w-auto"
            >
              <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
                <InstagramGlyph className="size-4" />
                {t("hero.ctaPrimary")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="cut-shape w-full [--chamfer:6px] sm:w-auto"
            >
              <a href={`#${SECTION_IDS.howItWorks}`}>{t("hero.ctaSecondary")}</a>
            </Button>
          </div>

          <div
            className="animate-fade-up flex w-full flex-wrap gap-x-sp-6 gap-y-sp-4"
            style={{ animationDelay: "320ms" }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  // The dividing rule only appears once the three stats sit on
                  // one line; below that they wrap and a hanging rule reads as
                  // an orphan.
                  index > 0
                    ? "flex flex-col gap-sp-1 sm:border-l sm:border-border sm:pl-sp-6"
                    : "flex flex-col gap-sp-1"
                }
              >
                <span className="type-display text-h3 text-primary">{stat.value}</span>
                <span className="type-meta text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
