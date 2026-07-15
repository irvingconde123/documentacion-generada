# Inventario clinico con lotes y caducidades

## Problema

Controlar medicamentos, vacunas, consumibles, lotes, caducidades y movimientos en una clinica o veterinaria.

## Stack sugerido

- Angular
- NestJS
- PostgreSQL
- Prisma
- Validacion con Zod o class-validator

## Arquitectura

Dominio de inventario separado de ventas, movimientos inmutables, stock calculado, alertas por reglas y auditoria por lote.

## Features demo

- Alta de producto.
- Entrada/salida por lote.
- Lote proximo a vencer.
- Ajuste auditado.
- Consumo desde venta veterinaria.

## Evidencia tecnica

- Modelo relacional.
- Casos de prueba de stock.
- ADR: stock calculado vs stock materializado.
- Pantalla de alertas.

## Complejidad

Media. Debe limitarse el alcance para no crecer hacia compras, proveedores y devoluciones en la primera version.
