import { ArrowUpRight, Check, Clock, Copy, Mail, MapPin, Store } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { SectionHeading } from "@/components/common/SectionHeading"
import { BRAND_LINKS } from "@/data/brand"
import { cn } from "@/lib/utils"
import { SECTION_IDS } from "@/routes/paths"

const CONTACT_HEADING_ID = "contact-heading"

/**
 * Archetype: single dominant panel (DESIGN.md 11.6).
 *
 * Split from `lg:`: the heading, the response time and the location on the
 * left; on the right the one panel, holding a row per way to write to the
 * studio. Each row is the link itself (no separate button repeating the
 * channel name), so a channel reads once: name, handle, arrow. Instagram is
 * the only filled row, as the fastest channel. The email row adds a copy
 * button, since a mailto link often opens a mail program nobody uses. The
 * location is information, not a channel, so it sits with the text, not in
 * the panel. Below `lg:` everything stacks, text first.
 */
export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby={CONTACT_HEADING_ID}
      className="section-pad bg-surface-alt"
    >
      <div className="shell grid items-center gap-sp-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-sp-12">
        <div className="flex flex-col gap-sp-6">
          <SectionHeading
            id={CONTACT_HEADING_ID}
            eyebrow={t("contact.eyebrow")}
            titleText={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />
          <ul className="flex list-none flex-col gap-sp-3">
            <li className="flex items-center gap-sp-3 text-foreground">
              <Clock className="size-5 shrink-0 text-primary" aria-hidden="true" />
              {t("contact.responseTime")}
            </li>
            <li className="flex flex-wrap items-center gap-x-sp-3 gap-y-sp-1 text-foreground">
              <MapPin className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="sr-only">{t("contact.locationLabel")}: </span>
                {t("contact.locationValue")}
              </span>
              <a
                href={BRAND_LINKS.maps}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[44px] items-center gap-sp-1 font-semibold text-primary underline underline-offset-4 hover:text-primary-hover"
              >
                {t("contact.locationCta")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* The only element on the page permitted to use the glow shadow. */}
        <div className="rounded-lg border-2 border-primary bg-surface p-sp-5 shadow-glow sm:p-sp-6">
          <ul className="flex list-none flex-col gap-sp-4">
            <li>
              <a
                href={BRAND_LINKS.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-pop flex items-center gap-sp-4 rounded-lg border-2 border-primary bg-primary px-sp-4 py-sp-3 text-primary-foreground hover:bg-primary-hover"
              >
                <ChannelIcon className="bg-primary-foreground/15">
                  <InstagramGlyph className="size-5" />
                </ChannelIcon>
                <ChannelText
                  label={t("contact.instagramLabel")}
                  value={t("contact.instagramHandle")}
                  valueClassName="text-primary-foreground/85"
                />
                <span className="type-chip hidden rounded-pill bg-highlight px-sp-2 py-sp-1 text-foreground sm:inline">
                  {t("contact.instagramNote")}
                </span>
                <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" />
              </a>
            </li>
            <li>
              <EmailRow />
            </li>
            <li>
              <a
                href={BRAND_LINKS.stimalo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-pop-outline flex items-center gap-sp-4 rounded-lg border-2 border-foreground bg-surface px-sp-4 py-sp-3 text-foreground"
              >
                <ChannelIcon>
                  <Store className="size-5" aria-hidden="true" />
                </ChannelIcon>
                <ChannelText label={t("contact.stimaloLabel")} value={t("contact.stimaloValue")} />
                <ArrowUpRight className="size-5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

/**
 * The email row: the address is the mailto link, and a square button beside it
 * copies the address, confirming in place for two seconds. Two controls side
 * by side rather than one inside the other, which HTML does not allow.
 */
function EmailRow() {
  const { t } = useTranslation()
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")
  const resetRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetRef.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BRAND_LINKS.email)
      setState("copied")
    } catch {
      setState(copyWithSelection(BRAND_LINKS.email) ? "copied" : "failed")
    }
    window.clearTimeout(resetRef.current)
    resetRef.current = window.setTimeout(() => setState("idle"), 2000)
  }

  const copyLabel =
    state === "copied"
      ? t("contact.emailCopied")
      : state === "failed"
        ? t("contact.emailCopyFailed")
        : t("contact.emailCopy")

  return (
    <div className="flex items-stretch overflow-hidden rounded-lg border-2 border-foreground bg-surface text-foreground shadow-pop">
      <a
        href={`mailto:${BRAND_LINKS.email}`}
        className="flex min-w-0 flex-1 items-center gap-sp-4 px-sp-4 py-sp-3 transition-colors duration-fast ease-out hover:bg-highlight"
      >
        <ChannelIcon>
          <Mail className="size-5" aria-hidden="true" />
        </ChannelIcon>
        <ChannelText
          label={t("contact.emailLabel")}
          value={<EmailAddress address={BRAND_LINKS.email} />}
        />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copyLabel}
        title={copyLabel}
        className="flex w-14 shrink-0 items-center justify-center border-l-2 border-foreground transition-colors duration-fast ease-out hover:bg-highlight"
      >
        {state === "copied" ? (
          <Check className="size-5 text-primary" aria-hidden="true" />
        ) : (
          <Copy className="size-5" aria-hidden="true" />
        )}
      </button>
      {/* Announces the result; the button's own label changes too, but a
          label change is not read out while focus stays on the button. */}
      <span role="status" className="sr-only">
        {state === "idle" ? "" : copyLabel}
      </span>
    </div>
  )
}

/**
 * Fallback for browsers that refuse the async clipboard (no secure context,
 * older Safari, a denied permission): copy through a selected, off-screen
 * textarea. Deprecated, but still the only route there.
 */
function copyWithSelection(text: string): boolean {
  // Selecting the field moves focus; it goes back to the button afterwards.
  const previousFocus = document.activeElement as HTMLElement | null
  const field = document.createElement("textarea")
  field.value = text
  field.setAttribute("readonly", "")
  field.style.position = "fixed"
  field.style.opacity = "0"
  document.body.appendChild(field)
  field.select()
  try {
    return document.execCommand("copy")
  } catch {
    return false
  } finally {
    field.remove()
    previousFocus?.focus()
  }
}

function ChannelIcon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-pill bg-primary/10",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Channel name over its handle or address, taking the row's free width. */
function ChannelText({
  label,
  value,
  valueClassName = "text-foreground-dim",
}: {
  label: string
  value: ReactNode
  valueClassName?: string
}) {
  return (
    <span className="flex min-w-0 flex-1 flex-col text-left">
      <span className="font-bold">{label}</span>
      <span className={cn("text-sm", valueClassName)}>{value}</span>
    </span>
  )
}

/**
 * An email address that, when it has to wrap, breaks only after the "@"
 * ("lootbox.3dprint@" / "gmail.com") instead of mid-word.
 */
function EmailAddress({ address }: { address: string }) {
  const at = address.indexOf("@")
  if (at === -1) return <>{address}</>
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  )
}

export default ContactSection
