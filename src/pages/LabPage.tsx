import { ArrowRight, Mail } from "lucide-react"
import { useRef, useState, type ReactNode, type RefObject } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { MediaFrame } from "@/components/common/MediaFrame"
import { PhotoPlaceholder } from "@/components/common/PhotoPlaceholder"
import { PhotoViewer } from "@/components/common/PhotoViewer"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import {
  BRAND_LINKS,
  LAB_MATERIAL_PHOTOS,
  LAB_MEDIA,
  LAB_PRINTER_PHOTOS,
  LAB_SECTION_MEDIA,
  LAB_TOOL_PHOTOS,
  type LabMedia,
} from "@/data/brand"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { useContentList } from "@/i18n/useContentList"
import { cn } from "@/lib/utils"
import { LAB_SECTION_IDS } from "@/routes/paths"
import type { LabMaterial, LabPrinter, LabStep, LabTool } from "@/types/content"

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
  const tools = useContentList<LabTool>("lab.tools.items").filter((tool) => isFilled(tool.name))
  const printers = useContentList<LabPrinter>("lab.printers.items").filter((p) =>
    isFilled(p.name),
  )

  const [openMaterialId, setOpenMaterialId] = useState<string | null>(null)
  const openMaterial = materials.find((m) => m.id === openMaterialId) ?? null
  // The card that opened the panel, so focus can go back to it on close.
  const materialTriggerRef = useRef<HTMLButtonElement | null>(null)

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
        media={LAB_SECTION_MEDIA.materials}
        mediaAlt={t("lab.materials.mediaAlt")}
        className="bg-surface-alt"
      >
        <ul className="grid list-none gap-sp-5 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <li key={material.id}>
              <MaterialCard
                material={material}
                onOpen={(trigger) => {
                  materialTriggerRef.current = trigger
                  setOpenMaterialId(material.id)
                }}
              />
            </li>
          ))}
        </ul>
        <MaterialDialog
          material={openMaterial}
          onClose={() => setOpenMaterialId(null)}
          returnFocusRef={materialTriggerRef}
        />
      </LabSection>

      <LabSection
        id={LAB_SECTION_IDS.finishing}
        title={t("lab.finishing.title")}
        intro={t("lab.finishing.intro")}
        className="bg-background"
      >
        <StepList
          steps={finishingSteps}
          tools={tools}
          productsLabel={t("lab.finishing.productsLabel")}
          toolsLabel={t("lab.finishing.toolsLabel")}
          pairTextSteps
        />
      </LabSection>

      <LabSection
        id={LAB_SECTION_IDS.custom}
        title={t("lab.custom.title")}
        intro={t("lab.custom.intro")}
        className="bg-surface-alt"
      >
        <StepList
          steps={customSteps}
          tools={tools}
          productsLabel={t("lab.finishing.productsLabel")}
          toolsLabel={t("lab.finishing.toolsLabel")}
        />
      </LabSection>

      {printers.length > 0 ? (
        <LabSection
          id={LAB_SECTION_IDS.printers}
          title={t("lab.printers.title")}
          intro={t("lab.printers.intro")}
          className="bg-background"
        >
          <ul className="grid list-none gap-sp-5 sm:grid-cols-2 lg:grid-cols-3">
            {printers.map((printer) => {
              const photo = LAB_PRINTER_PHOTOS[printer.id]
              return (
                <li
                  key={printer.id}
                  className="flex flex-col overflow-hidden rounded-lg border-2 border-border bg-surface shadow-raised"
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt={printer.photoAlt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full bg-surface-alt object-cover"
                    />
                  ) : (
                    <PhotoPlaceholder label={t("lab.photoPlaceholder")} className="aspect-[4/3]" />
                  )}
                  <div className="flex flex-col gap-sp-2 p-sp-6">
                    <h3 className="type-h3 text-foreground">{printer.name}</h3>
                    {isFilled(printer.technology) ? (
                      <p className="type-meta text-muted-foreground">{printer.technology}</p>
                    ) : null}
                    {isFilled(printer.notes) ? (
                      <p className="text-foreground-dim">{printer.notes}</p>
                    ) : null}
                  </div>
                </li>
              )
            })}
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

/**
 * A lab page section. With `media`, the title and intro sit beside an opening
 * 4:5 photo or clip from `md:` up, and above it on phones.
 */
function LabSection({
  id,
  title,
  intro,
  media,
  mediaAlt = "",
  className,
  children,
}: {
  id: string
  title: string
  intro: string
  media?: LabMedia
  mediaAlt?: string
  className?: string
  children: ReactNode
}) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn("section-pad", className)}>
      <div className="shell flex flex-col gap-sp-8">
        <div
          className={cn(
            "grid items-center gap-sp-5",
            media && "md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:gap-sp-8",
          )}
        >
          <div className="flex flex-col gap-sp-3">
            <h2 id={headingId} className="type-h2 text-foreground">
              {title}
            </h2>
            {isFilled(intro) ? (
              <p className="max-w-measure-lead text-foreground-dim">{intro}</p>
            ) : null}
          </div>
          {media ? (
            <MediaFrame
              media={media}
              alt={mediaAlt}
              className="mx-auto aspect-[4/5] max-w-[18rem] rounded-lg border-2 border-border shadow-raised md:max-w-none"
            />
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}

/**
 * The steps are a real sequence, so they are an ordered list with visible
 * numbers. A step with media splits into text and frame from `md:` up;
 * otherwise it stays a single column rather than leaving an empty half.
 * With `pairTextSteps`, a step with neither media nor tools takes half the row
 * from `md:` up, so two such steps in a row sit side by side. Tools, when a step has
 * any, sit under it as small photo cards.
 */
function StepList({
  steps,
  tools,
  productsLabel,
  toolsLabel,
  pairTextSteps = false,
}: {
  steps: LabStep[]
  /** Every filled tool on the page; each step shows the ones naming it. */
  tools: LabTool[]
  productsLabel: string
  toolsLabel: string
  pairTextSteps?: boolean
}) {
  return (
    <ol
      className={cn(
        "list-none gap-sp-10",
        pairTextSteps ? "grid md:grid-cols-2 md:gap-x-sp-8" : "flex flex-col",
      )}
    >
      {steps.map((step, index) => {
        const media = LAB_MEDIA[step.id]
        const stepTools = tools.filter((tool) => tool.step === step.id)
        const fullRow = pairTextSteps && (Boolean(media) || stepTools.length > 0)
        return (
          <li key={step.id} className={cn("flex flex-col gap-sp-5", fullRow && "md:col-span-2")}>
            <div
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
              {media ? <MediaFrame media={media} alt={step.mediaAlt || step.title} /> : null}
            </div>

            {stepTools.length > 0 ? (
              <div className="md:pl-sp-10">
                <h4 className="type-eyebrow text-muted-foreground">{toolsLabel}</h4>
                <ul className="mt-sp-3 grid list-none grid-cols-2 gap-sp-4 sm:grid-cols-3 lg:grid-cols-4">
                  {stepTools.map((tool) => (
                    <li key={tool.id}>
                      <ToolCard tool={tool} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

function ToolCard({ tool }: { tool: LabTool }) {
  const { t } = useTranslation()
  const photo = LAB_TOOL_PHOTOS[tool.id]
  return (
    <figure className="flex flex-col gap-sp-2">
      {photo ? (
        <img
          src={photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-lg border-2 border-border bg-surface-alt object-cover"
        />
      ) : (
        <PhotoPlaceholder
          label={t("lab.photoPlaceholder")}
          className="aspect-square rounded-lg border-2 border-border"
        />
      )}
      {/* The name is the photo's caption, so the image itself stays alt="". */}
      <figcaption className="flex flex-col">
        <span className="font-semibold text-foreground">{tool.name}</span>
        {isFilled(tool.description) ? (
          <span className="type-meta text-foreground-dim">{tool.description}</span>
        ) : null}
      </figcaption>
    </figure>
  )
}

/**
 * A material in the grid: its first photo (or the placeholder), name and one
 * line of summary. The whole card is the button that opens the detail panel.
 */
function MaterialCard({
  material,
  onOpen,
}: {
  material: LabMaterial
  onOpen: (trigger: HTMLButtonElement) => void
}) {
  const { t } = useTranslation()
  const photo = LAB_MATERIAL_PHOTOS[material.id]?.[0]
  return (
    <button
      type="button"
      onClick={(event) => onOpen(event.currentTarget)}
      aria-haspopup="dialog"
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border-2 border-border bg-surface text-left shadow-raised transition-[transform,border-color] duration-base ease-bounce hover:-translate-y-1 hover:border-primary"
    >
      {photo ? (
        <img
          src={photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full bg-surface-alt object-cover"
        />
      ) : (
        <PhotoPlaceholder label={t("lab.photoPlaceholder")} className="aspect-[4/3]" decorative />
      )}
      <span className="flex flex-1 flex-col gap-sp-2 p-sp-5">
        <span className="type-h3 text-foreground">{material.name}</span>
        {isFilled(material.summary) ? (
          <span className="text-foreground-dim">{material.summary}</span>
        ) : null}
        <span className="type-meta mt-auto inline-flex items-center gap-sp-2 pt-sp-2 text-primary">
          {t("lab.materials.openDetail")}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-base ease-bounce group-hover:translate-x-1"
          />
        </span>
      </span>
    </button>
  )
}

/**
 * The detail panel for one material: photos, technical note, uses, notes and
 * the print settings, pros and cons. With no photos yet it shows the text
 * alone in a narrower panel, rather than a placeholder.
 * Built on the same Radix dialog as the mobile menu, so focus is trapped and
 * returned, Escape closes it, and the page behind does not scroll. On phones
 * it rises from the bottom; from `sm:` up it sits centred.
 */
function MaterialDialog({
  material,
  onClose,
  returnFocusRef,
}: {
  material: LabMaterial | null
  onClose: () => void
  /** Focused again on close; Radix only does this for its own Trigger. */
  returnFocusRef: RefObject<HTMLButtonElement | null>
}) {
  const { t } = useTranslation()
  // Keeps the last material on screen while the close animation runs, instead
  // of the panel emptying the moment `material` becomes null.
  const lastMaterialRef = useRef<LabMaterial | null>(null)
  if (material) lastMaterialRef.current = material
  const shown = material ?? lastMaterialRef.current
  const photos = shown ? (LAB_MATERIAL_PHOTOS[shown.id] ?? []) : []

  return (
    <Sheet
      open={material !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <SheetContent
        side="bottom"
        closeLabel={t("lab.materials.closeLabel")}
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          returnFocusRef.current?.focus()
        }}
        className={cn(
          "max-h-[90vh] overflow-y-auto rounded-t-lg border-2 border-border bg-surface p-sp-6 shadow-elevated",
          "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg",
          photos.length > 0 ? "sm:w-[min(92vw,760px)]" : "sm:w-[min(92vw,560px)]",
          "sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]",
        )}
      >
        {shown ? (
          <div
            className={cn(
              "flex flex-col gap-sp-5",
              photos.length > 0 && "sm:grid sm:grid-cols-2 sm:items-start sm:gap-sp-6",
            )}
          >
            {photos.length > 0 ? (
              <PhotoViewer
                key={shown.id}
                photos={photos}
                alt={shown.name}
                placeholderLabel={t("lab.photoPlaceholder")}
                aspectClass="aspect-[4/3]"
              />
            ) : null}
            <div className="flex flex-col gap-sp-4 sm:pr-sp-8">
              {/* The explicit size and weight replace SheetTitle's own `text-lg
                  font-semibold`: utilities outrank the `type-h2` component
                  class, so without them the title renders at 18px. */}
              <SheetTitle className="type-h2 text-[length:var(--fs-h2)] font-extrabold text-foreground">{shown.name}</SheetTitle>
              {isFilled(shown.summary) ? (
                <p className="type-lead text-foreground-dim">{shown.summary}</p>
              ) : null}
              {isFilled(shown.technical) || isFilled(shown.uses) ? (
                <dl className="flex flex-col gap-sp-3">
                  {isFilled(shown.technical) ? (
                    <Fact label={t("lab.materials.technicalLabel")}>{shown.technical}</Fact>
                  ) : null}
                  {isFilled(shown.uses) ? (
                    <Fact label={t("lab.materials.usesLabel")}>{shown.uses}</Fact>
                  ) : null}
                </dl>
              ) : null}
              {isFilled(shown.notes) ? (
                <p className="text-foreground-dim">{shown.notes}</p>
              ) : null}
              <FactList label={t("lab.materials.printParamsLabel")} items={shown.printParams} />
              <FactList label={t("lab.materials.prosLabel")} items={shown.pros} />
              <FactList label={t("lab.materials.consLabel")} items={shown.cons} />
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
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

/** A labelled bullet list in the material panel; nothing if every entry is blank. */
function FactList({ label, items }: { label: string; items: string[] | undefined }) {
  const filled = (items ?? []).filter(isFilled)
  if (filled.length === 0) return null
  return (
    <div>
      <h3 className="type-meta text-muted-foreground">{label}</h3>
      <ul className="mt-sp-1 list-disc pl-sp-5 text-foreground marker:text-primary">
        {filled.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default LabPage
