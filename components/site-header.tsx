'use client';

import { Download } from 'lucide-react';
import { useLanguage } from './language-provider';

const siteBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

const organizationUrl = 'https://historiadelaarepa.com/';

/** Public PDF of the book. Empty disables the menu item. */
const bookPdfUrl = 'https://www.historiadelaarepa.com/downloads/una-arepa-que-nos-sostiene.pdf';

export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <a href={`${siteBasePath}/`} className="wordmark" aria-label={t.project}>
        <span className="wordmark-mark" aria-hidden="true"><span /></span>
        <span>{t.project}</span>
      </a>
      <nav className="site-nav" aria-label={t.navigation}>
        <a href={organizationUrl}>{t.organization}</a>
        {bookPdfUrl
          ? (
            <a href={bookPdfUrl} download>
              <Download aria-hidden="true" />
              {t.downloadBook}
            </a>
          )
          : (
            <span aria-disabled="true" title={t.downloadBookSoon}>
              <Download aria-hidden="true" />
              {t.downloadBook}
            </span>
          )}
      </nav>
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
