import { useTranslation } from "react-i18next"

import { SECTION_IDS } from "@/routes/paths"
import { cn } from "@/lib/utils"

type NavLabelKey =
  | "nav.about"
  | "nav.categories"
  | "nav.showcase"
  | "nav.howItWorks"
  | "nav.contact"

interface NavItem {
  id: string
  labelKey: NavLabelKey
}

const NAV_ITEMS: NavItem[] = [
  { id: SECTION_IDS.about, labelKey: "nav.about" },
  { id: SECTION_IDS.categories, labelKey: "nav.categories" },
  { id: SECTION_IDS.showcase, labelKey: "nav.showcase" },
  { id: SECTION_IDS.howItWorks, labelKey: "nav.howItWorks" },
  { id: SECTION_IDS.contact, labelKey: "nav.contact" },
]

interface MainNavProps {
  activeId: string | null
  className?: string
}

/** Desktop in-page navigation: mono uppercase links with a growing extrusion underline on hover/active. */
export function MainNav({ activeId, className }: MainNavProps) {
  const { t } = useTranslation()

  return (
    <nav aria-label={t("nav.menuLabel")} className={cn("flex items-center gap-sp-6", className)}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "group relative type-eyebrow flex min-h-[24px] items-center py-sp-2 text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground",
              isActive && "text-foreground",
            )}
          >
            {t(item.labelKey)}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-pill bg-primary transition-transform duration-base ease-bounce group-hover:scale-x-100",
                isActive && "scale-x-100",
              )}
            />
          </a>
        )
      })}
    </nav>
  )
}

export { NAV_ITEMS }
