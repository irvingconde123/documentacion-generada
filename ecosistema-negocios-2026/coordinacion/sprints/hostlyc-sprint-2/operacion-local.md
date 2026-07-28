# Operacion Local Hostlyc

Fecha de verificacion: 2026-07-28

## Servicios Encendidos

| Puerto | Proyecto | URL de comprobacion |
|---|---|---|
| 3000 | API CMS legacy | `http://localhost:3000/v1` |
| 4100 | Hostlyc VPC Front | `http://localhost:4100/health` |
| 4200 | Hostlyc API Back | `http://localhost:4200/health` |
| 4300 | Hostlyc Data Access | `http://localhost:4300/health` |
| 4400 | Hostlyc padre | `http://localhost:4400` |
| 4500 | CMS frontend | `http://localhost:4500` |
| 4600 | Landing generica | `http://localhost:4600` |
| 4601 | Landing Hostlyc | `http://localhost:4601` |
| 4700 | Sistema hibrido web | `http://localhost:4700` |

Todos los puertos tienen listener. Las tres APIs nuevas y los cinco frontends
respondieron `200`; API CMS legacy respondio `200` en `/v1` y `/docs`.

## Logs

```text
logs/runtime/
```

Los procesos se ejecutan ocultos y sobreviven al cierre de esta conversacion,
pero no a un reinicio del equipo. Los logs y `.env` no se versionan.

## Integracion Parcial Esperada

`GET /platform/content/home` resuelve primero el documento publicado en Neon y
conserva la API CMS `4500` solo como fallback de migracion. El CMS guarda
borradores y publica mediante VPC con concurrencia optimista.

La prueba de rendering dinamico permanece disponible en:

- `http://localhost:4400/tiendas/ceramica-aurora-fe42a40b-evqyqs0m`
- `http://localhost:4400/tiendas/vivero-brisa-fe42a40b-hr1a2e96`

Prueba vigente:

- `http://localhost:4400/tiendas/tienda-invitaciones-ms40llyy-7w7sqnbe`
- `http://localhost:4400/tiendas/taller-verde-e2e-dzf9rc85`

Ambas usan un solo renderer. El manifiesto se carga primero y la hidratacion se
solicita con la `contentVersion` exacta. No existen dos proyectos ni dos
despliegues de landing.
