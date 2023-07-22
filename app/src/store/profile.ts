import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  profile: any | Keys
  confirmLoading: boolean
}

type Keys = {
  openaiKey: ProfileItem
  notionKey: ProfileItem
}

type ProfileItem = {
  value: string
  show: boolean
  error: boolean
}

const state: State = {
  profile: {
    openaiKey: {
      value: '',
      show: false,
      error: false,
    },
    notionKey: {
      value: '',
      show: false,
      error: false,
    },
    proxy: {
      value: '',
      show: false,
      error: false,
    },
  },

  confirmLoading: false,
}

export const useProfileStore = defineStore('profileStore', {
  state: () => state,

  actions: {
    async getProfile() {
      const [_getKeys] = useFetch(PROFILE_API.getProfile)
      const res = await _getKeys()

      for (const key in res) {
        if (Object.prototype.hasOwnProperty.call(this.$state.profile, key)) {
          this.$state.profile[key].value = res[key]
        }
      }
    },

    async setProfile() {
      const [_setKeys, loading] = useFetch(PROFILE_API.setProfile)
      this.$state.confirmLoading = loading

      const data: any = {}
      for (const key in this.$state.profile) {
        data[key] = this.$state.profile[key].value
      }

      await _setKeys(data)
    },
  },
})
