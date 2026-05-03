interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

const inputBusqueda = document.getElementById('inputBusqueda') as HTMLInputElement;
const botonBuscar = document.getElementById('botonBuscar') as HTMLButtonElement;
const resultados = document.getElementById('resultados') as HTMLDivElement;
const estadoBusqueda = document.getElementById('mensajeEstado') as HTMLParagraphElement;

async function buscarLibros() {
    const query = inputBusqueda.value.trim();
    if (!query) {
        estadoBusqueda.textContent = 'Por favor, ingresa un término de búsqueda.';
        resultados.innerHTML = '';
        return;
    } 
    estadoBusqueda.textContent = 'Buscando...';
    resultados.innerHTML = '';
    try { 
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error en la búsqueda: ${response.statusText}`);
        const data = await response.json();
        const libros: LibroOL[] = data.docs.slice(0, 10);
        estadoBusqueda.textContent = `Resultados para "${query}":`;
        libros.forEach(libro => {
            const card = document.createElement('div');
            card.style.border = '1px solid #ccc';
            card.style.padding = '10px';
            card.style.width = '200px';
            const { title, author_name, first_publish_year } = libro;
            const autor = author_name ? author_name[0] : 'Desconocido';
            const anio = first_publish_year || "Sin anio";
            card.innerHTML = `
                <h4>${title}</h4>
                <p><strong>Autor:</strong> ${autor}</p>
                <p><strong>Año:</strong> ${anio}</p>
            `;
            resultados.appendChild(card);
        });
    } catch (error) {
        estadoBusqueda.textContent = '<p style="color: red;">Error al buscar libros.</p>';
    }
}
botonBuscar.addEventListener('click', buscarLibros);