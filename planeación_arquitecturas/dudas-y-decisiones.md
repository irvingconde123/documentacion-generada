# Dudas y decisiones consolidadas

## 1. Modelo de negocio base

- El sistema debe estar preparado para mostrar experiencias según el negocio que lo inicializa.
- En la primera versión, el alcance mínimo será inventario para administradores, una experiencia de compra para clientes externos y una vista de ventas para administradores.

## 2. Tenancy y permisos

- El tenant se resolverá por subdominio y dominio, con fallback por header en ambientes controlados.
- El CMS y el sistema operativo no compartirán el mismo modelo de permisos.
- El CMS podrá administrar usuarios del sistema operativo, pero con una separación explícita de roles.

## 3. Datos y motores

- La primera versión usará PostgreSQL como motor principal.
- La arquitectura debe dejar preparada la resolución por adaptador, para que más adelante pueda probarse otro motor sin reescribir la lógica de negocio.
- Se recomienda usar una variable de entorno como `DATABASE_OPERATIONAL_URL` y crear una rama de Neon para el desarrollo sin afectar el proyecto actual.

## 4. Offline

- Las operaciones críticas serán offline-first: ventas, inventario, clientes y sincronización de diseño.
- La sincronización será bidireccional.

## 5. Observabilidad

- Se implementará una observabilidad seria con trazas, métricas y eventos de negocio separados de los logs técnicos.

## 6. Despliegue

- La arquitectura se tomará cercana a producción desde el inicio.
- No se incorporará Redis o mensajería en la primera iteración, pero sí se dejarán interfaces y puertos listos para integrarlos sin reescribir lógica.

## 7. Alcance del CMS

- El CMS administrará contenido, diseño, formularios, páginas y configuraciones operativas del negocio.
- Se incluirán bloques dinámicos y permisos por módulo.

## 8. Frontends

- La landing será un proyecto separado, pero obedecerá al mismo CMS.
- La versión móvil se implementará con Ionic + Capacitor, manteniendo un único código base para web y móvil.