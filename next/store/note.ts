import { create } from 'zustand'
import { TNote } from '@prisma/client'

interface FileState {
  notes: TNote[]
  setNotes: (newNotes: TNote[]) => void
}

export const useFileStore = create<FileState>((set) => ({
  notes: [],
  setNotes: (newNotes: TNote[]) => set({ notes: newNotes }),
}))
