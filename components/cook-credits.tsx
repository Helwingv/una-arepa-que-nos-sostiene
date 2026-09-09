'use client';

import type { CookCredits } from '@/lib/cooks';
import { useLanguage } from './language-provider';

export function CookCreditsSection({ credits }: { credits: CookCredits }) {
  const { t } = useLanguage();
  const sharedInterviewAndAudio = credits.interview === credits.audio;

  const entries: { label: string; people: string }[] = [
    { label: t.creditPhotography, people: credits.photography },
    ...(credits.interview && sharedInterviewAndAudio
      ? [{ label: t.creditInterviewAudio, people: credits.audio }]
      : [
        ...(credits.interview ? [{ label: t.creditInterview, people: credits.interview }] : []),
        { label: t.creditAudio, people: credits.audio },
      ]),
    ...(credits.translation ? [{ label: t.creditTranslation, people: credits.translation }] : []),
  ];

  return (
    <section className="credits-section">
      <div className="credits-heading">
        <p className="eyebrow">{t.credits}</p>
        <p className="credits-intro">{t.creditsIntro}</p>
      </div>
      <dl className="credits-list">
        {entries.map((entry) => (
          <div key={entry.label}>
            <dt>{entry.label}</dt>
            <dd>{entry.people}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
