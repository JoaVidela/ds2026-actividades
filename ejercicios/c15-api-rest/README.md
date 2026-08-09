# c15-api-rest — API REST en capas

Actividad [AI-C15]: la librería de la Clase 14 con el backend reorganizado en
capas y el CRUD completo de libros y autores bajo el prefijo `/api`.

## Estructura

```
c15-api-rest/
├── frontend/                    # librería React (sigue leyendo public/libros.json)
├── backend/
│   ├── api.http                 # requests para REST Client, con casos de error
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── types/
│       │   ├── libro.types.ts       # interface Libro
│       │   └── autor.types.ts       # interface Autor
│       ├── services/
│       │   ├── libro.service.ts     # los datos y la lógica
│       │   └── autor.service.ts
│       ├── controllers/
│       │   ├── libro.controller.ts  # HTTP -> service, elige el status
│       │   └── autor.controller.ts
│       ├── routes/
│       │   ├── libro.routes.ts      # verbo + ruta -> controller
│       │   └── autor.routes.ts
│       └── index.ts                 # levanta el server y monta los routers
└── docker-compose.yml
```

Cada capa tiene una sola responsabilidad: las routes no tienen lógica, los
controllers no buscan datos, y los services no conocen HTTP (no ven `req`,
`res` ni status codes).

## Endpoints

### Libros

| Método | Ruta                        | Éxito | Errores |
| ------ | --------------------------- | ----- | ------- |
| GET    | `/api/libros`               | 200   | 500     |
| GET    | `/api/libros?disponible=true` | 200 | 500     |
| GET    | `/api/libros/:id`           | 200   | 404     |
| POST   | `/api/libros`               | 201   | 500     |
| PUT    | `/api/libros/:id`           | 200   | 404     |
| DELETE | `/api/libros/:id`           | 204   | 404     |

### Autores

| Método | Ruta                | Éxito | Errores |
| ------ | ------------------- | ----- | ------- |
| GET    | `/api/autores`      | 200   | 500     |
| GET    | `/api/autores/:id`  | 200   | 404     |
| POST   | `/api/autores`      | 201   | 500     |
| PUT    | `/api/autores/:id`  | 200   | 404     |
| DELETE | `/api/autores/:id`  | 204   | 404     |

El 400 del contrato todavía no se emite: nadie valida lo que llega. Llega en
C17 con Zod.

## Cómo levantarlo

```bash
docker compose up --build

docker compose logs -f api
docker compose down
```

Modo dev: `./backend/src` está montado en el contenedor y `tsx watch` recarga
solo al guardar. `CHOKIDAR_USEPOLLING=true` hace falta en Windows para que el
watcher detecte los cambios.

## Probar con REST Client

Abrir `backend/api.http` en VS Code (extensión REST Client) y hacer click en
**Send Request**. Los requests están ordenados para correrse de arriba abajo e
incluyen los casos de error (404).

## Pendiente a propósito

Los datos viven en memoria: si reiniciás el contenedor, vuelven al estado
inicial. La persistencia llega en C16 con PostgreSQL + Prisma.
