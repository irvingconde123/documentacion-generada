# Roadmap por sprint para construir el ecosistema

## Principio del roadmap

El desarrollo debe avanzar por capas: primero infraestructura base, luego negocio core, luego experiencia de usuario y finalmente observabilidad y escalabilidad.

## Sprint 0 — Fundación y arquitectura base

### Objetivo

Establecer la base técnica compartida del ecosistema.

### Entregables

- Estructura de monorepo o repositorios separados con acuerdos de integración.
- Propuesta de variables de entorno y configuración base.
- Definición de contratos base entre landing, sistema, API y CMS.
- Diseño base de tenancy, autenticación y permisos.
- Definición de puertos, interfaces y adaptadores para acceso a datos.

### Proyectos involucrados

- API
- CMS
- Landing
- Sistema híbrido

---

## Sprint 1 — API base y autenticación

### Objetivo

Levantar la API principal con autenticación, tenant y permisos básicos.

### Entregables

- NestJS base con estructura modular.
- Módulo de autenticación.
- Resolución de tenant por subdominio/dominio/header.
- Módulo de permisos diferenciados para CMS y sistema.
- Contratos iniciales para contenido, usuarios y operaciones básicas.
- Base de observabilidad y logging estructurado.

### Proyectos involucrados

- API

---

## Sprint 2 — CMS base y modelo de contenido

### Objetivo

Construir el CMS para administrar contenido, diseño y configuración del tenant.

### Entregables

- Panel de administración base.
- Gestión de tenant y negocio.
- Gestión de bloques, páginas y formularios.
- Módulo de permisos del CMS.
- API de publicación de contenido y diseño.
- Contrato de contenido público para landing y sistema.

### Proyectos involucrados

- CMS
- API

---

## Sprint 3 — Landing MVP

### Objetivo

Entregar una landing funcional que consuma contenido y formularios desde el CMS y la API.

### Entregables

- Landing con home, beneficios, contacto y formulario de leads.
- Integración con el CMS para contenido dinámico.
- Envío de leads a la API.
- Estructura de SEO básica y caché de contenido público.

### Proyectos involucrados

- Landing
- API
- CMS

---

## Sprint 4 — Sistema operativo base

### Objetivo

Levantar la base del sistema híbrido para usuarios operativos.

### Entregables

- Shell base para web, desktop y móvil.
- Autenticación y resolución de tenant en el sistema.
- Vista inicial de inventario y ventas.
- Integración con la API para datos operativos.
- Estructura base para persistencia local.

### Proyectos involucrados

- Sistema híbrido
- API

---

## Sprint 5 — Offline-first y sincronización

### Objetivo

Hacer que el sistema funcione sin conexión y sincronice operaciones correctamente.

### Entregables

- Persistencia local con SQLite o equivalente.
- Outbox y cola de reintento.
- Sincronización bidireccional de operaciones locales.
- Reconciliación de estados de éxito y error.
- Manejo de conflictos y reintentos por operación.

### Proyectos involucrados

- Sistema híbrido
- API

---

## Sprint 6 — Módulos operativos clave

### Objetivo

Ampliar el sistema con los módulos core más valiosos para el negocio.

### Entregables

- Inventario completo con stock y movimientos.
- Módulo de ventas básico con flujo de compra.
- Módulo de clientes y perfiles.
- Vistas de administración para monitorear operaciones.

### Proyectos involucrados

- Sistema híbrido
- API

---

## Sprint 7 — Observabilidad y auditoría

### Objetivo

Hacer que la plataforma sea monitoreable y auditable.

### Entregables

- Dashboard de trazas y métricas.
- Registro de eventos de negocio y técnicos separados.
- Auditoría de acciones sensibles por tenant.
- Contrato observatory para monitorear cambios de comportamiento y errores.

### Proyectos involucrados

- API
- CMS
- Sistema híbrido

---

## Sprint 8 — Escalabilidad y preparación para producción

### Objetivo

Preparar el sistema para crecimiento y despliegue real.

### Entregables

- Integración preparada para Docker y despliegue distribuido.
- Interfaces listas para Redis, mensajería o workers.
- Estrategia de backups y recuperación.
- Validación de rendimiento básico y seguridad.
- Documentación operativa de despliegue.

### Proyectos involucrados

- API
- CMS
- Sistema híbrido
- Landing
