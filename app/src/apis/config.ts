import _axios from '@/plugins/axios'

export const CONFIG_API = {
  getKeys() {
    return _axios.get('/api/config/apiKeys')
  },

  setKeys(data: any) {
    return _axios({
      method: 'POST',
      url: '/api/config/apiKeys',
      data: data,
    })
  },
}
