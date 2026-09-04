const mediaBase = (
  import.meta.env.VITE_MEDIA_BASE_URL ||
  import.meta.env.NEXT_PUBLIC_MEDIA_BASE_URL ||
  ''
).replace(/\/$/, '');

export function resolveMediaUrl(value: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const relative = value.replace(/^\//, '');
  return mediaBase ? `${mediaBase}/${relative}` : `/media/${relative}`;
}
