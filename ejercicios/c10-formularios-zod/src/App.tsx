import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/styles.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import LibroDetalle from './pages/LibroDetalle';
import LibroNuevo from './pages/LibroNuevo';
import { libros as librosIniciales } from './data/libros';
import type { Libro } from './types/libro';

function App() {
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);
  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo libros={libros} />} />
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
          <Route path="/libros/:id" element={<LibroDetalle libros={libros} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
