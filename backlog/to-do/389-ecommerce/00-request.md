# Issue #389 — Tienda: Ecommerce — carrito, checkout, pagos Redsys, envíos y cuentas de usuario

GitHub: https://github.com/lorenzogm/opticasuarez/issues/389

## Description

Implementar la funcionalidad completa de ecommerce para la tienda online de Óptica Suárez. Incluye: carrito de compra, checkout (como invitado y como usuario registrado), integración de pagos con Redsys (TPV virtual), gestión de envíos con GLS a península, recogida en tienda, registro de usuarios con historial de pedidos, y notificaciones por email.

**Esta issue es un placeholder** que será descompuesta en historias más pequeñas cuando se convierta en prioridad. Primero debe completarse el catálogo de productos (#385, #386, #387, #388).

## Requisitos del negocio (documentados)

### Carrito de compra
- Añadir productos al carrito desde la ficha de producto
- Ver y editar carrito (cambiar cantidades, eliminar productos)
- Persistencia del carrito (session/localStorage como mínimo)

### Checkout
- Checkout como invitado (sin registro obligatorio)
- Checkout como usuario registrado (con datos pre-rellenados)
- Formulario de datos: nombre, email, teléfono, dirección de envío
- Selección de método de envío:
  - **Envío a domicilio (península)**: 5,50€ fijo vía GLS
  - **Recogida en tienda**: Gratis (elegir entre Óptica Bulevar o Óptica Centro)
  - **Fuera de península**: Mostrar mensaje "Debemos consultar el precio de su envío. Contacte con nosotros."

### Pagos
- Integración con **Redsys REST API** (TPV virtual)
- Las credenciales del TPV virtual ya están disponibles
- Referencia API: https://pagosonline.redsys.es/desarrolladores-inicio/continar-integracion/

### Cuentas de usuario
- Registro con email y contraseña
- Login/logout
- Perfil con datos personales y dirección guardada
- Historial de pedidos realizados
- Compra como invitado siempre disponible como alternativa

### Notificaciones por email
- Email de confirmación de pedido al cliente
- Email de nuevo pedido a bulevar@opticasuarezjaen.es
- Email de consulta sobre un producto (nombre producto, URL, datos cliente, mensaje)

### Envíos
- Transportista: **GLS**
- Tarifa: 5,50€ a toda la península ibérica
- Recogida en tienda:
  - Óptica Bulevar: Av. de Andalucía, 3, 23006 Jaén
  - Óptica Centro: P.º de la Estación, 12, 23003 Jaén

## Acceptance Criteria

(A detallar cuando se descomponga esta issue. Criterios de alto nivel:)

- [ ] Carrito funcional con persistencia
- [ ] Checkout completo con formulario de datos y selección de envío
- [ ] Pago procesado correctamente vía Redsys
- [ ] Emails de confirmación enviados a cliente y tienda
- [ ] Registro de usuarios con historial de pedidos
- [ ] Checkout como invitado sin registro obligatorio
- [ ] Envío a península 5,50€ / recogida gratis / fuera de península: mensaje de contacto
- [ ] Seguridad: datos de pago nunca pasan por nuestro servidor (redirect a Redsys)

## Technical Context

### Relevant Existing Code
- `apps/web/src/actions/send-booking-emails.ts` — Patrón de server action + Resend para emails
- `apps/web/src/routes/cita.tsx` y `apps/web/src/routes/cita/` — Flujo multi-step existente (referencia para checkout)
- `apps/web/src/content/homepage.json` — Datos de las 2 ubicaciones (direcciones, teléfonos, emails)
- `apps/web/src/lib/sanity.ts` — Cliente Sanity para datos de productos

### Key Decisions Pending
- Stack de autenticación (Clerk, Auth.js, custom, etc.)
- Base de datos para pedidos y cuentas (Sanity no es ideal para datos transaccionales — considerar Turso, PlanetScale, Supabase, etc.)
- Integración GLS: ¿API de tracking o solo etiqueta manual?

## Scope

### In Scope
- Carrito de compra
- Checkout (invitado + registrado)
- Redsys payment integration
- Envío GLS (5,50€ península) + recogida en tienda (gratis)
- Registro de usuarios + historial de pedidos
- Emails transaccionales

### Out of Scope
- Facturación automática / generación de facturas
- Integración con software de gestión de la óptica
- Programa de fidelización / puntos
- Cupones de descuento (se puede añadir después)
- Devoluciones automatizadas

## Priority

Low — Se implementará después de completar el catálogo de productos (#385, #386, #387, #388). El dueño tiene las credenciales de Redsys disponibles cuando llegue el momento.

## Notes

- Depende de: #385 (esquemas), #386 (listado), #387 (detalle), #388 (navegación)
- Relacionado con: #210 (issue original "Comprar un producto")
- Esta issue será descompuesta en 4-6 historias más pequeñas cuando se priorice
- Para lentillas: el cliente compra el tipo, la óptica asigna graduación tras el pedido
- Las fotos de producto son mezcla de propias e importadas de fabricantes
- Idioma: todo en español, mercado peninsular
