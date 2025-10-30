import { ref } from 'vue'
import Papa from 'papaparse'

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

export function useAdvancedData() {
  const picosData = ref<PicoJogo[]>([])
  const hypeData = ref<HypeData[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadPicosData() {
    try {
      isLoading.value = true
      const response = await fetch('/src/assets/picos_jogos.csv')
      const csvText = await response.text()
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          picosData.value = results.data as PicoJogo[]
        },
      })
    } catch (err) {
      error.value = 'Erro ao carregar dados de picos'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function loadHypeData() {
    try {
      isLoading.value = true
      const response = await fetch('/src/assets/hype_estimado.csv')
      const csvText = await response.text()

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          hypeData.value = results.data as HypeData[]
        },
      })
    } catch (err) {
      error.value = 'Erro ao carregar dados de hype'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  function formatNumber(num: number): string {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toFixed(0)
  }

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return `${months[date.getMonth()]}/${date.getFullYear()}`
  }

  return {
    picosData,
    hypeData,
    isLoading,
    error,
    loadPicosData,
    loadHypeData,
    formatNumber,
    formatDate,
  }
}
