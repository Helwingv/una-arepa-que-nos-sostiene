'use client';

import { useState } from 'react';
import { FileText } from 'lucide-react';
import type { AudioTrack } from '@/lib/cooks';
import { resolveMediaUrl } from '@/lib/media';
import { hasTranscript } from '@/lib/transcript-manifest';
import { useLanguage } from './language-provider';
import { TranscriptModal } from './transcript-modal';

export function AudioPlayer({ track, slug, name }: { track: AudioTrack; slug: string; name: string }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
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
      {hasTranscript(slug, track.kind) && (
        <button type="button" className="transcript-trigger" onClick={() => setTranscriptOpen(true)}>
          <FileText aria-hidden="true" />
          <span>{t.transcript}</span>
          <span className="sr-only">: {label}, {name}</span>
        </button>
      )}
      {transcriptOpen && (
        <TranscriptModal
          slug={slug}
          kind={track.kind}
          label={label}
          name={name}
          onClose={() => setTranscriptOpen(false)}
        />
      )}
    </div>
  );
}
