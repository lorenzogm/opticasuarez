# Guía de Desarrollo

> Generado: 2026-03-30

## Prerrequisitos

| Herramienta | Versión | Notas |
|------------|---------|-------|
| Node.js | 22 | Requerido en `engines` |
| pnpm | 10.5.0 | Definido en `packageManager` |
| Git | Latest | Con Lefthook para hooks |

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/lorenzogm/opticasuarez.git
cd opticasuarez

# Instalar dependencias (todas las apps)
pnpm install
```

## Variables de Entorno

### apps/web

Crear archivo `.env` (o usar dotenvx):

```bash
# Sanity CMS
SANITY_PROJECT_ID=2a24wmex    # (default en código)
SANITY_DATASET=production       # (default en código)
SANITY_API_TOKEN=               # Solo para preview mode

# Email
RESEND_API_KEY=                 # Para envío de emails de citas
```

### apps/web-e2e

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000  # (default)
VERCEL_AUTOMATION_BYPASS_SECRET=           # Para tests contra Vercel
```

## Comandos de Desarrollo

Todos los comandos se ejecutan desde la **raíz del monorepo**.

### Desarrollo local

```bash
# Iniciar la app web en modo desarrollo
pnpm dev

# O iniciar una app específica
cd apps/web && pnpm dev           # Web app (puerto 3000)
cd apps/sanity-studio && pnpm dev # Sanity Studio
```

### Build

```bash
# Build de todas las apps
pnpm build

# Build de una app específica
cd apps/web && pnpm build
cd apps/sanity-studio && pnpm build
```

### Quality Checks

```bash
# ⚠️ EJECUTAR ANTES DE CADA PR
pnpm check

# Esto ejecuta (vía Turbo):
# - pnpm check:types   → TypeScript type checking
# - pnpm check:linter  → Biome linting/formatting
# - pnpm check:tests   → Tests unitarios (Vitest)
# - pnpm build         → Build validation
```

### Corrección automática

```bash
# Auto-fix Biome linting/formatting
pnpm fix
```

### Tests

```bash
# Tests unitarios (Vitest, monorepo-level)
pnpm check:tests

# Tests E2E
cd apps/web-e2e
pnpm test:e2e           # Headless
pnpm test:e2e:ui        # Con UI de Playwright
pnpm test:e2e:headed    # Con browser visible

# Tests E2E de apps/web (si existen)
cd apps/web
pnpm test:e2e
```

### Limpieza

```bash
pnpm clean              # Limpia todo (.turbo, dist, build, coverage)
pnpm clean:node_modules # Solo node_modules
```

## Git Hooks

**Lefthook** está configurado para pre-commit:
- Ejecuta `pnpm dlx ultracite fix` sobre archivos staged (JS, TS, JSON, CSS)
- Los archivos corregidos se re-añaden al staging automáticamente

## Convenciones de Código

### Nomenclatura de archivos

- **kebab-case** para todos los archivos y carpetas en `apps/web/src/`
  - ✅ `book-appointment.tsx`
  - ❌ `BookAppointment.tsx`

### Componentes React

- Nombres de componentes en **PascalCase** (dentro de archivos kebab-case)
- Imports siempre con rutas kebab-case

### Linter

- **Biome** con extensión de **Ultracite**
- Reglas relajadas: sin restricciones de console, at-rules, namespace imports
- Reglas de accesibilidad parcialmente desactivadas

## Flujo de Trabajo de PR

1. Crear branch desde `main`
2. Implementar cambios
3. Ejecutar `pnpm check` — TODO debe pasar
4. Si fallan checks: `pnpm fix` para auto-corrección
5. Crear PR hacia `main`
6. CI ejecuta `pr-checks.yml` (type check + lint + build)
7. Requiere review de **juanpeich** y/o **lorenzogm**
8. Merge a `main` → deploy automático a Vercel
