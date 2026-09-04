import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from '@/components/language-provider';
import { SiteHeader } from '@/components/site-header';
import { useLanguage } from '@/components/language-provider';
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
      <span className="footer-dot" aria-hidden="true" />
      <p>{t.project}</p>
      <p>{t.subtitle}</p>
    </footer>
  );
}
