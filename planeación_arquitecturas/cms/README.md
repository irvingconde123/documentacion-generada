# CMS

## Propósito

Administrar contenido, diseño, módulos, formularios y configuraciones del negocio para el tenant, con una separación clara entre gestión operativa y consumo público.

## Decisiones consolidadas

- El CMS será el lugar desde donde se configure qué mostrar y cómo mostrarlo en landing y sistema.
- Debe manejar contenido público, diseño, módulos, formularios y permisos del negocio.
- Los permisos del CMS serán distintos a los del sistema operativo.
- El CMS podrá administrar usuarios operativos del sistema, pero no debe compartir la misma identidad ni los mismos permisos.
- La experiencia del negocio se resolverá desde el CMS y se enviará a la API para que los fronts la consuman.

## Instrucciones de implementación

1. Separar administración de contenido de negocio operativo.
2. Definir bloques y plantillas reutilizables por tenant.
3. Exponer un contrato estable para que landing y sistema consuman diseño y contenido.
4. Mantener un flujo de aprobación o publicación claro por tenant.

## Arquitectura propuesta

```text
cms/
  src/
    app/
      core/
      modules/
      shared/
      admin/
      public/
```

## Responsabilidades por carpeta

- core: autenticación, routing, entorno, seguridad y resolución de tenant
- modules: módulos de administración, contenido, formularios y configuración
- shared: componentes y utilidades comunes
- admin: panel de administración y gestión
- public: vista de previsualización y contenido consumido por la landing

## Reglas de arquitectura

- El CMS debe tener permisos propios distintos del sistema operativo.
- Debe consumir la API, no acceder directamente a bases de datos de negocio.
- Debe poder aprovisionar plantillas y contenido por tenant.
- Debe mantener un modelo de diseño desacoplado del código de los fronts.

## Comunicación esperada

- Pide a la API: contenido, permisos, configuración, aprovisionamiento y datos de negocio
- Responde la API: estructuras de contenido, reglas y estados
- Pide a la landing: bloques y páginas para renderizar
- Responde la landing: contenido listo para consumo
- Pide al sistema: contexto de configuración y diseño de módulos
- Responde el sistema: operaciones que deben reflejarse en la experiencia del tenant
