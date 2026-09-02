import { useTranslation } from "react-i18next"

import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { AboutPillar } from "@/types/content"

const ABOUT_HEADING_ID = "about-heading"

/**
 * Archetype: sticky rail + scrolling body (DESIGN.md 11.2).
 *
 * The heading occupies a left rail that sticks from `lg:` up while the right
 * column scrolls past it. Below `lg:` the rail unsticks and stacks — a sticky
 * element on a short viewport just eats the screen.
 */
export function AboutSection() {
  const { t } = useTranslation()
  const pillars = useContentList<AboutPillar>("about.pillars")

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby={ABOUT_HEADING_ID}
      className="section-pad bg-background"
    >
      <div className="shell grid gap-sp-8 lg:grid-cols-12 lg:gap-sp-10">
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-sp-5 lg:sticky lg:top-[calc(var(--header-h)+var(--sp-6))]">
            <SectionHeading
              id={ABOUT_HEADING_ID}
              eyebrow={t("about.eyebrow")}
              titleText={t("about.title")}
            />
            <p className="type-lead text-foreground-dim">{t("about.paragraphOne")}</p>
            <span
              aria-hidden="true"
              className="hidden h-[3px] w-sp-10 rounded-pill bg-primary lg:block"
            />
          </div>
        </div>

        <div className="flex flex-col gap-sp-5 lg:col-span-7">
          <Reveal>
            <p className="measure-body text-foreground-dim">{t("about.paragraphTwo")}</p>
          </Reveal>

          <ul className="flex list-none flex-col gap-sp-4">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal delayIndex={index}>
                  <article className="rounded-lg border-2 border-border bg-surface p-sp-6 shadow-raised transition-[transform,border-color] duration-base ease-bounce hover:-translate-y-1 hover:border-primary">
                    <h3 className="type-h3 text-foreground">{pillar.title}</h3>
                    <p className="mt-sp-2 text-foreground-dim">{pillar.description}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
