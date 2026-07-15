# Reglas del juego del ecosistema

## 1. Modelo de trabajo

Este ecosistema no se tratará como un monorepo tradicional. Se trabajará como un conjunto de proyectos independientes que conviven dentro de una misma carpeta de documentación y planeación, pero que deben poder subirse a GitHub por separado, con sus propios repositorios, versiones y ciclos de desarrollo.

### Regla base

- Cada proyecto debe vivir en su propia carpeta y ser independiente.
- No deben mezclarse dependencias, versiones, pipelines ni histories de Git entre proyectos.
- La carpeta de planeación solo será la fuente de coordinación, no el lugar donde se mezcle el código de todos los proyectos.
- Los proyectos deben poder clonarse, ejecutarse y desplegarse por separado sin depender de un workspace común.

## 2. Estructura esperada por proyecto

Cada proyecto deberá tener su propia estructura mínima:

```text
proyecto-nombre/
  README.md
  package.json o requirements.txt o pyproject.toml
  src/
  docs/
  tests/
  docker/
  .env.example
  .gitignore
```

### Reglas de organización

- Cada proyecto debe tener su propio `README.md` con alcance, arquitectura y estado.
- Cada proyecto debe documentar su propio setup y comandos.
- Cada proyecto debe mantener su propio control de versiones y despliegue.
- La documentación compartida solo debe centralizar decisiones de arquitectura, alcances y coordinación transversal.

## 3. Tecnologías base recomendadas

### API

- NestJS
- TypeScript
- PostgreSQL como motor principal
- Swagger/OpenAPI
- Jest para pruebas
- Docker para entorno local y despliegue

### Sistema híbrido

- Ionic + Capacitor para móvil
- Electron para escritorio
- React o Angular según la preferencia del equipo
- TypeScript
- SQLite o IndexedDB según el canal
- RxJS si se requiere programación reactiva

### Landing

- Next.js o Astro
- TypeScript
- SEO-friendly
- Consumo de API y CMS via contratos explícitos

### CMS

- Angular o Next.js
- TypeScript
- Diseño modular
- Consumo de API

## 4. Patrones y buenas prácticas que se reutilizarán

Se tomarán como base los aprendizajes documentados en la carpeta de documentación generada y en los patrones reutilizables:

### 4.1 Desacoplamiento por puertos e interfaces

- El negocio no debe depender directamente de bases de datos, clientes HTTP o persistencia específica.
- Todo acceso a datos debe pasar por interfaces.
- Los adaptadores deben resolver la implementación concreta.

### 4.2 Tenancy y permisos

- El tenant se resolverá en backend.
- Los permisos del CMS y del sistema operativo serán distintos.
- La autorización debe validarse en cada request.

### 4.3 Offline-first

- El sistema operativo debe guardar operaciones locales con suficiente contexto para reintentar.
- Debe existir outbox, reintento y sincronización posterior.
- La lógica offline no debe mezclarse con la UI.

### 4.4 Query executor contextual

- Las consultas deben ejecutarse por intención lógica, no por SQL libre desde cliente.
- Debe existir una capa que decida motor, fuente, permiso y contexto.

### 4.5 Observabilidad y trazabilidad

- Los logs técnicos y los eventos de negocio deben separarse.
- Debe existir trazabilidad clara por request, tenant, usuario y operación.

## 5. Errores que no debemos cometer

- No mezclar lógica de negocio dentro de componentes visuales.
- No acoplar el frontend a tablas, consultas o drivers concretos.
- No usar permisos del CMS para el sistema operativo sin diferenciarlos.
- No guardar lógica de sincronización dentro de pantallas.
- No permitir SQL libre desde el frontend.
- No hacer que el CMS sea otra base de datos de negocio.
- No duplicar reglas de negocio en varios proyectos.
- No trabajar con contratos ambiguos entre proyectos.
- No implementar features grandes sin dividirlas en tareas pequeñas y verificables.

## 6. Reglas de calidad

### Calidad técnica

- Todo cambio debe tener un propósito claro y documentado.
- Cada módulo debe tener una responsabilidad única.
- Los nombres deben ser explícitos y consistentes.
- La estructura debe ser fácil de rastrear por otros desarrolladores.
- Ningún archivo debe crecer de forma descontrolada. Si un archivo supera el límite recomendado, debe dividirse o extraerse.

### Límites recomendados por archivo

