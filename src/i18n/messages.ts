import availableLocales from './available-locales';

export const AVAILABLE_LOCALES = availableLocales;
export type AppLocale = (typeof AVAILABLE_LOCALES)[number];

export async function loadLocaleData(locale: AppLocale) {
  try {
    return await import(`./compiled/${locale}.json`);
  } catch (error) {
    return await import(`./compiled/en.json`);
  }
}
