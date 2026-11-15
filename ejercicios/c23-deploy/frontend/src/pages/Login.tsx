import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginSchema } from '../schemas/loginSchema';
import type { LoginValidado } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (datos: LoginValidado) => {
    setErrorApi(null);
    try {
      await login(datos);
      navigate('/catalogo');
    } catch (e) {
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <section className="container py-5" style={{ maxWidth: 520 }}>
      <div className="bg-white rounded shadow p-4 p-md-5">
        <h2 className="mb-4">Ingresar</h2>

        {errorApi && <Alert variant="danger">{errorApi}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              {...register('password')}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Login;
