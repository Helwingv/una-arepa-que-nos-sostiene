'use client';

import { useLanguage } from './language-provider';

const siteBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <a href={`${siteBasePath}/`} className="wordmark" aria-label={t.project}>
        <span className="wordmark-mark" aria-hidden="true"><span /></span>
        <span>{t.project}</span>
      </a>
      <fieldset className="language-switcher">
        <legend className="sr-only">{t.language}</legend>
        <button
          type="button"
          aria-pressed={language === 'es'}
          onClick={() => setLanguage('es')}
        >
          ES
        </button>
        <span aria-hidden="true">/</span>
        <button
          type="button"
          aria-pressed={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
      </fieldset>
    </header>
  );
}
