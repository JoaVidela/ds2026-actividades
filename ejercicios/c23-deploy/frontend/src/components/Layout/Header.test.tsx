import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../../context/AuthContext';
import type { Rol, Usuario } from '../../types/usuario';

function renderHeader(usuario: Usuario | null) {
  const auth = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

const cliente: Usuario = {
  id: 2,
  email: 'cliente@libreria.test',
  nombre: 'Cliente',
  rol: 'CLIENTE',
};

const admin: Usuario = {
  id: 1,
  email: 'admin@libreria.test',
  nombre: 'Admin',
  rol: 'ADMIN',
};

describe('Header', () => {
  it('sin sesión ofrece ingresar y no muestra el link de alta', () => {
    renderHeader(null);

    expect(screen.getByText('INGRESAR')).toBeInTheDocument();
    expect(screen.queryByText('NUEVO LIBRO')).not.toBeInTheDocument();
    expect(screen.queryByText(/Hola,/)).not.toBeInTheDocument();
  });

  it('como CLIENTE saluda por nombre y no muestra el link de alta', () => {
    renderHeader(cliente);

    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.getByText('SALIR')).toBeInTheDocument();
    expect(screen.queryByText('NUEVO LIBRO')).not.toBeInTheDocument();
  });

  it('como ADMIN muestra el link de alta', () => {
    renderHeader(admin);

    expect(screen.getByText('Hola, Admin')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'NUEVO LIBRO' })).toBeInTheDocument();
  });
});
