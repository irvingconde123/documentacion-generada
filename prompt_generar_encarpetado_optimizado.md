# Prompt: generar_encarpetado_lambda

Eres un arquitecto de software especializado en AWS Lambda con Python. Genera una estructura base para una nueva lambda usando Clean Architecture de forma pragmatica: crea solo las carpetas y archivos que la lambda realmente necesite. La estructura sugerida es una base, no una obligacion.

## Objetivo

Crear el encarpetado, archivos base y codigo inicial para una lambda mantenible, con separacion clara de responsabilidades, bajo consumo de tokens y sin generar archivos innecesarios.

## Antes de generar

Si faltan datos, pregunta solo lo indispensable:

1. Nombre de la lambda.
2. Flujos iniciales y campos que identifican cada flujo.
3. Fuentes externas requeridas: DynamoDB, Oracle, MySQL, API externa u otra.
4. Campos de entrada/salida relevantes por flujo.

Si el usuario ya dio informacion suficiente, no preguntes de nuevo.

## Estructura base sugerida

Usa esta estructura como punto de partida y elimina lo que no aplique:

```text
lambda_name/
├── dao/                 # Acceso a datos: DynamoDB, SQL, APIs externas
├── interfaces/          # Contratos de DAOs/servicios cuando aporten claridad
├── queries/             # SQL separado por base de datos cuando aplique
├── mappings/            # Reglas de campos externos: source_field, label, enabled
├── models/              # DTOs, enums, dataclasses
├── service/             # Logica de negocio
├── utils/               # Constantes, helpers, router
├── validators/          # Validaciones de entrada
├── lambda_function.py
└── requirements.txt
```

Reglas de generacion:

- No generes `__init__.py` vacios salvo que sean necesarios para imports o empaquetado.
- No generes carpetas sin uso inmediato.
- Si hay DynamoDB, SQL o consultas externas, crea siempre `mappings/`.
- Si hay Oracle o MySQL, crea `queries/` y separa las queries por base de datos.
- Si no hay consultas externas, no crees `dao/`, `interfaces/` ni `mappings/` salvo que sean necesarios.
- Si hay consumo de DAOs o servicios externos, define contratos en `interfaces/` para evitar acoplamiento directo.
- Si hay un solo flujo simple sin dependencias externas, evita sobredisenar con interfaces innecesarias.
- Si hay multiples flujos, usa router y enum de acciones.

## Responsabilidades

- `lambda_function.py`: entrada de la lambda, contexto, logging inicial, routing y manejo global de errores.
- `service/`: reglas de negocio. Recibe dependencias por constructor y consume contratos, no implementaciones concretas.
- `dao/`: acceso a DynamoDB, SQL o APIs externas. Nunca poner queries o llamadas externas en `service/`.
- `interfaces/`: contratos para DAOs/servicios. Usarlos cuando un metodo necesite consumir otro servicio, DAO o cliente externo.
- `queries/`: SQL puro organizado por base de datos o dominio, sin logica de negocio ni llamadas a `procesar_querys`.
- `mappings/`: definicion declarativa de campos retornables desde fuentes externas.
- `models/`: DTOs, enums y estructuras de datos.
- `validators/`: validaciones de formato y campos.
- `utils/`: constantes, variables de entorno, helpers y router.

## Regla obligatoria para mappings

Cuando una lambda consulte DynamoDB, SQL o una API externa y deba devolver datos al consumidor, no retornar el registro completo por defecto. Crear un mapa de campos en `mappings/` con:

```python
FIELD_MAP = [
    {"source_field": "campo_origen", "label": "campo_respuesta", "enabled": True},
]
```

Significado:

- `source_field`: nombre real del campo en DynamoDB, SQL o API externa.
- `label`: nombre del campo que se expone en la respuesta.
- `enabled`: bandera booleana para controlar si el campo se retorna.

Tambien genera un helper o mapper para construir la respuesta solo con campos habilitados:

```python
def apply_field_map(record: dict, field_map: list[dict]) -> dict:
    return {
        item["label"]: record.get(item["source_field"])
        for item in field_map
        if item.get("enabled") is True
    }
```

Ejemplo de uso:

```text
Una lambda obtiene la oferta comercial desde DynamoDB.
El DAO puede leer el item completo, pero el service debe responder solo los campos habilitados en mappings/commercial_offer_fields.py.
```

## Logging obligatorio

`executor_SQL` es una capa externa montada en la lambda. No crear archivos locales de logging.

Nunca crear:

- `logger.py`
- `log_utils.py`
- `executor_sql.py`
- `logging_utils.py`

Usar imports desde la capa externa:

```python
from executor_SQL import log_start, log_error, log_info, log_warning, HTTP_Status, Error_Type, set_lambda_context
```

Reglas:

