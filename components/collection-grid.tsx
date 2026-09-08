'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { cooks } from '@/lib/cooks';
import { useLanguage } from './language-provider';
import { Portrait } from './portrait';

const siteBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function CollectionGrid() {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language);
    if (!normalized) return cooks;
    return cooks.filter((profile) =>
      [profile.name, profile.location, profile.region[language], profile.dish[language]]
        .join(' ')
        .toLocaleLowerCase(language)
        .includes(normalized),
    );
  }, [language, query]);

  return (
    <section className="collection-section" id="coleccion">
      <div className="section-heading">
        <div>
          <p className="eyebrow">26 · Venezuela</p>
          <h2>{t.collection}</h2>
          <p>{t.collectionIntro}</p>
        </div>
        <label className="search-field">
          <span className="sr-only">{t.searchLabel}</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
          />
        </label>
      </div>

      {visible.length ? (
        <div className="cook-grid">
          {visible.map((profile, index) => (
            <article className="cook-card" key={profile.slug}>
              <a href={`${siteBasePath}/${profile.slug}/`} className="portrait-frame" aria-label={`${t.viewProfile}: ${profile.name}`}>
                <Portrait src={profile.media.imageUrl} alt={profile.name} priority={index < 4} />
                <span className="card-number" aria-hidden="true">{String(cooks.indexOf(profile) + 1).padStart(2, '0')}</span>
              </a>
              <div className="card-copy">
                <p className="card-location">{profile.location}</p>
                <h3><a href={`${siteBasePath}/${profile.slug}/`}>{profile.name}</a></h3>
                <p className="card-dish">{profile.dish[language]}</p>
                <a href={`${siteBasePath}/${profile.slug}/`} className="card-link">
                  {t.viewProfile}<ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <output className="empty-state">{t.noResults}</output>
      )}
    </section>
  );
}
