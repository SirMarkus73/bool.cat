# bool.cat ≧◔◡◔≦

Proyecto de acortador de URLs y tablero de usuario.

## Descripción
- bool.cat es una aplicación web para crear enlaces cortos, gestionarlos desde un panel de usuario y administrar acceso mediante autenticación.

## Qué hace? (funciones principales)
- Registro e inicio de sesión de usuarios (formularios de autenticación).
- Creación de enlaces cortos desde el cliente.
- Panel de usuario (dashboard) con listado de enlaces creados.
- Redirección desde la URL corta al destino original (ruta dinámica de redirección).
- Persistencia en base de datos para usuarios y enlaces.

## Checklist de estado (implementadas / pendientes)

### ✅ Implementadas
- [x] Autenticación básica (formularios de registro/login)
- [x] Creación de enlaces cortos desde la interfaz
- [x] Almacenamiento de enlaces en la base de datos
- [x] Dashboard con listado de enlaces ([src/components/dashboard](src/components/dashboard))
- [x] Internacionalización

### ⚠️ Pendientes / Por implementar
- [ ] Expiración de enlaces
- [ ] Alias personalizados
- [ ] Proteger enlaces sin registro contra abusos
- [ ] Protección con contraseña

