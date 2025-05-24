// i18n.js
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import eng from './translations/eng.json';
import fre from './translations/fre.json';

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language, fallback to another language with the key present.
i18n.fallbacks = true;

// Ensure that if the current locale doesn't exist in your translations, default to 'en'.
i18n.defaultLocale = 'eng';

// Map the locales to your translation files.
i18n.translations = {
  eng: eng,
  fre: fre,
};

/**
 * Gets the translated string for the current locale.
 *
 * @param {string} key The key of the string to translate (e.g., 'screens.index.title').
 * @param {object} options Optional parameters to pass to the translation function.
 * @returns {string} The translated string, or the key if no translation is found.
 */
export function translate(key, options) {
  return i18n.t(key, options);
}

/**
 * Changes the current locale of the application.
 *
 * @param {string} locale The new locale to set (e.g., 'en', 'fr').
 */
export function changeLocale(locale) {
  i18n.locale = locale;
}

/**
 * Gets the current locale of the application.
 *
 * @returns {string} The current locale.
 */
export function currentLocale() {
  return i18n.locale;
}

export default i18n;