- Componentes Angular: máximo 250-300 líneas por TS y 300-400 por SCSS/HTML.
- Servicios/facades: máximo 250-350 líneas.
- Repositorios/API services: máximo 300 líneas.
- Controladores NestJS: máximo 200-250 líneas.
- Servicios NestJS: máximo 300-400 líneas; extraer repositorio o policy si crece.
- Repositorios SQL: máximo 300-400 líneas; separar por caso de uso.
- Si un archivo excede el límite, documentar la excepción o dividir por responsabilidad.

### Calidad de documentación

- Cada feature debe reflejarse en documentación breve y actualizada.
- Los cambios importantes deben dejarse registrados en el README o en un documento de cambios.
- La documentación debe ser fuente de verdad para alcance, estado y decisiones.

### Calidad de pruebas

- Se deben cubrir los flujos críticos.
- Las operaciones offline deben probarse con pérdida de red.
- Las reglas de permisos deben probarse por escenario.
- Los contratos de API deben validarse.

## 7. Cómo dividir tareas y alcances por agentes

Para evitar que los agentes trabajen encima de lo mismo o se peguen, las tareas deben dividirse por frontera clara.

### Reglas de trabajo por agente

- Cada agente encargado del proyecto deberá crear ramas solo cuando sea necesario.
- Se crearán ramas cuando se complete un módulo importante, una funcionalidad relevante o un fix significativo.
- Mientras tanto, el trabajo debe mantenerse en commits claros y frecuentes.
- No se deben crear ramas por cada cambio menor ni por tareas triviales.
- Los commits deben seguir el estándar de Conventional Commits.
- El formato recomendado es `type(scope): description`.
- Todo el tráfico de datos entre proyectos debe ir cifrado en tránsito.
- Se recomienda implementar un interceptor o middleware de cifrado/desencriptado centralizado por proyecto para proteger la información sensible.

### Agente 1 — API y arquitectura core

Responsable de:

- NestJS base
- autenticación y tenant
- permisos
- contratos y DTOs base
- query executor contextual
- observabilidad

### Agente 2 — Sistema híbrido

Responsable de:

- shell de web, móvil y escritorio
- persistencia local
- sincronización offline
- casos de uso operativos
- integración con la API

### Agente 3 — CMS

Responsable de:

- administración de contenido y diseño
- formularios dinámicos
- módulos de configuración
- publicación de contenido
- permisos del CMS

### Agente 4 — Landing

Responsable de:

- home, páginas públicas y formularios
- integración con CMS y API
- SEO y rendimiento
- experiencia de conversión

### Agente 5 — Documentación y coordinación

Responsable de:

- mantener la documentación centralizada
- registrar estado real de implementación
- actualizar alcances y riesgos
- definir contratos y decisiones compartidas

## 8. Reglas de coordinación entre agentes

- Cada agente debe trabajar sobre su proyecto y no modificar el de otro sin acuerdo previo.
- Los contratos deben definirse primero en la documentación compartida.
- Si un cambio afecta a varios proyectos, debe registrarse en la documentación central.
- No deben surgir cambios improvisados sin reflejarse en la fuente de verdad.
- Cada agente deberá documentar su propio avance, bloqueadores y decisiones en el documento global del proyecto.
- Debe existir una figura de coordinación, equivalente a un Project Manager o orquestador del proyecto, que supervise contratos, dependencias, aprobación de DTOs y estado general.
- Ese orquestador será quien avise a los agentes involucrados cuando otro proyecto solicite confirmación de un DTO o un cambio de contrato.
- El orquestador también debe registrar cuando un contrato ya fue cerrado, aprobado o necesita revisión.
- El orquestador debe recordar a cada agente que actualice la documentación pública al terminar una tarea o un módulo completo.
- Antes de implementar un DTO o interfaz compartido, el agente debe registrarlo en [contratos-agentes.md](contratos-agentes.md) para que el resto pueda revisarlo.

## 9. Estrategia de ramas y ambientes

La estrategia de ramas debe ser simple y ordenada para evitar regresiones y facilitar despliegues controlados.

### Estructura de ramas

- `master`: producción.
- `release`: copia de producción usada para pruebas seguras antes de pasar a producción.
- `develop`: base de todas las ramas de trabajo. Todas las ramas nuevas deben partir de `develop` y, cuando estén listas, deberán integrarse a `develop` mediante pull request.

### Reglas de flujo

- No trabajar directamente sobre `master` ni `release`.
- Toda nueva funcionalidad o fix importante debe partir de `develop`.
- Cuando una rama esté lista y sea estable, se integra a `develop`.
- Antes de pasar a `release` o `master`, se debe validar el flujo completo por CI/CD.
- Si ocurre un problema, se corrige en la rama correspondiente y se vuelve a integrar a `develop`.

