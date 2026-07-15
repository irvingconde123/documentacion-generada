# Reglas del juego para proyectos de software

## 1. Propósito

Estas reglas definen cómo trabajar de forma ordenada, consistente y escalable en proyectos de software, tanto si se trata de un proyecto nuevo como de una evolución de uno existente.

## 2. Modelo de trabajo

- Cada proyecto debe poder trabajarse de forma independiente.
- La coordinación debe mantenerse por documentación y procesos claros.
- Cada equipo o agente debe trabajar con un alcance definido.
- No se debe mezclar trabajo de varios proyectos sin coordinación.

## 3. Reglas de calidad

- Los archivos no deben crecer de forma descontrolada.
- Se recomienda limitar el tamaño de archivos según la responsabilidad:
  - componentes o servicios: máximo 250-350 líneas,
  - controladores o repositorios: máximo 200-300 líneas,
  - si un archivo crece demasiado, dividirlo o extraer lógica.
- El código debe ser consistente y legible.
- No mezclar español e inglés en nombres de métodos, clases, variables o textos visibles.
- Usar convenciones consistentes, preferiblemente camelCase.
- Nombrar métodos según lo que hacen, por ejemplo `obtenerUsuarios()`.
- Separar lógica de negocio de lógica de presentación.

## 4. Reglas de coordinación entre agentes

- Cada agente debe trabajar dentro de su alcance.
- Debe documentar su avance, dependencias y bloqueadores.
- Si un cambio afecta a otros proyectos o módulos, debe registrarse en la documentación pública.
- Debe existir una figura de coordinación o Project Manager para supervisar contratos, bloqueos y estado general.
- Ese orquestador debe notificar cuando un contrato requiere revisión o confirmación.

## 5. Reglas de ramas y despliegue

- Crear ramas solo cuando sea necesario.
- Ramas grandes o funcionales deben crearse solo cuando se complete un módulo o una funcionalidad importante.
- Durante el desarrollo, se recomienda trabajar con commits claros y frecuentes.
- Estructura base recomendada:
  - `master` para producción,
  - `release` para validación previa,
  - `develop` como base de integración.
- Todo cambio debe pasar por CI/CD.

## 6. Reglas de contratos compartidos

- Los contratos entre proyectos deben registrarse y revisarse antes de implementarse.
- Los DTOs e interfaces deben ser claros, simples y versionables.
- No implementar contratos a ciegas.
- Si un contrato cambia, debe registrarse su nueva versión y el impacto.

## 7. Reglas de seguridad

- Todo intercambio sensible debe ir cifrado en tránsito.
- Se recomienda un interceptor o middleware de cifrado/desencriptado por proyecto cuando aplique.

## 8. Reglas de documentación

- Cada agente debe actualizar la documentación pública al terminar una tarea o módulo.
- La documentación debe reflejar el estado real del proyecto.
- Si cambia el alcance, las decisiones o los contratos, debe actualizarse la documentación relevante.
