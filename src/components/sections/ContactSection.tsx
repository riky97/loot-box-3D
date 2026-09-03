// `Mail` goes back in the import when the email contact row below is re-enabled.
import { MapPin } from "lucide-react"
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
 * One centred panel treating the Instagram call to action as the loot box
 * itself. The details collapse into a compact strip beneath rather than
 * becoming a second card competing with the first.
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
        <div className="w-full rounded-lg border-2 border-primary bg-surface p-sp-8 shadow-glow">
          <InstagramGlyph className="mx-auto size-12 text-primary" />
          <p className="type-h2 mt-sp-4 text-foreground">{t("contact.instagramHandle")}</p>
          <p className="mt-sp-2 text-foreground-dim">{t("contact.responseTime")}</p>

          <Button asChild size="lg" className="btn-pop mt-sp-6">
            <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramGlyph className="size-4" />
              {t("contact.instagramCta")}
            </a>
          </Button>
        </div>

        <ul className="flex list-none flex-col items-center gap-sp-3 sm:flex-row sm:gap-sp-6">
          {/* Email row is disabled: the mailbox does not exist yet, and publishing
              an address that bounces is worse than not showing one. Re-enable this
              block once the real address is live — the copy already lives under the
              `contact.emailLabel` / `contact.emailValue` keys in the locale file.
          <DetailRow
            icon={<Mail className="size-4 text-primary" aria-hidden="true" />}
            label={t("contact.emailLabel")}
            value={t("contact.emailValue")}
            href={`mailto:${t("contact.emailValue")}`}
          />
          */}
          <DetailRow
            icon={<MapPin className="size-4 text-primary" aria-hidden="true" />}
            label={t("contact.locationLabel")}
            value={t("contact.locationValue")}
          />
          <DetailRow
            icon={<InstagramGlyph className="size-4 text-primary" />}
            label={t("contact.instagramLabel")}
            value={t("contact.instagramHandle")}
            href={BRAND_LINKS.instagram}
            external
          />
        </ul>
      </div>
    </section>
  )
}

interface DetailRowProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}

function DetailRow({ icon, label, value, href, external }: DetailRowProps) {
  return (
    <li className="flex items-center gap-sp-2">
      {icon}
      <span className="type-chip text-muted-foreground">{label}</span>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className="inline-flex min-h-[44px] items-center text-foreground underline decoration-primary/40 decoration-2 underline-offset-[3px] transition-colors duration-fast ease-out hover:text-primary hover:decoration-current"
        >
          {value}
        </a>
      ) : (
        <span className="text-foreground">{value}</span>
      )}
    </li>
  )
}

export default ContactSection
