import { ref, watch } from 'vue'

export const useWatchChange = (obj: any) => {
  const isChanged = ref(false)

  watch(
    obj,
    (oldValue, newValue) => {
      if (oldValue === newValue) isChanged.value = false
      else isChanged.value = true
    },
    {
      deep: true,
    }
  )

  return isChanged
}
