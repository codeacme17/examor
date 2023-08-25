import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import type { ResponseBody } from '@/plugins/axios'

export function useFetch(
  fun: (data?: any) => Promise<ResponseBody | any>,
  successMessage?: string
): any {
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
