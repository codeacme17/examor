import _axios from '@/plugins/axios'

export const PROFILE_API = {
  getKeys() {
    return _axios.get('/api/profile/apiKeys')
  },

  setKeys(data: any) {
    return _axios({
      method: 'POST',
      url: '/api/profile/apiKeys',
      data: data,
    })
  },
}
