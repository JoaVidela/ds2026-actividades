const inputProd = document.getElementById("inputProducto");
const btnAgregar = document.getElementById("btnAgregar");
const listaProductos = document.getElementById("listaProductos"); 
const displayContador = document.getElementById("contadorDisplay");

let totalProductos = 0; 

btnAgregar.addEventListener('click', function() {
    const nombre = inputProd.value.trim();

    if (nombre === "") {  
        alert("No se puede agregar un producto vacío.");
        return;
    } 

    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = nombre + " "; // Corregido con +

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = "Eliminar";  
    btnEliminar.style.marginLeft = "10px";

    btnEliminar.onclick = function() {
        nuevoItem.remove();
        totalProductos--;
        actualizarContador();
    };

    nuevoItem.appendChild(btnEliminar); 
    listaProductos.appendChild(nuevoItem);
    totalProductos++;
    actualizarContador();
    inputProd.value = "";
    inputProd.focus();
});

function actualizarContador() {
    displayContador.textContent = `Total de productos: ${totalProductos}`;
}