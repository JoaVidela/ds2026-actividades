# c18-autenticacion — Seguridad en la Librería

Actividad [AI-C18]: la librería de la Clase 17, ahora con usuarios, contraseñas
hasheadas y JWT. El catálogo sigue siendo público; escribir requiere ser ADMIN.

## Estructura

```
c18-autenticacion/
├── frontend/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # + enum Rol y model Usuario
│   │   ├── seed.ts              # idempotente, con las contraseñas hasheadas
│   │   └── migrations/          # init + relaciones + usuarios_y_roles
│   ├── api.http                 # los doce casos, con el token capturado por @name
│   └── src/
│       ├── config/
│       │   ├── env.ts           # JWT_SECRET obligatorio: falla al arrancar
│       │   └── prisma.ts        # omit global del passwordHash
│       ├── types/express.d.ts   # req.usuario
│       ├── validations/         # + auth.validation.ts
│       ├── middlewares/         # + auth.middleware.ts
│       ├── services/
│       ├── controllers/
│       ├── routes/
│       └── index.ts
└── docker-compose.yml
```

## Levantarlo desde cero

El `.env` no está en Git. Hay que crearlo y ponerle la contraseña de la base y
un `JWT_SECRET`. Sin ese archivo Compose ni arranca, y sin `JWT_SECRET` la API
falla al arrancar a propósito.

```bash
cp backend/.env.example backend/.env
```

```bash
docker compose up -d --build

docker compose exec api npx prisma migrate dev --name usuarios_y_roles
docker compose exec api npx prisma generate
docker compose restart api
docker compose exec api npx prisma db seed
```

El `restart` no es opcional: el cliente de Prisma no está en Git, así que `api`
arranca crasheado y `tsx watch` no se recupera solo cuando `generate` lo crea.

## Usuarios del seed

| Email | Contraseña | Rol |
| --- | --- | --- |
| `admin@libreria.test` | `Admin1234` | ADMIN |
| `cliente@libreria.test` | `Cliente1234` | CLIENTE |

El seed es idempotente: usa `upsert`, así que se puede correr dos veces sin
explotar.

## Matriz de permisos

| Endpoint | Invitado | CLIENTE | ADMIN |
| --- | --- | --- | --- |
| `GET /api/libros` | ✅ | ✅ | ✅ |
| `GET /api/libros/:id` | ✅ | ✅ | ✅ |
| `POST /api/libros` | ❌ 401 | ❌ 403 | ✅ |
| `PUT /api/libros/:id` | ❌ 401 | ❌ 403 | ✅ |
| `DELETE /api/libros/:id` | ❌ 401 | ❌ 403 | ✅ |
| `GET /api/auth/yo` | ❌ 401 | ✅ | ✅ |

Lo mismo para `/api/autores` y `/api/categorias`: leer es público, escribir es
de ADMIN.

## Autenticación vs autorización

| | `authenticate` | `authorize` |
| --- | --- | --- |
| Pregunta | ¿Quién sos? | ¿Qué podés? |
| Si falla | 401 | 403 |

El orden en la cadena importa y no es estético:

```
authenticate  ->  authorize("ADMIN")  ->  validate(schema)  ->  controller
   401                  403                    400              201
```

`authorize` lee `req.usuario`, que lo llena `authenticate`. Al revés, todo daría
401. Y validar el body de alguien sin permiso además le cuenta cosas de la API a
quien no debería estar ahí.

## Tres decisiones de seguridad

**El hash no se escapa por accidente.** `config/prisma.ts` lleva
`omit: { usuario: { passwordHash: true } }`, así que ningún `findMany` distraído
lo devuelve. El login es la excepción y lo pide explícito con
`omit: { passwordHash: false }`.

**El login falla siempre con el mismo mensaje.** Mail que no existe y contraseña
incorrecta devuelven los dos `Credenciales inválidas`. Si dijeran cosas
distintas, cualquiera podría probar mails para descubrir cuáles están
registrados.

**El rol no lo elige quien se registra.** No está en `registroSchema`, así que
Zod lo descarta del body, y la base lo pone en `CLIENTE` por `@default`. Mandar
`"rol": "ADMIN"` en el registro no hace nada.

## Probarlo

El `api.http` captura el token con `@name` y lo reusa:

```
# @name loginAdmin
POST {{baseUrl}}/api/auth/login

@tokenAdmin = {{loginAdmin.response.body.token}}

GET {{baseUrl}}/api/auth/yo
Authorization: Bearer {{tokenAdmin}}
```

Se corre entero sobre la base recién sembrada. Para volver al principio:

```bash
docker compose exec api npx prisma migrate reset -f
docker compose exec api npx prisma db seed
```

## Comandos útiles

```bash
# ver la base como una planilla
docker compose exec api npx prisma studio --port 5555 --browser none
# -> http://localhost:5556

# confirmar que en la base no hay contraseñas en texto plano
docker compose exec db psql -U postgres -d libreria_db -c 'SELECT email, rol, LEFT("passwordHash", 20) FROM "Usuario";'
```

## Pendiente a propósito

El token no se puede revocar: es stateless, y hasta que vence sigue siendo
válido. Y el front sigue leyendo `libros.json`, sin login ni token; eso se
conecta en C19.
