import { Ref, computed } from 'vue'

export const useConfirmBtnDisabled = (
  formData: any,
  options: any
): Ref<boolean> => {
  return computed(() => {
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const element = formData[key]
        if (!element) return true
        if (Array.isArray(element)) if (!element.length) return true
      }
    }

    if (options) return true

    return false
  })
}
