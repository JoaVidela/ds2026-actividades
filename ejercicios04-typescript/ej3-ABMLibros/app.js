"use strict";
const catalogo = [
    { isbn: "111", titulo: "Desarrollo de Software", autor: "Matias Corti", precio: 4500, disponible: true },
    { isbn: "222", titulo: "Ingenieria en Sistemas", autor: "UTN", precio: 3800, disponible: true },
    { isbn: "333", titulo: "Odisea", autor: "Homero", precio: 5200, disponible: false }
];
const inputBusqueda = document.getElementById('inputBusqueda');
const btnFiltrar = document.getElementById('btnFiltrar');
const btnDisponibles = document.getElementById('btnDisponibles');
const btnVerTodos = document.getElementById('btnVerTodos');
const listado = document.getElementById('resultadoLibros');
const txtPromedio = document.getElementById('txtPromedio');
const inputIsbn = document.getElementById('nuevoIsbn');
const inputTitulo = document.getElementById('nuevoTitulo');
const inputAutor = document.getElementById('nuevoAutor');
const inputPrecio = document.getElementById('nuevoPrecio');
const btnAgregar = document.getElementById('btnAgregar');
function eliminarLibros(isbn) {
    const indice = catalogo.findIndex(l => l.isbn === isbn);
    if (indice !== -1) {
        catalogo.splice(indice, 1);
        renderizar(catalogo);
    }
}
function validarFormulario() {
    let resultado = null; // Empezamos asumiendo que falla
    const precio = parseFloat(inputPrecio.value);
    if (inputTitulo.value.trim() !== "" && precio > 0) {
        resultado = {
            isbn: "AUTO-" + Date.now(),
            titulo: inputTitulo.value,
            autor: inputAutor.value,
            precio: precio,
            disponible: true
        };
    }
    return resultado;
}
function buscarPorAutor(autor) {
    return catalogo.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
}
function librosDisponibles() {
    return catalogo.filter(l => l.disponible);
}
function calcularPromedio(lista) {
    if (lista.length === 0)
        return 0;
    const total = lista.reduce((acc, l) => acc + l.precio, 0);
    return total / lista.length;
}
function renderizar(libros) {
    listado.innerHTML = "";
    libros.forEach(l => {
        const li = document.createElement('li');
        const estado = l.disponible ? "" : " [Sin Stock]";
        li.innerHTML = `
            <span><strong>${l.titulo}</strong> - ${l.autor} ($${l.precio})${estado}</span>
            <button class="btn-delete" style="margin-left: 15px; background-color: #e74c3c; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">
                Eliminar
            </button>
        `;
        if (!l.disponible) {
            li.style.color = "red";
        }
        const btnEliminar = li.querySelector('.btn-delete');
        btnEliminar.onclick = () => {
            eliminarLibros(l.isbn);
        };
        listado.appendChild(li);
    });
    const prom = calcularPromedio(libros);
    txtPromedio.textContent = `Mostrando: ${libros.length} | Promedio: $${prom.toFixed(2)}`;
}
btnAgregar.addEventListener('click', () => {
    const nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        catalogo.push(nuevoLibro);
        inputIsbn.value = "";
        inputTitulo.value = "";
        inputAutor.value = "";
        inputPrecio.value = "";
        renderizar(catalogo);
    }
});
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
