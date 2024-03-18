import { memo, useContext } from 'react'
import { NoteHeader } from './note-header'
import { NoteContext } from '../_context/note-context'
import { FileTable } from './file-table'

export const FileManager = memo(() => {
  const noteContext = useContext(NoteContext)

  if (!noteContext?.note) return null

  return (
    <section className="flex flex-col gap-4">
      <NoteHeader />
      <FileTable />
    </section>
  )
})

FileManager.displayName = 'FileManager'
