import { useContext } from 'react'
import { NoteContext } from '../_context/note-context'
import { MdiIcon } from '@/components/mdi-icon'
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle, Paperclip } from 'lucide-react'
import { AddFileDialog } from './add-file-dialog'

export const FileHeader = () => {
  const noteContext = useContext(NoteContext)

  if (!noteContext?.note.id) return null

  const note = noteContext.note
  const onBack = noteContext.onBack

  return (
    <header className="flex items-center">
      <Button size={'icon'} variant={'ghost'} className="mr-3" onClick={onBack}>
        <ArrowLeftCircle size={20} className="stroke-muted-foreground" />
      </Button>

      <MdiIcon icon={note.icon} size="2.3rem" />

      <span className="font-bold ml-2">{note.name}</span>

      <AddFileDialog />
    </header>
  )
}
