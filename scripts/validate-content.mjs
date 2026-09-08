import { cooks, findCookBySlug } from '../lib/cooks.ts';

// Frozen contract: these slugs are printed inside the 26 QR codes and cannot change.
const printedSlugs = [
  'yarenis-rosario',
  'nereida-machado',
  'lucia-torrealba-london',
  'marisol-quiroz',
  'catalina-herrera',
  'elisa-padron',
  'maria-morales',
  'brigida-cardenas',
  'ana-gisela-mora',
  'lolimar-mijares',
  'candelaria-pastora',
  'esperanza-rivera-guevara',
  'maria-munoz',
  'maria-gabriela-castellanos',
  'estela-escobar-santeliz',
  'isabel-marin',
  'josefina-pineda-pina',
  'juana-bautista-marval',
  'cosmelina-sucre',
  'karla-herrera-wulff',
  'dilia-fernandez',
  'julieta-fontainer',
  'isolina-flores',
  'sonia-prieto',
  'luz-castejon',
  'anita-gonzalez-ipuana',
];
const unreachable = printedSlugs.filter((slug) => !findCookBySlug(slug));

const slugs = cooks.map(({ slug }) => slug);
const audioTracks = cooks.flatMap(({ media }) => media.audio);
const portraitSources = cooks.filter(({ media }) => Boolean(media.imageUrl));

const checks = [
  [cooks.length === 26, `expected 26 profiles, found ${cooks.length}`],
  [new Set(slugs).size === slugs.length, 'profile slugs must be unique'],
  [slugs.every((slug) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)), 'profile slugs must be URL-safe'],
  [audioTracks.length === 45, `expected 45 mapped audio tracks, found ${audioTracks.length}`],
  [portraitSources.length === 25, `expected 25 portrait sources, found ${portraitSources.length}`],
  [unreachable.length === 0, `printed QR slugs with no profile: ${unreachable.join(', ')}`],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validated 26 profiles, 45 audio mappings, 25 portrait sources, stable unique slugs, and 26 printed QR URLs.');
