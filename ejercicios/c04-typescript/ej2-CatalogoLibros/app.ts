interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string;
}

const catalogo: Libro[] = [
    { isbn: "111", titulo: "Desarrollo de Software", autor: "Matias Corti", precio: 4500, disponible: true },
    { isbn: "222", titulo: "Ingenieria en Sistemas", autor: "UTN", precio: 3800, disponible: true },
    { isbn: "333", titulo: "Odisea", autor: "Homero", precio: 5200, disponible: false }
];

const inputBusqueda = document.getElementById('inputBusqueda') as HTMLInputElement;
const btnFiltrar = document.getElementById('btnFiltrar') as HTMLButtonElement;
const btnDisponibles = document.getElementById('btnDisponibles') as HTMLButtonElement;
const btnVerTodos = document.getElementById('btnVerTodos') as HTMLButtonElement;
const listado = document.getElementById('resultadoLibros') as HTMLElement;
const txtPromedio = document.getElementById('txtPromedio') as HTMLElement;

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(l => l.disponible);
}

function calcularPromedio(lista: Libro[]): number {
    if (lista.length === 0) return 0;
    const total = lista.reduce((acc, l) => acc + l.precio, 0);
    return total / lista.length;
}

function renderizar(libros: Libro[]): void {
    listado.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement('li');
        li.textContent = `${l.titulo} - ${l.autor} ($${l.precio}) ${l.disponible ? '' : '[Sin Stock]'}`;
        if (!l.disponible) li.style.color = "red";
        listado.appendChild(li);
    });
    const prom = calcularPromedio(libros);
    txtPromedio.textContent = `Mostrando: ${libros.length} | Promedio: $${prom.toFixed(2)}`;
}

btnFiltrar.addEventListener('click', () => {
    renderizar(buscarPorAutor(inputBusqueda.value));
});

btnDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

btnVerTodos.addEventListener('click', () => {
    renderizar(catalogo);
    inputBusqueda.value = "";
});

renderizar(catalogo);