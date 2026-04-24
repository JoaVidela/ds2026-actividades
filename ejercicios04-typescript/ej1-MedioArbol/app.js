"use strict";
function generarAsteriscos(n) {
    let cadena = "";
    for (let i = 0; i < n; i++) {
        cadena += "*";
    }
    return cadena;
}
const inputAltura = document.getElementById('inputAltura');
const btnGenerar = document.getElementById('btnGenerar');
const resultadoArbol = document.getElementById('resultadoArbol');
const errorArbol = document.getElementById('errorArbol');
btnGenerar.addEventListener('click', function () {
    const altura = parseInt(inputAltura.value);
    // Limpiar resultados anteriores
    resultadoArbol.textContent = "";
    errorArbol.textContent = "";
    //Validacion de Altura
    if (isNaN(altura) || altura < 1) {
        errorArbol.textContent = 'Por favor, ingresa una altura válida (número entero positivo).';
        return;
    }
    //Generacion del arbol
    let arbol = '';
    for (let i = 1; i <= altura; i++) {
        arbol += generarAsteriscos(i) + '\n';
    }
    // Mostrar el resultado en el <pre>
    resultadoArbol.textContent = arbol;
});
