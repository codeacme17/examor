import { memo, useContext } from 'react'
import { NoteContext } from '../_context/note-context'
import { useUploadingNotes } from '@/hooks/useUploadingNote'

import { ArrowLeftCircle } from 'lucide-react'
import { AddFileDialog } from './add-file-dialog'
import { NoteIconPopover } from './note-icon-popover'
import { DeletePopover } from './delete-popover'
import { Button } from '@/components/ui/button'

export const NoteHeader = memo(() => {
  const noteContext = useContext(NoteContext)

  const note = noteContext!.note
  const onBack = noteContext!.onBack

  const { isNoteUploading } = useUploadingNotes(note.id)

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        <Button
          disabled={isNoteUploading}
          size={'icon'}
          variant={'ghost'}
          className="mr-1"
          onClick={onBack}>
          <ArrowLeftCircle size={20} className="stroke-muted-foreground" />
        </Button>

        <NoteIconPopover />

        <span className="font-bold ml-2">{note.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <DeletePopover noteId={note.id} />

        <AddFileDialog />
      </div>
    </header>
  )
})

NoteHeader.displayName = 'NoteHeader'
