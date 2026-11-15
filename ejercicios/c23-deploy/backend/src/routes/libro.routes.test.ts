import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

const libroNuevo = {
  titulo: "Rayuela",
  precio: 7000,
  imgSrc: "https://img/r.jpg",
  autorId: 1,
};

describe("la matriz de permisos, sin DB", () => {
  it("POST /api/libros sin token → 401", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("POST /api/libros con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    expect(res.status).toBe(403);
  });

  it("POST /api/libros como ADMIN con body inválido → 400, no 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toContainEqual({
      campo: "precio",
      mensaje: "El precio debe ser mayor a 0",
    });
  });

  it("POST /api/libros con token adulterado → 401", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}adulterado`)
      .send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token inválido" });
  });

  it("DELETE /api/libros/1 con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .delete("/api/libros/1")
      .set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });

  it("GET /api/no-existe → 404", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
  });
});
