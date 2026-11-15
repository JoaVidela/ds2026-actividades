function Footer() {
  return (
    <footer className="text-white text-center py-4 mt-5" style={{ backgroundColor: 'hsl(238, 60%, 15%)', borderTop: '2px solid hsl(238, 100%, 65%)' }}>
      <div className="container">
        <p className="mb-1">
          <i className="bi bi-book-half me-2"></i>
          <strong>Librería UTN</strong>
        </p>
        <p className="mb-0" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
