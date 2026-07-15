# Arquitectura C4 de alto nivel

## 1. Contexto del sistema

El ecosistema está compuesto por cuatro proyectos principales:

- Landing: experiencia pública para captar leads y mostrar contenido.
- Sistema híbrido: experiencia operativa para usuarios del negocio, disponible en web, móvil y escritorio.
- API: núcleo de negocio y seguridad, encargado de validar permisos, resolver tenant y ejecutar operaciones.
- CMS: panel de administración para contenido, diseño, formularios, módulos y permisos del negocio.

## 2. Diagrama conceptual de alto nivel

```text
+-------------------+         +-------------------+
|      Landing      |<------->|        CMS        |
|  experiencia     |         |  administración  |
+-------------------+         +-------------------+
          |                                |
          |                                |
          v                                v
+-------------------+         +-------------------+
|        API        |<------->| Sistema Híbrido  |
| negocio y reglas |         | web / móvil / escritorio |
+-------------------+         +-------------------+
```

## 3. Descripción entendible

El CMS define cómo se debe ver y comportar el negocio. La landing y el sistema híbrido consumen esa configuración a través de la API. La API es el punto central que valida permisos, resuelve el tenant y ejecuta las operaciones del negocio. El sistema híbrido además puede trabajar offline y luego sincronizar sus cambios con la API.

## 4. Nivel de contenedores

### Landing

- Es un frontend público.
- Consume contenido del CMS y envía leads o formularios a la API.
- No maneja lógica operativa compleja.

### Sistema híbrido

- Es una aplicación operativa para usuarios del negocio.
- Funciona en web, móvil y escritorio.
- Usa almacenamiento local para trabajar offline y sincroniza con la API.

### API

- Es el corazón del ecosistema.
- Gestiona autenticación, tenant, permisos, negocio y sincronización.
- Actúa como frontera entre los fronts y las fuentes de datos.

### CMS

- Es la capa administrativa.
- Controla contenido, diseño, formularios, módulos y usuarios del negocio.
- Publica información para que landing y sistema puedan consumirla.

## 5. Comunicación entre proyectos

- Landing -> API: envía leads, formularios y consultas públicas.
- CMS -> API: publica contenido, diseño y configuración del negocio.
- Sistema híbrido -> API: ejecuta operaciones reales y sincroniza cambios offline.
- API -> Landing y Sistema Híbrido: devuelve datos normalizados y permisos válidos.
- CMS -> Landing y Sistema Híbrido: entrega diseño y contenido para renderizar.

## 6. Mensaje clave para compartir con otras personas

Este sistema está pensado como un ecosistema modular donde:

- el CMS decide la experiencia del negocio,
- la API decide el negocio real y la seguridad,
- el sistema híbrido opera sobre esa lógica,
- y la landing presenta el negocio al mundo externo.
