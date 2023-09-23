import { defineStore } from 'pinia'

export type UploadingFileItem = {
  id: number
  note_id: number
  file_name: string
}

type State = {
  uploadingFiles: UploadingFileItem[]
}

const state: State = {
  uploadingFiles: [],
}

export const useFileStore = defineStore('fileStore', {
  state: () => state,
})
