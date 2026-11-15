import { obtenerToken } from './sesion';

const BASE = import.meta.env.VITE_API_URL;

export const SESION_EXPIRADA = 'sesion-expirada';

export class ApiError extends Error {
  status: number;

  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  const token = obtenerToken();

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await res.json().catch(() => null);

  if (res.status === 401 && token) window.dispatchEvent(new Event(SESION_EXPIRADA));
  if (!res.ok) throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);

  return cuerpo as T;
}
