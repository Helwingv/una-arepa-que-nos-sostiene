'use client';

import { useState } from 'react';
import { resolveMediaUrl } from '@/lib/media';
import { useLanguage } from './language-provider';

export function Portrait({ src, alt, priority = false }: { src: string | null; alt: string; priority?: boolean }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  const resolved = resolveMediaUrl(src);

  if (!resolved || failed) {
    return (
      <div className="portrait-placeholder" role="img" aria-label={`${t.imageUnavailable}: ${alt}`}>
        <span className="portrait-placeholder-mark" aria-hidden="true" />
        <span>{t.imageUnavailable}</span>
      </div>
    );
  }

  return (
    <img
      className="portrait-image"
      src={resolved}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
