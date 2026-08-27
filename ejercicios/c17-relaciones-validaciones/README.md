# c17-relaciones-validaciones — Relaciones y validaciones

Actividad [AI-C17]: la librería de la Clase 16, ahora con relaciones de verdad
y con una API que valida lo que entra y devuelve el status correcto.

`autor` dejó de ser un texto copiado en cada libro y pasó a ser una relación.
Los diez `try/catch` de los controllers se fueron a un solo `errorHandler`.

## Estructura

```
c17-relaciones-validaciones/
├── frontend/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Autor 1:N Libro, Libro N:M Categoria
│   │   ├── seed.ts              # autores y categorías primero, libros con connect
│   │   └── migrations/          # init + relaciones
│   ├── api.http                 # el camino feliz y los errores: 400, 404, 409
│   └── src/
│       ├── config/prisma.ts
│       ├── types/
│       ├── validations/         # un schema por operación, más el de params
│       ├── middlewares/         # validate, validateParams y errorHandler
│       ├── services/            # include + GetPayload
│       ├── controllers/         # cero try/catch
│       ├── routes/
│       └── index.ts             # errorHandler va ÚLTIMO
└── docker-compose.yml
```

## Levantarlo desde cero

El `.env` no está en Git, así que hay que crearlo primero y ponerle una
contraseña. Sin ese archivo Compose ni arranca.

```bash
cp backend/.env.example backend/.env
```

```bash
docker compose up -d --build

docker compose exec api npx prisma migrate dev --name relaciones
docker compose exec api npx prisma generate
docker compose restart api
docker compose exec api npx prisma db seed
```

El `restart` no es opcional: el cliente de Prisma tampoco está en Git, así que
`api` arranca crasheado y `tsx watch` no se recupera solo cuando `generate`
lo crea.

## Las relaciones

| Relación | Tipo | Dónde vive |
| --- | --- | --- |
| Autor → Libro | 1:N | `Libro.autorId`, la FK del lado N |
| Libro ↔ Categoria | N:M implícita | `_CategoriaToLibro`, la crea Prisma sola |

La FK de `autorId` quedó con `ON DELETE RESTRICT`, que es el default de Prisma
en relaciones obligatorias. Por eso borrar un autor que tiene libros da 409 en
vez de dejar libros huérfanos.

## Lo que cambió en el JSON

`GET /api/libros` ahora trae el autor anidado, y el detalle trae también las
categorías. El contrato de la API cambió respecto de C16.

```json
{
  "id": 1,
  "titulo": "La Odisea",
  "autorId": 1,
  "autor": { "id": 1, "nombre": "Homero", "nacionalidad": "Griega" },
  "categorias": [{ "id": 3, "nombre": "Poesía" }, { "id": 4, "nombre": "Clásico" }]
}
```

Los tipos salen de `Prisma.LibroGetPayload<...>`, así que el schema sigue
siendo la única fuente de verdad.

## Endpoints

Tres entidades, cinco endpoints cada una.

| Método | Ruta | Éxito | Errores |
| --- | --- | --- | --- |
| GET | `/api/libros` | 200 | |
| GET | `/api/libros?disponible=true` | 200 | |
| GET | `/api/libros/:id` | 200 | 400, 404 |
| POST | `/api/libros` | 201 | 400, 409 |
| PUT | `/api/libros/:id` | 200 | 400, 404 |
| DELETE | `/api/libros/:id` | 204 | 400, 404 |

Ídem `/api/autores` y `/api/categorias`.

El `api.http` se corre entero sobre la base recién sembrada. Si lo corrés dos
veces seguidas, los `POST` dan 409 (los nombres son `@unique`) y los `DELETE`
dan 404 (los ids ya avanzaron). Para volver al principio:

```bash
docker compose exec api npx prisma migrate reset -f
docker compose exec api npx prisma db seed
```

## De dónde sale cada status

| Status | Quién lo decide | Ejemplo |
| --- | --- | --- |
| 400 | Zod, en `validate` o `validateParams` | `POST` sin título, `GET /libros/abc` |
| 404 | El controller si no encuentra, o Prisma `P2025` | `GET /libros/9999`, `PUT /libros/9999` |
| 409 | Prisma `P2002` o `P2003` | Autor duplicado, borrar un autor con libros |
| 500 | Cualquier otra cosa | Nunca por culpa del cliente |

## Comandos útiles

```bash
# ver la base como una planilla
docker compose exec api npx prisma studio --port 5555 --browser none
# -> http://localhost:5556

# ver la tabla intermedia que Prisma maneja sola
docker compose exec db psql -U postgres -d libreria_db -c 'SELECT * FROM "_CategoriaToLibro" LIMIT 5;'

# empezar de cero (borra los datos y reaplica las migraciones)
docker compose exec api npx prisma migrate reset -f
docker compose exec api npx prisma db seed
```

## Pendiente a propósito

Cualquiera puede borrar cualquier libro: no hay usuarios ni permisos, eso llega
en C18 con JWT. Y el front sigue leyendo `libros.json`, sin enterarse de que el
JSON de la API ahora trae el autor anidado; eso se conecta en C19.
