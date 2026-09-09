import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '@/components/language-provider';
import { SiteHeader } from '@/components/site-header';
import { useLanguage } from '@/components/language-provider';
import { projectCredits } from '@/lib/cooks';
import { App } from './site-app';
import '../app/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SiteHeader />
      <App />
      <SiteFooter />
    </LanguageProvider>
  </StrictMode>,
);

function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <span className="footer-dot" aria-hidden="true" />
        <p>{t.project}</p>
      </div>
      <p>{t.subtitle}</p>
      <dl className="footer-credits" aria-label={t.projectCredits}>
        <div>
          <dt>{t.creditAudioEditing}</dt>
          <dd>{projectCredits.audioEditing}</dd>
        </div>
        <div>
          <dt>{t.creditWebDesign}</dt>
          <dd>{projectCredits.webDesign}</dd>
        </div>
      </dl>
    </footer>
  );
}