### Reglas de despliegue

- Todo cambio debe pasar por CI/CD.
- Los despliegues deben ser controlados y trazables.
- `master` representa producción.
- `release` sirve como entorno de validación previo a producción.
- `develop` es la base de integración de trabajo diario.

## 10. Cómo leer esta documentación

Esta carpeta debe leerse en orden para entender el contexto completo del proyecto.

### Orden recomendado de lectura

1. [README.md](README.md)
   - sirve como introducción general al ecosistema.
2. [reglas-del-juego.md](reglas-del-juego.md)
   - define las reglas de trabajo, calidad, ramas, agentes y coordinación.
3. [plantillas-trabajo.md](plantillas-trabajo.md)
   - proporciona las plantillas de PR, commits y workflow operativo.
4. [arquitectura-c4.md](arquitectura-c4.md)
   - explica la arquitectura general del sistema de alto nivel.
5. [contratos-agentes.md](contratos-agentes.md)
   - define cómo proponer, revisar y registrar DTOs e interfaces compartidos entre agentes.
6. [estructura-carpetas-reales.md](estructura-carpetas-reales.md)
   - define cómo se organiza el trabajo por proyecto.
6. [roadmap-sprints.md](roadmap-sprints.md)
   - muestra la ruta de construcción por fases.
7. [estado-proyecto.md](estado-proyecto.md)
   - registra el estado real, pendientes, bloqueadores y riesgos.
8. Los documentos específicos por proyecto:
   - [api/README.md](api/README.md)
   - [cms/README.md](cms/README.md)
   - [landing/README.md](landing/README.md)
   - [sistema-hibrido/README.md](sistema-hibrido/README.md)

### Regla de mantenimiento

Cada vez que se cree un nuevo archivo de documentación en esta carpeta, debe actualizarse este apartado para mantener el orden de lectura y evitar que la documentación se vuelva dispersa o desfasada.

## 11. Reglas de calidad adicionales para documentación

- Todo nuevo documento debe ir acompañado de una finalidad clara.
- Debe indicar si es de arquitectura, de proceso, de estado o de implementación.
- Debe estar vinculado a un documento padre o a una sección de navegación.
- Si cambian decisiones, procedimientos o estado, la documentación relevante debe actualizarse en el mismo ciclo.

## 12. Reglas de calidad de código

- El código debe ser consistente y legible.
- Se debe evitar mezclar español e inglés en nombres de funciones, clases, variables o textos visibles.
- La convención de nombres debe ser consistente en todo el proyecto.
- Los métodos deben nombrarse según lo que hacen de forma explícita.
- Ejemplo: si un método obtiene usuarios, debe llamarse `obtener_usuarios()` o `obtenerUsuarios()` según la convención del proyecto; no `get_user()` ni variantes ambiguas.
- Se debe priorizar camelCase en el código.
- Si un componente tiene demasiada lógica, esa lógica debe extraerse a un servicio o a una capa de aplicación para mantener el componente simple.
- Los componentes deben orquestar; los servicios deben encapsular la lógica de negocio.
- Se debe evitar mezclar lógica de negocio con lógica de presentación.

## 9. Documentación central como fuente de verdad

Se deberá mantener una documentación central con:

- alcance actual del proyecto
- estado de implementación
- módulos completados y pendientes
- decisiones de arquitectura
- riesgos y bloqueos
- contratos compartidos
- tareas abiertas
- notas de implementación

### Documento base recomendado

- `planeación_arquitecturas/README.md` para visión general
- `planeación_arquitecturas/roadmap-sprints.md` para avance por fases
- `planeación_arquitecturas/estructura-carpetas-reales.md` para organización de carpetas
- `planeación_arquitecturas/plantilla-monorepo.md` para lineamientos iniciales
- un archivo `estado-proyecto.md` que refleje el estado real de ejecución

## 10. Estado real del proyecto

Debe existir siempre un estado claro que responda:

- ¿Qué está implementado?
- ¿Qué está en progreso?
- ¿Qué está pendiente?
- ¿Qué está bloqueado?
- ¿Qué ya fue validado?

### Formato recomendado

```text
Estado actual
- Implementado: X
- En progreso: Y
- Pendiente: Z
- Bloqueado: A
```

## 11. Regla de crecimiento ordenado

El proyecto debe crecer sin perder orden si se sigue esta regla:

1. Documentar primero.
2. Definir contratos.
3. Implementar por capas.
4. Validar con pruebas.
5. Registrar el estado real.

Si algo cambia, cambia primero la documentación y luego el código.
