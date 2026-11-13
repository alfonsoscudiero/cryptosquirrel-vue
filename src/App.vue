<script setup>
  import { ref, reactive, computed } from 'vue';
  import Alerta from './components/Alerta.vue';
  import { formatearPrecio, formatearCantidad, formatearPorcentaje, formatearFecha } from './utilities/formatter.js';
  import LoadingIndicator from './components/LoadingIndicator.vue';
  import useCrypto from './composables/useCrypto.js'; 

  // onMounted(async () => {
  //   const url = '/.netlify/functions/crypto'

  //   try {
  //     const response = await fetch(url)

  //     if (!response.ok) {
  //       throw new Error(`[NAVEGADOR - Vue] HTTP Error: ${response.status}`)
  //     }

  //     // obtiene el tipo de contenido que devuelve el servido
  //     const contentType = response.headers.get('content-type')
  //     // comprueba si ese valor contiene application/json, evitando un error si es null
  //     if (!contentType?.includes('application/json')) {
  //       throw new Error('[NAVEGADOR - Vue] La respuesta no es JSON')
  //     }

  //     const data = await response.json()
  //     console.log('[NAVEGADOR - Vue] Datos recibidos de Netlify:', data)

  //   } catch (error) {
  //     console.error('[NAVEGADOR - Vue] Error al consultar la API:', error)
  //   }
  // })

  //  ref funciona con valores simples y objetos
  
  const { monedas, criptomonedas, cotizacion, cargando, obtenerCotizacion, hayCotizacion } = useCrypto();

  // Mostrar errores de validación
  const error = ref('');

  // reactive Se utiliza principalmente con objetos y colecciones
  // Guardar los datos del formulario 
  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  });

  const criptoSeleccionada = computed(() => {
    return criptomonedas.value.find(
      // compara el ID de cada activo con el ID de la cotización recibida.
      cripto => cripto.id === cotizacion.value.criptomoneda
    )
  })

  // Validar el Formulario
  const cotizarCripto = () => {
    error.value = ''

    if (cotizar.moneda === '' || cotizar.criptomoneda === '') {
      error.value = 'Debes seleccionar una moneda y una criptomoneda'
      return
    }

    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">
      Cotizador de <span>Criptomonedas</span>
    </h1>

    <div class="contenido">
      <Alerta
        v-if="error"
      >
        {{ error }}
      </Alerta>

      <form 
        class="formulario"
        @submit.prevent="cotizarCripto"
      >
        <div class="campo">
          <label for="moneda">
            Moneda:
          </label>
          <select 
            id="moneda" 
            v-model="cotizar.moneda"
          >
            <option value="">--  Selecciona  --</option>

            <option 
              v-for="moneda in monedas"  
              :value="moneda.codigo"
            > 
              {{ moneda.texto }}
            </option>
          </select>
        </div>

        <div class="campo">
          <label for="criptomoneda">
            Criptomoneda:
          </label>

          <select 
            id="criptomoneda" 
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Selecciona --</option>

            <option
              v-for="cripto in criptomonedas"
              :key="cripto.id"
              :value="cripto.id"
            >
              {{ cripto.texto }}
            </option>
          </select>
        </div>

        <input 
          type="submit"
          value="Cotizar"
          :disabled="cargando"
        >
      </form>

      <LoadingIndicator 
        v-if="cargando"
      />
      
      <div
        v-if="hayCotizacion"
        class="contenedor-resultado"
      >
        <h2>Cotización</h2>

        <div class="resultado">
          <img
            v-if="criptoSeleccionada"
            :src="`/img/crypto/${criptoSeleccionada.id}.webp`"
            :alt="`Logo de ${criptoSeleccionada.texto}`"
            class="imagen-cripto"
          />

          <div class="cotizacion-principal">
            <p class="nombre-cripto">
              {{ criptoSeleccionada?.texto }}
              ({{ criptoSeleccionada?.codigo }})
            </p>

            <p class="precio-actual">
              {{ formatearPrecio(cotizacion.precio, cotizacion.moneda) }}
            </p>

            <p class="descripcion-precio">
              Precio de 1 {{ criptoSeleccionada?.codigo }}
              en {{ cotizacion.moneda.toUpperCase() }}
            </p>
          </div>
        </div>

        <div class="indicadores">
          <div>
            <p class="indicador-label">Variación 24 h</p>
            <p
              class="indicador-valor"
              :class="{
                positivo: cotizacion.cambio24h > 0,
                negativo: cotizacion.cambio24h < 0
              }"
            >
              {{ formatearPorcentaje(cotizacion.cambio24h) }}
            </p>
          </div>

          <div>
            <p class="indicador-label">Volumen 24 h</p>
            <p class="indicador-valor">
              {{ formatearCantidad(cotizacion.volumen24h, cotizacion.moneda) }}
            </p>
          </div>

          <div>
            <p class="indicador-label">Capitalización</p>
            <p class="indicador-valor">
              {{ formatearCantidad(cotizacion.capitalizacion, cotizacion.moneda) }}
            </p>
          </div>

          <div>
            <p class="indicador-label">Última actualización</p>
            <p class="indicador-valor">
              {{ formatearFecha(cotizacion.actualizado) }}
            </p>
          </div>
        </div>

        <p class="fuente-datos">Fuente: CoinGecko</p>
      </div>

    </div>
  </div>
</template>
