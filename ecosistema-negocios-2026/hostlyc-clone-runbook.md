# Runbook - Prueba real Hostlyc Clone

## Objetivo

Validar si una persona no tecnica puede crear una landing nueva y replicar `https://hostlyc.com/` usando solo el CMS.

## Tenant

- Slug: `hostlyc-clon`
- Nombre: `Hostlyc Clone Test`
- Landing local: `repos/landing-hostlyc`
- Puerto landing: `3101`

## Provisionar tenant y landing

```powershell
node .\scripts\provision-landing-tenant.mjs --slug hostlyc-clon --name "Hostlyc Clone Test"
Copy-Item .\repos\landing-hostlyc\.env.example .\repos\landing-hostlyc\.env.local -Force
```

## Levantar servicios

```powershell
# API
cd C:\Users\irvin\OneDrive\Escritorio\ecosistema-negocios-2026\repos\api
$env:CORS_ORIGIN="http://localhost:4200,http://localhost:3101"
npm run start

# CMS
cd C:\Users\irvin\OneDrive\Escritorio\ecosistema-negocios-2026\repos\cms
$env:NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/v1"
npm run dev -- -p 4200

# Landing nueva
cd C:\Users\irvin\OneDrive\Escritorio\ecosistema-negocios-2026\repos\landing-hostlyc
npm install
npm run dev -- -p 3101
```

## Monitoreo

```powershell
Invoke-RestMethod "http://localhost:3000/v1/public/hostlyc-clon/site"
Invoke-RestMethod "http://localhost:3000/v1/cms/hostlyc-clon/audit-reports/recent?requestedByUserId=user_irving"
Invoke-RestMethod "http://localhost:3000/v1/cms/hostlyc-clon/backups/recent?requestedByUserId=user_irving"
Invoke-RestMethod "http://localhost:3000/v1/leads"
```

## Criterios de exito

- El negocio aparece en el selector del CMS.
- El tester entra sin ayuda tecnica.
- El tester publica cambios.
- La landing `http://localhost:3101` refleja los cambios desde API.
- Auditoria registra login y publicaciones.
- El reporte del tester documenta bloqueos y funcionalidades faltantes.

## Riesgo conocido antes de la prueba

El renderer visual compartido aun esta muy orientado a laboratorio. La prueba debe medir que tan lejos se llega usando solo CMS y anotar lo que obliga a modificar renderer/CMS.

## Smoke real 2026-07-20

Ejecutar:

```powershell
node scripts\run-hostlyc-cms-smoke.mjs
```

Resultado esperado:

- Login exitoso y fallido auditados.
- Usuarios creados, modificados, bloqueados y con temporal solicitado.
- Media creada/actualizada: imagen y PDF.
- Espejo CMS publicado con enlace `PDF prueba`.
- Diseno publicado con marca `Hostlyc` y acento rojo.
- Sync recibido.
- Preview de reporte generado en `logs/audit-reports`.

Validacion esperada:

- `GET http://localhost:3101/` contiene `Hostlyc`, no contiene `Vista previa publicada`.
- `GET /v1/cms/hostlyc-clon/audit-reports/recent?requestedByUserId=user_irving` devuelve eventos.
- `GET /v1/cms/hostlyc-clon/backups/recent?requestedByUserId=user_irving` devuelve backups.

## Brecha de clonacion Hostlyc

El flujo CMS/API/landing funciona, pero no clona Hostlyc al 100%. El renderer aun fuerza textos y layout de laboratorio. Siguientes cambios requeridos:

- Plantilla `Agencia digital / Hostlyc`.
- Variantes por seccion: hero centrado, servicios mosaico, proceso, FAQ, CTA rojo, footer negro.
- Campos de layout y tema en contratos.
- Rich text seguro para destacar palabras del H1.
- Controles para ocultar imagen, metricas, badges y claims no aplicables.
