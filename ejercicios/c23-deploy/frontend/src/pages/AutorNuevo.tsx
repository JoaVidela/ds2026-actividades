import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { autorSchema } from '../schemas/autorSchema';
import type { AutorValidado } from '../schemas/autorSchema';
import { apiFetch } from '../services/api';
import type { Autor } from '../types/libro';

function AutorNuevo() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AutorValidado>({
    resolver: zodResolver(autorSchema),
    defaultValues: { nombre: '', nacionalidad: '' },
  });

  const onSubmit = async (datos: AutorValidado) => {
    setErrorApi(null);
    try {
      await apiFetch<Autor>('/autores', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      navigate('/libros/nuevo');
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: 520 }}>
      <div className="bg-white rounded shadow p-4 p-md-5">
        <h2 className="mb-4">Nuevo autor</h2>

        {errorApi && <Alert variant="danger">{errorApi}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control {...register('nombre')} isInvalid={!!errors.nombre} />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Nacionalidad</Form.Label>
            <Form.Control {...register('nacionalidad')} isInvalid={!!errors.nacionalidad} />
            <Form.Control.Feedback type="invalid">
              {errors.nacionalidad?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Agregar autor'}
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

export default AutorNuevo;
