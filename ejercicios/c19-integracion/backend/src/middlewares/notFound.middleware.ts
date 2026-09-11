import type { Request, Response } from "express";

export function notFound(req: Request, res: Response) {
  return res
    .status(404)
    .json({ error: `No existe la ruta ${req.method} ${req.originalUrl}` });
}
