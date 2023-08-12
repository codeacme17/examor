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
  isShow: false,
  message: '',
  type: 'default',
  path: '',
  duration: 1500,
}

export const useMessageStore = defineStore('messageStore', {
  state: () => state,

  actions: {
    show(message: string, type: MessageType, path?: string, duration?: number) {
      this.$state.message = message
      this.$state.type = type
      this.$state.isShow = true
      this.$state.duration = duration
      this.$state.path = path
    },
  },
})
