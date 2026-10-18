import { useParams, Link } from 'react-router-dom';
import { Spinner, Alert, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { LibroConCategorias } from '../types/libro';

function LibroDetalle() {
  const { id } = useParams();
  const { data: libro, loading, error } = useFetch<LibroConCategorias>(`/libros/${id}`);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (error || !libro) {
    return (
      <section className="container my-5 text-center">
        <Alert variant="danger">{error ?? 'Libro no encontrado'}</Alert>
        <Link to="/catalogo" className="btn btn-primary btn-lg">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="container my-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-5 text-center">
          <img
            src={libro.imgSrc}
            alt={libro.titulo}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '500px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-lg-7 text-white">
          <h1 className="mb-3">{libro.titulo}</h1>
          <p className="fs-3 mb-1">{libro.autor.nombre}</p>
          <p className="fs-5 mb-3 text-white-50">{libro.autor.nacionalidad}</p>
          <div className="d-flex gap-2 mb-3">
            {libro.categorias.map((categoria) => (
              <Badge key={categoria.id} bg="secondary" className="fs-6">
                {categoria.nombre}
              </Badge>
            ))}
          </div>
          <p className="fs-2 fw-bold" style={{ color: 'green' }}>
            ${libro.precio}
          </p>
          <Link to="/catalogo" className="btn btn-outline-light btn-lg mt-3">
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LibroDetalle;
