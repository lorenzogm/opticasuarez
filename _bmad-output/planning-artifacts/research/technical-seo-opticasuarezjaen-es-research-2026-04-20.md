---
stepsCompleted: ["live-audit", "code-audit", "synthesis"]
inputDocuments:
  - "apps/web/src/lib/seo.ts"
  - "apps/web/src/routes/__root.tsx"
  - "apps/web/server/routes/sitemap.xml.ts"
  - "apps/web/server/routes/robots.txt.ts"
  - "apps/web/src/routes/blog/index.tsx"
  - "apps/web/src/routes/blog/$slug.tsx"
  - "apps/web/src/routes/tienda/index.tsx"
  - "apps/web/src/routes/tienda/$slug.tsx"
workflowType: 'research'
lastStep: 1
research_type: 'technical'
research_topic: 'seo-opticasuarezjaen-es'
research_goals: 'Auditar SEO tecnico, on-page, local y de datos estructurados del sitio en produccion con evidencia del sitio vivo y del codigo'
user_name: 'Mira Ben'
date: '2026-04-20'
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-04-20  
**Author:** Mira Ben  
**Research Type:** technical

---

## Research Overview

Este informe evalua el SEO de opticasuarezjaen.es desde cuatro angulos:

1. SEO tecnico en produccion: indexabilidad, respuestas HTTP, robots, sitemap, canonicals y hreflang.
2. SEO on-page: titles, descriptions, H1, arquitectura de enlaces y orientacion a intencion de busqueda.
3. SEO local: consistencia de datos NAP, señales de negocio local y paginas de servicio con enfoque geografico.
4. Datos estructurados y enriquecimiento semantico: Organization, WebSite, Product, Breadcrumb y oportunidades perdidas.

Metodologia utilizada:

- Auditoria del sitio vivo con comprobaciones HTTP y navegacion en navegador.
- Extraccion de metadatos renderizados en home, blog, post de blog, servicios, contacto, quienes-somos, planveo y tienda.
- Revision del codigo que genera SEO, sitemap, robots, structured data y rutas dinamicas.

Limitaciones:

- No hubo acceso a Google Search Console, Google Business Profile, logs del servidor, backlinks ni datos reales de rendimiento organico.
- Por tanto, este documento prioriza lo verificable en produccion y en el repositorio, no el rendimiento historico.

---

## Executive Summary

La base SEO del sitio es mejor de lo habitual para una pyme local: las paginas de servicios principales estan bien orientadas a busquedas de alta intencion, usan titulos localizados con Jaen, tienen H1 claros, FAQs, CTAs y contenido suficientemente profundo para competir en busquedas locales y transaccionales.

Sin embargo, el sitio tiene varios problemas tecnicos graves que hoy limitan el rastreo, la indexacion y la fiabilidad de las señales SEO:

1. El sitemap esta roto en parte y publica URLs malformadas.
2. El sitemap expone URLs que en produccion estan vacias o devuelven 500.
3. El blog landing devuelve 200 con cuerpo vacio.
4. La parte de tienda devuelve 500 y aun asi sus productos aparecen en el sitemap.
5. El marcado local estructurado publica telefonos y direcciones que no coinciden con la informacion visible del negocio.
6. El hreflang esta implementado de forma incorrecta en todas las paginas internas.

Si tuviera que resumirlo en una frase: el sitio tiene buen potencial SEO por contenido y por orientacion local, pero la capa tecnica de descubrimiento y consistencia semantica necesita correccion inmediata.

---

## Findings By Severity

### P0 — Problemas criticos

#### 1. El sitemap publica URLs malformadas

Hallazgo en vivo:

- El sitemap incluye al menos estas URLs invalidas:
  - https://opticasuarezjaen.esplanveo
  - https://opticasuarezjaen.esquienes-somos

Impacto SEO:

- Estas URLs no se pueden rastrear correctamente.
- Son una señal de baja calidad del sitemap.
- Pueden retrasar la discovery de URLs validas y desperdiciar crawl budget.

Evidencia tecnica:

- El sitemap concatena directamente dominio + ruta sin normalizar la barra inicial.
- El generador usa tanto rutas estaticas con slash como paginas de Sanity sin garantizar slash inicial.

Conclusión:

- Este es un bug real, ya visible en produccion, y debe corregirse antes que cualquier trabajo fino de metadata.

#### 2. El sitemap apunta a URLs con estado roto en produccion

Hallazgo en vivo:

