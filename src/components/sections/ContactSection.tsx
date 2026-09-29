import { Mail, MapPin, Store } from "lucide-react"
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
 * itself, with email as a secondary button. The details (email, Stimalo,
 * location, Instagram) collapse into a compact strip beneath rather than
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

          <div className="mt-sp-6 flex flex-col items-center gap-sp-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="btn-pop w-full sm:w-auto">
              <a href={BRAND_LINKS.instagram} target="_blank" rel="noreferrer noopener">
                <InstagramGlyph className="size-4" />
                {t("contact.instagramCta")}
              </a>
            </Button>
            {/* Secondary: Instagram stays the channel the panel is built
                around, the email is the alternative for people not on it. */}
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

        <ul className="flex list-none flex-col items-center gap-sp-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-sp-6">
          <DetailRow
            icon={<Mail className="size-4 text-primary" aria-hidden="true" />}
            label={t("contact.emailLabel")}
            value={BRAND_LINKS.email}
            href={`mailto:${BRAND_LINKS.email}`}
          />
          <DetailRow
            icon={<Store className="size-4 text-primary" aria-hidden="true" />}
            label={t("contact.stimaloLabel")}
            value={t("contact.stimaloValue")}
            href={BRAND_LINKS.stimalo}
            external
          />
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
