
export default async (request) => {
  // Obtener variables guardadas en .env.local
  const apiUrl = process.env.COINGECKO_API_URL
  const apiKey = process.env.COINGECKO_API_KEY

  const { searchParams } = new URL(request.url)

  const moneda = searchParams.get('moneda')
  const criptomoneda = searchParams.get('criptomoneda')

  const monedasPermitidas = ['usd', 'eur', 'gbp', 'mxn', 'pen']

  const criptomonedasPermitidas = [
    'bitcoin',
    'ethereum',
    'solana',
    'ripple',
    'cardano',
    'dogecoin',
    'usd-coin',
    'tether',
    'euro-coin',
    'aave',
    'uniswap',
    'chainlink',
  ]

  if (
    !monedasPermitidas.includes(moneda) ||
    !criptomonedasPermitidas.includes(criptomoneda)
  ) {
    return new Response(
      JSON.stringify({
        error: 'Moneda o criptomoneda no válida'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const params = new URLSearchParams({
    ids: criptomoneda,  // Criptomoneda seleccionada
    vs_currencies: moneda, // 	Moneda seleccionada
    include_24hr_change: 'true', // Variación porcentual en 24 horas
    include_24hr_vol: 'true', // Volumen de operaciones en 24 horas
    include_market_cap: 'true', // Capitalización de mercado
    include_last_updated_at: 'true' // Fecha y hora de actualización
  })

  // construye automáticamente los parámetros de la URL
  const url = `${apiUrl}/simple/price?${params.toString()}`


  // Consultar la API
  try {
    const response = await fetch(url, {
      headers: {
        'x-cg-demo-api-key': apiKey // clave de autenticación.
      }
    })

    // Comprobar la respuesta
    if (!response.ok) {
      throw new Error(`[SERVIDOR - Netlify] HTTP Error: ${response.status}`)
    }

    // Convertir los datos a JSON de CoinGecko en un objeto JavaScript
    const data = await response.json()
    console.log('[SERVIDOR - Netlify] Datos recibidos de CoinGecko:', data)

    // Convierte ese objeto nuevamente en texto JSON para enviarlo a Vue
    return new Response(JSON.stringify(data), {  // Construye la respuesta HTTP de nuestra Netlify Function
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    console.error('[SERVIDOR - Netlify] Error al consultar CoinGecko:', error)

    return new Response(
      JSON.stringify({ error: 'No se pudo obtener la cotización' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
