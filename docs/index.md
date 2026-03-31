# Documentación del Proyecto — Óptica Suárez

> Generado: 2026-03-30 | Modo: initial_scan | Nivel: deep

## Visión General del Proyecto

- **Tipo:** Monorepo (pnpm workspaces + Turborepo) con 3 apps activas
- **Lenguaje principal:** TypeScript
- **Arquitectura:** Jamstack / Headless CMS con SSR híbrido
- **URL:** https://opticasuarezjaen.es

## Referencia Rápida

### Web App — TanStack Start (principal)

- **Stack:** TanStack Start + React 18 + Tailwind CSS 4 + Nitro + Vite 7
- **Entry Point:** `apps/web/src/routes/__root.tsx`
- **Patrón:** SSR híbrido + pre-rendering estático
- **Ruta:** `apps/web/`

### Sanity Studio (CMS)

- **Stack:** Sanity Studio v3 + React 18
- **Entry Point:** `apps/sanity-studio/sanity.config.ts`
- **Project ID:** 2a24wmex | Dataset: production
- **Ruta:** `apps/sanity-studio/`

### Web E2E (Tests)

- **Stack:** Playwright
- **Ruta:** `apps/web-e2e/`

---

## Documentación Generada

### Arquitectura

- [Visión General del Proyecto](./project-overview.md)
- [Arquitectura — Web (TanStack Start)](./architecture-web-tanstack.md)
- [Arquitectura — Sanity Studio](./architecture-sanity-studio.md)
- [Arquitectura de Integración](./integration-architecture.md)

### Modelo de Datos y API

- [Modelo de Datos — Sanity CMS](./data-models-sanity.md)
- [Contratos API / Server Functions](./api-contracts-web-tanstack.md)

### Componentes e Interfaz

- [Inventario de Componentes UI](./component-inventory-web-tanstack.md)

### Desarrollo y Operaciones

- [Guía de Desarrollo](./development-guide.md)
- [Guía de Despliegue](./deployment-guide.md)
- [Árbol de Fuentes Anotado](./source-tree-analysis.md)

---

## Documentación Existente (pre-generación)

- [README.md](../README.md) — Descripción general del repositorio
- [Copilot Instructions](../.github/copilot-instructions.md) — Reglas de desarrollo y estilo

---

## Empezar

### Desarrollo local

```bash
pnpm install
pnpm dev
```

### Antes de cada PR

```bash
pnpm check    # TypeScript + Biome + Build + Tests
```

### Para planificar nuevos features

Utiliza este `index.md` como input para workflows de planificación (PRD, epics, stories).
- Para features de UI → consulta [Arquitectura Web](./architecture-web-tanstack.md) + [Componentes](./component-inventory-web-tanstack.md)
- Para features de datos → consulta [Modelo de Datos](./data-models-sanity.md) + [API Contracts](./api-contracts-web-tanstack.md)
- Para features full-stack → consulta [Integración](./integration-architecture.md)
