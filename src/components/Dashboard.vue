<template>
  <div>
    <h1>Dashboard</h1>
    <v-chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script lang="ts" setup>
  import { BarChart, LineChart } from 'echarts/charts'
  import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
  import { use } from 'echarts/core'
  import { CanvasRenderer } from 'echarts/renderers'
  import Papa from 'papaparse'
  import VChart from 'vue-echarts'

  // Registrar componentes necessários
  use([CanvasRenderer, LineChart, BarChart, GridComponent, TooltipComponent, LegendComponent])

  const chartOption = {
    xAxis: { type: 'category', data: ['Jan', 'Fev', 'Mar', 'Abr'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150, 80], type: 'line', smooth: true }],
    tooltip: { trigger: 'axis' },
  }

  function processData (data: any[]) {
    // Processar dados...
  }

  console.log(processData)

  onMounted(() => {
    fetch('/data/dados.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: results => {
            processData(results.data)
          },
        })
      })
  })

</script>
