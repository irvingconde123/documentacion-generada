# Planeación de arquitecturas para el ecosistema multi-proyecto

## Objetivo

Definir una arquitectura base para 4 proyectos alineados a un modelo de negocio genérico para negocios como veterinarias, tiendas o emprendimientos:

- Landing
- Sistema híbrido (web + desktop + móvil con Ionic + Capacitor + Electron)
- API
- CMS

## Decisiones consolidadas

- La landing y el sistema obedecerán al mismo CMS, pero serán proyectos separados.
- El sistema operará como experiencia híbrida y offline-first, con sincronización bidireccional.
- La API será la única fuente de verdad operativa para los tres fronts.
- El tenancy se resolverá por subdominio y dominio, con fallback por header en entornos controlados.
- Los permisos del CMS y del sistema operativo serán distintos, aunque el CMS podrá administrar usuarios del sistema.
- La API usará PostgreSQL como motor principal, pero la lógica estará preparada para adaptadores y fuentes distintas desde el inicio.
- La observabilidad será seria, separando logs técnicos de eventos de negocio.
- La arquitectura priorizará puertos, interfaces, adaptadores y desacoplamiento para facilitar futura incorporación de Redis, mensajería o motores alternos.

## Principios guía

- La API será la única fuente de verdad operativa para los 3 fronts.
- El sistema y el CMS deben usar permisos y tenancy diferenciados.
- La arquitectura debe ser extensible a Docker, Redis, mensajería y observabilidad.
- Se prioriza el desacoplamiento por puertos, interfaces y adaptadores.
- El sistema debe contemplar una estrategia offline-first con sincronización.
- La API debe incluir observabilidad y contratos explícitos.

## Proyectos incluidos

- [landing](landing/README.md)
- [sistema-hibrido](sistema-hibrido/README.md)
- [api](api/README.md)
- [cms](cms/README.md)

## Estado actual

La planeación ya está consolidada con decisiones operativas y de arquitectura para avanzar a implementación.
