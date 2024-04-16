import { create } from 'zustand'
import { TFile } from '@prisma/client'

interface FileState {
  uploadingFiles: TFile[]
  setUploadingFiles: (newFiles: TFile[]) => void
}

export const useFileStore = create<FileState>((set) => ({
  uploadingFiles: [],
  setUploadingFiles: (newFiles: TFile[]) => {
    set((state) => {
      if (newFiles.length !== state.uploadingFiles.length) {
        return { ...state, uploadingFiles: newFiles }
      } else return state
    })
  },
}))
