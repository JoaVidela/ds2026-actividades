# c16-persistencia — API con PostgreSQL y Prisma

Actividad [AI-C16]: la librería de la Clase 15 con los datos guardados en
PostgreSQL en vez de en un array en memoria. La API no cambió: mismas rutas,
mismos verbos, mismos status. Cambió lo que hay atrás.

## Estructura

```
c16-persistencia/
├── frontend/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # la fuente de verdad: model = tabla
│   │   ├── seed.ts              # datos iniciales, sin id a mano
│   │   └── migrations/          # el SQL versionado, se commitea
│   ├── prisma.config.ts         # Prisma 7: acá va la DATABASE_URL
│   ├── api.http
│   └── src/
│       ├── config/prisma.ts     # una sola instancia, con adapter
│       ├── generated/prisma/    # cliente generado, NO va a Git
│       ├── types/               # los tipos salen del schema
│       ├── services/            # consultas de Prisma, async
│       ├── controllers/         # await + try/catch, mismos status
│       ├── routes/
│       └── index.ts
└── docker-compose.yml           # volúmenes de prisma/ y healthcheck de db
```

## Levantarlo desde cero

El `.env` no está en Git, así que hay que crearlo primero y ponerle una
contraseña. Sin ese archivo Compose ni arranca.

```bash
cp backend/.env.example backend/.env
```

```bash
docker compose up -d --build

docker compose exec api npx prisma migrate dev --name init
docker compose exec api npx prisma generate
docker compose restart api
docker compose exec api npx prisma db seed
```

El `restart` no es opcional: el cliente de Prisma tampoco está en Git, así que
`api` arranca crasheado y `tsx watch` no se recupera solo cuando `generate`
lo crea.

## Comandos útiles

```bash
# ver la base como una planilla
docker compose exec api npx prisma studio --port 5555 --browser none
# -> http://localhost:5555

# ver las tablas por consola
docker compose exec db psql -U postgres -d libreria_db -c "\dt"

# empezar de cero (borra los datos y reaplica las migraciones)
docker compose exec api npx prisma migrate reset -f
docker compose exec api npx prisma db seed
```

## Dónde viven los datos

En el volumen `pgdata`, no en el contenedor:

| Comando | Los datos |
| --- | --- |
| `docker compose restart api` | siguen ahí |
| `docker compose down` → `up` | siguen ahí |
| `docker compose down -v` | **se borran** (la `-v` borra el volumen) |

## Endpoints

Los mismos de C15, sin un solo cambio.

| Método | Ruta | Éxito | Errores |
| --- | --- | --- | --- |
| GET | `/api/libros` | 200 | 500 |
| GET | `/api/libros?disponible=true` | 200 | 500 |
| GET | `/api/libros/:id` | 200 | 404, 500 |
| POST | `/api/libros` | 201 | 500 |
| PUT | `/api/libros/:id` | 200 | 404, 500 |
| DELETE | `/api/libros/:id` | 204 | 404, 500 |

Ídem `/api/autores`.

## Pendiente a propósito

Un POST sin título todavía guarda basura, y `/api/libros/abc` devuelve 404 en
vez de 400: falta validar lo que llega. Eso llega en C17 con Zod, junto con la
relación real entre Libro y Autor.
