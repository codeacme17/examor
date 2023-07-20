import { useDark } from '@vueuse/core'
import { computed } from 'vue'

export const defaultBgColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'grey-darken-4' : 'grey-lighten-5'
})

export const greenBgColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'green-accent-3' : 'light-green-accent-3'
})

export const orangeBgColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'orange-darken-3' : 'orange-accent-2'
})

export const fontColor = computed(() => {
  const isDark = useDark()
  return isDark.value
    ? {
        color: 'white',
      }
    : {
        color: 'black',
      }
})

export const greenBorderColor = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'green-accent-2' : 'green-accent-4'
})

export const reverseTheme = computed(() => {
  const isDark = useDark()
  return isDark.value ? 'dark' : 'light'
})
