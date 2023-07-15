import { useDark } from '@vueuse/core'
import { computed } from 'vue'

export const requiredFieldBorderColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'green-accent-2' : 'green-accent-4'
})

export const normalCardBgColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'grey-darken-4' : 'grey-lighten-5'
})

export const greenCardBgColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'green-accent-3' : 'green-accent-4'
})
