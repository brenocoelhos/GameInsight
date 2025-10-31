<template>
  <v-container class="outer-container" fluid>
    <div class="container">
      <v-card class="hero-card mb-6 fade-in" elevation="16">
        <v-card-text class="hero-content flex flex-md-row justify-center align-center">
          <div class="hero-text">
            <h1 class="hero-title font-weight-bold mb-2">🎮 O CICLO DE VIDA DOS JOGOS</h1>
          </div>
        </v-card-text>
      </v-card>

      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <v-card
            class="quick-card gradient-blue fade-in"
            elevation="12"
            dark
            @click="$router.push('/peaks')"
          >
            <v-card-text class="text-center">
              <v-icon class="quick-icon mb-3" style="color: aliceblue;">mdi-rocket-launch</v-icon>
              <h3 class="quick-title font-weight-bold mb-2" style="color: aliceblue;">Análise de Picos</h3>
              <p class="text-body-2" style="color: aliceblue;">Descubra os maiores momentos dos games</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card
            class="quick-card gradient-orange fade-in"
            elevation="12"
            dark
            @click="$router.push('/hype')"
          >
            <v-card-text class="text-center">
              <v-icon class="quick-icon mb-3" style="color: aliceblue;">mdi-fire</v-icon>
              <h3 class="quick-title font-weight-bold mb-2" style="color: aliceblue;">Análise de Hype</h3>
              <p class="text-body-2" style="color: aliceblue;">Intensidade e duração do engajamento</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="fade-in">
            <StatsCards :stats="stats" />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div class="fade-in">
            <PieChartCard
              title="Distribuição de Jogadores por Categoria"
              :chart-option="pieChartOption"
            />
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="fade-in">
            <BarChartCard
              title="Top 10 Jogos por Média de Jogadores"
              :chart-option="barChartOption"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="fade-in">
            <GameTabs
              :games="topGames"
              :game-data="gameData"
              :format-game-name="formatGameName"
              :format-date="formatDate"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
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
  justify-content: space-between;
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

.hero-button {
  animation: pulse-button 2s infinite;
}

@keyframes pulse-button {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}

.quick-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 16px;
}

.quick-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

.gradient-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-orange {
  background: linear-gradient(135deg, #f44336 0%, #ff9800 100%);
}

.gradient-purple {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
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

/* Animação simples de fade-in no scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

.fade-in:nth-child(1) { animation-delay: 0.1s; }
.fade-in:nth-child(2) { animation-delay: 0.2s; }
.fade-in:nth-child(3) { animation-delay: 0.3s; }
.fade-in:nth-child(4) { animation-delay: 0.4s; }
.fade-in:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos responsivos para mobile */
.hero-title {
  font-size: 1.75rem; /* text-h4 */
}

.quick-icon {
  font-size: 48px;
}

.quick-title {
  font-size: 1.25rem; /* text-h6 */
}

/* Media queries para melhor responsividade */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .hero-title {
    font-size: 1.5rem; /* text-h5 */
    text-align: center;
    line-height: 1.2;
  }
  
  .hero-content {
    padding: 32px 20px;
  }
  
  .quick-icon {
    font-size: 40px;
  }
  
  .quick-title {
    font-size: 1.1rem;
  }
  
  .quick-card {
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.3rem; /* Ainda menor para telas muito pequenas */
  }
  
  .hero-content {
    padding: 20px 16px;
  }
  
  .quick-icon {
    font-size: 36px;
  }
  
  .container {
    padding: 12px;
  }
}
</style>
