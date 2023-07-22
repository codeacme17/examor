import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import type { ResponseBody } from '@/plugins/axios'

export function useFetch(
  fun: (data?: any) => Promise<ResponseBody | any>,
  successMessage?: string
): any {
  const loading = ref(false)

  const run = async (data: any) => {
    loading.value = true
    const res: ResponseBody = await fun(data)
    loading.value = false

    if (res.code === 0 && successMessage) {
      MessagePlugin.success(successMessage, 2000)
    }

    return res
  }

  return [run, loading]
}
