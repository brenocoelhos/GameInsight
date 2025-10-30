<template>
  <v-container class="pa-8">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-card-title class="text-h4 mb-4">
            <v-icon class="mr-2" color="primary" size="32">mdi-information</v-icon>
            Sobre o Game Insights
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="8">
                <div class="text-h5 mb-3">O que é o Game Insights?</div>
                <p class="text-body-1 mb-4">
                  O Game Insights é uma plataforma de análise de dados especializada em mineração e visualização
                  de informações sobre jogos da Steam. Nosso objetivo é fornecer insights valiosos sobre
                  tendências de jogadores, crescimento de jogos e padrões de comportamento na comunidade gamer.
                </p>

                <div class="text-h5 mb-3 mt-6">Funcionalidades Principais</div>
                <v-list>
                  <v-list-item prepend-icon="mdi-chart-line">
                    <v-list-item-title>Análise de Tendências</v-list-item-title>
                    <v-list-item-subtitle>
                      Acompanhe a evolução temporal de jogadores em diferentes jogos
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item prepend-icon="mdi-chart-pie">
                    <v-list-item-title>Visualizações Interativas</v-list-item-title>
                    <v-list-item-subtitle>
                      Gráficos dinâmicos de pizza, barras e linhas usando ECharts
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item prepend-icon="mdi-compare">
                    <v-list-item-title>Comparações Detalhadas</v-list-item-title>
                    <v-list-item-subtitle>
                      Compare múltiplos jogos e categorias em diferentes períodos
                    </v-list-item-subtitle>
                  </v-list-item>

                  <v-list-item prepend-icon="mdi-download">
                    <v-list-item-title>Dados Processados</v-list-item-title>
                    <v-list-item-subtitle>
                      Informações limpas e prontas para análise de dados brutos da Steam
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>

                <div class="text-h5 mb-3 mt-6">Tecnologias Utilizadas</div>
                <v-chip-group>
                  <v-chip color="success" variant="elevated">Vue 3</v-chip>
                  <v-chip color="info" variant="elevated">TypeScript</v-chip>
                  <v-chip color="primary" variant="elevated">Vuetify 3</v-chip>
                  <v-chip color="warning" variant="elevated">ECharts</v-chip>
                  <v-chip color="error" variant="elevated">Vite</v-chip>
                </v-chip-group>
              </v-col>

              <v-col cols="12" md="4">
                <v-card color="primary" dark class="pa-4 mb-4">
                  <v-icon size="64" class="mb-3">mdi-school</v-icon>
                  <div class="text-h6 mb-2">Projeto Acadêmico</div>
                  <div class="text-body-2">
                    Desenvolvido como parte de um projeto de mineração de dados
                    sobre a indústria de jogos digitais.
                  </div>
                </v-card>

                <v-card color="info" dark class="pa-4 mb-4">
                  <v-icon size="64" class="mb-3">mdi-database-search</v-icon>
                  <div class="text-h6 mb-2">Mineração de Dados</div>
                  <div class="text-body-2">
                    Análise de padrões, tendências e comportamentos
                    usando técnicas de data mining.
                  </div>
                </v-card>

                <v-card color="success" dark class="pa-4">
                  <v-icon size="64" class="mb-3">mdi-open-source-initiative</v-icon>
                  <div class="text-h6 mb-2">Open Source</div>
                  <div class="text-body-2">
                    Código aberto disponível no GitHub para
                    a comunidade.
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <div class="text-center">
              <v-btn color="primary" prepend-icon="mdi-github" size="large" variant="elevated">
                Ver no GitHub
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
