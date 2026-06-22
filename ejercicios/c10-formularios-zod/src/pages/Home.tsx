import Row from 'react-bootstrap/Row';
import Hero from '../components/Hero';
import CardLibro from '../components/CardLibro';
import { libros } from '../data/libros';

function Home() {
  return (
    <>
      <Hero />

      <section className="container my-5">
        <h1 className="text-center mb-5">Libros Destacados</h1>
        <Row className="g-4">
          {libros.map((libro) => (
            <CardLibro key={libro.id} libro={libro} />
          ))}
        </Row>
      </section>
    </>
  );
}

export default Home;
