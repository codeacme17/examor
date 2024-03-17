import { useContext } from 'react'
import { FileHeader } from './file-header'
import { NoteContext } from '../_context/note-context'
import { FileTable } from './file-table'

export const FileManager = () => {
  const noteContext = useContext(NoteContext)

  if (!noteContext?.note) return null

  return (
    <section className="flex flex-col gap-4">
      <FileHeader />
      <FileTable />
    </section>
  )
}
