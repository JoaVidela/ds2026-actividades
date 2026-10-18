export const formatearPrecio = (precio: number) =>
  `$ ${new Intl.NumberFormat('es-AR').format(precio)}`;
