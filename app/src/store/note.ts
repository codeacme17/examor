import { defineStore } from 'pinia'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'

type State = {
  notes: NoteItem[]
  currentIcon: string
  getNotesLoading: boolean
}

export type NoteItem = {
  id: number
  name: string
  icon: string
  upload_date: string
  isUploading: boolean
}

const state: State = {
  notes: [],
  currentIcon: '',
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
