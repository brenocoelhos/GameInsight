<template>
  <v-container class="outer-container" fluid>
    <div class="container">
      <v-card class="hero-card mb-6" elevation="16">
        <v-card-text class="hero-content">
          <div class="hero-text text-center">
            <v-icon size="48" color="white" class="mb-3">mdi-rocket-launch</v-icon>
            <h1 class="text-h3 font-weight-bold mb-2">Análise de Picos de Jogadores</h1>
            <p class="text-subtitle-1">Descobrindo os maiores momentos da história dos games</p>
          </div>
        </v-card-text>
      </v-card>

      <v-row class="mb-4">
        <v-col cols="12" sm="6" md="4">
          <v-card class="stat-card" elevation="8">
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <p class="text-overline mb-1">Maior Pico</p>
                  <h2 class="text-h5 font-weight-bold primary--text">{{ formatNumber(maxPico) }}</h2>
                  <p class="text-caption">{{ gameWithMaxPico }}</p>
                </div>
                <v-avatar color="primary" size="48">
                  <v-icon size="24" color="white">mdi-trophy</v-icon>
                </v-avatar>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="stat-card" elevation="8">
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <p class="text-overline mb-1">Total de Jogos</p>
                  <h2 class="text-h5 font-weight-bold success--text">{{ picosData.length }}</h2>
                  <p class="text-caption">Analisados</p>
                </div>
                <v-avatar color="success" size="48">
                  <v-icon size="24" color="white">mdi-gamepad-variant</v-icon>
                </v-avatar>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-card class="stat-card" elevation="8">
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <p class="text-overline mb-1">Período</p>
                  <h2 class="text-h5 font-weight-bold warning--text">{{ yearRange }}</h2>
                  <p class="text-caption">Anos de dados</p>
                </div>
                <v-avatar color="warning" size="48">
                  <v-icon size="24" color="white">mdi-calendar-range</v-icon>
                </v-avatar>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    <v-row>
      <v-col cols="12">
        <v-card elevation="8" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-chart-bar</v-icon>
            <span class="text-h5 font-weight-bold">Top 10 Maiores Picos de Jogadores</span>
          </v-card-title>
          <v-card-text>
            <v-chart :option="barChartOption" autoresize style="height: 500px" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card elevation="8" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="success">mdi-timeline-clock</v-icon>
            <span class="text-h5 font-weight-bold">Linha do Tempo dos Picos</span>
          </v-card-title>
          <v-card-text>
            <v-chart :option="timelineChartOption" autoresize style="height: 400px" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card elevation="8" class="chart-card pa-4">
          <v-card-title class="d-flex align-center">
            <v-icon class="mr-2" color="info">mdi-table</v-icon>
            <span class="text-h5 font-weight-bold">Detalhamento Completo</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="sortedPicosData"
              :items-per-page="10"
              class="elevation-1"
            >
              <template #item.Pico_Jogadores="{ item }">
                <v-chip color="primary" dark>
                  <v-icon left small>mdi-account-multiple</v-icon>
                  {{ formatNumber(item.Pico_Jogadores) }}
                </v-chip>
              </template>
              <template #item.Data_Pico="{ item }">
                <v-chip color="info" outlined>
                  <v-icon left small>mdi-calendar</v-icon>
                  {{ formatDate(item.Data_Pico) }}
                </v-chip>
              </template>
              <template #item.ranking="{ item }">
                <v-icon v-if="item.ranking === 1" color="amber" size="32">mdi-trophy</v-icon>
                <v-icon v-else-if="item.ranking === 2" color="grey" size="28">mdi-medal</v-icon>
                <v-icon v-else-if="item.ranking === 3" color="brown" size="28">mdi-medal</v-icon>
                <span v-else class="text-h6 font-weight-bold">{{ item.ranking }}º</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import { BarChart, LineChart, ScatterChart } from 'echarts/charts'
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
  } from 'echarts/components'
  import { useAdvancedData } from '@/composables/useAdvancedData'

  use([
    CanvasRenderer,
    BarChart,
    LineChart,
    ScatterChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
  ])

  const { picosData, loadPicosData, formatNumber, formatDate } = useAdvancedData()

  const headers = [
    { title: 'Ranking', key: 'ranking', align: 'center' as const },
    { title: 'Jogo', key: 'Jogo', align: 'start' as const },
    { title: 'Pico de Jogadores', key: 'Pico_Jogadores', align: 'center' as const },
    { title: 'Data do Pico', key: 'Data_Pico', align: 'center' as const },
  ]

  const sortedPicosData = computed(() => {
    return [...picosData.value]
      .toSorted((a, b) => b.Pico_Jogadores - a.Pico_Jogadores)
      .map((item, index) => ({
        ...item,
        ranking: index + 1,
      }))
  })

  const maxPico = computed(() => {
    if (picosData.value.length === 0) return 0
    return Math.max(...picosData.value.map(p => p.Pico_Jogadores))
  })

  const gameWithMaxPico = computed(() => {
    if (picosData.value.length === 0) return ''
    const max = picosData.value.reduce((prev, current) =>
      prev.Pico_Jogadores > current.Pico_Jogadores ? prev : current
    )
    return max.Jogo
  })

  const avgPico = computed(() => {
    if (picosData.value.length === 0) return 0
    const sum = picosData.value.reduce((acc, p) => acc + p.Pico_Jogadores, 0)
    return sum / picosData.value.length
  })

  const yearRange = computed(() => {
    if (picosData.value.length === 0) return '0'
    const years = picosData.value.map(p => new Date(p.Data_Pico).getFullYear())
    const minYear = Math.min(...years)
    const maxYear = Math.max(...years)
    return `${maxYear - minYear + 1}`
  })

  const barChartOption = computed(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: any) => {
        const data = params[0]
        return `<strong>${data.name}</strong><br/>Pico: ${formatNumber(data.value)} jogadores`
      },
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
      data: sortedPicosData.value.slice(0, 10).map(p => p.Jogo).toReversed(),
      axisLabel: {
        fontSize: 12,
      },
    },
    series: [
      {
        type: 'bar',
        data: sortedPicosData.value.slice(0, 10).map(p => p.Pico_Jogadores).toReversed(),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' },
            ],
          },
          borderRadius: [0, 10, 10, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => formatNumber(params.value),
          fontSize: 12,
          fontWeight: 'bold',
        },
        barWidth: '60%',
      },
    ],
  }))

  const timelineChartOption = computed(() => ({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `<strong>${params.data.name}</strong><br/>Data: ${formatDate(params.data.date)}<br/>Pico: ${formatNumber(params.data.value[1])} jogadores`
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: '{yyyy}',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => formatNumber(value),
      },
    },
    series: [
      {
        type: 'scatter',
        symbolSize: (data: any) => Math.sqrt(data[1]) / 10 + 10,
        data: sortedPicosData.value.map(p => ({
          value: [new Date(p.Data_Pico).getTime(), p.Pico_Jogadores],
          name: p.Jogo,
          date: p.Data_Pico,
        })),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#667eea' },
              { offset: 1, color: '#764ba2' },
            ],
          },
          opacity: 0.8,
        },
      },
    ],
  }))

  onMounted(() => {
    loadPicosData()
  })
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.outer-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  min-height: 100vh;
}

.hero-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
}

.hero-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px 32px;
  position: relative;
  z-index: 1;
}

.hero-text h1 {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-text p {
  color: rgba(255, 255, 255, 0.9);
}

.stat-card {
  background: white;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15) !important;
}

.chart-card {
  background: white;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15) !important;
}
</style>
