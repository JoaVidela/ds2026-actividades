import type { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(_req: Request, res: Response) {
  return res.json(await categoriaService.findAll());
}

export async function getById(req: Request, res: Response) {
  const categoria = await categoriaService.findById(Number(req.params.id));
  if (!categoria)
    return res.status(404).json({ error: "Categoría no encontrada" });

  return res.json(categoria);
}

export async function create(req: Request, res: Response) {
  const nueva = await categoriaService.create(req.body);
  return res.status(201).json(nueva);
}

export async function update(req: Request, res: Response) {
  const actualizada = await categoriaService.update(
    Number(req.params.id),
    req.body
  );
  return res.json(actualizada);
}

export async function remove(req: Request, res: Response) {
  await categoriaService.remove(Number(req.params.id));
  return res.status(204).send();
}
