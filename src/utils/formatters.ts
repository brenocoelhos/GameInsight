/**
 * Utilitários compartilhados do GameInsight
 */

/**
 * Formata número grande em formato legível (1000 -> 1K, 1000000 -> 1M)
 */
export function formatNumber(num: number): string {
  const actualNumber = num * 1000
  if (actualNumber >= 1000000) {
    return (actualNumber / 1000000).toFixed(2) + 'M'
  }
  if (actualNumber >= 1000) {
    return (actualNumber / 1000).toFixed(1) + 'k'
  }
  return actualNumber.toLocaleString('pt-BR')
}

/**
 * Formata data ISO em formato curto (2024-01-15 -> Jan/2024)
 */
export function formatDateISO (dateStr: string): string {
  const date = new Date(dateStr)
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${months[date.getMonth()]}/${date.getFullYear()}`
}

/**
 * Formata mês/ano em formato curto (January, 2024 -> Jan/2024)
 */
export function formatMonthYear (mes: string, ano: string): string {
  const months: Record<string, string> = {
    January: 'Jan', February: 'Fev', March: 'Mar', April: 'Abr',
    May: 'Mai', June: 'Jun', July: 'Jul', August: 'Ago',
    September: 'Set', October: 'Out', November: 'Nov', December: 'Dez',
  }
  return `${months[mes] || mes}/${ano}`
}

/**
 * Converte nome do mês em inglês para número (0-11)
 */
export function getMonthNumber (monthName: string): number {
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3,
    May: 4, June: 5, July: 6, August: 7,
    September: 8, October: 9, November: 10, December: 11,
  }
  return months[monthName] || 0
}

/**
 * Cores para gráficos
 */
export const chartColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  orange: '#FF9800',
}

/**
 * Configuração de grid padrão para gráficos ECharts
 */
export const defaultGridConfig = {
  left: '10%',
  right: '10%',
  bottom: '20%',
  top: '15%',
}
