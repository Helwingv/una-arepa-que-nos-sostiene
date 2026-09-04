'use client';

import { useState } from 'react';
import type { AudioTrack } from '@/lib/cooks';
import { resolveMediaUrl } from '@/lib/media';
import { useLanguage } from './language-provider';

export function AudioPlayer({ track, name }: { track: AudioTrack; name: string }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const src = resolveMediaUrl(track.url);
  const label = track.kind === 'biography' ? t.biographyAudio : t.recipeAudio;

  return (
    <div className="audio-card">
      <div className="audio-heading">
        <div>
          <p className="audio-label">{label}</p>
          <p className="audio-language">{t.spokenLanguage}</p>
        </div>
        <span className="audio-dot" aria-hidden="true" />
      </div>
      {failed || !src ? (
        <output className="media-error">{t.mediaError}</output>
      ) : (
        <audio
          controls
          preload="metadata"
          src={src}
          onError={() => setFailed(true)}
          aria-label={`${label}: ${name}. ${t.spokenLanguage}`}
        >
          {t.audioUnavailable}
        </audio>
      )}
    </div>
  );
}
