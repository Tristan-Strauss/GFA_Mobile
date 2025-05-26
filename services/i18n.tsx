import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

// Import translation files
import en from '../locales/en/translation.json';
import fr from '../locales/fr/translation.json';
import sw from "../locales/sw/translation.json";
import pt from "../locales/pt/translation.json";
import ar from "../locales/ar/translation.json";
import ny from "../locales/ny/translation.json";
import zu from "../locales/zu/translation.json";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  sw: {
    translation: sw,
  },
  pt: {
    translation: pt,
  },
  ar: {
    translation: ar,
  },
  ny: {
    translation: ny,
  },
  zu: {
    translation: zu,
  }
};

const LANGUAGE_KEY = 'user-language';

const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  init: () => {},
  detect: async (callback: (lng: string) => void) => {
    try {
      // 1. Try to get language from AsyncStorage
      const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (storedLanguage) {
        return callback(storedLanguage);
      }

      // 2. Fallback to Expo's device localization
      const deviceLanguage = Localization.locale.split('-')[0]; // e.g., 'en-US' -> 'en'
      if (deviceLanguage) {
        return callback(deviceLanguage);
      }

      // 3. Default to English if nothing is found
      return callback('en');
    } catch (error) {
      console.error('Error detecting language:', error);
      return callback('en'); // Default to English on error
    }
  },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Error caching user language:', error);
    }
  },
};

i18n
  .use(languageDetector) // Use our custom language detector
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // default language if detection fails or language not found
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    compatibilityJSON: 'v4', // Required for some older Android devices and compatibility
    debug: false, // Set to true for debugging translations during development
  });

export default i18n;