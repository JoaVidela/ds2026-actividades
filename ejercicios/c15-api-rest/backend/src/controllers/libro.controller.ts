import type { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible;

  let filtro: boolean | undefined;
  if (disponible === "true") filtro = true;
  else if (disponible === "false") filtro = false;

  return res.json(libroService.findAll(filtro));
}

export function getById(req: Request, res: Response) {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const actualizado = libroService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const ok = libroService.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}