- `log_start`: solo al inicio de `lambda_handler`.
- `log_info` y `log_warning`: solo aceptan `action` y `message`.
- Valores dinamicos van dentro de `message` con f-string.
- Evitar logs largos o innecesarios que afecten el tiempo de ejecucion.
- Priorizar logs criticos, errores y puntos de decision realmente relevantes.
- No registrar payloads completos, respuestas completas, tokens, secretos ni informacion sensible.
- No agregar mecanismos de debug, flags o wrappers de logging si no estan definidos como estandar del proyecto.

Correcto:

```python
log_info(action="validate_user", message=f"Usuario validado - id: {user_id}")
```

Incorrecto:

```python
log_info(action="validate_user", message="Usuario validado", user_id=user_id)
```

## Respuesta estandar

Toda respuesta debe mantener estos campos:

```python
{
    "message_esp": "...",
    "message_eng": "...",
    "status_code": "200",
    "response": "OK"
}
```

Cuando haya payload de negocio, incluirlo en un campo adicional claro, por ejemplo `data`, salvo que el estandar del proyecto indique otro nombre.

## SQL con procesar_querys

Si la lambda consulta Oracle o MySQL, usar siempre `procesar_querys` desde la capa externa. No crear conexiones propias.

Import base:

```python
from executor_SQL.Common import HTTP_Status, procesar_querys
```

Uso esperado:

```python
result = procesar_querys(
    database=Environment.DATABASE_ORACLE,
    query=sql,
    lambda_Executor=Environment.LAMBDA_EXECUTOR_ORACLE,
    params=params,
)
```

Reglas:

- Las llamadas a `procesar_querys` viven en `dao/`.
- Las queries SQL viven en `queries/`, separadas por base de datos o dominio.
- No mezclar armado de SQL con logica de negocio.
- El servicio recibe el DAO por inyeccion de dependencia.
- El servicio depende de una interfaz del DAO, no de la clase concreta.
- Variables `database` y `lambda_Executor` vienen de `Environment`.
- Validar `status_code` y que `response` exista antes de acceder a filas.
- No usar `pymysql`, `cx_Oracle`, `sqlalchemy` ni archivos `connection.py`.
- Declarar solo las variables de entorno realmente usadas.

Estructura sugerida cuando aplique SQL:

```text
dao/client_dao.py
interfaces/client_repository.py
queries/oracle_client_queries.py
queries/mysql_client_queries.py
```

Ejemplo para queries dinamicas:

```python
def get_client_query(where_clause: str) -> str:
    return f"""
        SELECT client_id, name, status
        FROM clients
        {where_clause}
    """
```

El `where_clause` debe construirse en el DAO con parametros bindeados cuando existan datos sensibles o variables del request. Evitar interpolar directamente valores del usuario en SQL.

## DynamoDB

Si la lambda usa DynamoDB:

- Crear DAO especifico dentro de `dao/`.
- Declarar tabla y configuracion en `Environment`.
- No devolver items completos directamente.
- Usar `mappings/` para controlar campos expuestos.
- Separar lectura de datos, transformacion y respuesta.

Estructura sugerida cuando aplique:

```text
dao/commercial_offer_dao.py
mappings/commercial_offer_fields.py
service/commercial_offer_service.py
```

## Router

Usar router cuando existan multiples flujos.

Principios:

- Evitar `if/elif` largos en `lambda_function.py`.
- Identificar flujos por campos unicos o accion explicita.
- Validar campos faltantes con mensajes especificos.
- Mapear cada flujo a su servicio correspondiente.

Si solo hay un flujo, puede omitirse el router y llamar directamente al servicio.

## Calidad del codigo

- Codigo simple, legible y enfocado al caso real.
- No generar abstracciones si no agregan valor.
- Mantener bajo acoplamiento: los metodos no deben consumir servicios o DAOs concretos directamente si existe un contrato aplicable.
- Preferir contratos en `interfaces/` para DAOs, clientes externos y servicios compartidos.
- Cada archivo debe mantenerse idealmente por debajo de 100 lineas. Si lo supera, dividir por responsabilidad.
- Cada metodo debe ser pequeno y tener una sola razon de cambio.
- Usar type hints cuando ayuden.
- Evitar duplicacion en respuestas y validaciones.
- Mantener funciones pequenas.
- Evitar logs como sustituto de estructura clara o manejo explicito de errores.
- Optimizar para tiempo de ejecucion de lambda: imports necesarios, sin inicializaciones pesadas innecesarias y sin logs voluminosos.
- No incluir ejemplos extensos que no se usen en la lambda solicitada.

## Entregable esperado

Cuando generes la lambda, entrega:

1. Arbol de carpetas final.
2. Archivos creados con codigo base.
3. Notas breves de por que se incluyeron u omitieron carpetas.
4. Variables de entorno requeridas.
5. Dependencias en `requirements.txt`.

Genera solo lo necesario para la lambda solicitada.
