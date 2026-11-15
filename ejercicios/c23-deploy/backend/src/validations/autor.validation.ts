import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(120),
  nacionalidad: z
    .string()
    .trim()
    .min(1, "La nacionalidad es obligatoria")
    .max(80),
});

export const autorUpdateSchema = autorCreateSchema.partial();

export type AutorCreate = z.infer<typeof autorCreateSchema>;
export type AutorUpdate = z.infer<typeof autorUpdateSchema>;
