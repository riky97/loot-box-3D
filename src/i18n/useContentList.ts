import { useTranslation } from "react-i18next"

/**
 * Reads an array of structured content (categories, showcase items, steps, ...)
 * from the active translation bundle. Wraps `t(key, { returnObjects: true })`
 * with a caller-supplied type so section components get a typed array back
 * instead of the generic i18next return type.
 */
export function useContentList<T>(key: string): T[] {
  const { t } = useTranslation()
  return (t as (key: string, options: { returnObjects: true }) => unknown)(key, {
    returnObjects: true,
  }) as T[]
}
