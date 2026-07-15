# Estructura de carpetas para la landing

## Objetivo

La landing debe ser rápida, pública, SEO-friendly y orientada a conversión. Debe consumir contenido y formularios desde el CMS y enviar leads a la API.

## Estructura propuesta

```text
landing/
  src/
    app/
      core/
        config/
        routing/
        theme/
      features/
        home/
        about/
        services/
        contact/
      shared/
        components/
        layouts/
        services/
        adapters/
        dto/
      shell/
    public/
    styles/
```

## Responsabilidades por carpeta

### `core`

- Configuración global, routing, providers, tema y estado base.

### `features`

- Páginas del negocio, secciones y módulos de alto nivel.
- Cada feature debe concentrar su vista y lógica local.

### `shared`

- Componentes reutilizables, layouts y adaptadores de contenido.
- Aquí deben ir los contratos para consumir el CMS y la API.

### `shell`

- Estructura del layout general: header, footer, navegación y wrapper principal.

## Qué hará la landing

- Mostrar contenido dinámico del CMS.
- Capturar leads y formularios.
- Enviar información a la API.
- Mantener una capa de presentación simple, sin lógica operativa compleja.

## DTOs e interfaces recomendados

- `LandingPageDto`
- `LeadFormDto`
- `LeadSubmissionDto`
- `ContentAdapterPort`
- `LeadGatewayPort`

## Comunicación con otros proyectos

- Consume el CMS para contenido y diseño.
- Envía leads y formularios a la API.
- No debe manejar permisos del sistema ni lógica de inventario.
