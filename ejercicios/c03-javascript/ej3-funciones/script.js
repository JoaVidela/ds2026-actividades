function calcularPrecioFinal(monto, mediopago) {
    let descuento = 0;
    if (monto < 200) 
        {
        descuento = 0;
    }
    else if (monto >= 200 && monto < 400) {
        if (mediopago === "E") {
            descuento = 0.30;
        } else if (mediopago === "D") {
            descuento = 0.20;
        } else if (mediopago === "C") {
            descuento = 0.10;
        }
    }
    else {
        descuento = 0.40;
}  
    const total = monto * (1 - descuento);
    return total;
}

console.log("----------EJERCICIOS3:PRECIOS ----------");
console.log(`Monto: $150 | Pago: E | Final: $${calcularPrecioFinal(150, "E")}`);        //150
console.log(`Monto: $250 | Pago: D | Final: $${calcularPrecioFinal(250, "D")}`);        //200
console.log(`Monto: $350 | Pago: C | Final: $${calcularPrecioFinal(350, "C")}`);    //315
console.log(`Monto: $500 | Pago: E | Final: $${calcularPrecioFinal(500, "E")}`);        //300
console.log(`Monto: $450 | Pago: D | Final: $${calcularPrecioFinal(450, "D")}`);        //270
console.log(`Monto: $300 | Pago: C | Final: $${calcularPrecioFinal(300, "C")}`);    //270
