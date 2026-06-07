import { useParams, Link } from 'react-router-dom';
import { libros } from '../data/libros';

function LibroDetalle() {
  const { id } = useParams();
  const libro = libros.find((l) => l.id === Number(id));

  if (!libro) {
    return (
      <section className="container my-5 text-center">
        <h1 className="mb-4">Libro no encontrado</h1>
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
          <p className="fs-3 mb-2">{libro.autor}</p>
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
