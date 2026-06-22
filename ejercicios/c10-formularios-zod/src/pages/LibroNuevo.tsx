import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import type { z } from 'zod';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
import type { Libro } from '../types/libro';


type LibroFormInput = z.input<typeof libroSchema>;

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

type LibroNuevoProps = {
  onAgregar: (libro: Libro) => void;
};

function LibroNuevo({ onAgregar }: LibroNuevoProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroFormInput, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: { titulo: '', autor: '', imgSrc: '', disponible: true },
  });

  const onSubmit = (data: LibroValidado) => {
    onAgregar({
      id: Date.now(),
      titulo: data.titulo,
      autor: data.autor,
      precio: data.precio,
      // si no cargó URL, usamos la imagen por defecto
      imgSrc: data.imgSrc?.trim() ? data.imgSrc.trim() : IMG_PLACEHOLDER,
      disponible: data.disponible,
    });
    navigate('/catalogo');
  };

  return (
    <section className="container py-5" style={{ maxWidth: 520 }}>
      <div className="bg-white rounded shadow p-4 p-md-5">
        <h2 className="mb-4">Nuevo libro</h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
            <Form.Control.Feedback type="invalid">
              {errors.titulo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control {...register('autor')} isInvalid={!!errors.autor} />
            <Form.Control.Feedback type="invalid">
              {errors.autor?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              {...register('precio')}
              isInvalid={!!errors.precio}
            />
            <Form.Control.Feedback type="invalid">
              {errors.precio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              placeholder="https://..."
              {...register('imgSrc')}
              isInvalid={!!errors.imgSrc}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imgSrc?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Opcional. Si lo dejás vacío usamos una imagen por defecto.
            </Form.Text>
          </Form.Group>

          <Form.Check
            className="mb-4"
            type="checkbox"
            label="Disponible"
            {...register('disponible')}
          />

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Agregar libro
            </Button>
            <Button type="button" variant="outline-secondary" onClick={() => navigate('/catalogo')}>
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default LibroNuevo;
