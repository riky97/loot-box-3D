import { Mail, MapPin } from "lucide-react"
import { useId, type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { CutCard } from "@/components/common/CutCard"
import { SectionHeading } from "@/components/common/SectionHeading"
import { BRAND_LINKS } from "@/data/brand"
import { cn } from "@/lib/utils"
import { SECTION_IDS } from "@/routes/paths"
import { InstagramGlyph } from "@/components/common/InstagramGlyph"

const CONTACT_HEADING_ID = "contact-heading"

export function ContactSection() {
  const { t } = useTranslation()
  const gradId = useId().replace(/[:]/g, "")

  return (
    <section
      id={SECTION_IDS.contact}
      aria-labelledby={CONTACT_HEADING_ID}
      className="section-pad relative overflow-hidden bg-background"
    >

      <div className="shell relative grid gap-sp-8 lg:grid-cols-12 lg:gap-sp-10">
        <div className="order-2 flex flex-col gap-sp-6 lg:order-1 lg:col-span-5">
          <SectionHeading
            id={CONTACT_HEADING_ID}
            eyebrow={t("contact.eyebrow")}
            title={t("contact.title")}
          />
          <p className="type-lead max-w-measure-lead text-foreground-dim">{t("contact.subtitle")}</p>
        </div>

        <div className="order-1 flex flex-col gap-sp-8 lg:order-2 lg:col-span-7">
          <a
            href={BRAND_LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group block"
          >
            <CutCard
              className="flex flex-col items-start gap-sp-3 p-sp-6 transition-[box-shadow,transform] duration-base ease-out group-hover:-translate-y-[3px] group-hover:shadow-glow-hot group-focus-visible:-translate-y-[3px] group-focus-visible:shadow-glow-hot"
              frameClassName="w-full"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
                }}
              />
              <div className="relative flex flex-col items-start gap-sp-3">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`contact-instagram-${gradId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--brand-hot-deep))" />
                      <stop offset="55%" stopColor="hsl(var(--brand-hot))" />
                      <stop offset="100%" stopColor="hsl(var(--rarity-legendary))" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="2.5"
                    y="2.5"
                    width="19"
                    height="19"
                    rx="5"
                    stroke={`url(#contact-instagram-${gradId})`}
                    strokeWidth="1.6"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4.6"
                    stroke={`url(#contact-instagram-${gradId})`}
                    strokeWidth="1.6"
                  />
                  <circle cx="17.2" cy="6.8" r="1.1" fill={`url(#contact-instagram-${gradId})`} />
                </svg>

                <p className="type-display text-h2 text-foreground">{t("contact.instagramHandle")}</p>
                <p className="type-meta text-muted-foreground">{t("contact.responseTime")}</p>
              </div>
            </CutCard>
          </a>

          <CutCard className="relative flex flex-col p-sp-6" frameClassName="w-full">
            <div
              aria-hidden="true"
              className="plate-grid pointer-events-none absolute inset-0 opacity-[0.05]"
            />

            <ContactRow
              icon={<Mail className="h-5 w-5 text-accent" aria-hidden="true" />}
              label={t("contact.emailLabel")}
              value={t("contact.emailValue")}
              href={`mailto:${t("contact.emailValue")}`}
            />
            <ContactRow
              icon={<MapPin className="h-5 w-5 text-accent" aria-hidden="true" />}
              label={t("contact.locationLabel")}
              value={t("contact.locationValue")}
            />
            <ContactRow
              icon={<InstagramGlyph className="h-5 w-5 text-accent" />}
              label={t("contact.instagramLabel")}
              value={t("contact.instagramHandle")}
              href={BRAND_LINKS.instagram}
              external
              last
            />
          </CutCard>
        </div>
      </div>
    </section>
  )
}

interface ContactRowProps {
  icon: ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
  last?: boolean
}

function ContactRow({ icon, label, value, href, external, last }: ContactRowProps) {
  return (
    <div className={cn("relative flex items-start gap-sp-3 py-sp-4", !last && "border-b border-border")}>
      <span className="mt-[2px]">{icon}</span>
      <div className="flex flex-col gap-sp-1">
        <p className="type-chip text-muted-foreground">{label}</p>
        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="text-lead text-foreground transition-colors duration-fast ease-out hover:text-accent"
          >
            {value}
          </a>
        ) : (
          <p className="text-lead text-foreground">{value}</p>
        )}
      </div>
    </div>
  )
}


export default ContactSection
