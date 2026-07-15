# Plan de pruebas de integracion

## Finalidad

Documento de coordinacion para validar que API, CMS, landing, sistema hibrido y contratos compartidos integran de forma segura antes de promover cambios desde `develop` hacia `release`.

Este plan no reemplaza las pruebas unitarias de cada repo. Define las validaciones transversales que deben pasar cuando un flujo cruza fronteras entre proyectos.

## Alcance

- API central: autenticacion, tenant, permisos, publicacion, leads, auditoria, sincronizacion y query executor contextual.
- CMS: login, seleccion de negocio, editor, publicacion, auditoria y consumo de permisos.
- Landing: consumo de contenido publicado, formularios de leads, SEO/cache.
- Sistema hibrido: operaciones offline, outbox, sincronizacion y modo offline forzado.
- Shared contracts: DTOs, enums, errores, versionado y compatibilidad entre productores y consumidores.

## Ambientes minimos

| Ambiente | Uso | Criterio de entrada |
|---|---|---|
| Local integrado | Validacion diaria entre repos | Servicios levantan con `.env.example` documentado y contratos locales compilados |
| Develop | Integracion continua entre agentes | Builds y tests basicos de cada repo pasan |
| Release | Validacion previa a produccion | Plan de integracion ejecutado con evidencia y sin bloqueadores criticos |

## Evidencia requerida

Cada ejecucion debe registrar:

- Fecha, rama, commit o version de cada repo involucrado.
- Variables relevantes sin secretos: modo de cifrado, base de datos, URL de API, origen de CMS/landing.
- Comandos ejecutados y resultado.
- Evidencia de fallos con request id, tenant id, usuario y operacion.
- Decision final: `aprobado`, `aprobado con observaciones`, `bloqueado`.

## Criterios para validar contratos

Un contrato compartido puede marcarse como `aceptado` solo si cumple todos estos criterios:

1. Existe en `repos/shared-contracts` con nombre estable, version y export publico.
2. Esta registrado en `coordinacion/contratos-agentes.md` con productor, consumidores, estado y version.
3. API y al menos un consumidor real compilan contra el contrato sin casts manuales ni duplicacion local del DTO.
4. El contrato esta reflejado en OpenAPI/Swagger o documentacion equivalente del productor.
5. Campos obligatorios, opcionales, nulos, enums, fechas, ids, moneda y paginacion tienen semantica explicita.
6. Errores esperados tienen formato comun: codigo, mensaje seguro, request id y detalle no sensible.
7. Cambios retrocompatibles mantienen consumidores existentes; cambios breaking exigen version nueva y ruta de migracion.
8. Se valida tenant, permisos y origen de datos en el productor, no en el consumidor.
9. Se cubren casos de payload valido, payload incompleto, payload con campos extra y payload con tipos invalidos.
10. Se registra evidencia de validacion antes de cambiar estado a `aceptado`.

## Matriz de pruebas

| Suite | Objetivo | Herramienta sugerida | Bloquea release |
|---|---|---|---|
| Cifrado correcto | Confirmar transporte y payload sensible protegidos | Playwright/Postman/Jest + inspeccion de logs | Si |
| Cifrado incorrecto | Confirmar rechazo seguro de payloads alterados o llaves invalidas | Jest/Postman | Si |
| Estres | Medir degradacion, errores y limites bajo carga | k6 | Si hay perdida de datos o errores criticos |
| Penetracion | Validar auth, permisos, tenant, headers y abuso basico | OWASP ZAP/Postman/manual guiado | Si |
| Inyeccion SQL | Confirmar parametrizacion y bloqueo de SQL libre | Jest/Postman/ZAP | Si |
| Contratos | Confirmar compatibilidad productor-consumidor | Build + contract tests | Si |

## Suite 1 - Cifrado correcto

### Casos

- API acepta requests HTTPS desde CMS, landing y sistema hibrido con configuracion valida.
- Campos sensibles viajan cifrados o protegidos segun el contrato del flujo: credenciales, tokens, datos personales, reportes y operaciones offline.
- Interceptor o middleware centralizado cifra/desencripta sin que controladores o componentes reimplementen la logica.
- Logs tecnicos no imprimen secretos, tokens, llaves, payloads cifrables en texto plano ni datos personales completos.
- Respuestas cifradas o protegidas son consumidas correctamente por CMS/landing/sistema hibrido.
- Rotacion de llave o version de cifrado mantiene compatibilidad durante la ventana definida.

### Criterio de aceptacion

- No hay datos sensibles en texto plano en transito ni en logs.
- Los consumidores procesan respuestas validas sin bypass local.
- Todo fallo incluye request id y mensaje seguro.

## Suite 2 - Cifrado incorrecto

### Casos

- Request sin encabezado/version de cifrado requerido.
- Payload con IV/nonce faltante, tag faltante, formato corrupto o base64 invalido.
- Payload alterado despues de cifrar.
- Llave incorrecta o version de llave no reconocida.
- Reintento con nonce repetido si el flujo define proteccion anti-replay.
- Token valido con payload cifrado para otro tenant.

### Criterio de aceptacion

- API rechaza con `400`, `401` o `403` segun corresponda, sin revelar detalles criptograficos.
- No se ejecuta la operacion de negocio.
- No se persiste informacion parcial.
- El evento queda trazado con severidad de seguridad y sin exponer material sensible.

