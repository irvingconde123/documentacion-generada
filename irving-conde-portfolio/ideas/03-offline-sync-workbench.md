# Offline Sync Workbench

## Problema

Mostrar visualmente como una app captura, encola, reintenta, confirma o revierte operaciones offline.

## Stack sugerido

- Angular/Ionic
- IndexedDB
- NestJS mock API
- RxJS
- Playwright

## Arquitectura

UI de operacion, repositorio local, outbox, sincronizador, API transaccional simulada y monitor de conectividad.

## Features demo

- Crear operaciones offline.
- Simular caida de red.
- Simular conflicto.
- Simular token expirado.
- Reintento y confirmacion parcial.
- Timeline de eventos.

## Evidencia tecnica

- Maquina de estados.
- Pruebas de reintento.
- Tabla de fallos/respuestas.
- Demo con timeline.

## Complejidad

Media. Buena extension natural de lo que ya muestra Adastra.
