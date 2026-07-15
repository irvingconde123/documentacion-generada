# Reconciliation Hub - Conciliacion de ventas, pagos e inventario

## Problema

Conciliar ventas locales, pagos externos, cancelaciones e impacto en inventario.

## Stack sugerido

- NestJS
- PostgreSQL
- Angular
- Webhooks mock
- Jobs programados
- Cola ligera opcional

## Arquitectura

Eventos de venta, eventos de pago, ledger de conciliacion, reglas de discrepancia y revision manual.

## Features demo

- Venta pagada.
- Pago pendiente.
- Webhook duplicado.
- Cancelacion.
- Discrepancia de monto.
- Panel de conciliacion.

## Evidencia tecnica

- Modelo event-driven.
- Pruebas de webhooks idempotentes.
- Tabla de estados.
- ADR sobre ledger inmutable.

## Complejidad

Alta. Muy buena senal tecnica, pero requiere modelado cuidadoso para no parecer un CRUD.
