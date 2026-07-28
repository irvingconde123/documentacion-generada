# Auditoria De Personalizacion CMS Y Tiendas

Fecha: 2026-07-28

## Resultado Final

El flujo principal queda aprobado:

- producto padre hidratado desde CMS;
- dos tiendas aisladas sobre un solo renderer;
- colores, fuentes, tamanos, pesos y orden por seccion;
- negritas seguras;
- imagenes, productos, pago informativo y contacto;
- formulario persistente;
- preview real en CMS;
- responsive sin overflow horizontal.

## Viewports

| Vista | Ancho documento/viewport | Resultado |
|---|---:|---|
| Parent desktop | 1440/1440 | aprobado |
| Parent mobile | 390/390 | aprobado |
| Parent mobile estrecho | 320/320 | aprobado |
| CMS Hostlyc desktop | preview 724x685 | aprobado |
| CMS Taller Verde desktop | preview 674x685 | aprobado |
| CMS mobile | 390/390 y 320/320 | aprobado |

En mobile, `Contenido` y `Vista real` son excluyentes. No se muestran al mismo
tiempo.

## Correccion Durante La Auditoria

La primera medicion mostro:

- Hostlyc: 8,109 px de alto, 11.6 viewports.
- Taller Verde: 4,449 px de alto, 6.4 viewports.

Se convirtieron los grupos editoriales en acordeones con objetivos tactiles de
44 px. La medicion final de Taller Verde en `320x700` fue:

- alto: 1,041 px;
- proporcion: 1.49 viewports;
- 12 grupos, solo 1 abierto;
- overflow horizontal: 0.

Evidencia:
`test-results/cms-personalization/cms-taller-verde-320x700-collapsed-final.png`.

## Tiendas

| Tenant | Producto | Precio | Formulario |
|---|---|---:|---|
| `tienda-invitaciones-ms40llyy-7w7sqnbe` | Invitacion artesanal | $180 MXN | visible |
| `taller-verde-e2e-dzf9rc85` | Maceta botanica | $320 MXN | enviado |

Ambas muestran navbar, hero, imagenes, pago y contacto diferentes. El mensaje
de prueba de Taller Verde respondio `Tu mensaje fue recibido` y Neon confirmo
la fila ligada al tenant correcto.

## Ordenamiento

- Flechas arriba/abajo: aprobado.
- Drag/drop con mouse automatizado: inconcluso.
- Drag tactil: no soportado de forma nativa.

Las flechas son la ruta accesible y estable actual. Para una experiencia tactil
mas directa se recomienda integrar un adaptador DnD con sensores pointer/touch,
anuncios ARIA y conservar las flechas como alternativa.

## Imagenes

Cambiar una imagen por URL HTTPS y texto alternativo funciona. Falta:

1. storage binario real;
2. selector de Biblioteca dentro del campo de imagen;
3. transformacion/optimizacion;
4. validacion MIME y dimensiones;
5. eliminacion y reemplazo con referencias seguras.

No se recomienda persistir `data:` URLs en contenido publicado.

## Evidencias

Directorio:
`test-results/cms-personalization/`.

Capturas principales:

- `parent-1440x900.png`
- `parent-390x844.png`
- `parent-320x700.png`
- `cms-hostlyc-editor-1440x900.png`
- `cms-taller-verde-editor-1440x900.png`
- `store-invitaciones-1440x900-final.png`
- `store-taller-verde-final-verification.png`
- `store-taller-verde-contact-submit.png`
- `cms-taller-verde-320x700-collapsed-final.png`

