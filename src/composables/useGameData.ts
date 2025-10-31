import Papa from 'papaparse'
import { ref } from 'vue'
import { formatMonthYear } from '@/utils/formatters'

export interface GameData {
  Categoria: string
  Jogo: string
  Mes: string
  Ano: string
  Media: number
  Ganho_Absoluto: number
  Ganho_Porcentagem: number
  Jogadores: number
}

export interface Stats {
  totalGames: number
  totalCategories: number
  avgPlayers: string
  totalRecords: number
}

export interface Game {
  name: string
  avgPlayers: number
}

export function useGameData () {
  const gameData = ref<GameData[]>([])
  const stats = ref<Stats>({
    totalGames: 0,
    totalCategories: 0,
    avgPlayers: '0',
    totalRecords: 0,
  })
  const topGames = ref<Game[]>([])
  const isLoading = ref(true)

  function formatGameName (gameName: string): string {
    if (!gameName) {
      return ''
    }

    const nameMapping: Record<string, string> = {
      'counter-strike': 'Counter-Strike',
      'dota 2': 'Dota 2',
      'pubg': 'PUBG',
      'grand theft auto v': 'GTA V',
      'cyberpunk 2077': 'Cyberpunk',
      'the witcher 3': 'The Witcher 3',
      'red dead redemption 2': 'Red Dead Redemption 2',
      'call of duty: modern warfare': 'Call of Duty: Modern Warfare',
      'clair obscur expedition 33': 'Expedition 33',
    }

    const lowerName = gameName.toLowerCase().trim()
    if (nameMapping[lowerName]) {
      return nameMapping[lowerName]
    }

    let formatted = gameName.trim()

    formatted = formatted
      .split(' ')
      .map(word => {
        const lowercase = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']

        if (lowercase.includes(word.toLowerCase())) {
          return word.toLowerCase()
        }

        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')

    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)

    const maxLength = 40
    if (formatted.length > maxLength) {
      formatted = formatted.slice(0, maxLength - 3) + '...'
    }

    return formatted
  }

  function processData (data: GameData[]) {
    gameData.value = data

    // Calcular jogos únicos e categorias
    const gameSet = new Set<string>()
    const categorySet = new Set<string>()
    let totalPlayers = 0

    for (const row of data) {
      if (row.Jogo) {
        gameSet.add(row.Jogo)
      }
      if (row.Categoria) {
        categorySet.add(row.Categoria)
      }
      if (row.Jogadores) {
        totalPlayers += row.Jogadores
      }
    }

    // Calcular top games
    const gameMap = new Map<string, { total: number, count: number }>()
    for (const row of data) {
      if (row.Jogo && row.Media != null) {
        const current = gameMap.get(row.Jogo) || { total: 0, count: 0 }
        gameMap.set(row.Jogo, {
          total: current.total + row.Media,
          count: current.count + 1,
        })
      }
    }

    topGames.value = Array.from(gameMap.entries())
      .map(([name, { total, count }]) => ({
        name: formatGameName(name),
        avgPlayers: Number.parseFloat((total / count).toFixed(2)),
      }))
      .toSorted((a, b) => b.avgPlayers - a.avgPlayers)
      .slice(0, 8)

    // Atualizar estatísticas
    stats.value = {
      totalGames: gameSet.size,
      totalCategories: categorySet.size,
      avgPlayers: (totalPlayers / data.length).toFixed(2),
      totalRecords: data.length,
    }

    isLoading.value = false
  }

  function loadData () {
    isLoading.value = true
    fetch('/src/assets/dados_steam_limpos (1).csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse<GameData>(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: results => {
            processData(results.data)
          },
          error: (error: Error) => {
            console.error('Erro ao processar CSV:', error)
            isLoading.value = false
          },
        })
      })
      .catch((error: Error) => {
        console.error('Erro ao buscar o arquivo CSV:', error)
        isLoading.value = false
      })
  }

  return {
    gameData,
    stats,
    topGames,
    isLoading,
    loadData,
    formatGameName,
    formatDate: formatMonthYear,
  }
}
