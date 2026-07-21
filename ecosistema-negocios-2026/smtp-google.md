# SMTP con Gmail

## Objetivo

Usar una cuenta de Google/Gmail para enviar correos del ecosistema en desarrollo
o pruebas controladas: reportes de auditoria, contrasenas temporales y avisos
transaccionales.

## Requisitos

- La cuenta debe tener verificacion en dos pasos activa.
- Se debe crear una contrasena de aplicacion de Google.
- No usar la contrasena normal de la cuenta en `.env`.
- No commitear `.env` ni capturas que muestren la contrasena de aplicacion.

## Pasos en Google

1. Entrar a `https://myaccount.google.com/security`.
2. Activar o confirmar "Verificacion en 2 pasos".
3. Abrir `https://myaccount.google.com/apppasswords`.
4. Crear una contrasena de aplicacion para el proyecto.
5. Copiar la contrasena de 16 caracteres una sola vez y guardarla en un gestor
   seguro.

Si la opcion de contrasenas de aplicacion no aparece, normalmente se debe a una
de estas causas: la cuenta no tiene verificacion en dos pasos, pertenece a una
organizacion que lo bloquea, usa solo llaves de seguridad para 2FA o tiene
Proteccion avanzada activa.

## Variables locales

En `repos/api/.env`:

```env
MAIL_FROM=Ecosistema <tu-correo@gmail.com>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu-correo@gmail.com
SMTP_PASSWORD=contraseña-de-aplicacion-de-16-caracteres
```

Alternativa SSL:

```env
SMTP_PORT=465
SMTP_SECURE=true
```

## Prueba manual

1. Levantar API:

```powershell
cd repos/api
npm run start:prod
```

2. Desde el CMS, entrar a Auditoria y enviar un reporte a tu correo.
3. Confirmar que la respuesta del CMS/API indique envio real, no modo simulado.
4. Confirmar que llega un correo con adjunto CSV.

## Criterios de seguridad

- Para produccion es preferible usar un proveedor transaccional dedicado
  (Resend, SendGrid, AWS SES, etc.) o Gmail Workspace con politicas claras.
- Si se cambia la contrasena principal de Google, Google revoca las contrasenas
  de aplicacion y hay que generar una nueva.
- Si se sospecha filtracion, revocar la contrasena desde la cuenta de Google y
  rotar `SMTP_PASSWORD`.

