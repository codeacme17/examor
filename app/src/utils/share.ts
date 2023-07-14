import { useDark } from '@vueuse/core'
import { computed } from 'vue'

export const requiredFieldBorderColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'green-accent-2' : 'green-accent-4'
})
