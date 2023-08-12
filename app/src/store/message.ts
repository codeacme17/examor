import { defineStore } from 'pinia'

type MessageType = 'default' | 'button'

type State = {
  isShow: boolean
  message: string
  type: MessageType
  duration?: number
  path?: string
}

const state: State = {
  isShow: true,
  message: '',
  type: 'default',
  duration: 1000,
  path: '',
}

export const useMessageStore = defineStore('messageStore', {
  state: () => state,

  actions: {
    show(message: string, type: MessageType, duration?: number, path?: string) {
      this.$state.message = message
      this.$state.type = type
      this.$state.isShow = true
      this.$state.duration = duration
      this.$state.path = path
    },
  },
})