## Suite 3 - Estres

### Flujos minimos

- Landing envia leads concurrentes hacia API.
- CMS guarda borradores y publica contenido con multiples usuarios.
- Landing consume contenido publicado con cache habilitado.
- CMS solicita reportes de auditoria.
- Sistema hibrido sincroniza outbox con lotes de operaciones.

### Metricas

- Tasa de errores HTTP por endpoint.
- Latencia p50, p95 y p99.
- Throughput sostenido por minuto.
- Uso de CPU, memoria y conexiones a base de datos.
- Longitud de colas/outbox y reintentos.
- Integridad: registros duplicados, perdidos o fuera de tenant.

### Criterio de aceptacion inicial

- Sin errores 5xx sostenidos.
- Sin perdida ni duplicacion de operaciones confirmadas.
- p95 documentado por flujo critico y aceptado por el agente responsable.
- Degradacion controlada: rate limit, backpressure o cola, no caida silenciosa.

## Suite 4 - Penetracion

### Casos

- Acceso sin token a endpoints privados.
- Token expirado, token manipulado y token de otro tenant.
- Usuario con rol insuficiente intentando publicar, auditar o modificar configuracion.
- Enumeracion de ids entre tenants.
- CORS desde origen no permitido.
- Falta de headers de seguridad en respuestas publicas y privadas.
- Fuerza bruta de login o endpoints sensibles sin rate limit.
- Subida o envio de contenido con HTML/script cuando el contrato no lo permite.
- Exposicion de secretos en responses, bundles, logs o errores.

### Criterio de aceptacion

- No existe escalamiento de privilegios.
- No hay lectura/escritura cruzada entre tenants.
- Errores son seguros y trazables.
- Hallazgos altos o criticos bloquean release.

## Suite 5 - Inyeccion SQL

### Superficies

- Formularios de leads.
- Login y seleccion de negocio.
- Busquedas, filtros, ordenamientos y paginacion.
- Publicacion de contenido y configuracion de diseño.
- Solicitud de reportes de auditoria.
- Sync del sistema hibrido.
- Query executor contextual.

### Payloads base

- `' OR '1'='1`
- `'; DROP TABLE tenants; --`
- `admin'--`
- `1 UNION SELECT null`
- JSON con strings SQL en campos anidados.
- Filtros con nombres de columna no permitidos.
- Ordenamientos con expresiones SQL en lugar de claves logicas.

### Criterio de aceptacion

- Ningun endpoint acepta SQL libre desde frontend o cliente externo.
- Filtros y ordenamientos se expresan como intenciones logicas permitidas.
- Consultas usan parametros, repositorios o query builders seguros.
- Payloads maliciosos se guardan como texto inofensivo o se rechazan por validacion, segun el contrato.
- No se modifican tablas, permisos, tenants ni datos fuera del flujo esperado.

## Suite 6 - Validacion productor-consumidor

### Casos

- API produce responses que cumplen contratos consumidos por CMS, landing y sistema hibrido.
- CMS envia requests que API valida con el contrato compartido.
- Landing envia leads con `CreateLeadRequest` y maneja `CreateLeadResponse`.
- Sistema hibrido envia `SyncOperation` y maneja respuestas parciales/reintentos.
- Contratos rechazan campos faltantes, tipos invalidos y enums desconocidos.
- Version anterior de un contrato sigue funcionando durante la ventana de compatibilidad documentada.

### Criterio de aceptacion

- `shared-contracts` compila.
- Cada consumidor compila usando el paquete compartido.
- No existen DTOs duplicados para el mismo contrato en consumidores.
- Los cambios quedan registrados en `coordinacion/contratos-agentes.md`.

## Secuencia recomendada por release

1. Congelar versiones candidatas de repos involucrados.
2. Ejecutar build y tests basicos por repo.
3. Ejecutar validacion de contratos productor-consumidor.
4. Ejecutar cifrado correcto e incorrecto.
5. Ejecutar inyeccion SQL y penetracion basica.
6. Ejecutar estres sobre flujos criticos.
7. Registrar evidencia y decision en `coordinacion/estado-proyecto.md` o bitacora de release.

## Responsables

| Area | Responsable primario | Participan |
|---|---|---|
| Contratos | Agente 5 - Contratos y coordinacion | Agente productor y consumidores |
| Cifrado | Agente 1 - API y core | CMS, landing, sistema hibrido |
| Estres | Agente 5 - Coordinacion | Agente del flujo bajo prueba |
| Penetracion | Agente 1 - API y core | Agente 5 |
| Inyeccion SQL | Agente 1 - API y core | Consumidores que envian payloads |
| Evidencia release | Agente 5 - Coordinacion | Todos |

## Pendientes para convertir el plan en automatizacion

- Definir puertos y URLs oficiales de ambiente integrado.
- Documentar formato exacto de cifrado: headers, algoritmo, version, rotacion y manejo de nonce.
- Publicar coleccion Postman/Insomnia o suite equivalente.
- Agregar script k6 base para leads, publicacion, auditoria y sync.
- Definir umbrales numericos de latencia y concurrencia por flujo.
- Definir ubicacion de evidencias por release.
