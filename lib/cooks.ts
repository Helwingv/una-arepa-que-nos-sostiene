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

export type CookCredits = {
  photography: string;
  /** Absent when the source credits give no separate interviewer. */
  interview?: string;
  audio: string;
  translation?: string;
};

export type CookProfile = {
  slug: string;
  name: string;
  location: string;
  region: LocalizedText;
  dish: LocalizedText;
  bio: LocalizedText;
  credits: CookCredits;
  media: {
    imageUrl: string | null;
    audio: AudioTrack[];
  };
};

/** Credits for the digital project as a whole, shown in the site footer. */
export const projectCredits = {
  audioEditing: 'Roberto Bernal Daguis',
  webDesign: 'Helwing Villamizar',
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
  credits: creditsBySlug[slug],
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

/** Photography, interview, and recording credits, per the project's credit sheet. */
const creditsBySlug: Record<string, CookCredits> = {
  'yarenis-rosario': { photography: 'Saúl Torres', audio: 'Saúl Torres' },
  'nereida-machado': { photography: 'Enrique Alberto Blanco Ibarra', interview: 'Enrique Alberto Blanco Ibarra', audio: 'Enrique Alberto Blanco Ibarra' },
  'lucia-torrealba-london': { photography: 'Yris Infante Paul', interview: 'Lurernis Lezama', audio: 'Lurernis Lezama' },
  'marisol-quiroz': { photography: 'Leonardo Rojas', interview: 'Luisa Beatriz Arreaza y Marisol Quiroz', audio: 'Luisa Beatriz Arreaza y Marisol Quiroz' },
  'catalina-herrera': { photography: 'José Montiel', interview: 'Roxan Marín', audio: 'Roxan Marín' },
  'elisa-padron': { photography: 'Gerardo Orozco', interview: 'Fathima del Amazonas', audio: 'Fathima del Amazonas' },
  'maria-morales': { photography: 'Pablo Imperatori', interview: 'José Medina', audio: 'Pablo Imperatori' },
  'brigida-cardenas': { photography: 'Israel Sayaverde', interview: 'Rafael Parada', audio: 'Israel Sayaverde' },
  'ana-gisela-mora': { photography: 'Pablo Imperatori', interview: 'Pablo Imperatori', audio: 'Pablo Imperatori' },
  'lolimar-mijares': { photography: 'Jimmy Villalta', interview: 'Rubén Darío Rojas', audio: 'Jimmy Villalta' },
  'candelaria-pastora': { photography: 'Ysrael Paredes', interview: 'Katty Kanzler', audio: 'Ysrael Paredes' },
  'esperanza-rivera-guevara': { photography: 'Enrique Alberto Blanco Ibarra', interview: 'Enrique Alberto Blanco Ibarra', audio: 'Enrique Alberto Blanco Ibarra' },
  'maria-munoz': { photography: 'Jesús Moreno', interview: 'HM Direcciones', audio: 'HM Direcciones' },
  'maria-gabriela-castellanos': { photography: 'Martha Machado Ducoing', interview: 'Juan Alonso Molina', audio: 'Martha Machado Ducoing' },
  'estela-escobar-santeliz': { photography: 'Luis Manuel Sotillo Sanguino', interview: 'Andrés Fernando Rodríguez G.', audio: 'Luis Manuel Sotillo Sanguino' },
  'isabel-marin': { photography: 'Leonardo Picó González', interview: 'Fernando Escorcia', audio: 'Leonardo Picó González' },
  'josefina-pineda-pina': { photography: 'Leonardo Díaz', interview: 'Solangel Ventura', audio: 'Leonardo Díaz' },
  'juana-bautista-marval': { photography: 'Manuel Tineo', interview: 'Ernesto Otahola', audio: 'Manuel Tineo' },
  'cosmelina-sucre': { photography: 'Gerardo Orozco', interview: 'Jesús Enrique Méndez Guerrero', audio: 'Jesús Enrique Méndez Guerrero' },
  'karla-herrera-wulff': { photography: 'Gustavo A. González', interview: 'Karla Herrera Wulff', audio: 'Karla Herrera Wulff' },
  'dilia-fernandez': { photography: 'Ender García', interview: 'Ender García', audio: 'Ender García' },
  'julieta-fontainer': { photography: 'Franco José Requena', interview: 'Sorelia Franco', audio: 'Franco José Requena y María Regina Ascanio Mendoza' },
  'isolina-flores': { photography: 'Samir Aponte', interview: 'Luisa Beatriz Arreaza', audio: 'Samir Aponte' },
  'sonia-prieto': { photography: 'Yanelis Chacón Jiménez', interview: 'Sorelia Franco', audio: 'Franco José Requena y María Regina Ascanio Mendoza' },
  'luz-castejon': { photography: 'Juan J. Hurtado S.', interview: 'Mary Tere Pérez', audio: 'Mary Tere Pérez' },
  'anita-gonzalez-ipuana': { photography: 'Ramón Castillo', interview: 'Rina Navarro Montiel', audio: 'Rina Navarro Montiel', translation: 'Leobadis Gonzales' },
};

export const cooks: CookProfile[] = [
  cook('yarenis-rosario', 'Yarenis Rosario', 'Catia La Mar, La Guaira', coast, 'fosforera', 'fosforera seafood soup', { biographyAudio: false, recipeAudio: false }),
  cook('nereida-machado', 'Nereida Machado', 'El Clavo, Barlovento', afro, 'cafunga', 'cafunga, a plantain and coconut sweet', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Nerida-Machado-Barlovento-el-clavo-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_89-nereida-martinez-presentacion-standari_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_91-nereida-martinez-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('lucia-torrealba-london', 'Madama Lucía Torrealba London', 'El Callao, Bolívar', afro, 'banana pie y tarkarí', 'banana pie and tarkarí', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Lucia_Torrealba-El-callaojpg-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_67-lucia-torrealba-london-presentacion-sta_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_69-lucia-torrealba-london-receta-standariz_el._consulado-studio.wav',
  }),
  cook('marisol-quiroz', 'Marisol Quiroz', 'Patanemo, Carabobo', afro, 'pargo preñaó', 'stuffed red snapper', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Marisol-Quiroz-Patanemo-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_85-copia-de-marisol-quiroz-presentacion-fi_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_87-copia-de-marisol-quiroz-receta-final-st_el._consulado-studio.wav',
  }),
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
  cook('maria-morales', 'María Auxiliadora Morales Barrera (Yiya)', 'La Mucuy Baja, Mérida', andes, 'manamana con ensalada de guineo y plátano verde', 'manamana fish with green banana and plantain salad', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Maria_Auxiliadora_Morales_RETRATO_-Merida-Yiya-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_77-copia-de-yiya-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_79-copia-de-yiya-receta-final-standarizada_el._consulado-studio.wav',
  }),
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
  cook('lolimar-mijares', 'Lolimar Mijares', 'Caracas', central, 'pabellón caraqueño', 'Caracas-style pabellón', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Lolimar-Mijares_-Caracas-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_63-lolimar-mijares-presentacion-standariza_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_65-lolimar-mijares-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('candelaria-pastora', 'Candelaria Pastora Misle de Torres (Pastorita)', 'Colonia Tovar, Aragua', central, 'pan prote', 'pan prote', { recipeAudio: false }),
  cook('esperanza-rivera-guevara', 'Esperanza Rivera Guevara', 'San Joaquín, Carabobo', central, 'panelitas de San Joaquín', 'San Joaquín biscuits', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Esperanza-Rivera-San-Joaquinjpg-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_34-esperanza-guevara-san-joaquin-presentac_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_36-esperanza-san-joaquin-receta-final-stan_el._consulado-studio.wav',
  }),
  cook('maria-munoz', 'María Muñoz (Carmencita)', 'Valles del Tuy, Miranda', central, 'sancocho de bagre', 'catfish sancocho', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Carmencita-Valles-del-tuy.png',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_81-carmencita-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_83-carmencita-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('maria-gabriela-castellanos', 'María Gabriela Castellanos', 'Barquisimeto, Lara', westCentral, 'pata e’ grillo, puré de caraotas y arepita de auyama', 'pata e’ grillo, black bean purée, and pumpkin-seed arepita', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Maria-Gabriela-Castellano_Lara.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/MG-Castellanos-Presentacion-final-Standarizada.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/MG-Castellanos-Receta-final-standarizada.wav',
  }),
  cook('estela-escobar-santeliz', 'Estela Escobar Santeliz', 'San Felipe, Yaracuy', westCentral, 'ponche de San Juan', 'San Juan punch', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Estela-Escobar-Yaracuy-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_38-estela-escobar-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_40-estela-receta-fina-stadarizadal_el._consulado-studio.wav',
  }),
  cook('isabel-marin', 'Isabel Marín (La Negra)', 'Boca de Río, Nueva Esparta', coast, 'pescado oreado y sus preparaciones', 'air-dried fish and related preparations', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Isabel-Marin-Boca-de-Rio-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_42-isabel-marin-presentacion-nueva-esparta_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_44-isabel-marin-receta-nueva-esparta-final_el._consulado-studio.wav',
  }),
  cook('josefina-pineda-pina', 'Josefina Pineda Piña (Chepina)', 'Coro, Falcón', coast, 'escabeche de carite', 'kingfish escabeche', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Chepina-Pina-Coro-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_50-josefina-chepina-coro-presentacion-stan_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_52-josefina-chepina-coro-receta-standariza_el._consulado-studio.wav',
  }),
  cook('juana-bautista-marval', 'Juana Bautista Marval', 'Cumaná, Sucre', coast, 'cóctel de camarones', 'shrimp cocktail', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Juana-Marval-Cumana-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_55-juana-cumana-presentacion-final-standar_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_57-juana-cumana-receta-final-standarizada_el._consulado-studio.wav',
  }),
  cook('cosmelina-sucre', 'Cosmelina Sucre (Cosme)', 'Río Caribe, Paria', coast, 'coguyón oreado con camarones', 'air-dried coguyón fish with shrimp', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-Sucre-Paria-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-Paria-Presentacion-final-Standarizada.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Cosmelina-receta-final-Standarizada.wav', 
  }),
  cook('karla-herrera-wulff', 'Karla Herrera Wulff', 'Ciudad Bolívar, Bolívar', guayana, 'pelao guayanés', 'Guayana-style pelao', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Karla-Herrera-Hoffman-ciudad-Bolivar-scaled.jpg',
    biographyAudio: false,
    recipeAudio: false,
  }),
  cook('dilia-fernandez', 'Dilia Fernández', 'San Félix, Bolívar', guayana, 'receta por confirmar', 'recipe to be confirmed', { 
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Dilia-Fernandez-San-Felix-scaled.jpg', 
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_26-dilia-fernandez-presentacion-final-stan_el._consulado-studio.wav', 
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_28-dilia-fernandez-receta-final-standariza_el._consulado-studio.wav', 
  }),
  cook('julieta-fontainer', 'Julieta Fontainer', 'San Fernando de Apure, Apure', plains, 'pisillo de chigüire', 'shredded capybara', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Juleita-Fontainez-Apure-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_61-fontainez-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_59-julieta-fontainez-receta-standarizada_el._consulado-studio.wav',
  }),
  cook('isolina-flores', 'Isolina Flores', 'Aragua de Barcelona, Anzoátegui', plains, 'cuajao de chigüire', 'capybara cuajao', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Isolina-Flores-Aragua-de-Barcelona-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_46-isolina-aragua-de-barcelona-presentacio_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_48-isolina-aragua-de-barcelona-receta-fina_el._consulado-studio.wav',
  }),
  cook('sonia-prieto', 'Sonia Prieto Guedez', 'Calabozo, Guárico', plains, 'cachapa con cochino frito', 'corn cachapa with fried pork'),
  cook('luz-castejon', 'Luz Castejón', 'Maracaibo, Zulia', zulia, 'bocachico relleno asado en hoja', 'leaf-roasted stuffed bocachico fish', {
    imageUrl: 'https://talknexo.net/wp-content/uploads/2026/09/Luz-Castejon-Maracaibo-scaled.jpg',
    biographyUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_71-luz-castejon-presentacion-standarizada_el._consulado-studio.wav',
    recipeUrl: 'https://talknexo.net/wp-content/uploads/2026/09/riverside_edit_73-luz-castejon-receta-standarizada_el._consulado-studio.wav',
  }),
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
