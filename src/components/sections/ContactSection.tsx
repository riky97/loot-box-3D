import { Mail, MapPin, Store } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { InstagramGlyph } from "@/components/common/InstagramGlyph"
import { SectionHeading } from "@/components/common/SectionHeading"
import { Button } from "@/components/ui/button"
import { BRAND_LINKS } from "@/data/brand"
import { SECTION_IDS } from "@/routes/paths"

const CONTACT_HEADING_ID = "contact-heading"

/**
 * Archetype: single dominant panel (DESIGN.md 11.6).
 *
 * One centred panel holding the three ways to reach the studio, side by side
 * with the same structure: Instagram, email and the Stimalo profile, each with
 * its handle or address visible and its own button. Only Instagram's button
 * is filled, as the fastest channel; the other two are outlined so the panel
 * does not hold three competing green buttons. The location sits in a strip
 * beneath rather than in a second card.
 */
export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby={CONTACT_HEADING_ID}
      className="section-pad bg-surface-alt"
    >
      <div className="shell-narrow flex flex-col items-center gap-sp-8 text-center">
        <SectionHeading
          id={CONTACT_HEADING_ID}
          eyebrow={t("contact.eyebrow")}
          titleText={t("contact.title")}
          subtitle={t("contact.subtitle")}
          align="center"
        />

        {/* The only element on the page permitted to use the glow shadow. */}
        <div className="w-full rounded-lg border-2 border-primary bg-surface p-sp-6 shadow-glow sm:p-sp-8">
          <p className="text-foreground-dim">{t("contact.responseTime")}</p>

          <ul className="mt-sp-6 grid list-none gap-sp-6 divide-y-2 divide-border sm:grid-cols-3 sm:gap-sp-5 sm:divide-y-0">
            <Channel
              icon={<InstagramGlyph className="size-6" />}
              label={t("contact.instagramLabel")}
              value={t("contact.instagramHandle")}
            >
              <Button asChild size="lg" className="btn-pop w-full">
                <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
                  <InstagramGlyph className="size-4" />
                  {t("contact.instagramCta")}
                </a>
              </Button>
            </Channel>
            <Channel
              icon={<Mail className="size-6" aria-hidden="true" />}
              label={t("contact.emailLabel")}
              value={<EmailAddress address={BRAND_LINKS.email} />}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-pop-outline w-full border-2 border-foreground"
              >
                <a href={`mailto:${BRAND_LINKS.email}`}>
                  <Mail className="size-4" aria-hidden="true" />
                  {t("contact.emailCta")}
                </a>
              </Button>
            </Channel>
            <Channel
              icon={<Store className="size-6" aria-hidden="true" />}
              label={t("contact.stimaloLabel")}
              value={t("contact.stimaloValue")}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-pop-outline w-full border-2 border-foreground"
              >
                <a href={BRAND_LINKS.stimalo} target="_blank" rel="noreferrer noopener">
                  <Store className="size-4" aria-hidden="true" />
                  {t("contact.stimaloCta")}
                </a>
              </Button>
            </Channel>
          </ul>
        </div>

        <p className="inline-flex items-center gap-sp-2">
          <MapPin className="size-4 text-primary" aria-hidden="true" />
          <span className="type-chip text-muted-foreground">{t("contact.locationLabel")}</span>
          <span className="text-foreground">{t("contact.locationValue")}</span>
        </p>
      </div>
    </section>
  )
}

/**
 * One way to reach the studio: icon, channel name, the handle or address
 * itself (so it can be read or copied without clicking), and a button.
 */
function Channel({
  icon,
  label,
  value,
  children,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  children: ReactNode
}) {
  return (
    <li className="flex flex-col items-center gap-sp-3 pt-sp-6 first:pt-0 sm:pt-0">
      <span className="flex size-12 items-center justify-center rounded-pill bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="type-chip text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
      <div className="mt-auto w-full pt-sp-2">{children}</div>
    </li>
  )
}

/**
 * An email address that, when it has to wrap, breaks only after the "@"
 * ("lootbox.3dprint@" / "gmail.com") instead of mid-word, which is what
 * happened in a third of the panel.
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
