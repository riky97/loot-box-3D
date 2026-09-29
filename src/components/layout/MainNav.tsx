import type { AnchorHTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import { Link, useLocation } from "react-router-dom"

import { SectionLink } from "@/components/layout/SectionLink"
import { ROUTES, SECTION_IDS } from "@/routes/paths"
import { cn } from "@/lib/utils"

type NavLabelKey =
  | "nav.about"
  | "nav.categories"
  | "nav.showcase"
  | "nav.howItWorks"
  | "nav.lab"
  | "nav.contact"

/**
 * A nav entry is either a section of the home page (`id`) or a page of its own
 * (`to`). `key` is unique across both kinds.
 */
type NavItem = { key: string; labelKey: NavLabelKey } & (
  | { kind: "section"; id: string }
  | { kind: "page"; to: string }
)

const NAV_ITEMS: NavItem[] = [
  { key: "about", kind: "section", id: SECTION_IDS.about, labelKey: "nav.about" },
  { key: "categories", kind: "section", id: SECTION_IDS.categories, labelKey: "nav.categories" },
  { key: "showcase", kind: "section", id: SECTION_IDS.showcase, labelKey: "nav.showcase" },
  { key: "how-it-works", kind: "section", id: SECTION_IDS.howItWorks, labelKey: "nav.howItWorks" },
  { key: "lab", kind: "page", to: ROUTES.lab, labelKey: "nav.lab" },
  { key: "contact", kind: "section", id: SECTION_IDS.contact, labelKey: "nav.contact" },
]

/**
 * Whether a nav entry is the current one: a page entry while its page is open,
 * a section entry while its section is the one in view.
 */
export function isNavItemCurrent(
  item: NavItem,
  pathname: string,
  activeSectionId: string | null,
): boolean {
  return item.kind === "page" ? pathname === item.to : activeSectionId === item.id
}

interface NavItemLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  item: NavItem
  isCurrent: boolean
}

/** One nav entry, rendered as a router link for a page or a `SectionLink` for a section. */
export function NavItemLink({ item, isCurrent, ...props }: NavItemLinkProps) {
  if (item.kind === "page") {
    return <Link to={item.to} aria-current={isCurrent ? "page" : undefined} {...props} />
  }
  return <SectionLink sectionId={item.id} aria-current={isCurrent ? "true" : undefined} {...props} />
}

interface MainNavProps {
  activeId: string | null
  className?: string
}

/** Desktop navigation (home sections and pages): mono uppercase links with a growing extrusion underline on hover/active. */
export function MainNav({ activeId, className }: MainNavProps) {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav aria-label={t("nav.menuLabel")} className={cn("flex items-center gap-sp-6", className)}>
      {NAV_ITEMS.map((item) => {
        const isCurrent = isNavItemCurrent(item, pathname, activeId)
        return (
          <NavItemLink
            key={item.key}
            item={item}
            isCurrent={isCurrent}
            className={cn(
              "group relative type-eyebrow flex min-h-[24px] items-center py-sp-2 text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground",
              isCurrent && "text-foreground",
            )}
          >
            {t(item.labelKey)}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-pill bg-primary transition-transform duration-base ease-bounce group-hover:scale-x-100",
                isCurrent && "scale-x-100",
              )}
            />
          </NavItemLink>
        )
      })}
    </nav>
  )
}

export { NAV_ITEMS }
