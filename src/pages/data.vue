<template>
  <v-container class="pa-8">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6">
          <v-card-title class="text-h4 mb-4">
            <v-icon class="mr-2" color="primary" size="32">mdi-database</v-icon>
            Base de Dados
          </v-card-title>
          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <div class="text-h6">Fonte de Dados</div>
              <div>Dados coletados da Steam API e processados para análise</div>
            </v-alert>

            <div class="text-h5 mb-4">Informações do Dataset</div>

            <v-row>
              <v-col cols="12" md="4">
                <v-card color="info" dark class="pa-4">
                  <v-icon size="48" class="mb-2">mdi-file-table</v-icon>
                  <div class="text-h6">Total de Registros</div>
                  <div class="text-h3">383</div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card color="success" dark class="pa-4">
                  <v-icon size="48" class="mb-2">mdi-table-column</v-icon>
                  <div class="text-h6">Colunas</div>
                  <div class="text-h3">8</div>
                </v-card>
              </v-col>

              <v-col cols="12" md="4">
                <v-card color="warning" dark class="pa-4">
                  <v-icon size="48" class="mb-2">mdi-gamepad-variant</v-icon>
                  <div class="text-h6">Jogos Únicos</div>
                  <div class="text-h3">8+</div>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <div class="text-h5 mb-4">Estrutura dos Dados</div>
            <v-table>
              <thead>
                <tr>
                  <th>Coluna</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Categoria</strong></td>
                  <td>String</td>
                  <td>Categoria do jogo (ex: STORY DRIVEN)</td>
                </tr>
                <tr>
                  <td><strong>Jogo</strong></td>
                  <td>String</td>
                  <td>Nome do jogo</td>
                </tr>
                <tr>
                  <td><strong>Mes</strong></td>
                  <td>String</td>
                  <td>Mês de referência</td>
                </tr>
                <tr>
                  <td><strong>Ano</strong></td>
                  <td>Number</td>
                  <td>Ano de referência</td>
                </tr>
                <tr>
                  <td><strong>Media</strong></td>
                  <td>Number</td>
                  <td>Média de jogadores</td>
                </tr>
                <tr>
                  <td><strong>Ganho_Absoluto</strong></td>
                  <td>Number</td>
                  <td>Ganho absoluto de jogadores</td>
                </tr>
                <tr>
                  <td><strong>Ganho_Porcentagem</strong></td>
                  <td>Number</td>
                  <td>Percentual de crescimento</td>
                </tr>
                <tr>
                  <td><strong>Jogadores</strong></td>
                  <td>Number</td>
                  <td>Número de jogadores</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  //
</script>
