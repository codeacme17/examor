import _axios from '@/plugins/axios'

export const PROFILE_API = {
  getProfile() {
    return _axios({
      method: 'GET',
      url: '/api/profile',
    })
  },

  setProfile(data: any) {
    return _axios({
      method: 'PUT',
      url: '/api/profile',
      data: data,
    })
  },

  checkLlmApiState() {
    return _axios({
      method: 'GET',
      url: '/api/profile/auth/llm',
    })
  },

  exportData(data: { isProfile: boolean; isNotes: boolean }) {
    return _axios({
      method: 'GET',
      url: '/api/profile/data',
      responseType: 'blob',
      params: {
        isProfile: data.isProfile,
        isNotes: data.isNotes,
      },
    })
  },

  importData(data: FormData) {
    return _axios({
      method: 'POST',
      url: `/api/profile/data`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    })
  },
}
