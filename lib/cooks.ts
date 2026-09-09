export type Language = 'es' | 'en';

export type LocalizedText = {
  es: string;
  en: string;
};

export type AudioTrack = {
  kind: 'biography' | 'recipe';
  language: 'es';
  url: string;
};

export type CookProfile = {
  slug: string;
  name: string;
  location: string;
  region: LocalizedText;
  dish: LocalizedText;
  bio: LocalizedText;
  media: {
    imageUrl: string | null;
    audio: AudioTrack[];
  };
};

const region = (es: string, en: string): LocalizedText => ({ es, en });

const bio = (name: string, location: string, dishEs: string, dishEn: string): LocalizedText => ({
  es: `${name} es una cocinera popular de ${location}. En esta colección comparte ${dishEs}, una preparación que guarda memoria, territorio e identidad. Su relato en primera persona acompaña esta ficha.`,
  en: `${name} is a traditional cook from ${location}. In this collection she shares ${dishEn}, a preparation shaped by memory, place, and identity. Her first-person account accompanies this profile.`,
});

const audio = (slug: string, biography = true, recipe = true, biographyUrl?: string, recipeUrl?: string): AudioTrack[] => [
  ...(biography ? [{ kind: 'biography' as const, language: 'es' as const, url: biographyUrl ?? `audio/${slug}-biografia.wav` }] : []),
  ...(recipe ? [{ kind: 'recipe' as const, language: 'es' as const, url: recipeUrl ?? `audio/${slug}-receta.wav` }] : []),
];

const cook = (
  slug: string,
  name: string,
  location: string,
  regionName: LocalizedText,
  dishEs: string,
  dishEn: string,
  options: { image?: boolean; imageUrl?: string; biographyAudio?: boolean; recipeAudio?: boolean; biographyUrl?: string; recipeUrl?: string } = {},
): CookProfile => ({
  slug,
  name,
  location,
  region: regionName,
  dish: { es: dishEs, en: dishEn },
  bio: bio(name, location, dishEs, dishEn),
  media: {
    imageUrl: options.image === false ? null : options.imageUrl ?? `portraits/${slug}.jpg`,
    audio: audio(slug, options.biographyAudio !== false, options.recipeAudio !== false, options.biographyUrl, options.recipeUrl),
  },
});

const afro = region('Zona afrovenezolana', 'Afro-Venezuelan region');
const amazon = region('Amazonas y Delta', 'Amazon and Delta region');
const andes = region('Zona andina', 'Andean region');
const central = region('Zona central', 'Central region');
const westCentral = region('Zona centro-occidental', 'Central-western region');
const coast = region('Zona costera', 'Coastal region');
const guayana = region('Guayana', 'Guayana region');
const plains = region('Zona llanera', 'Plains region');
const zulia = region('Zona zuliana', 'Zulia region');

