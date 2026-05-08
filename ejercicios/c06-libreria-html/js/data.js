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
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        const libros = data.docs.slice(0, 10); 
        estadoBusqueda.innerHTML = `<h3 class="mb-4">Resultados para "${query}":</h3>`;
        libros.forEach(libro => {
            const { title, author_name, first_publish_year, cover_i } = libro;
            const autor = author_name ? author_name[0] : 'Autor Desconocido';
            const anio = first_publish_year || "Sin año";
            const imgUrl = cover_i 
                ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` 
                : 'https://via.placeholder.com/150x200?text=Sin+Portada';
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4'; 
            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${imgUrl}" class="card-img-top" alt="${title}" style="height: 250px; object-fit: contain; background: #f8f9fa;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${title}</h5>
                        <p class="card-text text-muted">Autor: ${autor}</p>
                        <p class="card-text"><small>Año: ${anio}</small></p>
                        <a href="libro.html" class="btn btn-primary w-100">Ver Detalles</a>
                    </div>
                </div>
            `;
            resultados.appendChild(col);
        });

    } catch (error) {
        estadoBusqueda.innerHTML = '<div class="alert alert-danger">Error al buscar libros. Inténtalo de nuevo.</div>';
    }
}

btnBuscar.addEventListener('click', buscarLibros);