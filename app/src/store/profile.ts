import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  profile: Record<Key, ProfileItem>
  confirmLoading: boolean
}

type Key = 'openaiKey' | 'notionKey' | 'questionAmount' | 'proxy'

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
    questionAmount: {
      value: '3',
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
      const { data } = await _getKeys()

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(this.$state.profile, key)) {
          const profileKey = key as Key
          this.$state.profile[profileKey].value = data[key]
        }
      }
    },

    async setProfile() {
      const [_setKeys, loading] = useFetch(PROFILE_API.setProfile)
      this.$state.confirmLoading = loading

      const data: any = {}
      for (const key in this.$state.profile) {
        const profileKey = key as Key
        data[key] = this.$state.profile[profileKey].value
      }

      await _setKeys(data)
    },
  },
})
