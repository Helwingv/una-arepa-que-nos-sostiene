'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { AudioTrack } from '@/lib/cooks';
import { loadTranscript, type Transcript } from '@/lib/transcripts';
import { useLanguage } from './language-provider';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; transcript: Transcript };

export function TranscriptModal({
  slug,
  kind,
  label,
  name,
  onClose,
}: {
  slug: string;
  kind: AudioTrack['kind'];
  label: string;
  name: string;
  onClose: () => void;
}) {
  const { language, t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();

    // Clicks that land on the dialog box itself fall outside the panel: that is the backdrop.
    const dismissOnBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener('click', dismissOnBackdrop);

    // iOS Safari still scrolls the page behind a modal dialog.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.removeEventListener('click', dismissOnBackdrop);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    let active = true;
    loadTranscript(slug, kind).then(
      (transcript) => active && setState({ status: 'ready', transcript }),
      () => active && setState({ status: 'error' }),
    );
    return () => {
      active = false;
    };
  }, [slug, kind]);

  const segments = state.status === 'ready'
    ? state.transcript[language] ?? state.transcript.es
    : undefined;
  const translated = state.status === 'ready' && Boolean(state.transcript[language]);
  const note = language === 'es'
    ? t.transcriptOriginal
    : translated
      ? t.transcriptTranslated
      : t.transcriptOnlySpanish;

  return (
    <dialog
      ref={dialogRef}
      className="transcript-dialog"
      aria-labelledby="transcript-title"
      onClose={onClose}
    >
      <div className="transcript-panel">
        <header className="transcript-header">
          <div>
            <p className="eyebrow">{t.transcript}</p>
            <h2 id="transcript-title">{label}</h2>
            <p className="transcript-source">{name}</p>
          </div>
          <button
            type="button"
            className="transcript-close"
            onClick={() => dialogRef.current?.close()}
            aria-label={t.transcriptClose}
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="transcript-body">
          {state.status === 'loading' && <p className="transcript-status">{t.transcriptLoading}</p>}
          {state.status === 'error' && <p className="transcript-status">{t.transcriptError}</p>}
          {segments && (
            <>
              <p className="transcript-note" lang={translated || language === 'es' ? undefined : 'es'}>{note}</p>
              <div className="transcript-text" lang={translated ? language : 'es'}>
                {segments.map((segment, index) => (
                  <p key={segment.time ?? index}>
                    {segment.time && <span className="transcript-time" aria-hidden="true">{segment.time}</span>}
                    {segment.text}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
}
