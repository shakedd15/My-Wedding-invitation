import { useMemo, useState, useCallback, useEffect } from "react";
import { DEFAULT_LANGUAGE, getCopy } from "../constants/translations.js";

/**
 * Single source of truth for the active language.
 *
 * Returns the resolved copy dictionary plus a setter, and keeps the
 * <html lang/dir> attributes in sync so RTL/LTR is handled centrally.
 * Swap `useState` for context/router later if multi-page i18n is needed.
 *
 * @param {string} [initial] - starting language code (defaults to 'he').
 */
export function useLanguage(initial = DEFAULT_LANGUAGE) {
  const [lang, setLang] = useState(initial);

  const copy = useMemo(() => getCopy(lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = copy.meta.htmlLang;
    document.documentElement.dir = copy.meta.dir;
  }, [copy]);

  const changeLanguage = useCallback((next) => setLang(next), []);

  return { lang, copy, changeLanguage };
}
