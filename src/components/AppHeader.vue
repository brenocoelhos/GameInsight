<template>
  <v-app-bar color="primary" dark :elevation="3" height="70">
    <v-container class="d-flex align-center px-4" fluid>
      <v-app-bar-title class="header-title">
        <v-icon class="mr-2" size="32">mdi-controller-classic</v-icon>
        Game Insights
      </v-app-bar-title>

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon variant="text" v-bind="props" @click="handleNotificationClick">
            <v-badge color="error" :content="notificationCount" :model-value="notificationCount > 0">
              <v-icon>mdi-bell-outline</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list width="300">
          <v-list-subheader>Notificações</v-list-subheader>
          <v-list-item
            v-for="(notification, index) in notifications"
            :key="index"
            @click="markAsRead(index)"
          >
            <template #prepend>
              <v-icon :color="notification.color">{{ notification.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ notification.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ notification.time }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider v-if="notifications.length > 0" />
          <v-list-item v-if="notifications.length === 0">
            <v-list-item-title class="text-center text-grey">
              Nenhuma notificação
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn icon variant="text" v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list width="200">
          <v-list-item prepend-icon="mdi-account" @click="handleProfile">
            <v-list-item-title>Meu Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-cog" @click="handleSettings">
            <v-list-item-title>Configurações</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" @click="handleLogout">
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>
        <v-list width="200">
          <v-list-item prepend-icon="mdi-view-dashboard" @click="handleNavigation('dashboard')">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-chart-line" @click="handleNavigation('stats')">
            <v-list-item-title>Estatísticas</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-database" @click="handleNavigation('data')">
            <v-list-item-title>Dados</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-information" @click="handleNavigation('about')">
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>

  <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarColor">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  interface Notification {
    title: string
    time: string
    icon: string
    color: string
  }

  const notifications = ref<Notification[]>([
    {
      title: 'Nova atualização de dados',
      time: 'Há 5 minutos',
      icon: 'mdi-database-refresh',
      color: 'info',
    },
    {
      title: 'Pico de jogadores detectado',
      time: 'Há 1 hora',
      icon: 'mdi-trending-up',
      color: 'success',
    },
    {
      title: 'Relatório mensal pronto',
      time: 'Há 2 horas',
      icon: 'mdi-file-chart',
      color: 'primary',
    },
  ])

  const notificationCount = ref(notifications.value.length)
  const snackbar = ref(false)
  const snackbarText = ref('')
  const snackbarColor = ref('success')

  function showSnackbar (text: string, color = 'success') {
    snackbarText.value = text
    snackbarColor.value = color
    snackbar.value = true
  }

  function handleNotificationClick () {
    if (notificationCount.value > 0) {
      showSnackbar(`Você tem ${notificationCount.value} notificações`, 'info')
    }
  }

  function markAsRead (index: number) {
    notifications.value.splice(index, 1)
    notificationCount.value = notifications.value.length
    showSnackbar('Notificação marcada como lida', 'success')
  }

  function handleProfile () {
    showSnackbar('Abrindo perfil...', 'info')
  }

  function handleSettings () {
    showSnackbar('Abrindo configurações...', 'info')
  }

  function handleLogout () {
    showSnackbar('Saindo...', 'warning')
    // Aqui você pode adicionar lógica de logout real
  }

  function handleNavigation (page: string) {
    const pageNames: Record<string, string> = {
      dashboard: 'Dashboard',
      stats: 'Estatísticas',
      data: 'Dados',
      about: 'Sobre',
    }
    showSnackbar(`Navegando para ${pageNames[page]}`, 'info')
  }
</script>

<style scoped>
  .header-title {
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .header-title:hover {
    opacity: 0.8;
  }

  .search-field {
    border-radius: 24px;
  }

  :deep(.v-field) {
    border-radius: 24px;
  }
</style>
