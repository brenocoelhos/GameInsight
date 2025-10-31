import Papa from 'papaparse'
import { ref } from 'vue'
import { formatDateISO, formatNumber } from '@/utils/formatters'

interface PicoJogo {
  Jogo: string
  Data_Pico: string
  Pico_Jogadores: number
}

interface HypeData {
  Jogo: string
  Pico_Data: string
  Pico_Valor: number
  Duracao_meses_50pct: number | null
}

export function useAdvancedData () {
  const picosData = ref<PicoJogo[]>([])
  const hypeData = ref<HypeData[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadPicosData () {
    try {
      isLoading.value = true
      const response = await fetch('/picos_jogos.csv')
      const csvText = await response.text()
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => {
          picosData.value = results.data as PicoJogo[]
        },
      })
    }
    catch (error_) {
      error.value = 'Erro ao carregar dados de picos'
      console.error(error_)
    }
    finally {
      isLoading.value = false
    }
  }

  async function loadHypeData () {
    try {
      isLoading.value = true
      const response = await fetch('/hype_estimado.csv')
      const csvText = await response.text()

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: results => {
          hypeData.value = results.data as HypeData[]
        },
      })
    }
    catch (error_) {
      error.value = 'Erro ao carregar dados de hype'
      console.error(error_)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    picosData,
    hypeData,
    isLoading,
    error,
    loadPicosData,
    loadHypeData,
    formatNumber,
    formatDate: formatDateISO,
  }
}
