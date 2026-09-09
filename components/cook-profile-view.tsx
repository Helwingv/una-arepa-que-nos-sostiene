'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CookProfile } from '@/lib/cooks';
import { useLanguage } from './language-provider';
import { Portrait } from './portrait';
import { AudioPlayer } from './audio-player';

const siteBasePath = import.meta.env.BASE_URL.replace(/\/$/, '');

export function CookProfileView({ profile, previous, next }: { profile: CookProfile; previous: CookProfile; next: CookProfile }) {
  const { language, t } = useLanguage();

  return (
    <main>
      <article className="profile-page">
        <a href={`${siteBasePath}/#coleccion`} className="back-link"><ArrowLeft aria-hidden="true" />{t.back}</a>
        <div className="profile-hero">
          <div className="profile-portrait portrait-frame">
            <Portrait src={profile.media.imageUrl} alt={profile.name} priority />
          </div>
          <div className="profile-intro">
            <p className="eyebrow">{profile.region[language]}</p>
            <h1>{profile.name}</h1>
            <p className="profile-location">{t.from} {profile.location}</p>
            <p className="profile-bio">{profile.bio[language]}</p>
          </div>
        </div>

        <section className="recipe-panel">
          <p className="eyebrow">{t.recipe}</p>
          <h2>{profile.dish[language]}</h2>
          <span className="recipe-mark" aria-hidden="true" />
        </section>

        <section className="listening-section">
          <div className="listening-heading">
            <p className="eyebrow">{t.listen}</p>
            <h2>{t.audioIntro}</h2>
          </div>
          {profile.media.audio.length ? (
            <div className="audio-grid">
              {profile.media.audio.map((track) => <AudioPlayer key={track.kind} track={track} slug={profile.slug} name={profile.name} />)}
            </div>
          ) : (
            <p className="empty-state">{t.audioUnavailable}</p>
          )}
        </section>

        <nav className="profile-nav" aria-label={`${t.previous} / ${t.next}`}>
          <a href={`${siteBasePath}/${previous.slug}/`}>
            <ArrowLeft aria-hidden="true" /><span><small>{t.previous}</small>{previous.name}</span>
          </a>
          <a href={`${siteBasePath}/${next.slug}/`}>
            <span><small>{t.next}</small>{next.name}</span><ArrowRight aria-hidden="true" />
          </a>
        </nav>
      </article>
    </main>
  );
}
