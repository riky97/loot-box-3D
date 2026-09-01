import type it from "@/i18n/locales/it.json"

// Module augmentation so `t("...")` keys and `useContentList` return types
// are checked against the shape of `it.json` (our only locale for now).
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation"
    resources: {
      translation: typeof it
    }
  }
}
