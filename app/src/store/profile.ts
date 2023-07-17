import { defineStore } from 'pinia'

type State = {
  keys: Keys
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
}

export const useProfileStore = defineStore('profileStore', {
  state: () => state,
})
