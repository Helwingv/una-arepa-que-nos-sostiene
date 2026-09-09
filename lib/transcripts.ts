import type { AudioTrack, Language } from './cooks';

export type TranscriptSegment = {
  time: string | null;
  text: string;
};

export type Transcript = Partial<Record<Language, TranscriptSegment[]>>;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
const cache = new Map<string, Promise<Transcript>>();

// Transcripts stay out of the bundle: a profile only fetches one when its modal opens.
export function loadTranscript(slug: string, kind: AudioTrack['kind']): Promise<Transcript> {
  const key = `${slug}.${kind}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const pending = fetch(`${basePath}/transcripts/${key}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`transcript ${key}: ${response.status}`);
      return response.json() as Promise<Transcript>;
    })
    .catch((error: unknown) => {
      cache.delete(key);
      throw error;
    });

  cache.set(key, pending);
  return pending;
}
