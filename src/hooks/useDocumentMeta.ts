import { useEffect } from "react"

interface DocumentMeta {
  title: string
  description: string
}

/** Sets `document.title` and the `<meta name="description">` tag for the current page. */
export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement("meta")
      meta.name = "description"
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
