import { useTranslation } from "react-i18next"

import { AboutSection } from "@/components/sections/AboutSection"
import { CategoriesSection } from "@/components/sections/CategoriesSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ShowcaseSection } from "@/components/sections/ShowcaseSection"
import { useDocumentMeta } from "@/hooks/useDocumentMeta"

export function HomePage() {
  const { t } = useTranslation()

  useDocumentMeta({
    title: t("meta.pageTitle"),
    description: t("meta.description"),
  })

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <ShowcaseSection />
      <HowItWorksSection />
      <ContactSection />
    </>
  )
}

export default HomePage
