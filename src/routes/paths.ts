// Single source of truth for route paths — import `ROUTES` instead of
// hard-coding path strings anywhere in the app.
export const ROUTES = {
  home: "/",
  category: "/categorie/:categoryId",
  piece: "/galleria/:pieceId",
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]

/** The concrete path of one category page, e.g. `/categorie/gadget`. */
export function categoryPath(categoryId: string): string {
  return ROUTES.category.replace(":categoryId", categoryId)
}

/** The concrete path of one gallery piece, e.g. `/galleria/cat-glasses-stand`. */
export function piecePath(pieceId: string): string {
  return ROUTES.piece.replace(":pieceId", pieceId)
}

// In-page anchor ids for the landing page sections, addressed by the
// header/footer nav and by each section's own `id` attribute.
export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  categories: "categories",
  showcase: "showcase",
  howItWorks: "how-it-works",
  contact: "contact",
} as const

export type SectionKey = keyof typeof SECTION_IDS
export type SectionId = (typeof SECTION_IDS)[SectionKey]
