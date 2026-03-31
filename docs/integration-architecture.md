# Arquitectura de Integración

> Generado: 2026-03-30

## Visión General

El monorepo contiene 3 aplicaciones activas que se integran entre sí:

```
┌───────────────────┐     GROQ API (CDN)      ┌──────────────────┐
│                   │◄─────────────────────────│                  │
│   Web App         │                          │  Sanity Studio   │
│   (TanStack       │     Preview API          │  (CMS Admin)     │
│    Start)         │◄─────────────────────────│                  │
│                   │     Presentation Tool     │                  │
│                   │◄─────────────────────────│                  │
└────────┬──────────┘                          └──────────────────┘
         │
         │ Resend API
         ▼
┌───────────────────┐
│   Resend          │
│   (Email Service) │
└───────────────────┘

┌───────────────────┐
│   Web E2E Tests   │──── HTTP ────► Web App (localhost:3000 / Vercel)
│   (Playwright)    │
└───────────────────┘
```

## Puntos de Integración

### 1. Web App ← Sanity CMS (Data Fetching)

| Aspecto | Detalle |
|---------|---------|
| **Protocolo** | HTTPS REST (GROQ queries como parámetros URL) |
| **CDN** | `https://2a24wmex.apicdn.sanity.io/...` (producción) |
| **API directa** | `https://2a24wmex.api.sanity.io/...` (preview) |
| **Autenticación** | Bearer token solo en preview mode |
| **Formato** | JSON (`{ result: T }`) |
| **Caching** | CDN de Sanity + Vercel Edge |
| **Revalidación** | Webhook `POST /api/revalidate` desde Sanity |

### 2. Web App → Resend (Email)

| Aspecto | Detalle |
|---------|---------|
| **Protocolo** | HTTPS REST (SDK Resend) |
| **Trigger** | Reserva de cita completada |
| **Emails** | Confirmación para el cliente + notificación a la óptica |
| **Auth** | API Key (`RESEND_API_KEY`) |
| **Criticidad** | No bloqueante — si falla, la reserva se procesa igualmente |

### 3. Sanity Studio → Web App (Preview)

| Aspecto | Detalle |
|---------|---------|
| **Mecanismo** | Sanity Presentation Tool |
| **Activación** | `/api/preview/enable` establece cookie |
| **Cookie** | `__sanity_preview` = "1" |
| **Efecto** | Server functions usan API directa en vez de CDN |

### 4. E2E Tests → Web App

| Aspecto | Detalle |
|---------|---------|
| **Framework** | Playwright |
| **Target** | `http://localhost:3000` (local) o URL de Vercel |
| **Browsers** | Chromium (+ Firefox, Webkit en local) |
| **Bypass Vercel** | Header `x-vercel-protection-bypass` con secret |

### 5. Sanity Studio → Vercel (Rebuild Trigger)

| Aspecto | Detalle |
|---------|---------|
| **Herramienta** | `RebuildSiteTool` custom en el Studio |
| **Propósito** | Trigger manual de rebuild/redeploy |

## Dependencias Compartidas

### Workspace: `@opticasuarez/configs`

Paquete `configs/` compartido como dependencia de workspace:
- Provee configuraciones base de TypeScript
- Consumido por: `apps/web`

### Contenido Estático: `content/`

Directorio de contenido compartido en la raíz:
- `content/blog/` — Artículos en Markdown
- `content/images/` — Imágenes del sitio
- `content/json/` — Datos JSON

## Flujo de Datos

```
1. Editor crea/edita contenido en Sanity Studio
2. Sanity almacena en su cloud (dataset: production)
3. Opcional: Sanity envía webhook a /api/revalidate → invalida caché
4. Usuario visita la web:
   a. Si ruta pre-renderizada → HTML estático de Vercel CDN
   b. Si ruta dinámica → SSR via Nitro → Server Function → Sanity CDN API
   c. Si preview mode → Server Function → Sanity API directa (sin caché)
5. Para citas:
   a. Usuario completa flujo de 5 pasos
   b. submitBooking → sendBookingEmails → Resend API
   c. Emails de confirmación enviados
```
