export const formatearPrecio = (precio, moneda) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: moneda.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(precio)
}

export const formatearCantidad = (cantidad, moneda) => {
  if (typeof cantidad !== 'number' || !Number.isFinite(cantidad)) {
    return 'No disponible'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: moneda.toUpperCase(),
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(cantidad)
}

export const formatearPorcentaje = (valor) => {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) {
    return 'No disponible'
  }

  return `${valor > 0 ? '+' : ''}${valor.toFixed(2)}%`
}

export const formatearFecha = (timestamp) => {
  if (typeof timestamp !== 'number') {
    return 'No disponible'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(timestamp * 1000))
}