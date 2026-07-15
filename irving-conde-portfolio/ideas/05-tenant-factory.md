# Tenant Factory - Aprovisionador de demos multi-tenant

## Problema

Crear tenants de demostracion con landing, CMS, usuarios, modulos, estilos y contenido sin tocar codigo.

## Stack sugerido

- NestJS
- PostgreSQL
- Angular CMS
- Scripts de seed
- GitHub Actions opcional

## Arquitectura

Plantilla de tenant, generador de paginas/modulos, seed transaccional, snapshot publico y verificacion automatizada.

## Features demo

- Elegir tipo de negocio.
- Generar tenant.
- Previsualizar landing.
- Activar modulos.
- Restaurar snapshot.

## Evidencia tecnica

- Script de aprovisionamiento.
- Contrato de plantilla.
- Smoke tests multi-tenant.
- Capturas antes/despues.

## Complejidad

Media. Debe enfocarse en automatizacion y provisioning para no duplicar el CMS actual.
