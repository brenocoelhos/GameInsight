<template>
  <v-card class="pa-4">
    <v-card-title>Estatísticas Gerais</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card color="primary" dark>
            <v-card-text>
              <div class="text-h5 font-weight-bold">{{ stats.totalGames }}</div>
              <div class="font-weight-bold">Total de Jogos</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="success" dark>
            <v-card-text>
              <div class="text-h5 font-weight-bold">{{ stats.totalCategories }}</div>
              <div class="font-weight-bold">Categorias</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="info" dark>
            <v-card-text>
              <div class="text-h5 font-weight-bold">{{ stats.avgPlayers }}</div>
              <div class="font-weight-bold">Média de Jogadores</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card color="warning" dark>
            <v-card-text>
              <div class="text-h5 font-weight-bold">{{ stats.totalRecords }}</div>
              <div class="font-weight-bold">Total de Registros</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  export interface Stats {
    totalGames: number
    totalCategories: number
    avgPlayers: string
    totalRecords: number
  }

  defineProps<{
    stats: Stats
  }>()
</script>

<style scoped>
.v-card {
  margin-bottom: 16px;
}
</style>
