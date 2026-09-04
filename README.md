# Una arepa que nos sostiene

Sitio editorial bilingüe (español/inglés) para el archivo sonoro **Una arepa que nos sostiene: Cocineras populares, territorio e identidad**. Reúne 26 perfiles con rutas compartibles, retratos, platos y grabaciones en la voz original de cada cocinera.

## Puesta en marcha

Requiere Node.js 22 o posterior.

```bash
npm install
npm run dev
```

Validación de producción:

```bash
npm run lint
npm run build
```

El proyecto no tiene remoto Git configurado y no se ha enviado a GitHub.

## Rutas y códigos QR

Cada ficha tiene una URL estable y legible:

```text
/cocineras/<nombre-slug>/
```

Ejemplo: `/cocineras/maria-gabriela-castellanos/`. El mismo URL sirve ambos idiomas; la preferencia ES/EN se conserva en `localStorage`. Esto permite generar un único código QR por cocinera. Al conectar el dominio definitivo, use la URL canónica completa, por ejemplo `https://sitio-ejemplo.netlify.app/cocineras/maria-gabriela-castellanos/`.

Netlify recibe las rutas compartibles en `index.html` mediante `netlify.toml` y `public/_redirects`; la plantilla reutilizable identifica el slug y carga la ficha correspondiente.

## Modelo de contenido

Los perfiles viven en `lib/cooks.ts`. Cada registro contiene:

- `slug`, nombre, localidad y región;
- plato y biografía breve en español e inglés;
- `media.imageUrl`;
- una lista `media.audio` con tipo (`biography` o `recipe`), idioma hablado y URL.

Los campos de medios aceptan una URL absoluta (`https://…`) o una ruta relativa. Con una ruta relativa, el sitio antepone `VITE_MEDIA_BASE_URL`. Esta estructura permite reemplazar un medio puntual pegando su URL completa de WordPress, o cambiar toda la biblioteca con una sola variable. La ficha de Ana Gisela Mora ya usa sus tres URLs reales de Talk Nexo:

- retrato: `https://talknexo.net/wp-content/uploads/2026/09/Ana_Gisela_Mora_-Trujillo-scaled.jpg`;
- presentación: `https://talknexo.net/wp-content/uploads/2026/09/ana-Gisela-Mora-Presentacion-Standarizada.wav`;
- receta: `https://talknexo.net/wp-content/uploads/2026/09/Ana-gisela-Mora-receta-mojo-trujillo-standarizada.wav`.

## Medios en WordPress / Hostinger

Los archivos multimedia originales no se incluyen en Git. El repositorio permanece liviano: contiene únicamente el sitio, su contenido estructurado y la imagen social. Para producción:

1. Suba retratos y audios a Talk Nexo/WordPress usando nombres estables. Se recomienda convertir los WAV a MP3 de 128–192 kbps para reducir peso, conservando los WAV maestros fuera del repositorio.
2. Copie la URL pública de cada archivo desde la biblioteca de medios y péguela en `media.imageUrl` o `media.audio[].url` dentro de `lib/cooks.ts`. También puede dejar rutas relativas si todos los archivos comparten una carpeta base.
3. En Netlify, cree `VITE_MEDIA_BASE_URL` con la carpeta pública común, por ejemplo `https://talknexo.net/wp-content/uploads/2026/09`, sin barra final. Vuelva a desplegar después de cambiarla.
4. Verifique que WordPress entregue `image/jpeg` o `image/webp` para retratos y `audio/mpeg`, `audio/mp4`, `audio/ogg` o `audio/wav` según corresponda.
5. Habilite solicitudes por rango (`Accept-Ranges: bytes`) para que el reproductor pueda avanzar en el audio. Use caché larga solo con nombres versionados.

El reproductor es el elemento HTML nativo `<audio controls>`: rápido, gratuito y accesible. No depende de una librería externa. Si un archivo falta o falla, la ficha muestra un estado legible en vez de romper la página.

Para una instalación Apache/Hostinger, una configuración equivalente a esta es adecuada (revise primero las reglas vigentes del servidor):

```apache
<FilesMatch "\.(mp3|m4a|ogg|wav)$">
  Header set Access-Control-Allow-Origin "*"
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
```

La reproducción nativa normalmente no exige CORS, pero la cabecera facilita medición, precarga y futuras mejoras. No habilite credenciales con un origen comodín.

## Netlify

El archivo `netlify.toml` ya define:

- build: `npm run build`;
- publicación: `dist`;
- Node.js 22;
- fallback para rutas compartibles y cabeceras de seguridad/caché.

Después de crear el repositorio en GitHub, conecte ese repositorio en Netlify y agregue `VITE_MEDIA_BASE_URL` antes del despliegue final.

## Criterio editorial y supuestos

- El PDF `elementos una arepa que nos sostiene.pdf` es la referencia visual autoritativa. De allí se deriva la paleta negro carbón, rosa intenso y beige cálido; títulos sans-serif espaciados tipo **Avenir Next**; y énfasis editoriales en itálica tipo **Garamond**. Se usan alternativas del sistema para evitar una dependencia tipográfica y respetar licencias.
- El documento “Listado de Cocineras/ platillo y localidad” define los 26 nombres, lugares y platos. Cuando difiere de una carpeta o archivo, se prioriza el índice del PDF y luego el documento de lista.
- Las grabaciones de “presentación” son la fuente biográfica. Para no inventar datos, las biografías breves solo enlazan nombre, territorio y plato confirmados y remiten a la voz original.
- Dilia Fernández aparece sin receta asociada en la lista; el sitio muestra “receta por confirmar”.
- Anita González Ipuana tiene carpeta vacía. Karla Herrera Wulff y Yarenis Rosario tienen retrato pero no audio. Pastorita tiene presentación pero no grabación de receta. La interfaz informa estas ausencias con estados claros.
- Las traducciones al inglés son editoriales y conservadoras. Se mantienen nombres propios y términos culinarios sin equivalente preciso, añadiendo una glosa breve cuando ayuda. El audio permanece en español y se etiqueta como tal.
- Los slugs son deliberadamente estables y no cambian con el idioma.

## Estructura principal

```text
src/site-app.tsx             rutas y plantilla reutilizable de perfil
components/                  colección, perfil, idioma y reproductor
lib/cooks.ts                 contenido bilingüe y URLs de medios
netlify.toml                 configuración de despliegue
```
