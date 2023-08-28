import axios from 'axios'
import { MessagePlugin } from 'tdesign-vue-next'

const _axios = axios.create({
  timeout: 60 * 1000,
})

export type ResponseBody = {
  code: number
  message: string
  data: Record<any, any>
}

_axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

_axios.interceptors.response.use(
  (response) => {
    const { headers } = response
    const { code, message } = response.data

    if (code !== 0 && headers['content-type'] === 'application/json') {
      MessagePlugin.error({
        content: message,
        duration: 3000,
      })
    }

    return response.data
  },
  (error) => {
    MessagePlugin.error({
      content: error.message,
      duration: 3000,
    })
    return Promise.reject(error)
  }
)

export default _axios
