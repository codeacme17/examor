import { useScroll } from '@vueuse/core'

export const scrollToPageBottom = () => {
  const { y } = useScroll(window, { behavior: 'smooth' })

  y.value = document.documentElement.scrollHeight
}
