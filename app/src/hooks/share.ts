import { Ref, computed } from 'vue'

export const useConfirmBtnDisabled = (
  formData: any,
  required: any
): Ref<boolean> => {
  return computed(() => {
    for (const key in formData) {
      const element = formData[key]

      if (Array.isArray(element) && required[key]) {
        if (!element.length) {
          return true
        }
      }

      if (!element && required[key]) return true
    }

    return false
  })
}
