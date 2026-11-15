import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import { FRONTEND_URL } from "./config/env";
import { notFound } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors({ origin: [FRONTEND_URL] }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
