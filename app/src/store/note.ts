import { defineStore } from 'pinia'
import { NOTE_API } from '@/apis'
import { useFetch } from '@/hooks'
import { useFileStore, type UploadingFileItem } from './file'

type State = {
  notes: NoteItem[]
  currentIcon: string
  getNotesLoading: boolean
}

export type NoteItem = {
  id: number
  name: string
  icon: string
  upload_date?: string
  isUploading?: boolean
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
      // @ts-ignore
      this.$state.getNotesLoading = loading
      const { data } = await _getNotes()
      this.$state.notes = data
    },

    setIsUploadingNotes() {
      const FILE_STORE = useFileStore()
      const noteIdsSet = new Set(
        FILE_STORE.uploadingFiles.map((item: UploadingFileItem) => item.note_id)
      )

      this.$state.notes.forEach((note: NoteItem) => {
        note.isUploading = noteIdsSet.has(note.id)
      })
    },
  },
})
