import { Ref, computed } from 'vue'

export const useConfirmBtnDisabled = (
  formData: any,
  options: any
): Ref<boolean> => {
  return computed(() => {
    for (const key in formData) {
      const element = formData[key]
      if (!element && !options[key]) return true
      if (Array.isArray(element) && !options[key])
        if (!element.length) return true
    }

    return false
  })
}
