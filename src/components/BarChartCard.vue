<template>
  <v-card class="pa-4 chart-card">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="ma-4">
      <v-chart v-if="chartOption.series?.length > 0" :option="chartOption" class="chart-responsive" autoresize />
      <div v-else class="text-center pa-4">
        <v-progress-circular color="primary" indeterminate />
        <p class="mt-2">Carregando dados...</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { BarChart } from 'echarts/charts'
  import { GridComponent, TooltipComponent } from 'echarts/components'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart from 'vue-echarts'

  use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

  defineProps<{
    title: string
    chartOption: any
  }>()
</script>

<style scoped>
.chart-card {
  height: 460px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chart-responsive {
  width: 100%;
  height: 100%;
  min-height: 280px;
}

/* Responsivo para dispositivos móveis */
@media (max-width: 768px) {
  .chart-card {
    height: 380px;
  }
}

/* iPhone e dispositivos pequenos */
@media (max-width: 480px) {
  .chart-card {
    height: 320px;
  }
}
</style>
