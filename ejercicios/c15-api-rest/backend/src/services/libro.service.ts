import type { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "La Odisea",
    autor: "Homero",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/cfbb205f-d207-4cd7-9c8b-a8c51bcec95b/9788413372952.jpg",
    disponible: true,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/b3735ff2-ec78-49a6-8371-83c0afc30ff8/9788466379717_ac1359a8-df49-431d-a6b2-e0e6d8786cd7.webp",
    disponible: true,
  },
  {
    id: 3,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/2127c111-ccd5-4554-9e92-a062689394a2/f86627a8-f5c1-440c-aacc-2cf8320516f5.jpg",
    disponible: true,
  },
  {
    id: 4,
    titulo: "El Martín Fierro",
    autor: "José Hernández",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/867e50c1-fcc6-41cf-a558-0b6042e97b55/9789873952401.jpg",
    disponible: false,
  },
  {
    id: 5,
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/679f1991-2880-4e2a-b4f7-a7675f1b3269/9789877252538.jpg",
    disponible: true,
  },
  {
    id: 6,
    titulo: "Comer Rezar Amar",
    autor: "Elizabeth Gilbert",
    precio: 26900,
    imgSrc: "/comerrezaramar.webp",
    disponible: false,
  },
  {
    id: 7,
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 21000,
    imgSrc: "https://placehold.co/300x400?text=Ficciones",
    disponible: true,
  },
  {
    id: 8,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 18500,
    imgSrc: "https://placehold.co/300x400?text=El+Principito",
    disponible: true,
  },
  {
    id: 9,
    titulo: "Pedro Páramo",
    autor: "Juan Rulfo",
    precio: 19900,
    imgSrc: "https://placehold.co/300x400?text=Pedro+Paramo",
    disponible: true,
  },
  {
    id: 10,
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    precio: 24500,
    imgSrc: "https://placehold.co/300x400?text=La+casa+de+los+espiritus",
    disponible: false,
  },
];

let proximoId = 11;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter((libro) => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find((libro) => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return undefined;

  const actualizado: Libro = { id, ...datos };
  libros[indice] = actualizado;
  return actualizado;
}

export function remove(id: number): boolean {
  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice === -1) return false;

  libros.splice(indice, 1);
  return true;
}
