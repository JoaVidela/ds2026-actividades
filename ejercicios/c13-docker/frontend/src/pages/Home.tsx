import { Spinner, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';
import CardLibro from '../components/CardLibro';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

function Home() {
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');
  const destacados = (libros ?? []).slice(0, 3);

  return (
    <>
      <Hero />

      <section className="container my-5">
        <h1 className="text-center mb-5">Libros Destacados</h1>

        {loading && (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <Row className="g-4">
            {destacados.map((libro) => (
              <CardLibro key={libro.id} libro={libro} />
            ))}
          </Row>
        )}
      </section>
    </>
  );
}

export default Home;
