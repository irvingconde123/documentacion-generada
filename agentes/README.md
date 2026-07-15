# Guia de Agentes - Equipo de Producto y Tecnologia

## Proposito

Esta carpeta define los agentes/roles que se usan para planear, disenar, construir, revisar, integrar y documentar productos digitales. La intencion no es que todos participen siempre, sino elegir el agente correcto segun el tipo de decision o trabajo pendiente.

Cada agente debe dejar claro:
- Que problema resuelve.
- Que entregables produce.
- Donde empieza y termina su responsabilidad.
- Con que otros agentes debe coordinarse.
- Que criterios usa para aceptar o rechazar trabajo.

## Como Elegir un Agente

| Necesidad | Agente recomendado | Cuando usarlo |
|---|---|---|
| Definir alcance, prioridades, riesgos o roadmap | Project Manager | Antes de iniciar una feature, sprint o cambio de scope. |
| Disenar la arquitectura general, limites entre sistemas o decisiones tecnicas grandes | Arquitecto de Software | Cuando hay impacto transversal, nuevos servicios, integraciones complejas o dudas de escalabilidad. |
| Construir APIs, servicios, reglas de negocio o jobs del servidor | Desarrollador Backend | Cuando el trabajo vive principalmente en la aplicacion backend. |
| Modelar datos, revisar indices, migraciones, performance de queries o integridad de datos | Administrador de Bases de Datos | Cuando el riesgo principal esta en persistencia, datos, migraciones o disponibilidad. |
| Crear interfaz, componentes, responsive, accesibilidad o performance visual | Desarrollador Frontend | Cuando la tarea vive principalmente en UI implementada. |
| Idear experiencia visual desde cero o auditar un modulo frontend terminado | Disenador UX/UI | Al inicio de una pantalla/flujo o al final de un modulo para revisar diseno, espaciado, legibilidad, color y consistencia. |
| Resolver una feature completa de baja/mediana complejidad de punta a punta | Desarrollador Fullstack | Cuando backend y frontend son acotados y no requieren arquitectura nueva ni decisiones profundas de datos. |
| Conectar modulos ya construidos, validar contratos y comprobar flujos end-to-end | Integrador | Cuando varias piezas existen y deben funcionar juntas sin romper contratos. |
| Revisar calidad, pruebas, regresiones, accesibilidad, seguridad y criterios de merge | QA/Calidad | Antes de merge, release o cierre de modulo. |
| Crear o mantener documentacion tecnica, guias, ADRs, changelog o manuales | Documentador | Durante y despues de cambios que deban ser entendibles por otros. |

## Agentes Disponibles

### 1. Disenador UX/UI
Archivo: [agente_diseñadorUX_UI.md](./agente_diseñadorUX_UI.md)

Disena experiencias desde cero, propone patrones visuales, revisa referencias y audita implementaciones frontend. Es especialmente util cuando se necesita criterio visual: jerarquia, espaciado, legibilidad, colores, estados, responsive y consistencia del design system.

Usalo para:
- Crear una pantalla, flujo o modulo visual desde cero.
- Revisar ejemplos externos y traer ideas adaptadas al producto.
- Auditar cada cambio al final de un modulo frontend.
- Definir o ajustar design tokens, componentes base y reglas visuales.

### 2. Arquitecto de Software
Archivo: [agente_arquitecto.md](./agente_arquitecto.md)

Define la direccion tecnica del sistema: limites entre dominios, arquitectura, contratos, decisiones de build/deploy, seguridad transversal y patrones de integracion. No debe absorber tareas de implementacion diaria salvo prototipos o decisiones criticas.

Usalo para:
- Separar monolito, backend, frontend, servicios o paquetes compartidos.
- Decidir entre REST, GraphQL, eventos, colas o jobs.
- Definir contratos, ADRs, limites de modulo y estrategia de escalabilidad.
- Revisar si una solucion es mantenible antes de invertir desarrollo.

### 3. Desarrollador Backend
Archivo: [agente_desarrollador_backend.md](./agente_desarrollador_backend.md)

Implementa la logica de negocio del servidor, APIs, validaciones, integraciones backend, autenticacion/autorizacion y pruebas del backend. Trabaja con el Arquitecto cuando hay decisiones estructurales y con el DBA cuando hay cambios sensibles de datos.

