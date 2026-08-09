import type { Autor } from "../types/autor.types";

const autores: Autor[] = [
  { id: 1, nombre: "Homero", nacionalidad: "Griega" },
  { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { id: 3, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find((autor) => autor.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return undefined;

  const actualizado: Autor = { id, ...datos };
  autores[indice] = actualizado;
  return actualizado;
}

export function remove(id: number): boolean {
  const indice = autores.findIndex((autor) => autor.id === id);
  if (indice === -1) return false;

  autores.splice(indice, 1);
  return true;
}
