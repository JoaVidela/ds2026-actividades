"use strict";
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const resultados = document.getElementById('resultados');
const estadoBusqueda = document.getElementById('mensajeEstado');
async function buscarLibros() {
    const query = inputBusqueda.value.trim();
    if (!query) {
        estadoBusqueda.innerHTML = '<div class="alert alert-warning">Por favor, ingresa un término de búsqueda.</div>';
        resultados.innerHTML = '';
        return;
    }
    estadoBusqueda.innerHTML = '<div class="spinner-border text-primary" role="status"></div> <p>Buscando...</p>';
    resultados.innerHTML = '';
    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        const data = await response.json();
        const libros = data.docs.slice(0, 10);
        estadoBusqueda.innerHTML = `<h3 class="mb-4 text-center">Resultados para "${query}":</h3>`;
        libros.forEach(libro => {
            const idLimpio = libro.key.replace("/works/", "");
            const autor = libro.author_name ? libro.author_name[0] : 'Autor Desconocido';
            const imgUrl = libro.cover_i ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : 'https://via.placeholder.com/150x200?text=Sin+Portada';
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            col.innerHTML = `<div class="card h-100 shadow-sm border-0"><img src="${imgUrl}" class="card-img-top" style="height: 250px; object-fit: contain; background: #f8f9fa; padding: 10px;"><div class="card-body d-flex flex-column"><h5 class="card-title fw-bold">${libro.title}</h5><p class="card-text text-muted mb-1">Autor: ${autor}</p><a href="libro.html?id=${idLimpio}" class="btn btn-primary mt-auto">Ver Detalles</a></div></div>`;
            resultados.appendChild(col);
        });
    } catch (error) {
        estadoBusqueda.innerHTML = '<div class="alert alert-danger">Error al buscar.</div>';
    }
}
if (btnBuscar) btnBuscar.addEventListener('click', buscarLibros);
document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const txtTitulo = document.getElementById('libro-titulo');
    const destacados = {
        "OL27304W": {
            titulo: "La Odisea",
            autor: "Homero",
            desc: "Acompaña a Odiseo en su épico y peligroso regreso a Ítaca tras la Guerra de Troya. Entre sirenas, cíclopes y la furia de los dioses, esta obra es el pilar de la literatura universal. Una historia sobre la astucia, la resistencia y el anhelo de volver a casa.",
            img: "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/cfbb205f-d207-4cd7-9c8b-a8c51bcec95b/9788413372952.jpg"
        },
        "OL74087W": {
            titulo: "Cien años de soledad",
            autor: "Gabriel García Márquez",
            desc: "Adéntrate en Macondo y sigue la saga de la familia Buendía a lo largo de siete generaciones. Entre lo fantástico y lo cotidiano, esta novela es un viaje hipnótico por el amor, la guerra, la soledad y el destino. Un libro que no se lee, se vive.",
            img: "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/b3735ff2-ec78-49a6-8371-83c0afc30ff8/9788466379717_ac1359a8-df49-431d-a6b2-e0e6d8786cd7.webp"
        },
        "OL179323W": {
            titulo: "Don Quijote de la Mancha",
            autor: "Miguel de Cervantes",
            desc: "Sigue las andanzas del Caballero de la Triste Figura y su fiel escudero, Sancho Panza. Más que una sátira de los libros de caballería, es una exploración profunda de la condición humana y la lucha entre los sueños y la realidad. La novela más importante de la lengua española.",
            img: "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/2127c111-ccd5-4554-9e92-a062689394a2/f86627a8-f5c1-440c-aacc-2cf8320516f5.jpg"
        },
        "OL1018804W": {
            titulo: "El Martín Fierro",
            autor: "José Hernández",
            desc: "El poema nacional argentino que narra la vida, las penas y la rebeldía de Martín Fierro. Obligado a abandonar a su familia para defender la frontera, este relato en verso captura la esencia del espíritu gaucho frente a la injusticia social. Un clásico de honor y valentía.",
            img: "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/867e50c1-fcc6-41cf-a558-0b6042e97b55/9789873952401.jpg"
        },
        "OL81005W": {
            titulo: "Rayuela",
            autor: "Julio Cortázar",
            desc: "Horacio Oliveira busca a la Maga en un París bohemio y en un Buenos Aires melancólico. Cortázar rompe todas las reglas con esta antinovela que puedes leer en el orden que prefieras. Un rompecabezas literario lleno de jazz, filosofía y juegos que cambiará tu forma de leer.",
            img: "https://cdn.livriz.com/media/mediaspace/F9AFB48D-741D-4834-B760-F59344EEFF34/45/679f1991-2880-4e2a-b4f7-a7675f1b3269/9789877252538.jpg"
        },
        "OL1965576W": {
            titulo: "Comer Rezar Amar",
            autor: "Elizabeth Gilbert",
            desc: "Tras un divorcio difícil, la autora decide dejarlo todo para encontrarse a sí misma. El placer de la comida en Italia, la paz de la oración en la India y el equilibrio del amor en Bali. Un best-seller inspirador para quienes buscan un nuevo comienzo y la verdadera felicidad.",
            img: "img/comerrezaramar.webp"
        }
    };
    if (id && txtTitulo) {
        try {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`);
            const data = await response.json();
            const libroManual = destacados[id];
            txtTitulo.textContent = libroManual ? libroManual.titulo : data.title;
            const txtAutor = document.getElementById('libro-autor');
            if (txtAutor) txtAutor.textContent = libroManual ? libroManual.autor : "Autor de la API";
            const txtDesc = document.getElementById('libro-descripcion');
            if (txtDesc) {
                if (libroManual) {
                    txtDesc.textContent = libroManual.desc;
                } else {
                    let desc = data.description;
                    txtDesc.textContent = (typeof desc === 'string' ? desc : desc?.value || "Sin descripción.").split('http')[0];
                }
            }
            const imgPortada = document.getElementById('libro-portada');
            if (imgPortada) {
                if (libroManual) {
                    imgPortada.src = libroManual.img;
                } else if (data.covers) {
                    imgPortada.src = `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`;
                }
            }
            if (document.getElementById('libro-precio')) document.getElementById('libro-precio').textContent = "$26.900";
        } catch (e) {
            txtTitulo.textContent = "Error al cargar datos.";
        }
    }
});