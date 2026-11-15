const CLAVE = 'token';

export const guardarToken = (token: string) => localStorage.setItem(CLAVE, token);
export const obtenerToken = () => localStorage.getItem(CLAVE);
export const borrarToken = () => localStorage.removeItem(CLAVE);
