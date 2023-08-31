import { Ref, computed } from 'vue'

/**
 * Computes the disabled state of a confirm button based on form data and required fields.
 *
 * @param {Object} formData - The form data object.
 * @param {Object} required - An object indicating which fields are required.
 * @returns {Ref<boolean>} A computed ref representing the disabled state of the confirm button.
 */
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
