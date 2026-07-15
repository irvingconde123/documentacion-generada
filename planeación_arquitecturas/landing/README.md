# Landing

## Propósito

Servir como portal de presentación del negocio, captar leads y mostrar contenido dinámico controlado por el CMS.

## Decisiones consolidadas

- Será un proyecto separado, pero consumirá el mismo CMS y la misma API que el sistema.
- El contenido de la landing se renderizará a partir del CMS, no desde código duro.
- Cuando el CMS cambie el diseño o el contenido, la landing actualizará su caché local de forma incremental.
- La landing debe funcionar con internet, pero podrá almacenar en caché contenido público y formularios.

## Instrucciones de implementación

1. Implementar un frontend ligero y rápido orientado a SEO.
2. Consumir contenidos publicables desde un contrato de CMS y un adapter de presentación.
3. Separar la lógica de negocio de la visualización.
4. Mantener formularios y leads bajo una entrada explícita a la API.

## Estructura sugerida

```text
landing/
  src/
    app/
      core/
      features/
      shared/
      shell/
    public/
    styles/
  docs/
```

## Responsabilidades por carpeta

- core: configuración global, rutas, providers, tema y setup de tenant
- features: páginas de inicio, beneficios, contacto, productos y formularios
- shared: componentes visuales reutilizables, utilidades y adaptadores de contenido
- shell: layout base, navegación y composición de páginas

## Reglas de arquitectura

- No depender directamente de lógica operativa compleja.
- Consumir la API a través de puertos, contratos y adaptadores.
- Mantener el contenido configurable por tenant.
- Evitar lógica de permisos de negocio en la UI.

## Comunicación esperada

- Pide a la API: leads, formularios, contenido público y validaciones
- Responde la API: estados de envío, mensajes y datos normalizados
- Pide al CMS: bloques, páginas, contenido editorial y diseño base
- Responde el CMS: estructuras de contenido ya normalizadas para renderizar
