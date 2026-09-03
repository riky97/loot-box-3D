import { useTranslation } from "react-i18next"

import { Confetti } from "@/components/common/Confetti"
import { AboutSection } from "@/components/sections/AboutSection"
import { CategoriesSection } from "@/components/sections/CategoriesSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ShowcaseSection } from "@/components/sections/ShowcaseSection"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"
import { useKonamiCode } from "@/hooks/useKonamiCode"
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight"

export function HomePage() {
  const { t } = useTranslation()

  useDocumentMeta({
    title: t("meta.pageTitle"),
    description: t("meta.description"),
  })

  // One pointer listener serves every [data-spotlight] tile on the page.
  usePointerSpotlight()
  const isCelebrating = useKonamiCode()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <ShowcaseSection />
      <HowItWorksSection />
      <ContactSection />
      {isCelebrating ? <Confetti /> : null}
    </>
  )
}

export default HomePage
