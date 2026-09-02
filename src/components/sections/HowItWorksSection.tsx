import { useTranslation } from "react-i18next"

import { Reveal } from "@/components/common/Reveal"
import { SectionHeading } from "@/components/common/SectionHeading"
import { cn } from "@/lib/utils"
import { useContentList } from "@/i18n/useContentList"
import { SECTION_IDS } from "@/routes/paths"
import type { HowItWorksStep } from "@/types/content"

const HOW_IT_WORKS_HEADING_ID = "how-it-works-heading"

/**
 * Archetype: zig-zag cascade (DESIGN.md 11.5).
 *
 * Steps alternate left and right down the page with an oversized numeral
 * bleeding off each block. There is no connecting line — the alternation itself
 * carries the sequence.
 *
 * The order is conveyed semantically by the `<ol>`, not by the numeral, which
 * is decorative and hidden from assistive tech. Below `md:` the cascade
 * collapses to one left-aligned column; alternating blocks on a narrow viewport
 * just look broken.
 */
export function HowItWorksSection() {
  const { t } = useTranslation()
  const steps = useContentList<HowItWorksStep>("howItWorks.steps")

  return (
    <section
      id={SECTION_IDS.howItWorks}
      aria-labelledby={HOW_IT_WORKS_HEADING_ID}
      className="section-pad bg-background"
    >
      <div className="shell flex flex-col gap-sp-10">
        <SectionHeading
          id={HOW_IT_WORKS_HEADING_ID}
          eyebrow={t("howItWorks.eyebrow")}
          titleText={t("howItWorks.title")}
          subtitle={t("howItWorks.subtitle")}
        />

        <ol className="flex list-none flex-col gap-sp-6">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={cn(
                "w-full md:w-[62%]",
                index % 2 === 1 && "md:self-end",
              )}
            >
              <Reveal delayIndex={index}>
                <article
                  className={cn(
                    "relative rounded-lg border-2 border-border bg-surface p-sp-6 shadow-raised transition-[transform,border-color] duration-base ease-bounce hover:-translate-y-1 hover:border-primary",
                    // The numeral bleeds outward, away from the page centre.
                    index % 2 === 1 ? "md:pr-sp-12" : "md:pl-sp-12",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "type-display pointer-events-none absolute top-1/2 hidden -translate-y-1/2 text-numeral tabular-nums text-border md:block",
                      index % 2 === 1 ? "right-sp-2" : "left-sp-2",
                    )}
                  >
                    {step.number}
                  </span>

                  <div className="relative">
                    <p
                      aria-hidden="true"
                      className="type-display text-h3 tabular-nums text-primary md:hidden"
                    >
                      {step.number}
                    </p>
                    <h3 className="type-h3 mt-sp-1 text-foreground md:mt-0">{step.title}</h3>
                    <p className="mt-sp-2 max-w-measure-body text-foreground-dim">
                      {step.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="type-meta max-w-measure-lead text-muted-foreground">
          {t("howItWorks.disclaimer")}
        </p>
      </div>
    </section>
  )
}

export default HowItWorksSection
