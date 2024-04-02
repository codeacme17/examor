import { create } from 'zustand'
import { TFile } from '@prisma/client'

interface FileState {
  uploadingFiles: TFile[]
  setUploadingFiles: (newFiles: TFile[]) => void
}

export const useFileStore = create<FileState>((set) => ({
  uploadingFiles: [],
  setUploadingFiles: (newFiles: TFile[]) => set({ uploadingFiles: newFiles }),
}))
