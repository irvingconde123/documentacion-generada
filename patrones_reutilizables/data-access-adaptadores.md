# Patrón reutilizable: data-access, adapters y facades

## Regla base

Los componentes no deben llamar `HttpClient`, `fetch`, SQL, IndexedDB o SQLite directamente. Deben consumir facades/servicios de aplicación con modelos internos ya normalizados.

## Capas recomendadas en Angular

```text
Page/Component -> Facade/Feature Service -> Repository -> Source -> API/local storage
                                      `-> Adapter -> Modelo interno
```

## Contratos

- `contracts/`: DTOs externos tal como llegan de API/CMS.
- `models/`: modelos internos usados por UI.
- `adapters/`: convierten DTOs a modelos, agregan defaults, filtran valores inválidos.
- `sources/`: llamadas HTTP o fuentes locales.
- `repositories/`: eligen source, aplican adapter y exponen observables/promises.
- `facades/`: estado de pantalla, loading/error/empty, acciones semánticas.

## Cuándo usar source local y remoto

- App offline: source local primero, remoto después.
- Landing CMS: remoto como fuente oficial, fallback local solo para desarrollo/continuidad visual.
- CMS: servicios HTTP por módulo; agregar adapter cuando el DTO crece o se repite lógica en páginas.

## Anti-patrones vistos

- Usar DTOs externos directamente en templates.
- Poner reglas de permisos o tenant dentro de componentes visuales.
- Permitir CSS/HTML arbitrario desde CMS.
- Crear endpoints "genéricos" que acepten tabla, columna o SQL desde cliente.

## Plantilla mínima

```text
src/app/data-access/
|-- contracts/<context>.dto.ts
|-- models/<context>.model.ts
|-- adapters/<context>.adapter.ts
|-- sources/<context>-api.source.ts
`-- repositories/<context>.repository.ts
```

## Proyectos fuente

- `lab-frontend`: ejemplo más claro de DTO -> adapter -> repository -> facade -> renderer.
- `hostlyc-frontend-adastra`: ejemplo local-first y catálogos dinámicos.
- `Lab-CMS`: ejemplo de servicios por módulo CMS.