- /blog devuelve 200 pero con cuerpo vacio.
- /tienda devuelve 500.
- Varias URLs de producto bajo /tienda/* tambien devuelven 500.
- Aun asi, el sitemap expone URLs de tienda/producto.

Impacto SEO:

- Google recibe desde el sitemap URLs que no son indexables o no son utiles.
- Un 200 vacio en /blog es peor que un 404 honesto: puede indexarse como thin content o generar soft quality issues.
- Los 500 en /tienda/* reducen la confianza del crawler y desaprovechan URLs potencialmente valiosas.

Conclusión:

- Mientras /blog y /tienda no funcionen correctamente, no deberian promocionarse desde el sitemap.

#### 3. Inconsistencia NAP en el marcado estructurado local

Hallazgo:

- El JSON-LD global del sitio publica telefonos y direcciones distintas a las que se muestran en el contenido visible.
- En contenido visible y JSONs locales se observan las ubicaciones:
  - C. de Canarias, 6, 23009 Jaen — 953-093-062
  - P.o de la Estacion, 12, 23003 Jaen — 953-223-180
- El JSON-LD global incluye datos diferentes para las sucursales, por ejemplo:
  - Calle Arquitecto Berges, 18
  - Bulevar, 18
  - telefonos distintos a los visibles

Impacto SEO:

- Esto afecta directamente a SEO local y a la confianza en las señales de negocio.
- La consistencia NAP es critica para Google Business Profile, citaciones y entidades locales.
- Un schema inconsistente puede debilitar la elegibilidad para resultados locales enriquecidos.

Conclusión:

- Este problema es mas serio que una simple mejora de schema. Es una contradiccion factual entre datos visibles y datos estructurados.

### P1 — Problemas importantes

#### 4. Hreflang incorrecto en todas las paginas internas

Hallazgo:

- Todas las paginas analizadas emiten hreflang es y x-default apuntando a la home, no a la URL equivalente de cada pagina.

Impacto SEO:

- Para un sitio monolingue en espanol, este hreflang no aporta valor real.
- Peor aun, puede enviar señales ambiguas porque una pagina de servicio, una entrada de blog o una landing promocional declaran como alterna la home.

Conclusión:

- Si el sitio no tiene versiones idiomaticas equivalentes por URL, es preferible eliminar hreflang o generarlo por pagina correcta.

#### 5. Los posts del blog no emiten señales semanticas de articulo

Hallazgo:

- El post analizado tiene title, description y canonical correctos.
- Pero sigue saliendo con og:type = website.
- No se detecta Article ni BlogPosting JSON-LD.
- La imagen Open Graph del post analizado cae en la imagen generica del sitio, no en una imagen editorial propia del articulo.

Impacto SEO:

- Se desaprovecha elegibilidad para resultados enriquecidos y una mejor interpretacion editorial.
- Se reduce el atractivo en compartidos sociales y potencialmente en Discover.

Conclusión:

- El blog tiene buen contenido, pero su modelado SEO sigue siendo de pagina generica, no de articulo.

#### 6. Las paginas de servicios con FAQ no emiten FAQPage ni Service schema

Hallazgo:

- Las paginas de Examen Visual, Terapia Visual y Control de Miopia muestran bloques FAQ y contenido orientado a servicio local.
- Sin embargo, el sitio solo emite de forma consistente WebSite y Optician a nivel global.
- No hay FAQPage estructurado, ni Service page-specific schema, ni BreadcrumbList en estas landings de servicio.

Impacto SEO:

- Se desaprovecha informacion ya existente y bien escrita.
- Google recibe menos contexto semantico del que podria recibir.
- Las paginas de mayor intencion comercial podrian reforzar bastante sus señales con schema page-specific.

Conclusión:

- Hay una oportunidad clara de convertir contenido ya presente en ventaja SEO adicional sin necesidad de crear mucho texto nuevo.

#### 7. Las URLs legacy de servicios siguen cayendo en 404

Hallazgo en vivo:

- /examen-visual devuelve 404.
- /terapia-visual devuelve 404.

Contexto:

- Esas URLs antiguas ahora viven bajo /servicios/...

Impacto SEO:

- Si existen enlaces externos, citaciones o URLs antiguas indexadas, se pierde autoridad acumulada.
- Tambien se perjudica la experiencia de usuario cuando el trafico llega desde resultados o referencias antiguas.

Conclusión:

- Deben resolverse mediante 301 a sus nuevas URLs canonicales si esa migracion ya estaba prevista.

#### 8. El SearchAction del WebSite schema es invalido para la realidad del sitio

Hallazgo:

- El schema WebSite anuncia una busqueda en /blog?search={search_term_string}.
- La ruta del blog solo valida category, no search.

Impacto SEO:

- Se publica una capacidad de busqueda que el sitio no soporta realmente.
- Esto genera markup engañoso o, como minimo, no funcional.

Conclusión:

- O se implementa una busqueda real, o se elimina el SearchAction.

### P2 — Mejoras recomendables pero no urgentes

#### 9. El sitemap usa lastmod, changefreq y priority genericos para todas las URLs

Hallazgo:

- Todas las URLs comparten la fecha del dia actual como lastmod.
- changefreq es weekly en todos los casos.
- priority es 1.0 para home y 0.8 para todo lo demas.

Impacto SEO:

- Google suele ignorar estas señales cuando son genericas o inexactas.
- No rompe el SEO, pero reduce la utilidad real del sitemap.

Conclusión:

- Conviene usar lastmod real por documento o eliminar esos campos si no pueden mantenerse con precision.

#### 10. Algunas metas son correctas pero poco competitivas en paginas corporativas

Ejemplos:

- Contacto: descripcion demasiado generica.
- Quienes Somos: correcta, pero poco distintiva frente a competidores locales.

Impacto SEO:

- No es un bloqueo tecnico.
- Si afecta al CTR organico en consultas de marca y de proximidad.

Conclusión:

- Hay margen para escribir snippets mas persuasivos con ubicaciones, telefonos, especialidades y prueba social.

#### 11. Hay un fallback de URL de share con dominio equivocado en el blog

Hallazgo:

- En SSR, el share URL del blog cae en https://opticasuarez.com/blog/... en lugar del dominio real.

Impacto SEO:

- No afecta directamente a indexacion.
- Si puede contaminar compartidos o previews en ciertos escenarios de renderizado inicial.

Conclusión:

- Es una inconsistencia de marca/dominio que conviene limpiar.

---

## What Is Working Well

### 1. Las paginas de servicio estan bien planteadas para SEO local y de conversion

Puntos fuertes verificados:

- Titles localizados con Jaen.
- H1 alineados con la intencion principal.
- Descripciones claras y comercialmente utiles.
- Secciones de beneficios, proceso, FAQ, CTA y ubicaciones.
- Buena orientacion a consultas como examen visual en Jaen, terapia visual en Jaen y control de miopia en Jaen.

Valor SEO:

- Estas landings ya tienen estructura suficiente para posicionar por consultas locales de servicio si se corrigen los problemas tecnicos alrededor.

### 2. La home tiene una base razonable

Puntos fuertes verificados:

- Title y description correctos y enfocados en Jaen.
- Canonical correcta.
- H1 claro.
- Contenido que refuerza autoridad local, historia de marca y especialidades.

### 3. El contenido editorial del blog tiene buena profundidad tematica

En el post revisado de control de miopia:

- Buena cobertura del tema.
- Jerarquia clara de H2 y H3.
- CTA final y conexion con el servicio.
- Relacion natural entre contenido informacional y servicio comercial.

Valor SEO:

- El blog puede funcionar bien como capa TOFU/MOFU para alimentar autoridad topical y apoyar los servicios clinicos.

### 4. El sitio si usa canonicals y meta robots de forma consistente en la mayoria de paginas indexables

Puntos positivos:

- Canonicals observadas correctas en home, servicios, contacto, quienes-somos, planveo y post de blog.
- Las rutas sensibles como cita y checkout tienen tratamiento noindex en codigo.
- Robots.txt de produccion no bloquea el sitio entero y referencia el sitemap.

---

## Detailed Analysis By Area

### Technical SEO

Estado general: mixto.

Bueno:

- Canonicals presentes.
- Host principal https://opticasuarezjaen.es consolidado desde http y www.
- Robots.txt razonable.

Deficiente:

- Sitemap con URLs invalidas.
- Sitemap promocionando endpoints rotos.
- /blog vacio con 200.
- /tienda y productos con 500.
- Hreflang mal implementado.

Lectura estrategica:

- Hoy el principal cuello de botella no es escribir mas contenido. Es restaurar la higiene tecnica del sitio indexable.

### On-Page SEO

Estado general: bueno en servicios, aceptable en corporativas, irregular en blog index.

Bueno:

- Paginas de servicios bien enfocadas a keywords locales.
- H1s unicos y bien alineados.
- Uso razonable de FAQs, proceso, beneficios y CTA.

Mejorable:

- Contacto y Quienes Somos pueden competir mejor en CTR con metas mas ricas.
- Blog index no aporta nada ahora mismo porque esta vacio en produccion.

### Local SEO

Estado general: contenido fuerte, datos estructurados inconsistentes.

Bueno:

- Las paginas mencionan Jaen de forma natural.
- El sitio enseña ubicaciones, mapas, horarios y puntos de contacto.
- Hay una narrativa de autoridad local clara: mas de 80 años, especializacion, dos centros.

Riesgo:

- El schema local contradice la informacion visible. Eso puede debilitar el valor de todas las señales locales del sitio.

### Structured Data

Estado general: base existente, pero incompleta y en parte incorrecta.

Implementado:

- WebSite
- Optician / negocio local global
- Product en detalle de producto
- Breadcrumb en blog index y tienda

Ausente o insuficiente:

- Article o BlogPosting en posts
- FAQPage en servicios con FAQs
- Service page-specific markup
- Breadcrumb en landings de servicio
- SearchAction funcional

---

## Root-Cause Mapping To Code

Hallazgos con causa tecnica clara:

1. Sitemap roto por falta de normalizacion de rutas.
2. /tienda y /tienda/$slug lanzan error generico cuando shopEnabled esta desactivado, provocando 500 en vez de 404 o exclusion del sitemap.
3. Hreflang se define globalmente en root apuntando siempre a la home.
4. SEO helper central fuerza og:type = website para todos los tipos de pagina.
5. SectionAccordion renderiza FAQ visual, pero no genera FAQPage JSON-LD.
6. El schema WebSite declara una busqueda que la ruta /blog no soporta.

Hallazgos con causa no cerrada pero sintoma claro:

7. /blog devuelve 200 con cuerpo vacio en produccion. El codigo de la ruta por si solo no explica ese resultado; parece mas un problema de build, prerender o despliegue que un simple fallo de copy o metadata.

---

## Prioritized Action Plan

### Hoy mismo

1. Corregir el sitemap para normalizar todas las rutas con slash inicial.
2. Sacar del sitemap toda URL que hoy devuelva 500, 404 o 200 vacio.
3. Resolver el 200 vacio de /blog.
4. Resolver el 500 de /tienda y de /tienda/* o devolver 404 si la tienda esta deshabilitada.
5. Alinear el JSON-LD local con las direcciones y telefonos reales visibles del negocio.

### Esta semana

1. Eliminar o corregir hreflang para que sea por pagina equivalente.
2. Implementar redirects 301 desde las URLs legacy de servicios.
3. Añadir Article o BlogPosting schema a posts.
4. Añadir FAQPage y Service schema a paginas de servicios prioritarias.
5. Sustituir el SearchAction por una busqueda real o eliminarlo.

### Proxima iteracion

1. Mejorar snippets de Contacto y Quienes Somos.
2. Pasar OG image de posts y servicios a imagenes especificas por pagina.
3. Añadir BreadcrumbList a servicios.
4. Generar lastmod reales desde Sanity o del pipeline de contenido.

---

## Final Assessment

Opticasuarezjaen.es tiene mejores fundamentos de contenido que muchos sitios locales del sector, especialmente en servicios de alta intencion como examen visual, terapia visual y control de miopia. Eso es una buena noticia: no hace falta reinventar la estrategia de contenido para mejorar visibilidad.

Pero el estado tecnico actual impide aprovechar bien ese potencial. Los problemas de sitemap, blog vacio, URLs de tienda rotas, hreflang incorrecto y schema local inconsistente no son detalles menores; son issues que afectan descubrimiento, confianza semantica y calidad general del sitio a ojos del crawler.

Mi conclusion es clara:

- El principal retorno inmediato no vendra de publicar mas contenido.
- Vendrá de reparar la capa de indexacion y consistencia semantica.
- Una vez hecho eso, el sitio ya tiene material suficiente para competir mejor en SEO local y para usar el blog como soporte editorial serio.

---

## Appendix: Evidence Snapshot

Verificado en vivo el 2026-04-20:

- Home: title, description, canonical y H1 correctos.
- Servicios principales: titles locales fuertes, H1 claros, FAQ y CTA presentes.
- Blog post muestreado: buen contenido, pero sin Article schema y con og:image generica.
- /blog: 200 con body vacio.
- /tienda: 500.
- URLs de producto muestreadas bajo /tienda/*: 500.
- /examen-visual y /terapia-visual legacy: 404.
- sitemap.xml: 35 URLs, incluyendo al menos 2 URLs malformadas.
