import { memo, useContext } from 'react'
import { NoteHeader } from './note-header'
import { NoteContext } from '../_context/note-context'
import { FileTable } from './file-table'

interface FileManagerProps {
  noteId: string
}

export const FileManager = memo((props: FileManagerProps) => {
  const { noteId } = props

  const noteContext = useContext(NoteContext)

  if (!noteContext?.note) return null

  return (
    <section className="flex flex-col gap-4">
      <NoteHeader />
      <FileTable noteId={noteId} />
    </section>
  )
})

FileManager.displayName = 'FileManager'
