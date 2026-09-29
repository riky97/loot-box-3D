import type { AnchorHTMLAttributes } from "react"
import { Link, useLocation } from "react-router-dom"

import { ROUTES } from "@/routes/paths"

interface SectionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Id of a home-page section, from `SECTION_IDS`. */
  sectionId: string
}

/**
 * A link to a section of the home page that works from any route.
 *
 * On the home page it is a plain `#id` anchor, so the browser's own smooth
 * scroll and `scroll-margin-top` apply exactly as before. Anywhere else a bare
 * `#id` would point at nothing, so it becomes a router link to `/#id`, and
 * `ScrollManager` in `RootLayout` scrolls to the section once the home page
 * has rendered.
 */
export function SectionLink({ sectionId, ...props }: SectionLinkProps) {
  const { pathname } = useLocation()

  if (pathname === ROUTES.home) {
    return <a href={`#${sectionId}`} {...props} />
  }

  return <Link to={{ pathname: ROUTES.home, hash: `#${sectionId}` }} {...props} />
}

export default SectionLink
