# Plantilla inicial de coordinación de proyectos separados

## 1. Estructura propuesta de trabajo

La coordinación se hará en una carpeta compartida, pero cada proyecto deberá vivir por separado y poder subirse a GitHub de forma individual.

```text
planeación_arquitecturas/
  README.md
  reglas-del-juego.md
  roadmap-sprints.md
  arquitectura-c4.md
  estado-proyecto.md

proyectos/
  landing/
    README.md
    package.json
    src/
    public/
    docs/
  sistema-hibrido/
    README.md
    package.json
    apps/
      web/
      desktop/
      mobile/
    shared/
    docs/
  cms/
    README.md
    package.json
    src/
    docs/
  api/
    README.md
    package.json
    src/
    test/
    docs/

shared/
  shared-contracts/
    package.json
    src/
  shared-core/
    package.json
    src/
  shared-ui/
    package.json
    src/
```

## 2. Reglas de organización

- `proyectos/` contiene cada proyecto independiente.
- `shared/` contiene recursos reutilizables, pero no debe mezclarse con el código de producción de un proyecto concreto.
- La carpeta `planeación_arquitecturas/` solo coordina y documenta, no reemplaza la estructura propia de cada repo.
- Cada proyecto debe poder tener su propio `package.json`, dependencias, pipeline y control de versiones.

## 3. Archivo base de coordinación

### `package.json`

```json
{
  "name": "business-platform-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "libs/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "libs/*"
```

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

## 4. Comandos base para crear cada proyecto

> No se ejecutan aquí; solo sirven como plantilla para iniciar el trabajo.

### API (NestJS)

```bash
pnpm create nestjs-app apps/api
```

### CMS (Angular o Next.js)

```bash
pnpm create vite apps/cms --template react-ts
```

O si se prefiere Angular:

```bash
npm install -g @angular/cli
ng new apps/cms
```

### Landing (Next.js o Astro)

```bash
pnpm create next-app apps/landing
```

### Sistema híbrido (Ionic + Capacitor + Electron)

```bash
npm install -g @ionic/cli
ionic start apps/sistema-hibrido tabs --type=react
```

Para Electron adicional:

```bash
npm install --save-dev electron electron-builder
```

## 5. Comandos para generar estructura interna

### API

```bash
cd apps/api
nest generate module auth
nest generate module tenant
nest generate module inventory
nest generate module sales
nest generate module sync
nest generate module observability
nest generate service query-executor
nest generate guard permissions
```

### CMS

```bash
cd apps/cms
ng generate module content
ng generate module design
ng generate module forms
ng generate module publishing
ng generate component shared/page-shell
ng generate service shared/api-client
```

### Landing

```bash
cd apps/landing
mkdir -p src/features/home src/features/contact src/shared/components
```

### Sistema híbrido

```bash
cd apps/sistema-hibrido
mkdir -p shared/domain shared/application shared/infrastructure shared/ui shared/storage shared/sync
```

## 6. Estructura por dominio recomendada

### API

```text
apps/api/src/modules/
  auth/
    domain/
    application/
    infrastructure/
    presentation/
  tenant/
  permissions/
  inventory/
  sales/
  customers/
  content/
  sync/
  query-executor/
  observability/
```

### CMS

```text
apps/cms/src/app/modules/
  auth/
  tenant/
  content/
  design/
  forms/
  permissions/
  users/
  publishing/
```

### Landing

```text
apps/landing/src/app/features/
  home/
  services/
  contact/
  about/
```

### Sistema híbrido

```text
apps/sistema-hibrido/shared/
  domain/
  application/
  infrastructure/
  ui/
  storage/
  sync/
```

## 7. Qué debe contener cada capa

### `domain`

- entidades, value objects, reglas y políticas

### `application`

- casos de uso, servicios de aplicación, orquestación

### `infrastructure`

- adaptadores, repositorios, clientes HTTP, persistencia y sincronización

### `presentation` o `features`

- vistas, formularios, componentes, rutas y pantallas

## 8. Reutilizables compartidos

### `libs/shared-contracts`

- DTOs
- interfaces
- enums
- tipos
- constantes

### `libs/shared-core`

- utilidades comunes
- validadores
- mapeadores
- helpers transversales

### `libs/shared-ui`

- componentes visuales reutilizables
- diseño base
- layouts compartidos
