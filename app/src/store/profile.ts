import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useMessageStore } from './message'

export type ProfileState = {
  profile: Record<ProfileKey, ProfileItem>
  confirmLoading: boolean
}

export type ProfileKey =
  | 'questionAmount'
  | 'currentRole'
  | 'currentModel'
  | 'openaiModel'
  | 'openaiKey'
  | 'openaiOrganization'
  | 'openaiBase'
  | 'openaiProxy'
  | 'azureKey'
  | 'azureBase'
  | 'openaiVersion'
  | 'deploymentName'
  | 'anthropicModel'
  | 'anthropicKey'
  | 'anthropicVersion'
  | 'notionKey'

type Model =
  | 'OpenAI'
  | 'Azure'
  | 'Anthropic'
  | 'claude-2'
  | 'gpt-3.5-turbo'
  | 'gpt-4'

type Role = 'examiner' | 'teacher' | 'interviewer'

type Base = 'https://api.openai.com' | ''

type Version = '2023-06-01'

export type ProfileItem = {
  value: Model | Role | Base | Version
  show?: boolean // show or hide key
  error?: boolean // error field
}

const state: ProfileState = {
  profile: {
    questionAmount: {
      value: '',
    },
    currentRole: {
      value: 'examiner',
    },
    currentModel: {
      value: 'OpenAI',
    },
    openaiModel: {
      value: 'gpt-3.5-turbo',
      show: false,
      error: false,
    },
    openaiKey: {
      value: '',
      show: false,
      error: false,
    },
    openaiOrganization: {
      value: '',
      show: false,
      error: false,
    },
    openaiBase: {
      value: 'https://api.openai.com',
      show: false,
      error: false,
    },
    openaiProxy: {
      value: '',
      show: false,
      error: false,
    },
    azureKey: {
      value: '',
      show: false,
      error: false,
    },
    azureBase: {
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
    anthropicModel: {
      value: 'claude-2',
    },
    anthropicKey: {
      value: '',
      error: false,
    },
    anthropicVersion: {
      value: '2023-06-01',
      error: false,
    },
    notionKey: {
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
          const profileKey = key as ProfileKey
          this.$state.profile[profileKey].value = data[key]
        }
      }
    },

    async setProfile() {
      const [_setKeys, loading] = useFetch(PROFILE_API.setProfile)
      // @ts-ignore
      this.$state.confirmLoading = loading

      const data: any = {}
      for (const key in this.$state.profile) {
        const profileKey = key as ProfileKey
        data[key] = this.$state.profile[profileKey].value || ''
      }

      await _setKeys(data)
    },

    checkHasSettedModel() {
      const MESSAGE_STORE = useMessageStore()
      const { profile } = this.$state

      if (
        profile.currentModel.value === 'OpenAI' &&
        !this._checkHasSettedOpenai()
      ) {
        MESSAGE_STORE.show('message.OpenAIKeyError', 'button', '/profile')
        return false
      }

      if (
        profile.currentModel.value === 'Azure' &&
        !this._checkHasSettedAzure()
      ) {
        MESSAGE_STORE.show('message.AzureKeyError', 'button', '/profile')
        return false
      }

      if (
        profile.currentModel.value === 'Anthropic' &&
        !this._checkHasSettedAnthropic()
      ) {
        MESSAGE_STORE.show('message.AnthropicError', 'button', '/profile')
        return false
      }

      return true
    },

    _checkHasSettedOpenai() {
      const { profile } = this.$state
      if (!profile.openaiKey.value) {
        profile.openaiKey.error = true
        return false
      } else return true
    },

    _checkHasSettedAzure() {
      const { profile } = this.$state
      let res = true
      if (!profile.azureKey.value) {
        profile.azureKey.error = true
        res = false
      }

      if (!profile.azureBase.value) {
        profile.azureBase.error = true
        res = false
      }

      if (!profile.deploymentName.value) {
        profile.deploymentName.error = true
        res = false
      }

      if (!profile.openaiVersion.value) {
        profile.openaiVersion.error = true
        res = false
      }
      return res
    },

    _checkHasSettedAnthropic() {
      const { profile } = this.$state
      if (!profile.anthropicKey.value) {
        profile.anthropicKey.error = true
        return false
      } else return true
    },

    clearError() {
      const { profile } = this.$state
      for (const key in profile) {
        if (Object.prototype.hasOwnProperty.call(profile, key)) {
          const profileKey = key as ProfileKey
          if (profile[profileKey].error) profile[profileKey].error = false
        }
      }
    },
  },
})
