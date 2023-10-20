import { MessagePlugin } from 'tdesign-vue-next'
import { ref, Ref } from 'vue'
import type { ResponseBody } from '@/plugins/axios'

/**
 * Creates a fetch function with loading state and optional success message.
 *
 * @param {Function} fun - The asynchronous function to perform the fetch operation.
 * @param {string} [successMessage] - Optional message to display on fetch success.
 * @returns {[Function, Ref<boolean>]} A tuple containing the fetch function and a ref representing the loading state.
 */
export function useFetch(
  fun: (data?: any) => Promise<ResponseBody | any>,
  successMessage?: string
): [Function, Ref<boolean>] {
  const loading = ref(false)

  const fetch = async (data: any) => {
    loading.value = true

    try {
      const res: ResponseBody = await fun(data)
      if (res.code === 0 && successMessage)
        MessagePlugin.success(successMessage, 2000)
      return res
    } finally {
      loading.value = false
    }
  }

  return [fetch, loading]
}
