<template>
  <v-sheet class="pa-4 tab-container" elevation="4">
    <v-tabs
      v-model="selectedTab"
      align-tabs="center"
      class="rounded-lg mt-2"
      color="primary"
      show-arrows
    >
      <v-tab v-for="game in games" class="game-tab ml-2" :key="game.name" :value="game.name">
        {{ game.name }}
      </v-tab>
    </v-tabs>

    <v-divider />

    <v-tabs-window v-model="selectedTab">
      <v-tabs-window-item v-for="game in games" :key="game.name" :value="game.name">
        <v-card class="pa-2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="font-weight-bold text-primary">
              {{ game.name }} — Estatísticas
            </span>

            <v-card
              class="metric-card d-flex align-center justify-center"
              elevation="2"
            >
              <v-icon color="primary" size="22" class="mr-2">mdi-account-group</v-icon>
              <div class="text-center">
                <div class="text-caption text-grey">Média de Jogadores</div>
                <div class="text-h6 font-weight-bold text-primary number-centered">
                  {{ game.avgPlayers.toFixed(0).toLocaleString() }}
                </div>
              </div>
            </v-card>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-chip-group v-model="chartTypeModel" mandatory>
                  <v-chip
                    value="evolution"
                    :color="chartTypeModel === 'evolution' ? 'primary' : undefined"
                    :variant="chartTypeModel === 'evolution' ? 'flat' : 'outlined'"
                  >
                    <v-icon start>mdi-chart-line</v-icon>
                    Evolução Temporal
                  </v-chip>

                  <v-chip
                    value="growth"
                    :color="chartTypeModel === 'growth' ? 'primary' : undefined"
                    :variant="chartTypeModel === 'growth' ? 'flat' : 'outlined'"
                  >
                    <v-icon start>mdi-chart-bar</v-icon>
                    Crescimento (%)
                  </v-chip>

                  <v-chip
                    value="comparison"
                    :color="chartTypeModel === 'comparison' ? 'primary' : undefined"
                    :variant="chartTypeModel === 'comparison' ? 'flat' : 'outlined'"
                  >
                    <v-icon start>mdi-compare</v-icon>
                    Comparação Mensal
                  </v-chip>

                  <v-chip
                    value="average"
                    :color="chartTypeModel === 'average' ? 'primary' : undefined"
                    :variant="chartTypeModel === 'average' ? 'flat' : 'outlined'"
                  >
                    <v-icon start>mdi-chart-areaspline</v-icon>
                    Média por Período
                  </v-chip>
                </v-chip-group>

              </v-col>
            </v-row>

            <div class="chart-wrapper">
              <v-chart
                v-if="currentChartOption"
                :option="currentChartOption"
                autoresize
                class="chart-full"
              />
              <div v-else class="text-center pa-4">
                <v-progress-circular color="primary" indeterminate />
                <p class="mt-2">Carregando gráfico...</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { BarChart, LineChart } from 'echarts/charts'
  import {
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
  } from 'echarts/components'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { computed, ref } from 'vue'
  import VChart from 'vue-echarts'

  use([
    CanvasRenderer,
    LineChart,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent,
  ])

  export interface Game {
    name: string
    avgPlayers: number
  }

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

  const props = defineProps<{
    games: Game[]
    gameData: GameData[]
    formatGameName: (name: string) => string
    formatDate: (mes: string, ano: string) => string
  }>()

  const selectedTab = ref(props.games[0]?.name || '')
  const chartTypeModel = ref('evolution')

  const currentChartOption = computed(() => {
    const game = props.games.find(g => g.name === selectedTab.value)
    if (!game) return null

    const gameRows = props.gameData
      .filter(d => props.formatGameName(d.Jogo) === game.name)
      .toSorted((a, b) => {
        const dateA = new Date(Number(a.Ano), getMonthNumber(a.Mes))
        const dateB = new Date(Number(b.Ano), getMonthNumber(b.Mes))
        return dateA.getTime() - dateB.getTime()
      })

    switch (chartTypeModel.value) {
      case 'evolution': {
        return createEvolutionChart(game, gameRows)
      }
      case 'growth': {
        return createGrowthChart(game, gameRows)
      }
      case 'comparison': {
        return createComparisonChart(game, gameRows)
      }
      case 'average': {
        return createAverageChart(game, gameRows)
      }
      default: {
        return createEvolutionChart(game, gameRows)
      }
    }
  })

  function getMonthNumber (monthName: string): number {
    const months: Record<string, number> = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    }
    return months[monthName] || 0
  }

  function createEvolutionChart (game: Game, gameRows: GameData[]) {
    return {
      title: {
        text: `Evolução de Jogadores — ${game.name}`,
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const point = params[0]
          return `${point.name}<br/>Jogadores: ${point.value.toLocaleString()}`
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: gameRows.map(d => props.formatDate(d.Mes, d.Ano)),
        axisLabel: { rotate: 45, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        name: 'Jogadores',
        axisLabel: {
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      series: [
        {
          data: gameRows.map(d => d.Jogadores),
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.3 },
          itemStyle: { color: '#42A5F5' },
          lineStyle: { width: 3 },
        },
      ],
    }
  }

  function createGrowthChart (game: Game, gameRows: GameData[]) {
    return {
      title: {
        text: `Crescimento Percentual — ${game.name}`,
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const point = params[0]
          return `${point.name}<br/>Crescimento: ${point.value.toFixed(2)}%`
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: gameRows.map(d => props.formatDate(d.Mes, d.Ano)),
        axisLabel: { rotate: 45, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        name: 'Crescimento (%)',
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          data: gameRows.map(d => d.Ganho_Porcentagem),
          type: 'bar',
          itemStyle: {
            color: (params: any) => params.value >= 0 ? '#4CAF50' : '#F44336',
          },
        },
      ],
    }
  }

  function createComparisonChart (game: Game, gameRows: GameData[]) {
    return {
      title: {
        text: `Comparação: Jogadores vs Média — ${game.name}`,
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Jogadores', 'Média'],
        bottom: 5,
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: gameRows.map(d => props.formatDate(d.Mes, d.Ano)),
        axisLabel: { rotate: 45, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      series: [
        {
          name: 'Jogadores',
          data: gameRows.map(d => d.Jogadores),
          type: 'line',
          smooth: true,
          itemStyle: { color: '#2196F3' },
        },
        {
          name: 'Média',
          data: gameRows.map(d => d.Media),
          type: 'line',
          smooth: true,
          itemStyle: { color: '#FF9800' },
        },
      ],
    }
  }

  function createAverageChart (game: Game, gameRows: GameData[]) {
    // Agrupar por mês (independente do ano)
    const monthlyAvg = new Map<string, { total: number, count: number }>()

    for (const row of gameRows) {
      const current = monthlyAvg.get(row.Mes) || { total: 0, count: 0 }
      monthlyAvg.set(row.Mes, {
        total: current.total + row.Jogadores,
        count: current.count + 1,
      })
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December']

    const data = months
      .map(month => {
        const stats = monthlyAvg.get(month)
        return stats ? stats.total / stats.count : 0
      })

    return {
      title: {
        text: `Média de Jogadores por Mês — ${game.name}`,
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 'bold' },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const point = params[0]
          return `${point.name}<br/>Média: ${point.value.toLocaleString()} jogadores`
        },
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        top: '15%',
      },
      xAxis: {
        type: 'category',
        data: months.map(m => m.slice(0, 3)),
      },
      yAxis: {
        type: 'value',
        name: 'Jogadores',
        axisLabel: {
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      series: [
        {
          data,
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.5 },
          itemStyle: { color: '#9C27B0' },
          lineStyle: { width: 3 },
        },
      ],
    }
  }
</script>

<style scoped>
.tab-container {
  border-radius: 12px;
  background-color: #ffffff;
}

.v-tab.game-tab {
  text-transform: none;
  font-weight: 600;
  color: #555;
  transition: all 0.3s ease;
  min-width: 160px;
}

.v-tab.game-tab:hover {
  color: #1976d2;
  background-color: #e3f2fd;
  border-radius: 8px;
}

.v-tab.v-tab--selected {
  color: #fff !important;
  background-color: #1976d2 !important;
  border-radius: 8px;
  font-weight: 700;
}
.tab-container {
  border-radius: 12px;
  background-color: #ffffff;
}

/* ====== TABS BONITOS ====== */
.v-tab.game-tab {
  text-transform: none;
  font-weight: 600;
  color: #555;
  transition: all 0.3s ease;
  min-width: 160px;
}

.v-tab.game-tab:hover {
  color: #1976d2;
  background-color: #e3f2fd;
  border-radius: 8px;
}

.v-tab.v-tab--selected {
  color: #fff !important;
  background-color: #1976d2 !important;
  border-radius: 8px;
  font-weight: 700;
}

/* ====== GRÁFICOS ====== */
.chart-wrapper {
  width: 100%;
  height: 100%;
  min-height: 500px;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.chart-full {
  width: 100%;
  height: 100%;
}

/* ====== AJUSTES DE CARD ====== */
.v-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.v-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-card-title {
  font-size: 1.25rem;
  font-weight: 700;
}
.metric-card {
  border-radius: 10px;
  background-color: #f5f8ff;
  transition: all 0.3s ease;
  min-width: 180px;
  height: 70px; /* define altura fixa */
  display: flex;
  justify-content: center;
  align-items: center;
}

.metric-card:hover {
  background-color: #e3f2fd;
  transform: translateY(-2px);
}

.number-centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
