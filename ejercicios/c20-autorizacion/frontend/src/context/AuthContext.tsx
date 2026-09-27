import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiFetch, SESION_EXPIRADA } from '../services/api';
import { borrarToken, guardarToken, obtenerToken } from '../services/sesion';
import type { Credenciales, Rol, Sesion, Usuario } from '../types/usuario';

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(() => obtenerToken() !== null);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  useEffect(() => {
    if (!obtenerToken()) return;

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    window.addEventListener(SESION_EXPIRADA, logout);
    return () => window.removeEventListener(SESION_EXPIRADA, logout);
  }, [logout]);

  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  const value: AuthContextType = {
    usuario,
    cargando,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>');

  return contexto;
}
