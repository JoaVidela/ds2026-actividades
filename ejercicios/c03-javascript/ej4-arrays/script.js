// Definicion del Array
const numeros = [15, 42, 8 ,91, 23, 64, 10 ,37, 56, 29];

let sumaTotal = 0;
let mayor = numeros[0];
let menor = numeros[0];

// Bucle para recorrer el Array
for (let num of numeros) {
    sumaTotal+= num;
    if (num > mayor) {
        mayor = num;
    }
    if (num < menor) {
        menor = num;
    }
}

//Calcular promedio
const promedio = sumaTotal / numeros.length;

// Mostrar resultados
console.log("---- RESULTADOS ----");
console.log*(`Lista de números: ${numeros}`);
console.log(`Suma total: ${sumaTotal}`);    
console.log(`Promedio: ${promedio}`);
console.log(`Número mayor: ${mayor}`);  
console.log(`Número menor: ${menor}`);

// Función para generar asteriscos
function generarAsteriscos(n) {
    let cadena = "";
    for (let i = 0; i < n; i++) {
        cadena += "*";
    }
    return cadena;
}

//Prueba de la funcion
console.log(`Asteriscos (5): ${generarAsteriscos(5)}`);                     // Output: *****