import { defineStore } from 'pinia'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  notes: NoteItem[]
  getNotesLoading: boolean
}

export type NoteItem = {
  id: string
  name: string
  icon: string
}

const state: State = {
  notes: [],
  getNotesLoading: false,
}

export const useNoteStore = defineStore('noteStore', {
  state: () => state,

  actions: {
    async getNotes() {
      const [_getNotes, loading] = useFetch(NOTE_API.getNotes)
      this.$state.getNotesLoading = loading

      const { data } = await _getNotes()
      this.$state.notes = data
    },
  },
})
