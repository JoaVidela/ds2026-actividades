import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function SinPermiso() {
  return (
    <section className="container my-5" style={{ maxWidth: 640 }}>
      <Alert variant="warning">
        <Alert.Heading>Sin permiso</Alert.Heading>
        <p className="mb-0">Tu usuario no tiene permiso para entrar a esta página.</p>
      </Alert>
      <Link to="/catalogo" className="btn btn-primary btn-lg">
        Volver al catálogo
      </Link>
    </section>
  );
}

export default SinPermiso;
