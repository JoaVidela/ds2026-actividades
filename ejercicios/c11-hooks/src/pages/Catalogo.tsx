import { useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import CardLibro from '../components/CardLibro';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function Catalogo() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  useEffect(() => {
    document.title = libros ? `Catálogo (${libros.length} libros)` : 'Catálogo';
  }, [libros]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando libros...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
        <h1 className="mb-0">Catálogo Completo</h1>
        <Link to="/libros/nuevo" className="btn btn-success btn-lg">
          <i className="bi bi-plus-lg me-2"></i>Agregar libro
        </Link>
      </div>
      <Row className="g-4">
        {(libros ?? []).map((libro) => (
          <CardLibro key={libro.id} libro={libro} />
        ))}
      </Row>
    </section>
  );
}

export default Catalogo;
