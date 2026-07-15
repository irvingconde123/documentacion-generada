# Estado real del proyecto

## 1. Propósito de este documento

Este documento sirve como fuente de verdad operativa para saber:

- qué ya está definido,
- qué ya está implementado,
- qué falta por construir,
- qué depende de qué,
- y qué riesgos reales o potenciales deben gestionarse.

## 2. Estado general

### Estado actual de la planeación

- Implementado: documentación base de arquitectura, estructura de proyectos, reglas de juego, roadmap, repositorios locales iniciales, contratos compartidos, contratos de sesión híbrida/sync batch/outbox/idempotencia/cifrado/DTOs operativos, API base, módulo API `sync/offline`, API pública de sitio agregado y páginas por slug, persistencia PostgreSQL/Neon del espejo CMS usando `DATABASE_URL`, rama Neon `production_ecosistemaNegocio`, CMS funcional con login local, selector de negocio, shell lateral izquierda desplegable con iconos y scroll responsive, edición visual de bloques con alta/baja/reordenamiento, presets de laboratorio, páginas y menú conectados a API, vista espejo editable conectada a API, diseño separado, auditoría simulada, landing renderizando menú, páginas, hero, servicios, texto, galería/imágenes, métricas, organismos, misión, acreditaciones, CTA, footer y contacto desde API y sistema híbrido web inicial con Vite/Ionic React, Capacitor/Electron base y modo offline forzado visible.
- En progreso: integración de auth/permisos reales, refinamiento UX del CMS/sistema híbrido, adopción de contratos nuevos por API/sistema híbrido, coordinación de contratos entre API/CMS/Landing/Sistema híbrido y versionado draft/publish.
- Pendiente: SMTP real con adjunto XLSX, publicación versionada draft/publish, Media/upload formal, SEO administrable, cache incremental, query executor contextual, outbox real, idempotencia runtime y empaquetado nativo.
- Bloqueado: sync real y publicación productiva hasta cerrar contratos de cifrado, auth/permisos runtime, outbox/idempotencia y validación de payloads.

## 3. Lo que ya tenemos definido

### Arquitectura y alcance

- [x] Visión general del ecosistema multi-proyecto.
- [x] Separación conceptual entre landing, sistema híbrido, API y CMS.
- [x] Reglas de tenancy y permisos diferenciados.
- [x] Estrategia de offline-first y sincronización.
- [x] Enfoque en desacoplamiento mediante puertos, interfaces y adaptadores.
- [x] Roadmap por sprints y módulos.
- [x] Reglas de juego para desarrollo ordenado.

### Documentación base

- [x] Documentación de ideas y patrones reutilizables.
- [x] Estructura propuesta de carpetas por proyecto.
- [x] Reglas de calidad y límites de archivo.
- [x] Arquitectura de alto nivel tipo C4.

## 4. Lo que falta por definir o construir

### A. Definiciones contractuales

- [x] Definir contratos base iniciales entre API, CMS, landing y sistema híbrido.
- [x] Definir DTOs compartidos iniciales para auth, tenant, contenido, sincronización y leads.
- [ ] Definir interfaces transversales para puertos de repositorio, permisos y sincronización.

### B. Preparación de repositorios

- [x] Crear la estructura inicial real del repositorio de la API.
- [x] Crear la estructura inicial real del repositorio del CMS.
- [x] Crear la estructura inicial real del repositorio del landing.
- [x] Crear la estructura inicial real del repositorio del sistema híbrido.
- [x] Definir repositorios separados con coordinación central.

### C. Implementación inicial

- [ ] API: autenticación real, tenancy endurecido, permisos base y validación runtime.
- [x] API: persistencia PostgreSQL/Neon para conservar publicaciones CMS tras reiniciar.
- [x] CMS: módulo base de contenido y diseño.
- [x] CMS: navegación interna por secciones, edición visual básica de bloques y alertas temporales.
- [x] CMS: shell lateral izquierda siguiendo referencia Lab-CMS.
- [x] Landing: página inicial y formulario de lead.
- [x] Sistema híbrido: shell web base y modo offline forzado visible.
- [ ] Sistema híbrido: almacenamiento local real, idempotencia runtime y sincronización inicial por batch.

## 5. Dependencias entre elementos

### Dependencia 1: contratos compartidos

