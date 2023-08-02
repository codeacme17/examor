import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  profile: Record<Key, ProfileItem>
  confirmLoading: boolean
}

type Key =
  | 'questionAmount'
  | 'currentModel'
  | 'openaiKey'
  | 'notionKey'
  | 'proxy'
  | 'azureKey'
  | 'openaiBase'
  | 'openaiVersion'
  | 'deploymentName'

type Model = 'OpenAI' | 'Azure'

type ProfileItem = {
  value: string | Model
  show?: boolean
  error?: boolean
}

const state: State = {
  profile: {
    questionAmount: {
      value: '3',
    },
    currentModel: {
      value: 'OpenAI',
    },
    openaiKey: {
      value: '',
      show: false,
      error: false,
    },
    azureKey: {
      value: '',
      show: false,
      error: false,
    },
    openaiBase: {
      value: '',
      error: false,
    },
    openaiVersion: {
      value: '',
      error: false,
    },
    deploymentName: {
      value: '',
      error: false,
    },
    notionKey: {
      value: '',
      show: false,
      error: false,
    },
    proxy: {
      value: '',
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
