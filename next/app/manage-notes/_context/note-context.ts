import { createContext } from 'react'
import { TNote } from '@prisma/client'

export interface NoteContextProps {
  note: TNote
  setNote: (note: TNote) => void
  onBack: () => void
  changeIcon: (icon: string) => void
}

export const NoteContext = createContext<NoteContextProps | null>(null)
export const NoteContextProvider = NoteContext.Provider
