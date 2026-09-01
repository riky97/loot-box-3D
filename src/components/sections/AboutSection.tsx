import { useTranslation } from "react-i18next"

import { SectionHeading } from "@/components/common/SectionHeading"
import { Reveal } from "@/components/common/Reveal"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { AboutPillar } from "@/types/content"

const ABOUT_HEADING_ID = "about-heading"

export function AboutSection() {
  const { t } = useTranslation()
  const pillars = useContentList<AboutPillar>("about.pillars")

  return (
    <section
      id={SECTION_IDS.about}
      aria-labelledby={ABOUT_HEADING_ID}
      className="section-pad relative border-y border-border bg-surface-2"
    >
      <div aria-hidden="true" className="layer-strip absolute inset-x-0 top-0 h-[6px]" />

      <div className="shell-narrow flex flex-col gap-sp-8">
        <SectionHeading id={ABOUT_HEADING_ID} eyebrow={t("about.eyebrow")} title={t("about.title")} />

        <div className="flex flex-col gap-sp-4">
          <p className="type-lead measure-body text-foreground-dim">{t("about.paragraphOne")}</p>
          <p className="measure-body text-foreground-dim">{t("about.paragraphTwo")}</p>
        </div>

        <div className="flex flex-col gap-sp-6 sm:flex-row sm:flex-wrap">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delayIndex={index}
              className={
                index > 0
                  ? "flex-1 basis-0 sm:border-l sm:border-border sm:pl-sp-6"
                  : "flex-1 basis-0"
              }
            >
              <p className="type-meta text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="type-h3 mt-sp-2 text-foreground">{pillar.title}</h3>
              <p className="mt-sp-2 text-sm text-muted-foreground">{pillar.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
