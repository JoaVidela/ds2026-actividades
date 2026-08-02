# c14-backend — Primer endpoint de la Librería

Actividad [AI-C14]: la librería de la Clase 13 más el primer endpoint propio
del backend (`GET /libros`), corriendo en Docker con modo dev (hot reload).

## Estructura

```
c14-backend/
├── frontend/            # librería React (Vite) — sigue leyendo public/libros.json
├── backend/             # API en Express + TypeScript
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env.example
│   ├── .env             # no va a Git
│   ├── api.http         # requests para REST Client
│   ├── package.json
│   ├── tsconfig.json
│   └── src/index.ts     # servidor + endpoints + datos (todo junto, por ahora)
└── docker-compose.yml   # servicios: api + db
```

## Endpoints

| Verbo | Ruta                        | Qué devuelve                        |
| ----- | --------------------------- | ----------------------------------- |
| GET   | `/`                         | Mensaje de la API                   |
| GET   | `/libros`                   | Los 6 libros (JSON hardcodeado)     |
| GET   | `/libros?disponible=true`   | Solo los disponibles (4)            |
| GET   | `/libros?disponible=false`  | Solo los no disponibles (2)         |
| GET   | `/autores`                  | Los 3 autores (JSON hardcodeado)    |

Los libros tienen la misma forma que ya consume el frontend:
`id`, `titulo`, `autor`, `precio`, `imgSrc`, `disponible`.

El filtro se resuelve leyendo `req.query.disponible` dentro del mismo handler
de `/libros`.

## Cómo levantarlo

Requisito: Docker Desktop abierto y el puerto 3000 libre
(`docker compose down` en `c13-docker/` si quedó corriendo).

```bash
docker compose up --build

# probar
# http://localhost:3000/         -> mensaje de la API
# http://localhost:3000/libros   -> array de libros

docker compose logs -f api
docker compose down
```

## Modo dev (hot reload)

El servicio `api` monta `./backend/src` dentro del contenedor:

```yaml
environment:
  - CHOKIDAR_USEPOLLING=true
volumes:
  - ./backend/src:/app/src
```

- Tocás algo en `backend/src/` → `tsx watch` recarga solo, sin rebuild.
- Tocás `package.json`, `tsconfig.json` o el `Dockerfile` → `docker compose up --build`.

`CHOKIDAR_USEPOLLING=true` hace falta en Windows: los eventos de filesystem no
se propagan desde el host al contenedor Linux, así que el watcher revisa los
archivos por polling. Sin esa variable el volume igual funciona, pero hay que
hacer `docker compose restart api` para ver los cambios.

## Probar con REST Client

Abrir `backend/api.http` en VS Code (extensión REST Client) y hacer click en
**Send Request** sobre cada request.
