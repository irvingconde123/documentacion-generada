# Plantillas de trabajo para el ecosistema

## 1. Plantilla de Pull Request

Cada Pull Request debe ser claro, breve y verificable. Debe indicar qué cambia, por qué cambia y qué se valida.

### Estructura sugerida

```md
## Summary
- Qué cambia en este PR
- Qué problema resuelve
- Qué alcance cubre

## Changes
- Cambio 1
- Cambio 2
- Cambio 3

## Testing
- Comandos o pasos ejecutados
- Validaciones realizadas
- Evidencia de prueba si aplica

## Risks
- Riesgos conocidos
- Dependencias externas
- Qué podría afectar

## Checklist
- [ ] Código cumple con las reglas de calidad
- [ ] Documentación actualizada
- [ ] Tests relevantes ejecutados
- [ ] No hay secretos expuestos
- [ ] El cambio es coherente con el alcance definido
```

### Reglas para el PR

- El título debe describir el cambio con claridad.
- Debe incluir el contexto del problema o necesidad.
- Debe indicar si el cambio afecta a otros proyectos o contratos.
- Si el PR cambia contratos compartidos, debe dejarse explícito.
- Si el PR depende de otro PR, debe indicarse.

## 2. Plantilla de commit con Conventional Commits

Los commits deben seguir el formato:

```text
type(scope): description
```

### Tipos recomendados

- `feat`: nueva funcionalidad
- `fix`: corrección de errores
- `refactor`: refactorización sin cambio de comportamiento
- `perf`: mejora de rendimiento
- `style`: cambios de formato o estilo
- `test`: agregar o actualizar pruebas
- `docs`: cambios en documentación
- `build`: cambios en dependencias o build
- `ci`: cambios en CI/CD
- `chore`: tareas varias sin impacto funcional
- `revert`: revertir un cambio

### Ejemplos

```text
feat(api): add tenant resolution by domain
fix(cms): correct publishing flow for content blocks
refactor(sistema-hibrido): split sync logic from ui state
docs: update architecture guide
```

### Reglas de commits

- Usar tiempo presente imperativo.
- No capitalizar la primera letra.
- No terminar el mensaje con punto.
- Si hay un cambio breaking, usar `!`:

```text
feat(api)!: remove deprecated auth endpoint
```

- En caso de breaking changes, agregar footer:

```text
BREAKING CHANGES: describe the impact
```

## 3. Reglas de ramas

- No crear ramas por cambios triviales.
- Crear ramas solo cuando se complete un módulo, una funcionalidad relevante o un fix importante.
- Mientras tanto, trabajar con commits claros y continuos.
- Las ramas deben partir de `develop`.
- Cuando una rama esté lista, integrarla a `develop` mediante PR.

## 4. Reglas de documentación asociada

Cada PR debe actualizar la documentación relevante cuando:

- cambia la arquitectura,
- cambia el contrato entre proyectos,
- cambia el alcance,
- cambia el estado de implementación,
- o se agrega una nueva dependencia o regla.
