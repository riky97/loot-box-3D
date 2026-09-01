import { useTranslation } from "react-i18next"

import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { HowItWorksStep } from "@/types/content"

const HOW_IT_WORKS_HEADING_ID = "how-it-works-heading"

export function HowItWorksSection() {
  const { t } = useTranslation()
  const steps = useContentList<HowItWorksStep>("howItWorks.steps")

  return (
    <section
      id={SECTION_IDS.howItWorks}
      aria-labelledby={HOW_IT_WORKS_HEADING_ID}
      className="section-pad border-y border-border bg-surface-2"
    >
      <div className="shell flex flex-col gap-sp-10">
        <SectionHeading
          id={HOW_IT_WORKS_HEADING_ID}
          eyebrow={t("howItWorks.eyebrow")}
          title={t("howItWorks.title")}
          subtitle={t("howItWorks.subtitle")}
        />

        <div className="relative flex flex-col gap-sp-8 lg:flex-row lg:items-start lg:gap-sp-6">
          {/* Spine: horizontal on desktop, vertical on mobile/tablet. */}
          <div
            aria-hidden="true"
            className="absolute left-[20px] top-0 hidden h-full w-[2px] bg-grad-travel lg:top-[22px] lg:block lg:h-[2px] lg:w-full"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute left-[20px] top-0 h-full w-[2px] bg-grad-travel lg:hidden"
            style={{
              maskImage: "linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(180deg, transparent, #000 15%, #000 85%, transparent)",
            }}
          />

          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              delayIndex={index}
              className="relative flex gap-sp-4 pl-sp-8 lg:flex-1 lg:flex-col lg:gap-sp-4 lg:pl-0"
            >
              <span
                aria-hidden="true"
                className="cut-shape absolute left-0 top-0 flex h-[44px] w-[44px] items-center justify-center bg-background shadow-[inset_0_0_0_1px_hsl(var(--border))] lg:static [--chamfer:10px]"
              >
                <span className="font-mono text-body font-bold text-primary">{step.number}</span>
              </span>

              <div className="flex flex-col gap-sp-1">
                <h3 className="type-h3 text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="type-meta text-center text-muted-foreground">{t("howItWorks.disclaimer")}</p>
      </div>
    </section>
  )
}

export default HowItWorksSection
