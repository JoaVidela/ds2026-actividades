import { prisma } from "../config/prisma";
import type { Categoria } from "../types/categoria.types";
import type {
  CategoriaCreate,
  CategoriaUpdate,
} from "../validations/categoria.validation";

export async function findAll(): Promise<Categoria[]> {
  return prisma.categoria.findMany();
}

export async function findById(id: number): Promise<Categoria | null> {
  return prisma.categoria.findUnique({ where: { id } });
}

export async function create(datos: CategoriaCreate): Promise<Categoria> {
  return prisma.categoria.create({ data: datos });
}

export async function update(
  id: number,
  datos: CategoriaUpdate
): Promise<Categoria> {
  return prisma.categoria.update({ where: { id }, data: datos });
}

export async function remove(id: number): Promise<void> {
  await prisma.categoria.delete({ where: { id } });
}
