import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type CardLibroProps = {
  titulo: string;
  autor: string;
  precio: number;
  imgSrc: string;
};

function CardLibro({ titulo, autor, precio, imgSrc }: CardLibroProps) {
  const [favorito, setFavorito] = useState<boolean>(false);

  return (
    <Col lg={4}>
      <Card className="px-1 py-1 h-100">
        <Card.Img variant="top" src={imgSrc} style={{ height: '300px', objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{titulo}</Card.Title>
          <Card.Subtitle className="py-1">{autor}</Card.Subtitle>
          <Card.Subtitle className="py-3 fs-5" style={{ color: 'green' }}>
            ${precio}
          </Card.Subtitle>
        </Card.Body>
        <Button
          variant={favorito ? 'danger' : 'outline-danger'}
          size="lg"
          onClick={() => setFavorito(!favorito)}
        >
          {favorito ? '❤ Guardado' : '🤍 Guardar'}
        </Button>
      </Card>
    </Col>
  );
}

export default CardLibro;
