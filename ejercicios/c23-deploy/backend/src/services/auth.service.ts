import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { JWT_SECRET, JWT_EXPIRES_IN, SALT_ROUNDS } from "../config/env";
import type { Registro, Login } from "../validations/auth.validation";

const datosPublicos = {
  id: true,
  email: true,
  nombre: true,
  rol: true,
} as const;

export async function registrar(datos: Registro) {
  const hash = await bcrypt.hash(datos.password, SALT_ROUNDS);

  return prisma.usuario.create({
    data: {
      nombre: datos.nombre,
      email: datos.email,
      passwordHash: hash,
    },
    select: datosPublicos,
  });
}

export async function login(datos: Login) {
  const usuario = await prisma.usuario.findUnique({
    where: { email: datos.email },
    omit: { passwordHash: false },
  });
  if (!usuario) return null;

  const coincide = await bcrypt.compare(datos.password, usuario.passwordHash);
  if (!coincide) return null;

  const payload = { id: usuario.id, rol: usuario.rol };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
  };
}

export async function findById(id: number) {
  return prisma.usuario.findUnique({ where: { id }, select: datosPublicos });
}