- La API, el CMS, la landing y el sistema híbrido dependen de un conjunto base de DTOs e interfaces.
- Si estos no se definen primero, se corre el riesgo de construir con contratos inconsistentes.

### Dependencia 2: API como base de negocio

- El CMS, la landing y el sistema híbrido dependen de la API para operaciones reales.
- Si la API no está disponible o no está bien definida, los demás proyectos no pueden avanzar con confianza.

### Dependencia 3: sincronización offline

- El sistema híbrido depende primero de una base de persistencia local y luego de la API para sincronizar.
- Si la capa offline no se define bien, el sistema puede quedar frágil o con lógica duplicada.

### Dependencia 4: diseño y contenido del CMS

- Landing y sistema híbrido dependen de que el CMS exponga un contrato estable de contenido y diseño.
- Si esto se retrasa, el front se queda con contenido duro o con lógica provisional.

## 6. Riesgos reales o potenciales

### Riesgo 1: acoplamiento temprano

- Si se empieza a construir sin puertos e interfaces claros, el sistema terminará acoplado a detalles técnicos.
- Mitigación: definir contratos compartidos y puertos desde el inicio.

### Riesgo 2: permisos mal modelados

- Si CMS y sistema operativo comparten el mismo modelo de permisos, aparecerán problemas de seguridad y de negocio.
- Mitigación: separar claramente roles, scopes y reglas por contexto.

### Riesgo 3: sincronización offline incompleta

- Si la lógica offline se implementa de forma improvisada, se pueden perder operaciones o duplicar registros.
- Mitigación: diseñar outbox, idempotencia y estados explícitos desde el principio.

### Riesgo 4: documentación desfasada

- Si la documentación no se actualiza con los cambios, el proyecto perderá claridad rápidamente.
- Mitigación: actualizar esta ficha cada vez que cambie el estado real.

### Riesgo 5: alcance demasiado amplio desde el inicio

- Si se intenta construir todo a la vez, se perderá velocidad y se fragmentará el trabajo.
- Mitigación: avanzar por sprints y dejar un MVP claro por proyecto.

### Riesgo 6: inconsistencias entre proyectos

- Si cada proyecto define su propio contrato sin coordinación, habrá duplicación y errores de integración.
- Mitigación: centralizar contratos base compartidos en una carpeta de recursos reutilizables.

## 7. Qué falta definir para evitar esos riesgos

- [ ] Definir un contrato inicial de autenticación y tenant.
- [ ] Definir un contrato inicial de contenido para landing y sistema.
- [ ] Definir un contrato inicial de sincronización offline.
- [ ] Definir una política de permisos por contexto.
- [ ] Definir los módulos mínimos del MVP para cada proyecto.
- [ ] Definir quién responde por cada proyecto y cuáles son sus dependencias.
- [ ] Definir cómo se reportará el estado real en cada iteración.

## 8. Tabla ejecutable de seguimiento

| Área | Responsable | Prioridad | Estado | Bloqueador | Próximo paso |
|---|---|---:|---|---|---|
| API base | Equipo backend | Alta | Implementado | Ninguno | Endurecer auth, permisos y validacion runtime |
| Auth y tenant | Equipo backend | Alta | Parcial | Falta auth real y scopes | Implementar guards y permisos por rol/tenant |
| Permisos CMS y sistema | Equipo backend | Alta | Definido, no implementado | Necesidad de enforcement runtime | Conectar roles Admin/Editor y scopes del sistema hibrido |
| CMS base | Equipo CMS | Alta | Implementado | Falta versionado y Media/SEO formal | Separar borrador/publicacion y crear Media/SEO |
| Landing MVP | Equipo frontend | Media | Implementado | Falta SEO/cache y bloques avanzados de laboratorio | Replicar referencia `Captura_*_Landing` con componentes estructurados |
| Sistema híbrido base | Equipo frontend | Alta | Parcial | Falta persistencia local y sincronizacion batch | Crear outbox real y pruebas offline |
| Contratos compartidos | Coordinación | Alta | Parcial | Contratos sync/cifrado pendientes de aceptacion | Validar productor-consumidor y marcar estados |
| Documentación por agente | Todos | Alta | Parcial | Faltaban bitacoras operativas concretas | Mantener `coordinacion/continuidad-operativa.md` y docs por repo |

