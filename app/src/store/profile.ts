import { defineStore } from 'pinia'
import { PROFILE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  keys: any | Keys
  confirmLoading: boolean
}

type Keys = {
  openaiKey: KeyItem
  azureKey: KeyItem
  azureVersion: KeyItem
  azureEndpoint: KeyItem
  pineconeKey: KeyItem
  notionKey: KeyItem
}

type KeyItem = {
  value: string
  show: boolean
  error: boolean
}

const state: State = {
  keys: {
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
    azureVersion: {
      value: '',
      show: false,
      error: false,
    },
    azureEndpoint: {
      value: '',
      show: false,
      error: false,
    },
    pineconeKey: {
      value: '',
      show: false,
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
    async getKeys() {
      const [_getKeys] = useFetch(PROFILE_API.getKeys)
      const res = await _getKeys()

      for (const key in res.data) {
        if (Object.prototype.hasOwnProperty.call(this.$state.keys, key)) {
          this.$state.keys[key].value = res.data[key]
        }
      }
    },

    async setKeys() {
      const [_setKeys, loading] = useFetch(PROFILE_API.setKeys)
      this.$state.confirmLoading = loading

      const data: any = {}
      for (const key in this.$state.keys) {
        data[key] = this.$state.keys[key].value
      }

      await _setKeys(data)
    },
  },
})