Usalo para:
- Crear endpoints, servicios, jobs, webhooks o integraciones server-side.
- Implementar reglas de negocio.
- Validar seguridad de inputs, permisos y errores.
- Escribir tests unitarios e integracion de backend.

### 4. Administrador de Bases de Datos
Archivo: [agente_dba.md](./agente_dba.md)

Cuida el modelo de datos, migraciones, indices, constraints, performance de queries, backups, recuperacion y calidad de datos. Es el rol que debe revisar cualquier cambio que pueda degradar integridad, disponibilidad o rendimiento de la base.

Usalo para:
- Disenar o revisar esquemas, relaciones e indices.
- Auditar migraciones antes de produccion.
- Investigar queries lentas, bloqueos o N+1.
- Definir politicas de backup, retencion y restauracion.

### 5. Desarrollador Frontend
Archivo: [agente_desarrollador_frontend.md](./agente_desarrollador_frontend.md)

Implementa la UI, componentes, estado cliente, integracion con APIs, accesibilidad y performance frontend. Debe seguir las especificaciones del Disenador UX/UI y pedir auditoria visual al cerrar modulos importantes.

Usalo para:
- Crear o refactorizar componentes.
- Integrar pantallas con APIs.
- Mejorar responsive, accesibilidad o performance.
- Crear pruebas de componentes y flujos visuales.

### 6. Desarrollador Fullstack
Archivo: [agente_fullstack.md](./agente_fullstack.md)

Ejecuta features completas cuando el alcance esta claro y el riesgo tecnico es moderado. Es ideal para vertical slices pequenos: formulario + endpoint + persistencia simple + pruebas + documentacion.

Usalo para:
- Prototipos funcionales.
- CRUDs o modulos acotados.
- Flujos completos con pocos puntos de integracion.
- Correcciones que cruzan frontend y backend sin requerir arquitectura nueva.

Evitalo cuando:
- Hay que definir arquitectura central.
- Hay migraciones peligrosas o modelo de datos complejo.
- Hay integraciones distribuidas con alto riesgo.
- El trabajo requiere revision visual profunda desde cero.

### 7. Integrador
Archivo: [agente_integrador.md](./agente_integrador.md)

Valida que piezas ya desarrolladas funcionen juntas. Se enfoca en contratos, configuracion, ambientes, flujos end-to-end, versionado y compatibilidad. No sustituye al Arquitecto: ejecuta y verifica la integracion dentro de una arquitectura definida.

Usalo para:
- Conectar backend, frontend, shared packages y servicios externos.
- Validar contratos compartidos.
- Resolver errores de ambiente, config o wiring.
- Ejecutar pruebas end-to-end de integracion.

### 8. QA/Calidad
Archivo: [agente_calidad_qa.md](./agente_calidad_qa.md)

Actua como filtro de calidad antes de merge o release. Revisa codigo, pruebas, regresiones, accesibilidad, seguridad, performance y cumplimiento de criterios de aceptacion.

Usalo para:
- Revisar PRs o entregables terminados.
- Rechazar trabajo incompleto o fragil.
- Crear casos de prueba funcionales y de regresion.
- Validar que se cumplan los estandares globales.

### 9. Documentador
Archivo: [agente_documentador.md](./agente_documentador.md)

Convierte decisiones, APIs, flujos y procesos en documentacion util. Mantiene READMEs, guias, ADRs, changelogs, diagramas, Storybook y referencias de usuario.

Usalo para:
- Documentar APIs, componentes o arquitectura.
- Crear guias de instalacion, deploy o troubleshooting.
- Mantener changelog y migration guides.
- Asegurar que una entrega pueda ser entendida y operada.

### 10. Project Manager
Archivo: [agente_project_manager.md](./agente_project_manager.md)

Ordena trabajo, alcance, dependencias, riesgos, fechas y comunicacion. No define la solucion tecnica final, pero fuerza claridad sobre que se hara, que no se hara y como se medira el cierre.

Usalo para:
- Convertir ideas en epics, historias y criterios de aceptacion.
- Priorizar backlog.
- Coordinar dependencias entre agentes.
- Manejar cambios de alcance y riesgos.

## Flujos Recomendados

