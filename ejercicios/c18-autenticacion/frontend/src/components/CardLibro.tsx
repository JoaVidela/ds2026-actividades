import { useState } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { Libro } from '../types/libro';

type CardLibroProps = {
  libro: Libro;
};

function CardLibro({ libro }: CardLibroProps) {
  const [favorito, setFavorito] = useState<boolean>(false);

  return (
    <Col lg={4}>
      <Card className="px-1 py-1 h-100">
        <Card.Img variant="top" src={libro.imgSrc} style={{ height: '300px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{libro.titulo}</Card.Title>
          <Card.Subtitle className="py-1">{libro.autor}</Card.Subtitle>
          <Card.Subtitle className="py-3 fs-5" style={{ color: 'green' }}>
            ${libro.precio}
          </Card.Subtitle>
        </Card.Body>
        <div className="d-grid gap-2 px-1 pb-1">
          <Link to={`/libros/${libro.id}`} className="btn btn-primary btn-lg">
            Ver más
          </Link>
          <Button
            variant={favorito ? 'danger' : 'outline-danger'}
            size="lg"
            onClick={() => setFavorito(!favorito)}
          >
            {favorito ? '❤ Guardado' : '🤍 Guardar'}
          </Button>
        </div>
      </Card>
    </Col>
  );
}

export default CardLibro;
