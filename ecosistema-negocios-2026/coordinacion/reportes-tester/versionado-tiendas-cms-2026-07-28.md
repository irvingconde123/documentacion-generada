# Auditoria CMS De Versionado De Tiendas

Fecha: 2026-07-28

## Veredicto

Aprobado para operacion local sin servicios externos.

## Casos Aprobados

- autenticacion con usuario real;
- acceso owner a Taller Verde;
- workspace central vacio y posterior migracion;
- guardado de borrador;
- conflicto optimista `409`;
- publicacion atomica;
- historial de versiones;
- restauracion como borrador nuevo;
- lectura publica sin cambios antes de publicar;
- contenido final restaurado;
- mensaje visible despues de guardar y publicar desde CMS;
- preview real con productos, pago informativo y formulario;
- selector Media con una imagen publica activa;
- selectores de posicion en mobile;
- asas de arrastre solo en desktop;
- cero overflow horizontal;
- cero overlays y errores de navegador.

## Hallazgo Corregido

El primer guardado remontaba el editor porque su `key` dependia de la version.
Esto borraba el mensaje y regresaba a `Vista real`. Se cambio la restauracion
para devolver el documento al estado cliente. Resultado:

- mensaje `Borrador central guardado.` visible;
- panel `Contenido` conservado;
- version `Borrador 5 / Publicada 3`;
- despues de publicar: `Borrador 6 / Publicada 6`.

## Responsive Final

| Medida | Resultado |
|---|---:|
| viewport | 320x700 |
| ancho documento | 320 |
| alto inicial | 1071 |
| proporcion | 1.53 viewports |
| acordeones abiertos | 1 |
| selectores de posicion | 5 |
| asas drag visibles | 0 |

## Evidencias

- `test-results/cms-versioning/cms-store-history-open-desktop.png`
- `test-results/cms-versioning/cms-store-default-320x700-collapsed.png`
- `test-results/cms-versioning/cms-store-save-message-320x700.png`
- `test-results/cms-versioning/cms-store-publish-message-320x700.png`

