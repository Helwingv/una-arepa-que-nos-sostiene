import { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { CollectionGrid } from '@/components/collection-grid';
import { CookProfileView } from '@/components/cook-profile-view';
import { useLanguage } from '@/components/language-provider';
import { cooks, cooksBySlug, findCookBySlug } from '@/lib/cooks';

function updateMeta(title: string, description: string, canonicalPath: string) {
  document.title = title;
  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (descriptionMeta) descriptionMeta.content = description;
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = new URL(canonicalPath, window.location.origin).toString();
}

export function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const match = path.match(/^\/cocineras\/([^/]+)$/);
  const profile = match ? findCookBySlug(decodeURIComponent(match[1])) : undefined;

  if (match && profile) return <ProfileRoute slug={profile.slug} />;
  if (match) return <NotFound />;
  return <Home />;
}

function Home() {
  const { language, t } = useLanguage();
  useEffect(() => {
    updateMeta(
      t.project,
      language === 'es'
        ? 'Cocineras populares, territorio e identidad. Un archivo sonoro de 26 cocineras venezolanas.'
        : 'Traditional cooks, territory, and identity. A sound archive of 26 Venezuelan cooks.',
      '/',
    );
  }, [language, t.project]);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="hero-kicker">Venezuela · {language === 'es' ? '26 cocineras' : '26 cooks'}</p>
          <h1 aria-label={t.project}>
            <span>{t.project.split(' ').slice(0, 2).join(' ')}</span>
            <span>{t.project.split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="hero-subtitle">{t.subtitle}</p>
          <a href="#coleccion" className="hero-link">{t.collection}<ArrowDown aria-hidden="true" /></a>
        </div>
        <div className="hero-symbol" aria-hidden="true">
          <span className="hero-quarter" />
          <span className="hero-line" />
          <span className="hero-dot" />
        </div>
      </section>
      <CollectionGrid />
    </main>
  );
}

function ProfileRoute({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const profile = cooksBySlug[slug];
  const index = cooks.findIndex((item) => item.slug === slug);
  const previous = cooks[(index - 1 + cooks.length) % cooks.length];
  const next = cooks[(index + 1) % cooks.length];

  useEffect(() => {
    updateMeta(
      `${profile.name} · Una arepa que nos sostiene`,
      `${profile.name}, ${profile.location}. ${profile.dish[language]}.`,
      `/cocineras/${profile.slug}/`,
    );
  }, [language, profile]);

  return <CookProfileView profile={profile} previous={previous} next={next} />;
}

function NotFound() {
  const { language } = useLanguage();
  useEffect(() => updateMeta('404 · Una arepa que nos sostiene', language === 'es' ? 'Perfil no encontrado.' : 'Profile not found.', window.location.pathname), [language]);
  return (
    <main className="not-found">
      <p className="eyebrow">404</p>
      <h1>{language === 'es' ? 'Esta historia no está aquí.' : 'This story is not here.'}</h1>
      <a href="/">Volver a la colección / Back to the collection</a>
    </main>
  );
}