## 9. Pendientes CMS registrados el 2026-07-13

- Separar en módulos/rutas completas: Resumen, Contenido, Páginas y menú, Estilos, SEO, Media, Auditoría y Usuarios.
- Separar publicación versionada real: guardar borrador y publicar como pasos distintos.
- Separar “guardar borrador” de “publicar” cuando exista versionado.
- Permitir ocultar bloques desde la UI; agregar, eliminar y reordenar ya está implementado.
- Ocultar o mover a modo avanzado ids internos, `slug` y JSON.
- Diferenciar visualmente éxito, advertencia y error en todos los flujos.
- Agregar estados vacíos/error en selección de negocio y auditoría.
- Extender editor espejo para posiciones, componentes avanzados, media y SEO.
- Extender el consumo de `CmsSiteMirrorResponse` hacia media, SEO y componentes avanzados cuando esos módulos existan.
- Formalizar Media/upload con biblioteca, texto alternativo, reutilización y validación de URLs/archivos.
- Mantener rama Neon `production_ecosistemaNegocio` separada de Adastra.
- API usa `DATABASE_URL` como variable preferida; `DATABASE_OPERATIONAL_URL` queda como compatibilidad temporal.
- Landing/CMS incorporan bloques de laboratorio inspirados en `Captura_*_Landing`: `metricStrip`, `logoStrip`, `mission`, `accreditations`, `ctaBand` y `footer`.

## 10. Regla permanente de auditoría UX/UI

- Todo cambio frontend debe ser auditado por el agente Diseñador UX/UI antes de darse por terminado.
- La auditoría debe revisar navegación, jerarquía visual, espaciado, colores, formularios, responsividad y texto entendible para personas no técnicas.
- Si el diseñador encuentra hallazgos bloqueantes, el agente responsable corrige y se repite el ciclo.
- Las evidencias deben incluir capturas o revisión local cuando el servidor pueda ejecutarse.

## 11. Comentarios y participación del usuario

Este apartado está abierto para decisiones, aclaraciones o validaciones que necesites aportar.

### Comentarios generales

- [Me gustaria que la API, el CMS y la landing fuera el primer entregable funcional, que es lo mas sencillo] Confirmar si deseas priorizar la API como primer entregable funcional.
- [Por ahora solo contenido y diseño, pero deja desacoplado todo para la integracion de permisos de una forma sencilla] Confirmar si quieres que el MVP del CMS priorice contenido y diseño o también permisos.
- [Con inventario] Confirmar si quieres que el sistema híbrido arranque con inventario o con ventas primero.
- [Si, debe ser independiente, pero consumiendo el CMS creado] Confirmar si prefieres que la landing sea un proyecto independiente desde el inicio.

### Comentarios por riesgo o decisión

- Riesgo 2: permisos mal modelados
  - Comentario: [Para CMS: Administrador (crear nuevos usuarios, pedir reportes de auditoria enviados a su correo del usuario, eliminar componentes y todo lo del editor o el resto de los roles), Editor (editar información, editar diseños, agregar paginas). Para el sistema hibrido deberá ser Administrador, Cliente (quien visita la app y compra), Usuario_funcional (se le asignan permisos conforme a las funciones disponibles, como vender, agregar inventario o así, a menos que el administrador se los quite)].
- Riesgo 4: documentación desfasada
  - Comentario: [La politica ya esta definida, siempre debe actualizarse conforme avanza].
- Riesgo 5: alcance demasiado amplio
  - Comentario: [Por ahora mostraremos la landing con diseño y texto proveniente del CMS, quisiera probar la funcionalidad de offline, asi que agrega la opcion de modo offline forzado].

## 12. Regla universal de documentación por agente

Cada agente deberá mantener su propia documentación de trabajo, con al menos:

- alcance de su tarea,
- estado actual,
- dependencias,
- bloqueadores,
- próximos pasos,
- y enlaces o referencias a la documentación global.

Además, cada agente deberá actualizar la documentación global del proyecto con el estado real de sus avances, ya que esto es una regla universal de coordinación.

## 13. Siguiente paso recomendado

El siguiente paso debería ser:

1. crear la estructura base real de la API,
2. definir los DTOs y contratos compartidos,
3. dejar documentado el MVP inicial de cada proyecto,
4. y actualizar este archivo con el estado real de cada avance.
