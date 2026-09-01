import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import itMessages from "@/i18n/locales/it.json"

// New locales are registered by adding a JSON file next to `it.json`
// (e.g. `src/i18n/locales/en.json`) and one matching entry in the
// `resources` map below — no other code needs to change.
void i18n.use(initReactI18next).init({
  resources: {
    it: { translation: itMessages },
  },
  lng: "it",
  fallbackLng: "it",
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
})

export default i18n
