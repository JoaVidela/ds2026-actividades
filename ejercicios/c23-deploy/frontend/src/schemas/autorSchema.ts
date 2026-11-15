import { z } from 'zod';

export const autorSchema = z.object({
  nombre: z.string().trim().min(1, 'El nombre es obligatorio').max(120),
  nacionalidad: z.string().trim().min(1, 'La nacionalidad es obligatoria').max(80),
});

export type AutorValidado = z.infer<typeof autorSchema>;
