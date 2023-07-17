import _axios from '@/plugins/axios'

export const PROFILE_API = {
  getProfile() {
    return _axios.get('/api/profile')
  },

  setProfile(data: any) {
    return _axios({
      method: 'POST',
      url: '/api/profile',
      data: data,
    })
  },
}
