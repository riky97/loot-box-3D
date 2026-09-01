import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/routes/paths"

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-background px-4 text-center text-foreground">
      <h1 className="text-3xl font-bold">{t("notFound.title")}</h1>
      <p className="max-w-md text-muted-foreground">{t("notFound.description")}</p>
      <Button asChild>
        <Link to={ROUTES.home}>{t("notFound.backHome")}</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
