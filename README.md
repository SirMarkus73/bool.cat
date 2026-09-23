# bool.cat ≧◔◡◔≦

**[Català](#català) · [Castellano](#castellano) · [English](#english)**

---

## Català

Aplicació web d'escurçador d'URLs amb tauler d'usuari.

### Descripció

bool.cat és una aplicació web per crear enllaços curts, gestionar-los des d'un panell d'usuari i administrar l'accés mitjançant autenticació.

### Què fa? (funcions principals)

- Registre i inici de sessió d'usuaris (formularis d'autenticació).
- Creació d'enllaços curts des del client.
- Tauler d'usuari (dashboard) amb el llistat dels enllaços creats.
- Redirecció des de la URL curta cap a la destinació original (ruta dinàmica de redirecció).
- Persistència en base de dades per a usuaris i enllaços.
- Enviament de correus de verificació del compte via SMTP.
- Interfície internacionalitzada (català, castellà i anglès).

### Estat del projecte

#### ✅ Implementades

- [x] Autenticació (registre / inici de sessió, gestió de sessió)
- [x] Verificació del compte per correu ([#13](https://github.com/SirMarkus73/bool.cat/issues/13))
- [x] Apartat de compte amb gestió de sessions actives ([#12](https://github.com/SirMarkus73/bool.cat/issues/12))
- [x] Creació d'enllaços curts des de la interfície
- [x] Mode d'enllaç simple / personalitzat ([#11](https://github.com/SirMarkus73/bool.cat/issues/11))
- [x] Emmagatzematge d'enllaços a la base de dades
- [x] Tauler d'usuari amb llistat, estadístiques i eliminació d'enllaços (`src/features/dashboard`, `src/features/shortener`)
- [x] Internacionalització (ca / es / en)
- [x] Enviament de correus transaccionals
- [x] Expiració d'enllaços
- [x] Àlies personalitzats
- [x] Commitlint + Commitizen ([#18](https://github.com/SirMarkus73/bool.cat/issues/18))

#### ⚠️ Pendents / Per implementar

- [ ] Generació de codis QR per als enllaços curts ([#25](https://github.com/SirMarkus73/bool.cat/issues/25))
- [ ] Estadístiques de clics per enllaç ([#26](https://github.com/SirMarkus73/bool.cat/issues/26))
- [ ] Editar un enllaç escurçat existent ([#27](https://github.com/SirMarkus73/bool.cat/issues/27))
- [ ] Enllaços protegits amb contrasenya, xifrats al client amb la Web Crypto API ([#28](https://github.com/SirMarkus73/bool.cat/issues/28))
- [ ] Hora a la data d'expiració i selector de data en un component propi ([#29](https://github.com/SirMarkus73/bool.cat/issues/29))
- [ ] Protecció d'enllaços sense registre contra abusos

### Tecnologies

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React 19)
- [Drizzle ORM](https://orm.drizzle.team/) amb PostgreSQL
- [better-auth](https://www.better-auth.com/) per a l'autenticació
- [shadcn/ui](https://ui.shadcn.com/) per als components d'interfície
- [Inlang / Paraglide JS](https://inlang.com/) per a la internacionalització
- [React Email](https://react.email/) + Nodemailer per als correus
- [Biome](https://biomejs.dev/) per a format i lint
- Gestor de paquets: [pnpm](https://pnpm.io/)

### Posada en marxa

**Requisits previs:** Node.js, pnpm i Docker (per a la base de dades i el servidor de correu locals).

```bash
# 1. Instal·la les dependències
pnpm install

# 2. Copia les variables d'entorn i emplena-les
cp .env.example .env   # DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL,
                        # SMTP_HOST/PORT/USER/PASSWORD, JWT_SECRET

# 3. Aixeca PostgreSQL i Mailpit (correu de proves) en local
docker compose up -d

# 4. Aplica l'esquema a la base de dades
pnpm db:push

# 5. Arrenca el servidor de desenvolupament
pnpm dev
```

L'aplicació queda disponible a `http://localhost:3000` i la interfície de Mailpit (correus de prova) a `http://localhost:8025`.

### Scripts disponibles

| Script | Descripció |
| --- | --- |
| `pnpm dev` | Servidor de desenvolupament (port 3000) |
| `pnpm build` | Compila l'aplicació per a producció |
| `pnpm preview` | Previsualitza la build de producció |
| `pnpm check` / `lint` / `format` | Comprovacions de Biome |
| `pnpm db:push` / `db:studio` / `db:pull` | Gestió de l'esquema amb Drizzle |
| `pnpm machine-translate` | Traducció automàtica dels missatges (inlang) |
| `pnpm email:dev` | Previsualitza les plantilles de correu |

---

## Castellano

Aplicación web de acortador de URLs con panel de usuario.

### Descripción

bool.cat es una aplicación web para crear enlaces cortos, gestionarlos desde un panel de usuario y administrar el acceso mediante autenticación.

### ¿Qué hace? (funciones principales)

- Registro e inicio de sesión de usuarios (formularios de autenticación).
- Creación de enlaces cortos desde el cliente.
- Panel de usuario (dashboard) con el listado de los enlaces creados.
- Redirección desde la URL corta al destino original (ruta dinámica de redirección).
- Persistencia en base de datos para usuarios y enlaces.
- Envío de correos de verificación de cuenta vía SMTP.
- Interfaz internacionalizada (catalán, castellano e inglés).

### Estado del proyecto

#### ✅ Implementadas

- [x] Autenticación (registro / inicio de sesión, gestión de sesión)
- [x] Verificación de la cuenta por correo ([#13](https://github.com/SirMarkus73/bool.cat/issues/13))
- [x] Apartado de cuenta con gestión de sesiones activas ([#12](https://github.com/SirMarkus73/bool.cat/issues/12))
- [x] Creación de enlaces cortos desde la interfaz
- [x] Modo de enlace simple / personalizado ([#11](https://github.com/SirMarkus73/bool.cat/issues/11))
- [x] Almacenamiento de enlaces en la base de datos
- [x] Panel de usuario con listado, estadísticas y borrado de enlaces (`src/features/dashboard`, `src/features/shortener`)
- [x] Internacionalización (ca / es / en)
- [x] Envío de correos transaccionales
- [x] Expiración de enlaces
- [x] Alias personalizados
- [x] Commitlint + Commitizen ([#18](https://github.com/SirMarkus73/bool.cat/issues/18))

#### ⚠️ Pendientes / Por implementar

- [ ] Generación de códigos QR para los enlaces cortos ([#25](https://github.com/SirMarkus73/bool.cat/issues/25))
- [ ] Estadísticas de clics por enlace ([#26](https://github.com/SirMarkus73/bool.cat/issues/26))
- [ ] Editar un enlace acortado existente ([#27](https://github.com/SirMarkus73/bool.cat/issues/27))
- [ ] Enlaces protegidos con contraseña, cifrados en el cliente con la Web Crypto API ([#28](https://github.com/SirMarkus73/bool.cat/issues/28))
- [ ] Hora en la fecha de expiración y selector de fecha en un componente propio ([#29](https://github.com/SirMarkus73/bool.cat/issues/29))
- [ ] Protección de enlaces sin registro frente a abusos

### Tecnologías

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React 19)
- [Drizzle ORM](https://orm.drizzle.team/) con PostgreSQL
- [better-auth](https://www.better-auth.com/) para la autenticación
- [shadcn/ui](https://ui.shadcn.com/) para los componentes de interfaz
- [Inlang / Paraglide JS](https://inlang.com/) para la internacionalización
- [React Email](https://react.email/) + Nodemailer para los correos
- [Biome](https://biomejs.dev/) para formato y lint
- Gestor de paquetes: [pnpm](https://pnpm.io/)

### Puesta en marcha

**Requisitos previos:** Node.js, pnpm y Docker (para la base de datos y el servidor de correo locales).

```bash
# 1. Instala las dependencias
pnpm install

# 2. Copia las variables de entorno y complétalas
cp .env.example .env   # DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL,
                        # SMTP_HOST/PORT/USER/PASSWORD, JWT_SECRET

# 3. Levanta PostgreSQL y Mailpit (correo de pruebas) en local
docker compose up -d

# 4. Aplica el esquema a la base de datos
pnpm db:push

# 5. Arranca el servidor de desarrollo
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000` y la interfaz de Mailpit (correos de prueba) en `http://localhost:8025`.

### Scripts disponibles

| Script | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo (puerto 3000) |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm preview` | Previsualiza la build de producción |
| `pnpm check` / `lint` / `format` | Comprobaciones de Biome |
| `pnpm db:push` / `db:studio` / `db:pull` | Gestión del esquema con Drizzle |
| `pnpm machine-translate` | Traducción automática de los mensajes (inlang) |
| `pnpm email:dev` | Previsualiza las plantillas de correo |

---

## English

A URL shortener web app with a user dashboard.

### Description

bool.cat is a web application for creating short links, managing them from a user dashboard, and controlling access through authentication.

### What does it do? (main features)

- User sign-up and login (authentication forms).
- Short link creation from the client.
- User dashboard listing all created links.
- Redirection from the short URL to the original destination (dynamic redirect route).
- Database persistence for users and links.
- Account verification emails via SMTP.
- Internationalized interface (Catalan, Spanish and English).

### Project status

#### ✅ Implemented

- [x] Authentication (sign-up / login, session management)
- [x] Account verification by email ([#13](https://github.com/SirMarkus73/bool.cat/issues/13))
- [x] Account section with active session management ([#12](https://github.com/SirMarkus73/bool.cat/issues/12))
- [x] Short link creation from the UI
- [x] Simple / custom link mode ([#11](https://github.com/SirMarkus73/bool.cat/issues/11))
- [x] Link storage in the database
- [x] User dashboard with link listing, stats and deletion (`src/features/dashboard`, `src/features/shortener`)
- [x] Internationalization (ca / es / en)
- [x] Transactional email delivery
- [x] Link expiration
- [x] Custom aliases
- [x] Commitlint + Commitizen ([#18](https://github.com/SirMarkus73/bool.cat/issues/18))

#### ⚠️ Pending / To be implemented

- [ ] QR code generation for short links ([#25](https://github.com/SirMarkus73/bool.cat/issues/25))
- [ ] Per-link click statistics ([#26](https://github.com/SirMarkus73/bool.cat/issues/26))
- [ ] Edit an existing short link ([#27](https://github.com/SirMarkus73/bool.cat/issues/27))
- [ ] Password-protected links, encrypted client-side with the Web Crypto API ([#28](https://github.com/SirMarkus73/bool.cat/issues/28))
- [ ] Time of day in the expiration date, with the date picker extracted into its own component ([#29](https://github.com/SirMarkus73/bool.cat/issues/29))
- [ ] Abuse protection for links created without an account

### Tech stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) (React 19)
- [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL
- [better-auth](https://www.better-auth.com/) for authentication
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Inlang / Paraglide JS](https://inlang.com/) for internationalization
- [React Email](https://react.email/) + Nodemailer for emails
- [Biome](https://biomejs.dev/) for formatting and linting
- Package manager: [pnpm](https://pnpm.io/)

### Getting started

**Prerequisites:** Node.js, pnpm, and Docker (for the local database and mail server).

```bash
# 1. Install dependencies
pnpm install

# 2. Copy the environment variables and fill them in
cp .env.example .env   # DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL,
                        # SMTP_HOST/PORT/USER/PASSWORD, JWT_SECRET

# 3. Start PostgreSQL and Mailpit (test mail server) locally
docker compose up -d

# 4. Push the schema to the database
pnpm db:push

# 5. Start the development server
pnpm dev
```

The app is available at `http://localhost:3000`, and the Mailpit UI (test emails) at `http://localhost:8025`.

### Available scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Development server (port 3000) |
| `pnpm build` | Builds the app for production |
| `pnpm preview` | Previews the production build |
| `pnpm check` / `lint` / `format` | Biome checks |
| `pnpm db:push` / `db:studio` / `db:pull` | Schema management with Drizzle |
| `pnpm machine-translate` | Machine-translates the message catalogs (inlang) |
| `pnpm email:dev` | Preview email templates |
