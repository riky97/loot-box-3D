import { Mail } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { LabMediaFrame } from "@/components/common/LabMediaFrame"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS, LAB_MEDIA } from "@/data/brand"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { useContentList } from "@/i18n/useContentList"
import { cn } from "@/lib/utils"
import { LAB_SECTION_IDS } from "@/routes/paths"
import type { LabMaterial, LabPrinter, LabStep } from "@/types/content"

const LAB_HEADING_ID = "lab-heading"

/** Entries with a blank name or title are templates left in it.json to fill in. */
const isFilled = (value: string) => value.trim().length > 0

/**
 * The lab page: materials, hand finishing, made-to-measure work and printers,
 * for the visitor who wants to know how a piece is made before asking for one.
 *
 * Everything is driven by `lab` in it.json and `LAB_MEDIA` in brand.ts. Blank
 * fields and blank entries are skipped, and the printers section appears only
 * once a printer is named, so the page can go live while still being filled.
 */
export function LabPage() {
  const { t } = useTranslation()
  const materials = useContentList<LabMaterial>("lab.materials.items").filter((m) =>
    isFilled(m.name),
  )
  const finishingSteps = useContentList<LabStep>("lab.finishing.steps").filter((s) =>
    isFilled(s.title),
  )
  const customSteps = useContentList<LabStep>("lab.custom.steps").filter((s) => isFilled(s.title))
  const printers = useContentList<LabPrinter>("lab.printers.items").filter((p) =>
    isFilled(p.name),
  )

  useDocumentMeta({ title: t("lab.metaTitle"), description: t("lab.metaDescription") })

  const jumpLinks = [
    { id: LAB_SECTION_IDS.materials, label: t("lab.materials.title") },
    { id: LAB_SECTION_IDS.finishing, label: t("lab.finishing.title") },
    { id: LAB_SECTION_IDS.custom, label: t("lab.custom.title") },
    ...(printers.length > 0
      ? [{ id: LAB_SECTION_IDS.printers, label: t("lab.printers.title") }]
      : []),
  ]

  return (
    <>
      <header className="section-pad bg-background" aria-labelledby={LAB_HEADING_ID}>
        <div className="shell is-inview flex flex-col gap-sp-4">
          <p className="type-eyebrow inline-block self-start border-b-2 border-primary pb-sp-1 text-primary">
            {t("lab.eyebrow")}
          </p>
          <h1 id={LAB_HEADING_ID} className="type-h1 text-foreground">
            {t("lab.title")}
          </h1>
          <p className="type-lead text-foreground-dim">{t("lab.intro")}</p>

          <nav aria-label={t("lab.eyebrow")} className="mt-sp-2">
            <ul className="flex list-none flex-wrap gap-sp-3">
              {jumpLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-flex min-h-[44px] items-center rounded-pill border-2 border-border bg-surface px-sp-4 font-semibold text-foreground transition-colors duration-fast ease-out hover:border-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <LabSection
        id={LAB_SECTION_IDS.materials}
        title={t("lab.materials.title")}
        intro={t("lab.materials.intro")}
        className="bg-surface-alt"
      >
        <ul className="grid list-none gap-sp-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <li
              key={material.name}
              className="flex flex-col gap-sp-3 rounded-lg border-2 border-border bg-surface p-sp-6 shadow-raised"
            >
              <h3 className="type-h3 text-foreground">{material.name}</h3>
              {isFilled(material.bestFor) || isFilled(material.finish) ? (
                <dl className="flex flex-col gap-sp-2">
                  {isFilled(material.bestFor) ? (
                    <Fact label={t("lab.materials.bestForLabel")}>{material.bestFor}</Fact>
                  ) : null}
                  {isFilled(material.finish) ? (
                    <Fact label={t("lab.materials.finishLabel")}>{material.finish}</Fact>
                  ) : null}
                </dl>
              ) : null}
              {isFilled(material.notes) ? (
                <p className="text-foreground-dim">{material.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </LabSection>

      <LabSection
        id={LAB_SECTION_IDS.finishing}
        title={t("lab.finishing.title")}
        intro={t("lab.finishing.intro")}
        className="bg-background"
      >
        <StepList steps={finishingSteps} productsLabel={t("lab.finishing.productsLabel")} />
      </LabSection>

      <LabSection
        id={LAB_SECTION_IDS.custom}
        title={t("lab.custom.title")}
        intro={t("lab.custom.intro")}
        className="bg-surface-alt"
      >
        <StepList steps={customSteps} productsLabel={t("lab.finishing.productsLabel")} />
      </LabSection>

      {printers.length > 0 ? (
        <LabSection
          id={LAB_SECTION_IDS.printers}
          title={t("lab.printers.title")}
          intro={t("lab.printers.intro")}
          className="bg-background"
        >
          <ul className="grid list-none gap-sp-5 sm:grid-cols-2 lg:grid-cols-3">
            {printers.map((printer) => (
              <li
                key={printer.name}
                className="flex flex-col gap-sp-2 rounded-lg border-2 border-border bg-surface p-sp-6 shadow-raised"
              >
                <h3 className="type-h3 text-foreground">{printer.name}</h3>
                {isFilled(printer.technology) ? (
                  <p className="type-meta text-muted-foreground">{printer.technology}</p>
                ) : null}
                {isFilled(printer.notes) ? (
                  <p className="text-foreground-dim">{printer.notes}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </LabSection>
      ) : null}

      <section className="section-pad bg-background" aria-labelledby="lab-cta-heading">
        <div className="shell-narrow flex flex-col items-center gap-sp-5 rounded-lg border-2 border-primary bg-surface p-sp-8 text-center shadow-glow">
          <h2 id="lab-cta-heading" className="type-h2 text-foreground">
            {t("lab.cta.title")}
          </h2>
          <p className="max-w-measure-body text-foreground-dim">{t("lab.cta.text")}</p>
          <div className="flex w-full flex-col items-center gap-sp-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="btn-pop w-full sm:w-auto">
              <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
                <InstagramGlyph className="size-4" />
                {t("contact.instagramCta")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="btn-pop-outline w-full border-2 border-foreground sm:w-auto"
            >
              <a href={`mailto:${BRAND_LINKS.email}`}>
                <Mail className="size-4" aria-hidden="true" />
                {t("contact.emailCta")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

function LabSection({
  id,
  title,
  intro,
  className,
  children,
}: {
  id: string
  title: string
  intro: string
  className?: string
  children: ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn("section-pad", className)}>
      <div className="shell flex flex-col gap-sp-8">
        <div className="flex flex-col gap-sp-3">
          <h2 id={headingId} className="type-h2 text-foreground">
            {title}
          </h2>
          {isFilled(intro) ? <p className="max-w-measure-lead text-foreground-dim">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}

/**
 * The steps are a real sequence, so they are an ordered list with visible
 * numbers. A step with media splits into text and clip from `md:` up; one
 * without stays a single column rather than leaving an empty half.
 */
function StepList({ steps, productsLabel }: { steps: LabStep[]; productsLabel: string }) {
  return (
    <ol className="flex list-none flex-col gap-sp-8">
      {steps.map((step, index) => {
        const media = LAB_MEDIA[step.id]
        return (
          <li
            key={step.id}
            className={cn("grid items-center gap-sp-5", media && "md:grid-cols-2 md:gap-sp-8")}
          >
            <div className="flex gap-sp-4">
              <span
                aria-hidden="true"
                className="type-display text-h3 tabular-nums leading-none text-primary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-sp-2">
                <h3 className="type-h3 text-foreground">{step.title}</h3>
                {isFilled(step.description) ? (
                  <p className="max-w-measure-body text-foreground-dim">{step.description}</p>
                ) : null}
                {isFilled(step.products) ? (
                  <dl>
                    <Fact label={productsLabel}>{step.products}</Fact>
                  </dl>
                ) : null}
              </div>
            </div>
            {media ? <LabMediaFrame media={media} alt={step.mediaAlt || step.title} /> : null}
          </li>
        )
      })}
    </ol>
  )
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-meta text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  )
}

export default LabPage
