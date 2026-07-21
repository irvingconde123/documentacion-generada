# Coordinacion del ecosistema

## Proposito

Registrar el estado real de los repos creados en esta carpeta y mantener la coordinacion de Sprint 0.

## Repos locales

- `repos/shared-contracts`
- `repos/api`
- `repos/cms`
- `repos/landing`
- `repos/sistema-hibrido`

## Repos remotos

- `https://github.com/irvingconde123/ecosistema-shared-contracts`
- `https://github.com/irvingconde123/ecosistema-api`
- `https://github.com/irvingconde123/ecosistema-cms`
- `https://github.com/irvingconde123/ecosistema-landing`
- `https://github.com/irvingconde123/ecosistema-sistema-hibrido`

## Primer entregable funcional

API, CMS y landing conectados por contratos compartidos.

## Documentos de coordinacion

- `coordinacion/contratos-agentes.md`: responsables, fronteras y estado de contratos compartidos.
- `coordinacion/estado-proyecto.md`: estado real, metas inmediatas, validaciones y pendientes.
- `coordinacion/continuidad-operativa.md`: guia para retomar el trabajo en otro chat con variables, servidores, pruebas y pendientes inmediatos.
- `coordinacion/plan-pruebas-integracion.md`: plan transversal para cifrado, estres, penetracion, inyeccion SQL y validacion de contratos.

## Regla permanente de diseno

Todo cambio de frontend debe pasar por auditoria UX/UI antes de darse por terminado. El diseñador debe revisar capturas o ejecucion local, validar que la interfaz sea clara para personas no tecnicas, y reportar hallazgos de navegacion, espaciado, color, jerarquia, formularios y texto. Si hay hallazgos bloqueantes, el agente responsable corrige y se repite la auditoria.

## Agentes por proyecto

- Agente 1 - API y core: `repos/api`.
- Agente 2 - CMS: `repos/cms`.
- Agente 3 - Landing: `repos/landing`.
- Agente 4 - Sistema hibrido: `repos/sistema-hibrido`.
- Agente 5 - Contratos y coordinacion: `repos/shared-contracts` y `coordinacion`.

La fuente detallada de responsabilidades y contratos esta en `coordinacion/contratos-agentes.md`.

## Comandos principales

```bash
cd repos/api && npm run start:dev
cd repos/cms && npm run dev -- -p 3001
cd repos/landing && npm run dev -- -p 3002
cd repos/sistema-hibrido && npm run dev
```
