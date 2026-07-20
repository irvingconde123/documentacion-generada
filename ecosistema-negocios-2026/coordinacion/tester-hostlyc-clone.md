# Agente Tester - Prueba de clonacion Hostlyc con CMS

## Rol

Eres una persona no tecnica. Tu objetivo no es programar ni revisar codigo. Tu trabajo es usar el CMS como lo usaria un cliente real e intentar replicar lo mas parecido posible la landing publica `https://hostlyc.com/`.

Debes anotar todo lo que se sienta dificil, confuso, imposible, escondido, tecnico o riesgoso.

## Accesos

- CMS: `http://localhost:4200`
- Landing nueva: `http://localhost:3101`
- Referencia visual: `https://hostlyc.com/`
- Correo: `irving.condem@gmail.com`
- Contrasena local: `Temporal2026!`
- Negocio a seleccionar: `Hostlyc Clone Test` (`hostlyc-clon`)

## Regla principal

Usa solamente el CMS. No edites codigo, JSON, base de datos ni archivos locales.

## Objetivo de replicacion

Intenta replicar estas partes de Hostlyc:

1. Menu: Inicio, Servicios, Proyectos, Nosotros, Proceso, Contacto.
2. Hero: texto grande "Tu negocio, visible y creciendo.", subtitulo, botones y sensacion visual.
3. Servicios: seis servicios principales.
4. Proyectos: tres tarjetas con imagen, categoria, titulo y descripcion.
5. Nosotros: bloque explicativo con puntos de valor.
6. Proceso: cuatro pasos.
7. Preguntas frecuentes.
8. Contacto con formulario.
9. Footer con enlaces, correo, Mexico y WhatsApp si el CMS lo permite.

## Pruebas obligatorias

### Textos

- Cambia textos directamente desde Vista espejo si se puede.
- Si no encuentras donde editar un texto visible, anotalo.
- Intenta cambiar el color de una sola palabra o letra. Si no se puede, anotalo.

### Imagenes

- Agrega una imagen desde Media.
- Cambia la imagen principal del hero.
- Agrega o cambia imagenes en proyectos.
- Anota si se pide URL publica, archivo local o si el proceso no se entiende.

### Botones

- Agrega o modifica botones del hero.
- Intenta agregar un boton que abra un modal flotante.
- Si no existe esa opcion, anotalo como funcionalidad faltante.

### Menu de navegacion

- Agrega las opciones del menu de Hostlyc.
- Verifica que cada opcion navegue a la seccion correcta.
- Agrega un enlace externo de prueba.
- Anota si no se entiende la diferencia entre pagina, ancla, URL externa y descarga.

### Orden y errores forzados

- Agrega una seccion en el lugar incorrecto.
- Luego intenta moverla hasta el final.
- Intenta eliminar una seccion que no quieras.
- Anota si mover, subir, bajar o quitar es claro.

### Colores y diseno

- Cambia colores generales.
- Intenta cambiar un color especifico de una tarjeta o texto puntual.
- Intenta replicar el estilo oscuro/dorado de Hostlyc.
- Anota si el CMS solo permite colores globales.

### Responsive

- Revisa CMS y landing en escritorio.
- Reduce la ventana a vista movil.
- Fuerza scroll vertical y horizontal.
- Anota cualquier cosa cortada, empalmada o dificil de tocar.

## Registro de hallazgos

Llena este formato por cada problema:

```md
## Hallazgo N

- Seccion:
- Que intentaba hacer:
- Que paso:
- Que esperaba:
- Gravedad: bloqueante / alta / media / baja
- Es entendible para una persona no tecnica: si / no
- Captura o descripcion visual:
- Funcion necesaria:
```

## Checklist final

- [ ] Pude replicar el menu completo.
- [ ] Pude replicar el hero.
- [ ] Pude replicar servicios.
- [ ] Pude replicar proyectos con imagenes.
- [ ] Pude replicar nosotros.
- [ ] Pude replicar proceso.
- [ ] Pude replicar FAQ.
- [ ] Pude replicar contacto.
- [ ] Pude replicar footer.
- [ ] Pude publicar y ver cambios en `http://localhost:3101`.
- [ ] Pude corregir un error de orden moviendo una seccion al final.
- [ ] Pude usar Media sin ayuda tecnica.
- [ ] Pude entender que quedo publicado.

## Resultado esperado del tester

Crear un archivo nuevo con el reporte en:

`coordinacion/reportes-tester/hostlyc-clone-YYYY-MM-DD.md`

Ese reporte debe incluir:

- Porcentaje estimado de similitud logrado.
- Lista de cosas que si se pudieron hacer.
- Lista de cosas que no se pudieron hacer.
- Lista priorizada de funcionalidades faltantes.
- Comentarios de lenguaje: textos confusos, tecnicos o poco claros.
