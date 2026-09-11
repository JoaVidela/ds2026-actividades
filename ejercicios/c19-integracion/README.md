# c19-integracion — Integración Front - Back

Actividad [AI-C19]: la librería de la Clase 18, con el front leyendo de la API
real. `libros.json` se fue, el login guarda el token y el alta lo manda.

## Estructura

```
c19-integracion/
├── frontend/
│   ├── .env.example             # VITE_API_URL, el .env real no va a Git
│   └── src/
│       ├── vite-env.d.ts        # ImportMetaEnv tipado
│       ├── services/
│       │   ├── api.ts           # apiFetch: base URL, token y el error real
│       │   └── sesion.ts        # guardarToken, obtenerToken, borrarToken
│       ├── hooks/useFetch.ts    # usa apiFetch adentro
│       ├── schemas/             # + loginSchema.ts
│       ├── types/               # alineados con el JSON real de la API
│       └── pages/               # + Login.tsx
├── backend/
│   └── src/
│       ├── index.ts             # cors primero, 404 y errorHandler al final
│       └── middlewares/         # + notFound.middleware.ts
└── docker-compose.yml
```

## Levantarlo desde cero

Los dos `.env` están fuera de Git. Hay que crearlos desde los ejemplos y
ponerle al del back la contraseña de la base y un `JWT_SECRET`.

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

El front corre en el host:

```bash
cd frontend && npm install && npm run dev
```

Queda en `http://localhost:5173`, pegándole a la API en `http://localhost:3000`.

## CORS

El front (5173) y la API (3000) son dos orígenes distintos: mismo host, otro
puerto. Sin `cors`, el server contesta 200 igual, pero el navegador esconde la
respuesta.

```ts
app.use(cors({ origin: [FRONTEND_URL] }));
app.use(express.json());
```

Va primero, antes de `express.json()` y de las rutas. El origen sale de
`FRONTEND_URL`, como lista y no `"*"`. Sin `credentials`: el token viaja en el
header `Authorization`, no en una cookie.

Como el alta manda `Authorization` y `Content-Type: application/json`, el
navegador hace un preflight `OPTIONS` (204) antes del `POST`.

## apiFetch: una sola puerta

Todo pedido al back pasa por `services/api.ts`:

- arma la URL desde `VITE_API_URL`
- manda el token si hay uno guardado
- si la respuesta no es OK, tira el mensaje real de la API (`Falta el token`,
  `Credenciales inválidas`), no uno genérico

El token se lee adentro de `apiFetch`, en cada pedido. Si se leyera al importar
el módulo, después del login no viajaría.

## El contrato

La API real no manda lo mismo que el mock:

| Campo | `libros.json` | API real |
| --- | --- | --- |
| `autor` | un string | un objeto `{ id, nombre, nacionalidad }` |
| `autorId` | no existía | el id que necesita el alta |
| `categorias` | no existía | solo en el detalle |

El front se adaptó al contrato: `autor.nombre` en las tarjetas, y el alta elige
el autor de una lista que viene de `GET /api/autores`.

## La matriz, desde el navegador

| Situación | Status | Lo que muestra la UI |
| --- | --- | --- |
| Sin loguearse | 401 | Falta el token |
| Logueado como CLIENTE | 403 | No tenés permiso para esta operación |
| Logueado como ADMIN | 201 | Vuelve al catálogo con el libro nuevo |

Usuarios del seed: `admin@libreria.test` / `Admin1234` y
`cliente@libreria.test` / `Cliente1234`.

## El 404 en JSON

Una ruta que no existe ahora contesta JSON, no la página HTML de Express:

```json
{ "error": "No existe la ruta GET /api/no-existe" }
```

Va después de las rutas y antes del `errorHandler`. Así `apiFetch` siempre
puede leer el `error`.

## Pendiente a propósito

El token vive suelto en `localStorage`, sin contexto. La UI no sabe quién está
logueado: se puede llenar todo el alta sin sesión y recién ahí aparece el 401, y
el botón AGREGAR se ve aunque seas CLIENTE. Eso se resuelve en la próxima clase
con un `AuthContext` y rutas protegidas.
