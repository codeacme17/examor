import { defineStore } from 'pinia'

type State = {
  uploadingFiles: UploadingFileItem[]
}

export type UploadingFileItem = {
  id: number
  note_id: number
  file_name: string
}

const state: State = {
  uploadingFiles: [],
}

export const useFileStore = defineStore('fileStore', {
  state: () => state,
})
