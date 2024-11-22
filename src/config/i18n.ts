import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from '../locales/en.json'
import esTranslation from '../locales/es.json'
import caTranslation from '../locales/ca.json'
import frTranslation from '../locales/fr.json'
import itTranslation from '../locales/it.json'

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  ca: { translation: caTranslation },
  fr: { translation: frTranslation },
  it: { translation: itTranslation },
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)

  .init({
    resources,
    supportedLngs: ['en', 'es', 'ca', 'fr', 'it'],
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: false,
    },
  })

export default i18n
