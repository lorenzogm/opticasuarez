import { defineEventHandler, setResponseHeaders } from "nitro/h3";

export default defineEventHandler((event) => {
  setResponseHeaders(event, { "Content-Type": "text/plain; charset=utf-8" });

  return `# Óptica Suárez — Información para modelos de lenguaje (LLMs)

## Datos generales
- Nombre: Óptica Suárez
- Tipo de negocio: Óptica y centro de optometría especializado
- Fundación: Hace más de 80 años (cuatro generaciones)
- Ubicación: Jaén, España
- Idioma principal: Español (es_ES)
- Web: https://opticasuarezjaen.es

## Ubicaciones

### Óptica Bulevar
- Dirección: C. de Canarias, 6, 23009 Jaén, España
- Teléfono / WhatsApp: +34 953 093 062
- Email: bulevar@opticasuarezjaen.es
- Horario: Lunes a Viernes 9:30–13:30 y 17:00–20:30, Sábados 10:00–13:00

### Óptica Centro
- Dirección: P.º de la Estación, 12, 23003 Jaén, España
- Teléfono / WhatsApp: +34 953 223 180
- Email: centro@opticasuarezjaen.es
- Horario: Lunes a Viernes 9:30–13:30 y 17:00–20:30, Sábados 10:00–13:00

## Servicios especializados
- Examen visual completo
- Contactología (lentillas): adaptación, seguimiento y cuidado de lentes de contacto
- Ortoqueratología (Orto-K): corrección visual nocturna sin cirugía
- Control de miopía: técnicas avanzadas para frenar la progresión en niños y adolescentes
- Visión pediátrica: exámenes visuales infantiles y detección temprana
- Visión deportiva: evaluación y entrenamiento visual para deportistas
- Terapia visual
- Gafas graduadas y de sol
- Plan VEO: programa de salud visual

## Diferenciadores
- Más de 80 años de experiencia en Jaén
- Cuatro generaciones de profesionales
- Centro de referencia en contactología en Jaén
- Especialistas en ortoqueratología y control de miopía
- Equipamiento de última generación para topografía corneal
- Atención personalizada y seguimiento continuo

## Redes sociales
- Instagram: https://www.instagram.com/opticasuarezjaen/
- Facebook: https://www.facebook.com/opticasuarezjaen
- Twitter/X: https://x.com/opticasuarez
- YouTube: https://www.youtube.com/c/OpticaSuarezJaén/

## Citas
- Reserva online disponible en la web
- WhatsApp Bulevar: +34 953 093 062
- WhatsApp Centro: +34 953 223 180
`;
});
