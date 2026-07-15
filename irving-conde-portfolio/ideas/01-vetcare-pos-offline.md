# VetCare POS - Sistema de ventas para veterinaria

## Problema

Ventas, inventario, servicios, consultas y caja en una veterinaria con operacion parcial sin conexion.

## Stack sugerido

- Angular/Ionic
- NestJS
- PostgreSQL
- Prisma o TypeORM
- IndexedDB o SQLite local
- JWT
- Playwright

## Arquitectura

Cliente hibrido offline-first, API modular, inventario como fuente de verdad, outbox local para ventas pendientes, sincronizacion idempotente y auditoria por caja/usuario.

## Features demo

- Venta rapida.
- Carrito.
- Servicios veterinarios.
- Historial de mascota.
- Inventario con alertas.
- Corte de caja.
- Modo sin conexion y sincronizacion posterior.

## Evidencia tecnica para portafolio

- Diagrama C4.
- Secuencia de venta offline.
- Modelo de datos sanitizado.
- Pruebas de idempotencia.
- Demo movil/web.
- ADR sobre consistencia eventual.

## Complejidad

Media-alta. El riesgo principal es inventario/caja: se deben definir reglas claras para evitar duplicidad o stock negativo.
