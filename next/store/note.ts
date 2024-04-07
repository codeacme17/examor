import { create } from 'zustand'
import { TNote } from '@prisma/client'

interface FileState {
  notes: TNote[]
  isFetching: boolean
  setNotes: (newNotes: TNote[]) => void
  setIsFetching: (isFetching: boolean) => void
}

export const useNoteStore = create<FileState>((set) => ({
  notes: [],
  isFetching: false,
  setNotes: (newNotes: TNote[]) => set({ notes: newNotes }),
  setIsFetching: (isFetching: boolean) => set({ isFetching }),
}))
