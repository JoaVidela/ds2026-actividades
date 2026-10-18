# c21-testing — Introducción al Testing

Actividad [AI-C21]: la librería de la Clase 20, con tests automatizados. Lo que
antes se probaba a mano con `api.http` y el navegador, ahora lo corre la
máquina en segundos.

## Estructura

```
c20-autorizacion/
├── frontend/
│   └── src/
│       ├── context/
│       │   └── AuthContext.tsx      # AuthProvider + useAuth()
│       ├── components/
│       │   ├── PrivateRoute.tsx     # layout route con <Outlet />
│       │   └── Layout/Header.tsx    # Ingresar / Hola, {nombre} · Salir
│       ├── pages/
│       │   ├── Login.tsx            # usa login() del context
│       │   └── SinPermiso.tsx       # la cara del 403
│       ├── services/
│       │   ├── api.ts               # ApiError + evento sesion-expirada
│       │   └── sesion.ts            # solo lo usan api.ts y el context
│       └── types/usuario.ts         # + Credenciales
├── backend/
└── docker-compose.yml
```

## Levantarlo desde cero

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

```bash
docker compose up -d --build

docker compose exec api npx prisma migrate dev --name usuarios_y_roles
docker compose exec api npx prisma generate
docker compose restart api
docker compose exec api npx prisma db seed
```

```bash
cd frontend && npm install && npm run dev
```

Usuarios del seed: `admin@libreria.test` / `Admin1234` y
`cliente@libreria.test` / `Cliente1234`.

## Variables del backend

`backend/.env` no va a Git. Se crea copiando `backend/.env.example` y
completando los dos valores que dicen `cambiame`.

| Variable | Para qué |
| --- | --- |
| `FRONTEND_URL` | El origen que acepta `cors` |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | El servicio `db` de Docker |
| `DATABASE_URL` | Se arma sola con las cuatro anteriores |
| `JWT_SECRET` | Firma los tokens |
| `CHECKPOINT_DISABLE`, `PRISMA_HIDE_UPDATE_MESSAGE` | Silencian los avisos de Prisma |

**Los tokens vencen a las 2 horas.** Ese valor no está en el `.env`: es una
constante, `JWT_EXPIRES_IN` en `src/config/env.ts`. Si el token vence en medio
de la sesión, el front la cierra solo.

## La sesión como estado

En C19 el Header leía `localStorage` en cada render. Andaba de casualidad:
`localStorage` no es estado de React, y el botón cambiaba solo porque el
`navigate` re-renderizaba.

Ahora la sesión vive en `AuthContext`:

| Campo | Qué es |
| --- | --- |
| `usuario` | `{ id, email, nombre, rol }`, o `null` si nadie está logueado |
| `cargando` | `true` mientras se averigua quién sos |
| `estaAutenticado` | `usuario !== null` |
| `tieneRol(rol)` | `usuario?.rol === rol` |
| `login(credenciales)` | Hace el `POST /auth/login`, guarda el token y el usuario |
| `logout()` | Borra el token y pone `usuario` en `null` |

El token no está en el context: lo maneja `sesion.ts`, y solo lo tocan
`api.ts` y el Provider. Ningún componente importa `sesion.ts`.

## Rehidratación

F5 borra el estado de React, pero no el token. Al arrancar, si hay token, el
Provider le pregunta al back quién es con `GET /auth/yo`. El token no se
decodifica en el front: el back es la fuente de verdad, y además valida la
firma y el vencimiento.

| `cargando` | `usuario` | Significa | La UI |
| --- | --- | --- | --- |
| `true` | `null` | Hay token, todavía no se sabe quién | Spinner, no decide nada |
| `false` | `null` | Nadie logueado | Ingresar |
| `false` | `{ ... }` | Logueado | Hola, {nombre} |

## Rutas protegidas

`PrivateRoute` es una layout route: un `<Route>` sin `path` que envuelve a las
rutas que protege y las renderiza en su `<Outlet />`.

```tsx
<Route element={<PrivateRoute rol="ADMIN" />}>
  <Route path="/libros/nuevo" element={<LibroNuevo />} />
</Route>
```

Hace tres preguntas, en el mismo orden que `authenticate` y `authorize`:

1. `cargando` → spinner
2. Sin usuario → `/login`
3. Con usuario pero sin el rol → `/sin-permiso`

Las redirecciones usan `replace`, para que "atrás" no deje al usuario atrapado.

## La matriz, ahora con la UI

| Situación | Qué se ve |
| --- | --- |
| Sin login | Ingresar. Sin "Nuevo libro" |
| Sin login, `/libros/nuevo` a mano | Redirige a `/login`, sin pedirle nada al back |
| CLIENTE | Hola, Cliente · Salir. Sin "Nuevo libro" |
| CLIENTE, `/libros/nuevo` a mano | Redirige a `/sin-permiso` |
| ADMIN | Hola, Admin · Nuevo libro · Salir |
| ADMIN, alta de un libro | `POST /libros` → 201 |
| F5 logueado | `GET /auth/yo`, sigue logueado |

Esconder no es proteger: el link se esconde **y** la ruta se protege. Y si
alguien saltea las dos, el back sigue respondiendo 401 y 403.

## Token vencido

`apiFetch` tira un `ApiError` con el `status`. Si recibe un 401 **y había
mandado token**, dispara el evento `sesion-expirada`; el Provider lo escucha y
cierra la sesión. `apiFetch` no es un componente y no puede usar `useAuth()`,
por eso avisa con un evento.

Un 401 sin token, como un login con la contraseña mal, no cierra nada.

## Pendiente a propósito

El token sigue en `localStorage`, con el riesgo de XSS declarado. En
producción la recomendación es una cookie `httpOnly`, que toca CORS y el back.
