export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
};

export type Categoria = {
  id: number;
  nombre: string;
};

export type Libro = {
  id: number;
  titulo: string;
  precio: number;
  imgSrc: string;
  disponible: boolean;
  autorId: number;
  autor: Autor;
};

export type LibroConCategorias = Libro & {
  categorias: Categoria[];
};
