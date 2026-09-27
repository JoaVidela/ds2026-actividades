import { z } from 'zod';

export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio').max(200),
  autorId: z.coerce.number().int().positive('Elegí un autor'),
  precio: z.coerce
    .number()
    .int('El precio va sin decimales')
    .positive('El precio debe ser mayor a 0'),
  imgSrc: z.string().trim().optional(),
  disponible: z.boolean(),
});

export type LibroValidado = z.infer<typeof libroSchema>;
