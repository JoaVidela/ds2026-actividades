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
const inputTitulo = document.getElementById('nuevoTitulo');
const inputAutor = document.getElementById('nuevoAutor');
const inputPrecio = document.getElementById('nuevoPrecio');
const btnAgregar = document.getElementById('btnAgregar');
const inputDisponible = document.getElementById('nuevoDisponible');
function eliminarLibros(isbn) {
    const indice = catalogo.findIndex(l => l.isbn === isbn);
    if (indice !== -1) {
        catalogo.splice(indice, 1);
        renderizar(catalogo);
    }
}
function validarFormulario() {
    let resultado = null;
    const precio = parseFloat(inputPrecio.value);
    if (inputTitulo.value.trim() !== "" && precio > 0) {
        resultado = {
            isbn: "AUTO-" + Date.now(),
            titulo: inputTitulo.value,
            autor: inputAutor.value,
            precio: precio,
            disponible: inputDisponible.checked
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
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.style.marginLeft = "20px";
        btnEliminar.style.backgroundColor = "red";
        btnEliminar.style.color = "white";
        btnEliminar.style.border = "none";
        btnEliminar.style.padding = "4px 8px";
        li.textContent = `ISBN: ${l.isbn} | Título: ${l.titulo} | Autor: ${l.autor} | Precio: $${l.precio} | Disponible: ${l.disponible ? "Sí" : "No"}`;
        li.appendChild(btnEliminar);
        listado.appendChild(li);
        btnEliminar.addEventListener('click', function () {
            eliminarLibros(l.isbn);
        });
    });
    const promedio = calcularPromedio(libros);
    txtPromedio.textContent = `Precio promedio: $${promedio.toFixed(2)}`;
}
btnAgregar.addEventListener('click', () => {
    const nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        catalogo.push(nuevoLibro);
        inputTitulo.value = "";
        inputAutor.value = "";
        inputPrecio.value = "";
        inputDisponible.checked = false;
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
