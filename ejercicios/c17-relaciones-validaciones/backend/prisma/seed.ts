import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Homero", nacionalidad: "Griega" },
  { nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { nombre: "Miguel de Cervantes", nacionalidad: "Española" },
  { nombre: "José Hernández", nacionalidad: "Argentina" },
  { nombre: "Julio Cortázar", nacionalidad: "Argentina" },
  { nombre: "Elizabeth Gilbert", nacionalidad: "Estadounidense" },
  { nombre: "Jorge Luis Borges", nacionalidad: "Argentina" },
  { nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francesa" },
  { nombre: "Juan Rulfo", nacionalidad: "Mexicana" },
  { nombre: "Isabel Allende", nacionalidad: "Chilena" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Cuento" },
  { nombre: "Poesía" },
  { nombre: "Clásico" },
];

const libros = [
  {
    titulo: "La Odisea",
    autor: "Homero",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/cfbb205f-d207-4cd7-9c8b-a8c51bcec95b/9788413372952.jpg",
    disponible: true,
    cats: ["Poesía", "Clásico"],
  },
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/b3735ff2-ec78-49a6-8371-83c0afc30ff8/9788466379717_ac1359a8-df49-431d-a6b2-e0e6d8786cd7.webp",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/2127c111-ccd5-4554-9e92-a062689394a2/f86627a8-f5c1-440c-aacc-2cf8320516f5.jpg",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "El Martín Fierro",
    autor: "José Hernández",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/867e50c1-fcc6-41cf-a558-0b6042e97b55/9789873952401.jpg",
    disponible: false,
    cats: ["Poesía", "Clásico"],
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    precio: 26900,
    imgSrc:
      "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/679f1991-2880-4e2a-b4f7-a7675f1b3269/9789877252538.jpg",
    disponible: true,
    cats: ["Novela"],
  },
  {
    titulo: "Comer Rezar Amar",
    autor: "Elizabeth Gilbert",
    precio: 26900,
    imgSrc: "/comerrezaramar.webp",
    disponible: false,
    cats: ["Novela"],
  },
  {
    titulo: "Ficciones",
    autor: "Jorge Luis Borges",
    precio: 21000,
    imgSrc: "https://placehold.co/300x400?text=Ficciones",
    disponible: true,
    cats: ["Cuento", "Clásico"],
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    precio: 18500,
    imgSrc: "https://placehold.co/300x400?text=El+Principito",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "Pedro Páramo",
    autor: "Juan Rulfo",
    precio: 19900,
    imgSrc: "https://placehold.co/300x400?text=Pedro+Paramo",
    disponible: true,
    cats: ["Novela", "Clásico"],
  },
  {
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    precio: 24500,
    imgSrc: "https://placehold.co/300x400?text=La+casa+de+los+espiritus",
    disponible: false,
    cats: ["Novela"],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }

  console.log(
    `Seed listo: ${autores.length} autores, ${categorias.length} categorías y ${libros.length} libros`
  );
}

main();
