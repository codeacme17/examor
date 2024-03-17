import { useContext } from 'react'
import { Note } from '../page'
import { FileHeader } from './file-header'
import { NoteContext } from '../_context/note-context'

export const FileManager = () => {
  const noteContext = useContext(NoteContext)

  if (!noteContext?.note) return null

  return <section>{noteContext.note.name}</section>
}
