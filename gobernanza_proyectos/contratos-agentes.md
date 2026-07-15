# Contratos y coordinación entre agentes

## 1. Objetivo

Establecer un marco claro para que los agentes de un proyecto puedan trabajar de forma coordinada, sin ambigüedades ni desalineaciones.

## 2. Reglas de contratos

- Todo contrato entre módulos o agentes debe documentarse antes de implementarse.
- Debe incluir:
  - propósito,
  - inputs,
  - outputs,
  - dependencias,
  - reglas de negocio,
  - riesgos o limitaciones.
- Si el contrato cambia, debe actualizarse la documentación y el impacto debe evaluarse.

## 3. Reglas de revisión

- Un contrato debe revisarse antes de pasar a implementación.
- Si un agente depende de otro, debe existir una confirmación explícita.
- La revisión debe comprobar:
  - claridad del contrato,
  - consistencia con la arquitectura,
  - viabilidad técnica,
  - impacto sobre el resto del sistema.

## 4. Reglas de aprobación

- Un contrato no debe considerarse válido sin aprobación formal.
- El orquestador o responsable técnico puede marcarlo como aprobado o bloqueado.
- Si se detecta un cambio importante, se debe abrir un nuevo acuerdo o versión del contrato.

## 5. Recomendación operativa

Mantener una lista centralizada de contratos activos, pendientes y cerrados para evitar duplicidades o decisiones no registradas.
