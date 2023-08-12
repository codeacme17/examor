import { defineStore } from 'pinia'
import { MessagePlugin } from 'tdesign-vue-next'
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
} as const

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

    checkHasSettedModel() {
      const { profile } = this.$state

      if (!this._checkIsSettedOpenai() && !this._checkIsSettedAzure()) {
        MessagePlugin.warning('请先配置模型的 API KEY')
        return false
      }

      if (
        profile.currentModel.value === 'OpenAI' &&
        !this._checkIsSettedOpenai()
      ) {
        MessagePlugin.warning('请配置 OpenAI 所需的 API KEY')
        return false
      }

      if (
        profile.currentModel.value === 'Azure' &&
        !this._checkIsSettedAzure()
      ) {
        MessagePlugin.warning('请配置 Azure 所需的 KEYs')
        return false
      }

      return true
    },

    _checkIsSettedOpenai() {
      const { profile } = this.$state
      if (!profile.openaiKey) {
        return false
      } else return true
    },

    _checkIsSettedAzure() {
      const { profile } = this.$state
      if (
        !profile.azureKey ||
        !profile.openaiBase ||
        !profile.deploymentName ||
        !profile.openaiVersion
      ) {
        return false
      } else return true
    },
  },
})
