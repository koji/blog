import { ui } from './ui';

// ---------------------------------------------------------------------------
// Language config
// ---------------------------------------------------------------------------

export const defaultLang = 'en' as const;

export const languages = {
  en: 'English',
  ja: '日本語',
} as const;

export type Lang = keyof typeof languages;

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

/**
 * Extract language from URL pathname.
 * `/ja/...` => 'ja', otherwise defaultLang ('en').
 */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'ja') return 'ja';
  return defaultLang;
}

/**
 * Build a localized path.
 * - For `defaultLang` (en) returns the path without `/ja` prefix.
 * - For `ja` prefixes with `/ja`.
 * Handles trailing slash, root (`/`), and avoids double prefix.
 *
 * @example getLocalizedPath('/about/', 'ja') => '/ja/about/'
 * @example getLocalizedPath('/ja/about/', 'en') => '/about/'
 * @example getLocalizedPath('/', 'ja') => '/ja/'
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  if (!path.startsWith('/')) path = '/' + path;

  // Normalize to base (strip existing /ja prefix if present)
  let basePath: string;
  if (path === '/ja' || path === '/ja/') {
    basePath = '/';
  } else if (path.startsWith('/ja/')) {
    basePath = path.slice(3) || '/';
    if (!basePath.startsWith('/')) basePath = '/' + basePath;
  } else {
    basePath = path;
  }

  if (lang === defaultLang) {
    return basePath;
  }

  // lang === 'ja'
  if (basePath === '/') return '/ja/';
  return `/ja${basePath}`;
}

// ---------------------------------------------------------------------------
// Translation helper
// ---------------------------------------------------------------------------

type UiKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Returns a `t` function scoped to the given language.
 * Falls back to `defaultLang` if the key is missing in the requested language.
 * Supports simple `{placeholder}` interpolation via the second argument.
 *
 * @example
 * const t = useTranslations('ja');
 * t('nav.tags') // => 'タグ'
 * t('page.tag.title', { tag: 'React' }) // => 'タグ「React」の投稿一覧'
 */
export function useTranslations(lang: Lang) {
  return function t(
    key: UiKey,
    replacements?: Record<string, string | number>
  ): string {
    const langDict = ui[lang] as Record<string, string> | undefined;
    const defaultDict = ui[defaultLang] as Record<string, string>;
    let text: string = (langDict && langDict[key]) ?? defaultDict[key] ?? String(key);

    if (replacements) {
      for (const [k, v] of Object.entries(replacements)) {
        text = text.replaceAll(`{${k}}`, String(v));
      }
    }
    return text;
  };
}

// ---------------------------------------------------------------------------
// Content-collection helpers (file id / slug)
// ---------------------------------------------------------------------------

/**
 * Derive language from a content collection `id`.
 * Convention: `my-post.ja` or `my-post.ja.md` => 'ja', otherwise 'en'.
 * Checks the id without extension.
 */
export function getLangFromId(id: string): Lang {
  if (!id) return defaultLang;
  if (id.endsWith('.ja')) return 'ja';
  if (id.endsWith('.ja.md') || id.endsWith('.ja.mdx')) return 'ja';
  const withoutExt = id.replace(/\.[^.]+$/, (m) => (m === '.ja' ? '.ja' : ''));
  if (withoutExt.endsWith('.ja')) return 'ja';
  return defaultLang;
}

export function getLangFromEntry(entry: any): Lang {
  if (getLangFromId(entry.id) === 'ja') return 'ja';
  const slug = (entry as any).slug ?? (entry as any).data?.slug ?? '';
  if (typeof slug === 'string' && slug.endsWith('.ja')) return 'ja';
  return defaultLang;
}

/**
 * Strip the `.ja` suffix from an id to get the base id.
 * `hello.ja` => `hello`, `hello` => `hello`
 */
export function getBaseId(id: string): string {
  return id.replace(/\.ja(\.mdx?)?$/, (match) => {
    // if it was .ja.md or .ja.mdx, keep the extension
    if (match.includes('.md')) return match.slice(3); // '.ja.md' -> '.md'
    return '';
  }).replace(/\.ja$/, '');
}

/**
 * Get the base slug without language suffix.
 * Handles `slug` ending with `.ja` and/or `/index`.
 */
export function getBaseSlug(entry: any): string {
  let slug: string = (entry as any).slug ?? (entry as any).data?.slug ?? entry.id ?? '';

  // Strip trailing .ja suffix if present
  if (slug.endsWith('.ja')) {
    slug = slug.slice(0, -3);
  }

  // Strip /index suffix (Astro file-based routing: `foo/index` => `foo`)
  if (slug.endsWith('/index')) {
    slug = slug.slice(0, -6);
  }
  if (slug === 'index') {
    slug = '';
  }

  return slug;
}

/**
 * Strip `/index` suffix from a slug and handle `.ja` suffix.
 * Useful for generating URL segments from collection slugs.
 */
export function getSlugWithoutIndex(slug: string): string {
  let s = slug;
  if (s.endsWith('.ja')) s = s.slice(0, -3);
  if (s.endsWith('/index')) s = s.slice(0, -6);
  if (s === 'index') s = '';
  return s;
}

/**
 * Get the URL slug for a given entry and target language.
 * This is the localized slug suitable for building `href`.
 * For default lang it returns the base slug, for `ja` it could be used
 * with `getLocalizedPath` to prefix.
 */
export function getLocalizedSlug(entry: any, _lang: Lang): string {
  return getBaseSlug(entry as any);
}

/**
 * Build a full localized URL from a collection entry.
 * @example getUrlFromEntry({ id: 'hello.ja', slug: 'hello.ja' }, 'ja') => '/ja/hello/'
 */
export function getUrlFromEntry(entry: any, lang: Lang): string {
  const baseSlug = getBaseSlug(entry as any);
  const path = baseSlug ? `/${baseSlug}/` : '/';
  return getLocalizedPath(path, lang);
}

/**
 * Filter an array of content collection entries by language.
 */
export function filterByLang<T extends { id: string }>(entries: T[], lang: Lang): T[] {
  return entries.filter((entry) => getLangFromEntry(entry as any) === lang);
}

/**
 * Group entries by base id, returning only entries for the requested language
 * where possible, otherwise falling back to default language.
 * Useful for language switcher logic.
 */
export function getEntriesByLang<T extends { id: string }>(
  entries: T[],
  lang: Lang
): Map<string, T> {
  const map = new Map<string, T>();
  for (const entry of entries) {
    const baseId = getBaseId(entry.id);
    const entryLang = getLangFromId(entry.id);
    // Prefer requested lang; only set if not already set or if this entry matches lang
    if (!map.has(baseId) || entryLang === lang) {
      if (entryLang === lang || !map.has(baseId)) {
        map.set(baseId, entry);
      }
    }
  }
  // If strict filter is desired, return only lang matches:
  // but this helper keeps fallback behavior; use filterByLang for strict.
  return map;
}
