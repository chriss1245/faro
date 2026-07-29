// Locale plumbing. English lives at the site root and Spanish under /es/.
//
// Why English is the default: the site was indexed in English and Search
// Console is already tracking those URLs (see SEO.md). Re-rooting to Spanish
// would change every indexed path and cost rankings for a while. Spanish is
// added alongside, with hreflang telling Google they are the same pages.

export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

/** BCP-47 tags for <html lang>, hreflang and og:locale. */
export const localeTags: Record<Lang, string> = {
  en: "en",
  es: "es-ES",
};

export const ogLocales: Record<Lang, string> = {
  en: "en_US",
  es: "es_ES",
};

/** The locale a pathname belongs to. `/es`, `/es/cv/` → es; anything else → en. */
export function langFromPath(pathname: string): Lang {
  const [, first] = pathname.split("/");
  return first in languages ? (first as Lang) : defaultLang;
}

/**
 * Strip the locale prefix, yielding the shared route key ("/", "/cv/", …).
 * This is what makes a page's counterpart in the other locale computable.
 */
export function routeKey(pathname: string): string {
  const stripped = pathname.replace(/^\/(es)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Build a path in `lang` for a route key. The default locale is unprefixed,
 * so this is the single place that knows about `prefixDefaultLocale: false`.
 */
export function localizePath(route: string, lang: Lang): string {
  const clean = route.startsWith("/") ? route : `/${route}`;
  if (lang === defaultLang) return clean;
  return clean === "/" ? "/es/" : `/es${clean}`;
}

/** Same page, other locale — used by the language switcher and hreflang. */
export function translatePath(pathname: string, lang: Lang): string {
  return localizePath(routeKey(pathname), lang);
}

export const otherLangs = (lang: Lang): Lang[] =>
  (Object.keys(languages) as Lang[]).filter((l) => l !== lang);

/** og:locale:alternate values — every locale except the current one. */
export const ogAlternates = (lang: Lang): string[] =>
  otherLangs(lang).map((l) => ogLocales[l]);
