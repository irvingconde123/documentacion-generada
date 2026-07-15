# Dynamic Field Forms - Formularios operativos configurables

## Problema

Crear formularios dinamicos para captura de campo o laboratorio sin desplegar nuevas pantallas.

## Stack sugerido

- Angular/Ionic
- Angular Reactive Forms
- JSON Schema
- NestJS
- PostgreSQL
- IndexedDB

## Arquitectura

Schema versionado, renderer seguro, validacion local/remota, respuestas offline y migracion entre versiones.

## Features demo

- Constructor basico.
- Formulario movil.
- Campos requeridos.
- Evidencia adjunta.
- Borrador local.
- Publicacion de nueva version.

## Evidencia tecnica

- Schema sanitizado.
- Registry de renderers.
- Pruebas de validacion.
- Secuencia de migracion de formulario.

## Complejidad

Alta. Los formularios dinamicos pueden convertirse en un CMS completo si no se limita el alcance.
