import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import type { z } from 'zod';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import type { Autor, Libro } from '../types/libro';

type LibroFormInput = z.input<typeof libroSchema>;

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

function LibroNuevo() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);
  const { data: autores } = useFetch<Autor[]>('/autores');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroFormInput, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: { titulo: '', autorId: '', imgSrc: '', disponible: true },
  });

  const onSubmit = async (datos: LibroValidado) => {
    setErrorApi(null);
    try {
      await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify({ ...datos, imgSrc: datos.imgSrc || IMG_PLACEHOLDER }),
      });
      navigate('/catalogo');
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: 520 }}>
      <div className="bg-white rounded shadow p-4 p-md-5">
        <h2 className="mb-4">Nuevo libro</h2>

        {errorApi && <Alert variant="danger">{errorApi}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
            <Form.Control.Feedback type="invalid">
              {errors.titulo?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Select {...register('autorId')} isInvalid={!!errors.autorId}>
              <option value="">Elegí un autor</option>
              {(autores ?? []).map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.autorId?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" step="1" {...register('precio')} isInvalid={!!errors.precio} />
            <Form.Control.Feedback type="invalid">
              {errors.precio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control placeholder="https://..." {...register('imgSrc')} isInvalid={!!errors.imgSrc} />
            <Form.Control.Feedback type="invalid">
              {errors.imgSrc?.message}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Opcional. Si lo dejás vacío usamos una imagen por defecto.
            </Form.Text>
          </Form.Group>

          <Form.Check className="mb-4" type="checkbox" label="Disponible" {...register('disponible')} />

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Agregar libro'}
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
