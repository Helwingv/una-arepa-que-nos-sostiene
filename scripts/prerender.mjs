import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cooks, slugAliases } from '../lib/cooks.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const origin = (process.env.SITE_ORIGIN || 'https://historiadelaarepa.com').replace(/\/$/, '');
const mediaBase = (process.env.VITE_MEDIA_BASE_URL || '').replace(/\/$/, '');

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const resolveMedia = (value) => {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  const relative = value.replace(/^\//, '');
  return mediaBase ? `${mediaBase}/${relative}` : `${origin}/media/${relative}`;
};

const template = await readFile(join(dist, 'index.html'), 'utf8');

// Rewrite the head so a scanned QR shares as that cocinera, not as the generic site card.
function pageFor(profile, canonicalSlug) {
  const title = `${profile.name} · Una arepa que nos sostiene`;
  const description = `${profile.name}, ${profile.location}. ${profile.dish.es}.`;
  const url = `${origin}/cocineras/${canonicalSlug}/`;
  const image = resolveMedia(profile.media.imageUrl) ?? `${origin}/og.png`;

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escape(description)}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escape(title)}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escape(description)}" />`,
    )
    .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="profile" />')
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${escape(image)}" />\n    <meta property="og:url" content="${escape(url)}" />`,
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*" \/>/,
      `<meta property="og:image:alt" content="${escape(`${profile.name} — ${profile.location}`)}" />`,
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${escape(image)}" />`,
    )
    .replace('</head>', `  <link rel="canonical" href="${escape(url)}" />\n  </head>`);
}

const routes = [
  ...cooks.map((profile) => [profile.slug, profile, profile.slug]),
  ...Object.entries(slugAliases).map(([alias, target]) => [
    alias,
    cooks.find((profile) => profile.slug === target),
    target,
  ]),
];

for (const [path, profile, canonicalSlug] of routes) {
  const directory = join(dist, 'cocineras', path);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), pageFor(profile, canonicalSlug));
}

console.log(`Prerendered ${routes.length} profile pages under dist/cocineras/ against ${origin}.`);
