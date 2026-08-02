import express from "express";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imgSrc: string;
  disponible: boolean;
}

interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

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
];

const autores: Autor[] = [
  { id: 1, nombre: "Homero", nacionalidad: "Griega" },
  { id: 2, nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" },
  { id: 3, nombre: "Julio Cortázar", nacionalidad: "Argentina" },
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería 📚" });
});

app.get("/libros", (req, res) => {
  const disponible = req.query.disponible;

  if (disponible === "true") {
    res.json(libros.filter((libro) => libro.disponible));
  } else if (disponible === "false") {
    res.json(libros.filter((libro) => !libro.disponible));
  } else {
    res.json(libros);
  }
});

app.get("/autores", (_req, res) => {
  res.json(autores);
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
