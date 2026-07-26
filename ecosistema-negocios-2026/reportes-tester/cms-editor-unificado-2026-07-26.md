# Auditoria CMS - Editor del sitio unificado

Fecha: 2026-07-26

## Contexto

Antes de continuar con storage, se pidio revisar el CMS pestaña por pestaña para decidir si las herramientas que modifican paginas controladas por CMS deben vivir juntas o separadas.

Proyectos usados:

- API: `http://localhost:3000`
- Landing: `http://localhost:3100`
- CMS: `http://localhost:4300`

Roles:

- Diseñador UX/UI: auditoria de diseño, textos, responsive y estructura.
- Tester no tecnico: dueño de negocio sin contexto tecnico.

## Acuerdo entre tester y diseñador

Si conviene juntar en una sola pestaña las herramientas para modificar el sitio, pero no como una forma gigante. La propuesta acordada es crear una pestaña principal llamada `Editor del sitio` o `Mi sitio`.

Esa pestaña debe agrupar:

- Paginas.
- Menu de navegacion.
- Vista espejo.
- Secciones/contenido.
- Estilos de la pagina o seccion.
- SEO y redes de la pagina.
- Links, PDF e imagenes usadas por la pagina.

Se deben mantener separadas:

- `Mi cuenta`.
- `Usuarios`.
- `Auditoria`.
- `Biblioteca de archivos` o `Media`, aunque debe poder abrirse como selector desde el editor.

## Problema actual

Hoy el usuario puede hacer muchas tareas, pero debe saltar entre pestañas:

- Agregar pagina: `Paginas y menu`.
- Agregar path al menu: `Paginas y menu`.
- Editar texto visible: `Contenido del sitio` o `Vista espejo`.
- Mover secciones: `Contenido del sitio` o `Vista espejo`.
- Cambiar colores: `Estilos`.
- Editar Google/redes: `SEO`.
- Elegir imagenes/PDF: `Media`.

Esto funciona para un usuario tecnico, pero para un dueño de negocio genera dudas:

- No queda claro que pagina esta editando.
- No hay una URL completa visible de la pagina destino.
- No hay boton claro para abrir la pagina publicada.
- No queda claro si guardar una pestaña publica todo o solo una parte.
- El acomodo `texto izquierda / imagen derecha` no esta expuesto con lenguaje directo.
- Las listas con formato `Titulo | descripcion | etiqueta` siguen pareciendo tecnicas.

## Estructura recomendada

Navegacion lateral simplificada:

1. `Resumen`
2. `Editor del sitio`
3. `Biblioteca de archivos`
4. `Usuarios`
5. `Mi cuenta`
6. `Auditoria`

Dentro de `Editor del sitio`:

- Barra superior fija:
  - `Estas editando: Inicio`
  - `URL publicada: http://localhost:3100/`
  - `Copiar URL`
  - `Abrir pagina`
  - `Guardar cambios sin publicar`
  - `Publicar cambios en mi sitio`
- Columna izquierda:
  - Lista de paginas.
  - Lista/menu de navegacion.
  - Crear pagina nueva.
  - Agregar pagina al menu.
  - Ordenar links del menu con `Subir` y `Bajar`.
- Centro:
  - Vista espejo editable.
  - Seleccion de seccion con borde/etiqueta visible.
- Panel derecho o drawer:
  - Propiedades de la pagina seleccionada.
  - Propiedades de la seccion seleccionada.
  - Diseño/layout.
  - SEO y redes.
  - Links y archivos.

## URL de pagina destino

Debe mostrarse siempre que se edite una pagina.

Texto recomendado:

- `Estas editando: Inicio`
- `URL publicada: http://localhost:3100/`
- `Abrir pagina publicada`
- `Copiar enlace de esta pagina`

Para paginas no publicadas:

- `Esta pagina aun no esta publicada`
- `Publicar para abrirla`
- `Vista previa`

Para links externos o PDF:

- `Destino: PDF descargable`
- `Se abrira en una pestaña nueva`

## Controles editoriales esperados

Cada seccion debe tener acciones humanas:

- `Editar`
- `Mover arriba`
- `Mover abajo`
- `Duplicar`
- `Ocultar`
- `Eliminar`

El layout debe poder elegirse sin lenguaje tecnico:

- `Texto izquierda, imagen derecha`
- `Imagen izquierda, texto derecha`
- `Texto centrado`
- `Solo texto`
- `Imagen arriba, texto abajo`

## Copy recomendado

- `Direccion visible` -> `URL de esta pagina`
- `Google y redes` -> `Como se ve al compartir`
- `Guardar paginas y menu` -> `Guardar cambios del sitio`
- `Guardar SEO` -> `Guardar como se comparte esta pagina`
- `Enlace completo` -> `Pega la URL completa`
- `PDF o archivo descargable` -> `Archivo para descargar`
- `Vista previa publicada` -> `Asi se vera la pagina`
- `Editor tradicional` -> `Editar con formulario`
- `Bloques` -> `Secciones`

## Criterios de aceptacion

- Un usuario puede crear una pagina, agregarla al menu, editar contenido, acomodar secciones, cambiar layout, ajustar SEO y abrir la URL publicada sin salir de `Editor del sitio`.
- La URL completa de la pagina actual siempre esta visible o a un click.
- `Abrir pagina publicada` abre la landing correspondiente.
- `Copiar URL` copia la URL publica correcta.
- Cambiar slug avisa si puede romper links existentes.
- Links externos y PDF se pueden probar antes de publicar.
- En mobile no hay scroll horizontal.
- En mobile el orden es: contexto/URL, acciones, preview, panel de edicion.
- Botones y selects tienen minimo 44px de alto.
- Ningun boton queda cortado.
- Cambiar de pagina no debe perder cambios sin guardar.

## Riesgos

- Unificar todo sin jerarquia puede crear una pantalla pesada.
- Debe separarse `Guardar borrador` de `Publicar cambios`.
- Media local `Solo en este CMS` debe advertir antes de publicar si no hay URL publica.
- SEO debe vivir dentro del contexto de pagina, no como pestaña aislada.
- Falta validacion visual de enlaces rotos.

## Decision

El siguiente entregable de CMS antes de storage debe ser `Editor del sitio` unificado. Storage real puede continuar despues, pero Media debe quedar lista como biblioteca global y como selector contextual dentro del editor.
