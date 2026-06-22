import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import CardLibro from '../components/CardLibro';
import type { Libro } from '../types/libro';

type CatalogoProps = {
  libros: Libro[];
};

function Catalogo({ libros }: CatalogoProps) {
  return (
    <section className="container my-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">
        <h1 className="mb-0">Catálogo Completo</h1>
        <Link to="/libros/nuevo" className="btn btn-success btn-lg">
          <i className="bi bi-plus-lg me-2"></i>Agregar libro
        </Link>
      </div>
      <Row className="g-4">
        {libros.map((libro) => (
          <CardLibro key={libro.id} libro={libro} />
        ))}
      </Row>
    </section>
  );
}

export default Catalogo;
