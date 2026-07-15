# Sistema híbrido

## Propósito

Implementar una solución operativa para negocios con funcionamiento web, escritorio y móvil, orientada a operaciones diarias y uso en contexto real.

## Decisiones consolidadas

- La experiencia operativa será compartida para web, desktop y móvil.
- Se usará Ionic con Capacitor para móvil y Electron para desktop.
- El sistema será offline-first y conservará operaciones locales hasta que la API confirme su procesamiento.
- La sincronización será bidireccional: el frontend podrá enviar operaciones offline y el backend podrá notificar cambios como nuevas configuraciones o diseño.
- El diseño del negocio se alimentará desde el CMS, pero la lógica operativa siempre provendrá de la API.

## Instrucciones de implementación

1. Mantener una capa de dominio independiente del canal.
2. Separar persistencia local, sincronización y operaciones de negocio.
3. Usar un outbox local para garantizar reintento e idempotencia.
4. Hacer que el canal solo defina la experiencia, no el comportamiento del dominio.

## Arquitectura propuesta

```text
sistema-hibrido/
  apps/
    web/
    desktop/
    mobile/
  shared/
    domain/
    application/
    infrastructure/
    ui/
```

## Responsabilidades por carpeta

- apps/web: experiencia operativa en navegador
- apps/desktop: shell Electron para escritorio
- apps/mobile: shell Ionic + Capacitor para móvil
- shared/domain: entidades y reglas de negocio
- shared/application: casos de uso y servicios de aplicación
- shared/infrastructure: adaptadores, storage, sincronización, conexiones
- shared/ui: componentes visuales compartidos

## Reglas de arquitectura

- La UI no debe hablar con bases de datos ni con servicios concretos.
- Debe usar puertos, adaptadores y repositorios.
- La capa de sincronización debe ser independiente del canal.
- El canal no define el negocio; define la experiencia.

## Comunicación esperada

- Pide a la API: operaciones, datos transaccionales, permisos, sincronización
- Responde la API: respuestas normalizadas, estados de operación y errores
- Pide al almacenamiento local: snapshot, outbox, pending queue
- Responde el almacenamiento local: datos offline y estados de sincronización
- Recibe del CMS: diseño, módulos, formularios y contenido contextual
- Responde el CMS: cambios de diseño y estructuras de UI para sincronizar
