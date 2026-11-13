import { ref, computed } from 'vue';

export default function useCrypto() {

  const monedas = ref([
    { codigo: 'usd', texto: 'Dólar Estadounidense' },
    { codigo: 'eur', texto: 'Euro' },
    { codigo: 'gbp', texto: 'Libra Esterlina' },
    { codigo: 'mxn', texto: 'Peso Mexicano' },
    { codigo: 'pen', texto: 'Sol Peruano' },
    // { codigo: 'vef', texto: 'Bolivar Fuerte' },
  ]);

  const criptomonedas = ref([
    { codigo: 'BTC', id: 'bitcoin', texto: 'Bitcoin' },
    { codigo: 'ETH', id: 'ethereum', texto: 'Ethereum' },
    { codigo: 'SOL', id: 'solana', texto: 'Solana' },
    { codigo: 'XRP', id: 'ripple', texto: 'XRP' },
    { codigo: 'ADA', id: 'cardano', texto: 'Cardano' },
    { codigo: 'DOGE', id: 'dogecoin', texto: 'Dogecoin' },
    { codigo: 'AAVE', id: 'aave', texto: 'Aave' },
    { codigo: 'UNI', id: 'uniswap', texto: 'Uniswap' },
    { codigo: 'LINK', id: 'chainlink', texto: 'Chainlink' },
    { codigo: 'USDC', id: 'usd-coin', texto: 'USD Coin' },
    { codigo: 'USDT', id: 'tether', texto: 'Tether' },
    { codigo: 'EURC', id: 'euro-coin', texto: 'Euro Coin' },

  ]);

  // Con ref() podemos inicializar un objeto vacío y reemplazarlo completamente cuando recibamos los datos
  const cotizacion = ref({}) // Guardar los resultados

  const cargando = ref(false); // Controlar el estado de carga

  // Consultar la API y procesar la respuesta
  const obtenerCotizacion = async (cotizar) => {
    cargando.value = true; // No hay una consulta activa
    cotizacion.value = {} // Limpiar cotizacion anterior

    const { moneda, criptomoneda } = cotizar

    const url = `/.netlify/functions/crypto?moneda=${moneda}&criptomoneda=${criptomoneda}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
      }

      const data = await response.json()
      // console.log('[NAVEGADOR - Vue] Respuesta completa:', data)

      // Extraer el precio de CoinGecko
      const precio = data[criptomoneda]?.[moneda]
      
      // Validar el precio antes de guardarl
      if (typeof precio !== 'number') {
        throw new Error('No se encontró una cotización válida')
      }
      // Guardar el resultado en el estado reactivo
      cotizacion.value = {
        precio,
        moneda,
        criptomoneda,
        cambio24h: data[criptomoneda][`${moneda}_24h_change`],
        volumen24h: data[criptomoneda][`${moneda}_24h_vol`],
        capitalizacion: data[criptomoneda][`${moneda}_market_cap`],
        actualizado: data[criptomoneda].last_updated_at
      }

      
    } catch (error) {
      console.error('[NAVEGADOR - Vue] Error al cotizar:', error)
    }
    
    finally {
      cargando.value = false;      
    }
  }

  const hayCotizacion = computed(() => {
    return Object.keys(cotizacion.value).length > 0
  })

  return {
    monedas,
    criptomonedas,
    cotizacion,
    cargando,
    obtenerCotizacion,
    hayCotizacion
  }
}