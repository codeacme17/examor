import { createContext } from 'react'
import { Note } from '../page'

export interface NoteContextProps {
  note: Note
  setNote: (note: Note) => void
  onBack: () => void
}

export const NoteContext = createContext<NoteContextProps | null>(null)
export const NoteContextProvider = NoteContext.Provider
