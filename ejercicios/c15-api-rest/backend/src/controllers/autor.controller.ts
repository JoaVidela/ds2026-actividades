import type { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export function getAll(_req: Request, res: Response) {
  return res.json(autorService.findAll());
}

export function getById(req: Request, res: Response) {
  const autor = autorService.findById(Number(req.params.id));
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(autor);
}

export function create(req: Request, res: Response) {
  const nuevo = autorService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const actualizado = autorService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const ok = autorService.remove(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Autor no encontrado" });
  return res.status(204).send();
}
