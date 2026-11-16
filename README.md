# Chiripa · buscador de ofertas de tiendas (demostración)

Ejercicio de **réplica de estructura y experiencia de usuario** de un catálogo de beneficios con buscador, hecho con [Astro](https://astro.build) como sitio estático, CSS propio y JavaScript mínimo.

> **Aviso:** Chiripa es un sitio de demostración. Las tiendas, ofertas, zonas y códigos son **ficticios**. No es un sitio bancario ni financiero, **no tiene afiliación con ningún banco ni comercio** y no solicita datos personales ni de pago.

## Qué se replicó (estructura y UX)

- Header fijo con buscador de texto siempre visible y navegación corta.
- Home con hero y **tarjeta de búsqueda flotante** (texto + selectores de categoría, zona y día) que lleva al listado con los filtros ya aplicados.
- Accesos por categoría, banners de promoción y bloque gris informativo.
- **Listado** con migas de pan, orden (mayor/menor descuento y más), **filtros laterales colapsables** y grilla de tarjetas con insignia de descuento y botón «+».
- **Ficha de detalle** con encabezado, descuento destacado, vigencia, condiciones y «También te puede interesar».
- Comportamiento responsive: en móvil los filtros se abren con un botón y la grilla pasa a 2 columnas.

## Qué se reemplazó

| Aspecto | En esta réplica |
| --- | --- |
| Marca | «Chiripa», logotipo propio (etiqueta de precio) |
| Paleta | Verde azulado, coral y crema; tipografía del sistema |
| Contenido | 49 ofertas de tiendas inventadas (moda, tecnología, hogar, gastronomía, salud y belleza, deportes, libros, mascotas, ocio) |
| Filtros | Categoría, zona (ficticia) y día de la semana, en lugar de medios de pago y departamentos |
| Imágenes | Sin imágenes ni logos de terceros: monogramas y degradados en CSS/SVG |
| Propósito | Descuentos de tiendas de barrio, sin tarjetas, cuentas ni trámites |

## Cómo funciona el buscador

Las ofertas viven en `src/data/ofertas.json` (se regenera con `npm run datos`). La página de listado se genera con todas las tarjetas y un script pequeño filtra, ordena y pagina en el navegador: búsqueda por texto (sin distinguir tildes), filtros por categoría, zona y día, orden y «Ver más». El estado queda en la URL (`?q=&cat=&zona=&dia=&orden=`), así que cada búsqueda se puede compartir.

## Uso

```bash
npm install
npm run dev        # desarrollo
npm run build      # sitio estático en dist/
npm run preview    # sirve dist/ en http://127.0.0.1:4323/
```

## Rendimiento (Lighthouse)

Medido sobre el build de producción servido en local, perfil móvil por defecto de Lighthouse, mediana de 3 corridas (`npm run lighthouse`, resultados en `lighthouse/resultados.json`):

| Página | Rend. | Accesib. | Buenas prác. | SEO | LCP |
| --- | --- | --- | --- | --- | --- |
| Inicio | 100 | 100 | 100 | 100 | 1,2 s |
| Listado | 100 | 100 | 100 | 100 | 1,3 s |
| Listado filtrado por URL | 98 | 100 | 100 | 100 | 1,2 s |
| Detalle | 100 | 100 | 100 | 100 | 1,0 s |

Son mediciones en local con throttling simulado; en un hosting real pueden variar.

## Estructura

```
src/data/ofertas.json     datos ficticios
src/pages/                inicio, listado, ficha [slug], acerca
src/components/Tarjeta    tarjeta de oferta
scripts/                  generador de datos y medición con Lighthouse
```