export const cooks: CookProfile[] = [
  cook('yarenis-rosario', 'Yarenis Rosario', 'Catia La Mar, La Guaira', coast, 'fosforera', 'fosforera seafood soup', { biographyAudio: false, recipeAudio: false }),
  cook('nereida-machado', 'Nereida Machado', 'El Clavo, Barlovento', afro, 'cafunga', 'cafunga, a plantain and coconut sweet'),
  cook('lucia-torrealba-london', 'Madama Lucía Torrealba London', 'El Callao, Bolívar', afro, 'banana pie y tarkarí', 'banana pie and tarkarí'),
  cook('marisol-quiroz', 'Marisol Quiroz', 'Patanemo, Carabobo', afro, 'pargo preñaó', 'stuffed red snapper'),
  cook('catalina-herrera', 'Catalina Herrera', 'Tucupita, Delta Amacuro', amazon, 'jukako (ajicero)', 'jukako (pepper stew)', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Carolina-Herrera-Delta-1-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_22-catalina-herrera-amazonica-presentacion_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_24-catalina-herrera-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('elisa-padron', 'Elisa Padrón', 'Comunidad San Luis, Puerto Ayacucho', amazon, 'Ottoyanä deä: sivebi, lapa y bachacos', 'Ottoyanä deä with sivebi, paca, and leaf-cutter ants', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Elisa-Padron-San-Luis-Puerto-Ayacucho.JPEG-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_30-elisa-padron-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_32-elisa-padron-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('maria-morales', 'María Auxiliadora Morales Barrera (Yiya)', 'La Mucuy Baja, Mérida', andes, 'manamana con ensalada de guineo y plátano verde', 'manamana fish with green banana and plantain salad'),
  cook('brigida-cardenas', 'Brígida Cárdenas', 'San Cristóbal, Táchira', andes, 'hervido de res', 'beef soup', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Brigida-Cardenas-San-Cristobal-1.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Brigida-Cardenas-Presentacion-Final-standarizada.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Brigida-Cardenas-Receta-Final-Standarizada.wav',
  }),
  cook('ana-gisela-mora', 'Ana Gisela Mora', 'Trujillo', andes, 'mojo trujillano', 'Trujillo-style mojo', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Ana_Gisela_Mora_-Trujillo-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/ana-Gisela-Mora-Presentacion-Standarizada.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Ana-Gisela-Mora-Receta-Final-Standarizada.wav',
  }),
  cook('lolimar-mijares', 'Lolimar Mijares', 'Caracas', central, 'pabellón caraqueño', 'Caracas-style pabellón'),
  cook('candelaria-pastora', 'Candelaria Pastora Misle de Torres (Pastorita)', 'Colonia Tovar, Aragua', central, 'pan prote', 'pan prote', { recipeAudio: false }),
  cook('esperanza-rivera-guevara', 'Esperanza Rivera Guevara', 'San Joaquín, Carabobo', central, 'panelitas de San Joaquín', 'San Joaquín biscuits', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Esperanza-Rivera-San-Joaquinjpg-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_34-esperanza-guevara-san-joaquin-presentac_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_36-esperanza-san-joaquin-receta-final-stan_el._consulado-studio.wav',
  }),
  cook('maria-munoz', 'María Muñoz (Carmencita)', 'Valles del Tuy, Miranda', central, 'sancocho de bagre', 'catfish sancocho'),
  cook('maria-gabriela-castellanos', 'María Gabriela Castellanos', 'Barquisimeto, Lara', westCentral, 'pata e’ grillo, puré de caraotas y arepita de auyama', 'pata e’ grillo, black bean purée, and pumpkin-seed arepita'),
  cook('estela-escobar-santeliz', 'Estela Escobar Santeliz', 'San Felipe, Yaracuy', westCentral, 'ponche de San Juan', 'San Juan punch', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Estela-Escobar-Yaracuy-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_38-estela-escobar-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_40-estela-receta-fina-stadarizadal_el._consulado-studio.wav',
  }),
  cook('isabel-marin', 'Isabel Marín (La Negra)', 'Boca de Río, Nueva Esparta', coast, 'pescado oreado y sus preparaciones', 'air-dried fish and related preparations'),
  cook('josefina-pineda-pina', 'Josefina Pineda Piña (Chepina)', 'Coro, Falcón', coast, 'escabeche de carite', 'kingfish escabeche'),
  cook('juana-bautista-marval', 'Juana Bautista Marval', 'Cumaná, Sucre', coast, 'cóctel de camarones', 'shrimp cocktail'),
  cook('cosmelina-sucre', 'Cosmelina Sucre (Cosme)', 'Río Caribe, Paria', coast, 'coguyón oreado con camarones', 'air-dried coguyón fish with shrimp', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-Sucre-Paria-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-Paria-Presentacion-final-Standarizada.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-receta-final-Standarizada.wav', 
  }),
  cook('karla-herrera-wulff', 'Karla Herrera Wulff', 'Ciudad Bolívar, Bolívar', guayana, 'pelao guayanés', 'Guayana-style pelao', { biographyAudio: false, recipeAudio: false }),
  cook('dilia-fernandez', 'Dilia Fernández', 'San Félix, Bolívar', guayana, 'receta por confirmar', 'recipe to be confirmed', { 
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Dilia-Fernandez-San-Felix-scaled.jpg', 
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_26-dilia-fernandez-presentacion-final-stan_el._consulado-studio.wav', 
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_28-dilia-fernandez-receta-final-standariza_el._consulado-studio.wav', 
  }),
  cook('julieta-fontainer', 'Julieta Fontainer', 'San Fernando de Apure, Apure', plains, 'pisillo de chigüire', 'shredded capybara'),
  cook('isolina-flores', 'Isolina Flores', 'Aragua de Barcelona, Anzoátegui', plains, 'cuajao de chigüire', 'capybara cuajao'),
  cook('sonia-prieto', 'Sonia Prieto Guedez', 'Calabozo, Guárico', plains, 'cachapa con cochino frito', 'corn cachapa with fried pork'),
  cook('luz-castejon', 'Luz Castejón', 'Maracaibo, Zulia', zulia, 'bocachico relleno asado en hoja', 'leaf-roasted stuffed bocachico fish'),
  cook('anita-gonzalez-ipuana', 'Anita González Ipuana', 'Comunidad Wayuu, Zulia', zulia, 'ovejo guisado, frichi y arepitas de maíz', 'stewed mutton, frichi, and corn arepitas', { 
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Anita-Gonzalez-Comunidad-Wayuu-scaled.jpg', 
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Anita-Wayuu-Presentacion-Final-Standarizada.wav', 
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Anita-Wayuu-Receta-Final-Standarizada.wav' 
  }),
];

export const cooksBySlug = Object.fromEntries(cooks.map((profile) => [profile.slug, profile])) as Record<string, CookProfile>;

// Printed QR codes carry the short slug; the earlier one still resolves here.
export const slugAliases: Record<string, string> = {
  'maria-auxiliadora-morales': 'maria-morales',
};

export function findCookBySlug(slug: string): CookProfile | undefined {
  const alias = slugAliases[slug];
  return cooksBySlug[slug] ?? (alias ? cooksBySlug[alias] : undefined);
}
