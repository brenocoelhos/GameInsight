<template>
  <v-app-bar color="primary" dark :elevation="3" height="90">
    <v-container class="d-flex align-center px-4" fluid>
      <v-app-bar-title class="header-title" @click="navigateTo('/')">
        <div class="title-content">
          <img src="/public/pngtree-a-boy-gaming-with-console-win-png-image_13845721.png" alt="Game Insights Logo" class="logo-image">
          <span class="title-text">Game Insights</span>
        </div>
      </v-app-bar-title>

      <v-spacer />

      <v-menu offset-y>
        <template #activator="{ props }">
          <v-app-bar-nav-icon v-bind="props" />
        </template>
        <v-list width="250">
          <v-list-item prepend-icon="mdi-view-dashboard" @click="navigateTo('/')">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-subheader>ANÁLISES AVANÇADAS</v-list-subheader>
          <v-list-item prepend-icon="mdi-rocket-launch" @click="navigateTo('/peaks')">
            <v-list-item-title>Picos de Jogadores</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-fire" @click="navigateTo('/hype')">
            <v-list-item-title>Análise de Hype</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-subheader>INFORMAÇÕES</v-list-subheader>
          <v-list-item prepend-icon="mdi-database" @click="navigateTo('/data')">
            <v-list-item-title>Dados</v-list-item-title>
          </v-list-item>
          <v-list-item prepend-icon="mdi-information" @click="navigateTo('/about')">
            <v-list-item-title>Sobre</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>

  <!-- Snackbar para feedback -->
  <v-snackbar v-model="snackbar" :timeout="2000" :color="snackbarColor">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

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

  function navigateTo (path: string) {
    router.push(path)
    const routeNames: Record<string, string> = {
      '/': 'Dashboard',
      '/peaks': 'Análise de Picos',
      '/hype': 'Análise de Hype',
      '/data': 'Dados',
      '/about': 'Sobre',
    }
    if (routeNames[path]) {
      showSnackbar(`Navegando para ${routeNames[path]}`, 'info')
    }
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
  }
</script>

<style scoped>
  .header-title {
    font-weight: 700;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 12px;
    white-space: nowrap;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .header-title {
  cursor: pointer;
}

.header-title:hover {
  opacity: 0.85;
}

.title-content {
  display: flex;
  align-items: center;
  gap: 12px; /* espaço entre a imagem e o texto */
}

.logo-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.title-text {
  font-weight: 700;
  line-height: 1; /* garante que o texto não adicione espaço extra */
}

  .search-field {
    border-radius: 24px;
  }

  :deep(.v-field) {
    border-radius: 24px;
  }
</style>
