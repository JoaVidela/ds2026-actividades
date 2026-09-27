import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const { usuario, logout, tieneRol } = useAuth();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar py-3">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="bi bi-book-half custom-logo" style={{ fontSize: '2.5rem', color: '#7b7fff' }}></i>
          <span className="text-white fw-bold fs-2 px-3 custom-logo">Librería UTN</span>
        </Navbar.Brand>

        <Nav className="ms-auto custom-nav-links fs-4 align-items-center">
          <Nav.Link as={Link} to="/" className="px-3">INICIO</Nav.Link>
          <Nav.Link as={Link} to="/catalogo" className="px-3">CATÁLOGO</Nav.Link>
          {tieneRol('ADMIN') && (
            <Nav.Link as={Link} to="/libros/nuevo" className="px-3">NUEVO LIBRO</Nav.Link>
          )}
          <Nav.Link className="px-3">CONTACTO</Nav.Link>
          {usuario && <Navbar.Text className="px-3 text-white">Hola, {usuario.nombre}</Navbar.Text>}
          <Nav.Link onClick={manejarSesion} className="px-3">
            {usuario ? 'SALIR' : 'INGRESAR'}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
