import { AxiosResponse } from 'axios'
import { ref } from 'vue'

export type ResponseData = {
  message: string
  status: string
  code: number
  data?: any[]
}

export function useFetch(
  fun: (data?: any) => Promise<AxiosResponse<any, any>>
): any {
  const loading = ref(false)

  const run = async (data: any) => {
    loading.value = true
    const res: AxiosResponse<any, any> = await fun(data)
    loading.value = false

    return res
  }

  return [run, loading]
}
