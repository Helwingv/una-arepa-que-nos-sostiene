import { cooks } from '../lib/cooks.ts';

const slugs = cooks.map(({ slug }) => slug);
const audioTracks = cooks.flatMap(({ media }) => media.audio);
const portraitSources = cooks.filter(({ media }) => Boolean(media.imageUrl));

const checks = [
  [cooks.length === 26, `expected 26 profiles, found ${cooks.length}`],
  [new Set(slugs).size === slugs.length, 'profile slugs must be unique'],
  [slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)), 'profile slugs must be URL-safe'],
  [audioTracks.length === 45, `expected 45 mapped audio tracks, found ${audioTracks.length}`],
  [portraitSources.length === 25, `expected 25 portrait sources, found ${portraitSources.length}`],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validated 26 profiles, 45 audio mappings, 25 portrait sources, and stable unique slugs.');