### Feature nueva con UI y backend
1. Project Manager define alcance, criterios y riesgos.
2. Arquitecto decide limites, contratos y dependencias si la feature toca varias areas.
3. Disenador UX/UI disena o audita referencias visuales.
4. DBA revisa modelo de datos si hay nuevas tablas, indices o migraciones.
5. Backend implementa APIs y reglas.
6. Frontend implementa la experiencia.
7. Integrador valida contratos y flujo end-to-end.
8. QA revisa calidad, pruebas, accesibilidad y regresiones.
9. Documentador actualiza docs y changelog.

### Cambio pequeno y acotado
1. Fullstack implementa el cambio completo.
2. Disenador UX/UI audita si toca UI visible.
3. QA valida.
4. Documentador actualiza solo si cambia comportamiento, API o configuracion.

### Problema de performance
1. QA o Integrador reproduce y mide.
2. Arquitecto determina si es problema estructural.
3. DBA toma queries, indices, locks y almacenamiento.
4. Backend toma servicios, cache, colas y payloads.
5. Frontend toma render, bundle, assets y consumo de API.
6. Documentador registra causa raiz y solucion.

### Refactor o desacoplamiento
1. Arquitecto define objetivo, limites y plan incremental.
2. Project Manager convierte el plan en fases.
3. Backend/Frontend/DBA ejecutan segun capa.
4. Integrador valida compatibilidad entre fases.
5. QA protege regresiones.
6. Documentador crea ADR y guia de migracion.

## Estandares Globales

### Codigo
- TypeScript en frontend y backend cuando aplique.
- ESLint y Prettier sin errores.
- Archivos preferentemente menores a 300 lineas; cualquier excepcion debe justificarse.
- Responsabilidad unica por archivo, funcion y componente.
- Sin duplicacion innecesaria.
- Naming claro y consistente.
- Configuracion y secretos fuera del codigo.

### Testing
- Cobertura minima objetivo: 70%.
- Unit tests para logica critica.
- Integration tests para APIs, repositorios e integraciones.
- E2E para flujos de usuario criticos.
- Pruebas de migracion para cambios de base de datos con riesgo.
- Tests deben pasar antes de merge.

### Performance
- Frontend: Lighthouse objetivo >= 90 en pantallas clave.
- Backend: latencia objetivo < 500 ms en endpoints comunes, salvo operaciones justificadas.
- Base de datos: queries revisadas con EXPLAIN/ANALYZE cuando hay riesgo.
- Evitar N+1, payloads excesivos y renders innecesarios.

### Accesibilidad
- WCAG AA como base.
- Contraste suficiente.
- Navegacion por teclado.
- Foco visible y orden logico.
- Labels, roles y estados accesibles.

### Seguridad
- Validacion de inputs en cliente y servidor.
- Autorizacion por recurso, no solo por pantalla.
- Rate limiting donde aplique.
- Sin secrets en repositorio.
- Migraciones y backups revisados antes de produccion.
- Manejo de errores sin filtrar informacion sensible.

### Documentacion
- README por modulo relevante.
- Swagger/OpenAPI para APIs.
- ADRs para decisiones arquitectonicas.
- Changelog para cambios visibles o breaking changes.
- Guia de migracion cuando haya cambios de datos o contratos.

## Matriz RACI Simplificada

| Actividad | PM | Arq | DBA | Back | Front | UX/UI | Full | Int | QA | Doc |
|---|---|---|---|---|---|---|---|---|---|---|
| Alcance y prioridad | R | C | C | C | C | C | C | C | C | I |
| Arquitectura transversal | C | R | C | C | C | I | C | C | C | R |
| Modelo de datos | I | C | R | C | I | I | C | I | C | R |
| APIs y logica backend | I | C | C | R | I | I | R | C | C | R |
| UI implementada | I | I | I | I | R | C | R | C | C | R |
| Diseno visual y UX | C | I | I | I | C | R | C | I | C | R |
| Integracion end-to-end | C | C | C | C | C | I | C | R | C | R |
| Validacion de calidad | I | C | C | C | C | C | C | C | R | I |
| Documentacion final | I | C | C | C | C | C | C | C | C | R |

Leyenda: R = responsable principal, C = consultado, I = informado.

## Version

Ultima actualizacion: 2026-07-14  
Version: 2.0
