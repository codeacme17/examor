import { memo, useContext } from 'react'
import { NoteContext } from '../_context/note-context'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { AddFileDialog } from './add-file-dialog'
import { NoteIconPopover } from './note-icon-popover'

export const NoteHeader = memo(() => {
  const noteContext = useContext(NoteContext)

  if (!noteContext?.note.id) return null

  const note = noteContext.note
  const onBack = noteContext.onBack

  return (
    <header className="flex items-center">
      <Button
        size={'icon'}
        variant={'ghost'}
        className="mr-1"
        onClick={onBack}>
        <ArrowLeftCircle
          size={20}
          className="stroke-muted-foreground"
        />
      </Button>
      <NoteIconPopover />

      <span className="font-bold ml-2">{note.name}</span>

      <AddFileDialog />
    </header>
  )
})

NoteHeader.displayName = 'NoteHeader'
