<template>
  <v-container fluid class="hype-page">
    <v-row>
      <v-col cols="12">
        <div class="page-header">
          <v-icon size="48" color="error" class="header-icon">mdi-fire</v-icon>
          <div>
            <h1 class="text-h3 font-weight-bold mb-2">Análise de Hype dos Games</h1>
            <p class="text-subtitle-1 text-grey">Medindo a intensidade e duração do engajamento</p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-card class="stat-card gradient-red" dark elevation="12">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-overline mb-1">🔥 Hype Extremo</p>
                <h2 class="text-h4 font-weight-bold">{{ extremeHypeGames.length }}</h2>
                <p class="text-caption">Jogos com +1M de pico</p>
              </div>
              <v-icon size="64" color="white" class="pulse-animation">mdi-fire</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="stat-card gradient-orange" dark elevation="12">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-overline mb-1">⚡ Hype Sustentável</p>
                <h2 class="text-h4 font-weight-bold">{{ sustainableHypeGames.length }}</h2>
                <p class="text-caption">Mantém 50%+ por 2+ meses</p>
              </div>
              <v-icon size="64" color="white">mdi-trending-up</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="stat-card gradient-purple" dark elevation="12">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-overline mb-1">🎯 Média de Duração</p>
                <h2 class="text-h4 font-weight-bold">{{ avgDuration.toFixed(1) }}</h2>
                <p class="text-caption">Meses sustentando hype</p>
              </div>
              <v-icon size="64" color="white">mdi-timer-sand</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card elevation="12" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="error">mdi-chart-bubble</v-icon>
            <span class="text-h5 font-weight-bold">Intensidade vs Durabilidade do Hype</span>
            <v-spacer />
            <v-chip color="error" variant="outlined">
              <v-icon left>mdi-information</v-icon>
              Tamanho = Pico de Jogadores
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-chart :option="bubbleChartOption" autoresize style="height: 500px" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card elevation="12" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="success">mdi-podium</v-icon>
            <span class="text-h6 font-weight-bold">Ranking por Intensidade</span>
          </v-card-title>
          <v-card-text>
            <v-chart :option="intensityChartOption" autoresize style="height: 400px" />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="12" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="info">mdi-clock-fast</v-icon>
            <span class="text-h6 font-weight-bold">Ranking por Durabilidade</span>
          </v-card-title>
          <v-card-text>
            <v-chart :option="durationChartOption" autoresize style="height: 400px" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-4">🌟 Jogos em Destaque</h2>
      </v-col>

      <v-col v-for="(game, index) in topGames" :key="index" cols="12" md="4">
        <v-card class="game-card pa-4" elevation="12" :class="`rank-${index + 1}`">
          <div class="rank-badge">
            <v-icon v-if="index === 0" color="amber" size="32">mdi-trophy</v-icon>
            <v-icon v-else-if="index === 1" color="grey-lighten-1" size="28">mdi-medal</v-icon>
            <v-icon v-else color="brown" size="28">mdi-medal</v-icon>
          </div>
          <v-card-title class="text-h5 font-weight-bold">{{ game.Jogo }}</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <div class="stat-item">
                  <v-icon color="error" class="mr-2">mdi-fire</v-icon>
                  <div>
                    <div class="text-caption text-grey">Pico de Jogadores</div>
                    <div class="text-h6 font-weight-bold">{{ formatNumber(game.Pico_Valor) }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="stat-item">
                  <v-icon color="info" class="mr-2">mdi-calendar</v-icon>
                  <div>
                    <div class="text-caption text-grey">Data do Pico</div>
                    <div class="text-subtitle-1 font-weight-bold">{{ formatDate(game.Pico_Data) }}</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <div class="stat-item">
                  <v-icon color="success" class="mr-2">mdi-timer</v-icon>
                  <div>
                    <div class="text-caption text-grey">Duração do Hype (50%+)</div>
                    <div class="text-subtitle-1 font-weight-bold">
                      {{ game.Duracao_meses_50pct ? `${game.Duracao_meses_50pct} meses` : 'Em andamento' }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-progress-linear
              :model-value="getHypeScore(game)"
              :color="getHypeColor(game)"
              height="8"
              rounded
              class="mt-4"
            />
            <div class="text-center text-caption mt-2">
              Score de Hype: {{ getHypeScore(game).toFixed(0) }}/100
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col cols="12">
        <v-card elevation="12" class="pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-table-star</v-icon>
            <span class="text-h5 font-weight-bold">Análise Comparativa Completa</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="sortedHypeData"
              :items-per-page="10"
              class="elevation-0"
            >
              <template #item.Jogo="{ item }">
                <div class="d-flex align-center">
                  <v-avatar :color="getHypeColor(item)" size="32" class="mr-3">
                    <span class="text-caption font-weight-bold">{{ item.Jogo.slice(0, 2).toUpperCase() }}</span>
                  </v-avatar>
                  <span class="font-weight-medium">{{ item.Jogo }}</span>
                </div>
              </template>

              <template #item.Pico_Valor="{ item }">
                <v-chip :color="getPicoColor(item.Pico_Valor)" dark>
                  <v-icon left small>mdi-fire</v-icon>
                  {{ formatNumber(item.Pico_Valor) }}
                </v-chip>
              </template>

              <template #item.Duracao_meses_50pct="{ item }">
                <v-chip v-if="item.Duracao_meses_50pct" :color="getDurationColor(item.Duracao_meses_50pct)" dark>
                  <v-icon left small>mdi-clock</v-icon>
                  {{ item.Duracao_meses_50pct }} meses
                </v-chip>
                <v-chip v-else color="purple" dark>
                  <v-icon left small>mdi-infinity</v-icon>
                  Em alta
                </v-chip>
              </template>

              <template #item.hypeScore="{ item }">
                <div class="d-flex align-center">
                  <v-progress-circular
                    :model-value="getHypeScore(item)"
                    :color="getHypeColor(item)"
                    :size="50"
                    :width="5"
                  >
                    <span class="text-caption font-weight-bold">{{ getHypeScore(item).toFixed(0) }}</span>
                  </v-progress-circular>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart, ScatterChart } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  } from 'echarts/components'
  import { useAdvancedData } from '@/composables/useAdvancedData'

  use([
    CanvasRenderer,
    BarChart,
    ScatterChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
  ])

  const { hypeData, loadHypeData, formatNumber, formatDate } = useAdvancedData()

  const headers = [
    { title: 'Jogo', key: 'Jogo', align: 'start' as const },
    { title: 'Pico de Jogadores', key: 'Pico_Valor', align: 'center' as const },
    { title: 'Data', key: 'Pico_Data', align: 'center' as const },
    { title: 'Duração (50%+)', key: 'Duracao_meses_50pct', align: 'center' as const },
    { title: 'Score', key: 'hypeScore', align: 'center' as const },
  ]

  const sortedHypeData = computed(() => {
    return [...hypeData.value].toSorted((a, b) => b.Pico_Valor - a.Pico_Valor)
  })

  const extremeHypeGames = computed(() => {
    // Dados vêm em milhares, então 1_000 = 1 milhão de jogadores
    return hypeData.value.filter(g => g.Pico_Valor >= 1_000)
  })

  const sustainableHypeGames = computed(() => {
    return hypeData.value.filter(g => g.Duracao_meses_50pct && g.Duracao_meses_50pct >= 2)
  })

  const avgDuration = computed(() => {
    const validDurations = hypeData.value.filter(g => g.Duracao_meses_50pct !== null)
    if (validDurations.length === 0) return 0
    const sum = validDurations.reduce((acc, g) => acc + (g.Duracao_meses_50pct || 0), 0)
    return sum / validDurations.length
  })

  const topGames = computed(() => sortedHypeData.value.slice(0, 3))

  function getHypeScore (game: any): number {
    const picoScore = Math.min((game.Pico_Valor / 3_500_000) * 70, 70)
    const durationScore = game.Duracao_meses_50pct ? Math.min((game.Duracao_meses_50pct / 6) * 30, 30) : 15
    return picoScore + durationScore
  }

  function getHypeColor (game: any): string {
    const score = getHypeScore(game)
    if (score >= 80) return 'error'
    if (score >= 60) return 'orange'
    if (score >= 40) return 'warning'
    return 'info'
  }

  function getPicoColor (pico: number): string {
    if (pico >= 1_000_000) return 'error'
    if (pico >= 500_000) return 'orange'
    if (pico >= 100_000) return 'warning'
    return 'info'
  }

  function getDurationColor (duration: number): string {
    if (duration >= 4) return 'success'
    if (duration >= 2) return 'info'
    return 'warning'
  }

  const bubbleChartOption = computed(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const data = params.data
        return `<strong>${data.name}</strong><br/>
          Pico: ${formatNumber(data.value[1])}<br/>
          Duração: ${data.duration ? `${data.duration} meses` : 'Em andamento'}<br/>
          Score: ${data.score.toFixed(0)}/100`
      },
    },
    grid: {
      left: '10%',
      right: '5%',
      bottom: '10%',
      top: '5%',
      containLabel: true,
    },
    xAxis: {
      name: 'Duração (meses)',
      nameLocation: 'center',
      nameGap: 30,
      type: 'value',
      min: 0,
      max: 7,
    },
    yAxis: {
      name: 'Pico de Jogadores',
      nameLocation: 'center',
      nameGap: 50,
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatNumber(value),
      },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: (data: any) => Math.sqrt(data[1]) / 40 + 15,
        data: hypeData.value.map(g => ({
          value: [g.Duracao_meses_50pct || 0, g.Pico_Valor],
          name: g.Jogo,
          duration: g.Duracao_meses_50pct,
          score: getHypeScore(g),
        })),
        itemStyle: {
          color: (params: any) => {
            const score = params.data.score
            if (score >= 80) return '#f44336'
            if (score >= 60) return '#ff9800'
            if (score >= 40) return '#ffc107'
            return '#2196f3'
          },
          opacity: 0.8,
        },
      },
    ],
  }))

  const intensityChartOption = computed(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatNumber(value),
      },
    },
    yAxis: {
      type: 'category',
      data: sortedHypeData.value.slice(0, 5).map(g => g.Jogo).toReversed(),
    },
    series: [
      {
        type: 'bar',
        data: sortedHypeData.value.slice(0, 5).map(g => g.Pico_Valor).toReversed(),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#f44336' },
              { offset: 1, color: '#ff9800' },
            ],
          },
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => formatNumber(params.value),
        },
      },
    ],
  }))

  const durationChartOption = computed(() => {
    const withDuration = hypeData.value
      .filter(g => g.Duracao_meses_50pct !== null)
      .toSorted((a, b) => (b.Duracao_meses_50pct || 0) - (a.Duracao_meses_50pct || 0))
      .slice(0, 5)

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        name: 'Meses',
      },
      yAxis: {
        type: 'category',
        data: withDuration.map(g => g.Jogo).toReversed(),
      },
      series: [
        {
          type: 'bar',
          data: withDuration.map(g => g.Duracao_meses_50pct).toReversed(),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#2196f3' },
                { offset: 1, color: '#4caf50' },
              ],
            },
            borderRadius: [0, 10, 10, 0],
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c} meses',
          },
        },
      ],
    }
  })

  onMounted(() => {
    loadHypeData()
  })
</script>

<style scoped>
  .hype-page {
    background: linear-gradient(135deg, #ffffff 0%, #2196f3 100%);
    min-height: 100vh;
    padding: 24px;
  }

  .page-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
    padding: 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .header-icon {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .pulse-animation {
    animation: pulse 1.5s infinite;
  }

  .stat-card {
    border-radius: 16px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .stat-card:hover {
    transform: translateY(-8px) scale(1.02);
  }

  .gradient-red {
    background: linear-gradient(135deg, #f44336 0%, #e91e63 100%);
  }

  .gradient-orange {
    background: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  }

  .gradient-purple {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .chart-card {
    background: white;
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .chart-card:hover {
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2) !important;
  }

  .game-card {
    position: relative;
    border-radius: 16px;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  .game-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 16px 64px rgba(0, 0, 0, 0.25) !important;
  }

  .game-card.rank-1 {
    border: 3px solid #ffd700;
  }

  .game-card.rank-2 {
    border: 3px solid #c0c0c0;
  }

  .game-card.rank-3 {
    border: 3px solid #cd7f32;
  }

  .rank-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    margin-bottom: 8px;
  }
</style>
