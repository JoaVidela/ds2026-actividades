function clasificarNota (nota) {
  if (nota  < 4) {
    return "Desaprobado";
  } else if (nota >= 4 && nota < 6) {
    return "Aprobado";
  } else {
    return "Promocionado";
  }
}

console.log("Nota 3:", clasificarNota(3));      // Desaprobado
console.log("Nota 5:", clasificarNota(5));      // Aprobado
console.log("Nota 7:", clasificarNota(7));      // Promocionado 

function DiaDeLaSemana (numero) {
  switch (numero) {
        case 1: return "Lunes";
    case 2: return "Martes";
    case 3: return "Miércoles"; 
    case 4: return "Jueves";
    case 5: return "Viernes";
    case 6: 
    case 7: 
        return (numero === 6 ? "Sábado" : "Domingo") + " (Fin de Semana)";
    default: return "Número inválido";
    }
}

// Pruebas
console.log("Número 1:", DiaDeLaSemana(1)); // Lunes
console.log("Número 4:", DiaDeLaSemana(4)); // Jueves
console.log("Número 6:", DiaDeLaSemana(6)); // Sábado (Fin de Semana)
console.log("Número 7:", DiaDeLaSemana(7)); // Domingo (Fin de Semana)
console.log("Número 8:", DiaDeLaSemana(8)); // Número inválido