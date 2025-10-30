<template>
  <v-container class="outer-container" fluid>
    <div class="container">
      <v-card class="title-card mb-4">
        <v-card-title class="d-flex justify-center align-center">
          <h2>O CICLO DE VIDA DOS JOGOS</h2>
        </v-card-title>
      </v-card>

      <v-row>
        <v-col cols="12">
          <StatsCards :stats="stats" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <PieChartCard
            title="Distribuição de Jogadores por Categoria"
            :chart-option="pieChartOption"
          />
        </v-col>

        <v-col cols="12" md="6">
          <BarChartCard
            title="Top 10 Jogos por Média de Jogadores"
            :chart-option="barChartOption"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <GameTabs
            :games="topGames"
            :game-data="gameData"
            :format-game-name="formatGameName"
            :format-date="formatDate"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { useGameData } from '@/composables/useGameData'
  import BarChartCard from './BarChartCard.vue'
  import GameTabs from './GameTabs.vue'
  import PieChartCard from './PieChartCard.vue'
  import StatsCards from './StatsCards.vue'

  const { gameData, stats, topGames, loadData, formatGameName, formatDate } = useGameData()

  const pieChartOption = computed(() => {
    if (gameData.value.length === 0) {
      return { series: [] }
    }

    const categoryMap = new Map<string, number>()
    for (const row of gameData.value) {
      if (row.Categoria && row.Jogadores) {
        const currentValue = categoryMap.get(row.Categoria) || 0
        categoryMap.set(row.Categoria, currentValue + row.Jogadores)
      }
    }

    const pieData = Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name: formatGameName(name),
        value: Number.parseFloat(value.toFixed(2)),
      }))
      .toSorted((a, b) => b.value - a.value)

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} jogadores ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: '0%',
        top: 'middle',
        textStyle: {
          fontSize: 11,
        },
      },
      series: [
        {
          name: 'Jogadores por Categoria',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            formatter: '{b}\n{d}%',
            fontSize: 10,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold',
            },
          },
          data: pieData,
        },
      ],
    }
  })

  const barChartOption = computed(() => {
    if (topGames.value.length === 0) {
      return { series: [] }
    }

    const topGamesBar = topGames.value.slice(0, 10)

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: '{b}: {c} jogadores',
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '30%',
        top: '0%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        name: 'Média de Jogadores',
        nameLocation: 'middle',
        nameGap: 40,
      },
      yAxis: {
        type: 'category',
        data: topGamesBar.map(g => g.name),
        axisLabel: {
          fontSize: 10,
          interval: 0,
        },
      },
      series: [
        {
          name: 'Média de Jogadores',
          type: 'bar',
          data: topGamesBar.map(g => g.avgPlayers),
          itemStyle: {
            color: '#5470c6',
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            fontSize: 10,
          },
        },
      ],
    }
  })

  onMounted(() => {
    loadData()
  })
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.outer-container {
  background-color: aliceblue;
  padding: 0;
}

.title-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title-card h2 {
  font-weight: 700;
  color: white;
  font-size: 1.75rem;
  margin: 0;
  padding: 8px 0;
}
</style>
