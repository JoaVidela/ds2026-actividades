export type Rol = 'ADMIN' | 'CLIENTE';

export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

export type Sesion = {
  token: string;
  usuario: Usuario;
};
