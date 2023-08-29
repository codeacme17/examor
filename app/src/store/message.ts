import { defineStore } from 'pinia'

type MessageType = 'default' | 'button'

type State = {
  isShow: boolean
  message: string
  type: MessageType
  duration?: number
  path?: string
  url?: string
}

const state: State = {
  isShow: false,
  message: '',
  type: 'default',
  duration: 1500,
  path: '',
  url: '',
}

export const useMessageStore = defineStore('messageStore', {
  state: () => state,

  actions: {
    show(
      message: string,
      type: MessageType,
      path?: string,
      url?: string,
      duration?: number
    ) {
      this.$state.message = message
      this.$state.type = type
      this.$state.isShow = true
      this.$state.duration = duration
      this.$state.path = path
      this.$state.url = url
    },
  },
})
