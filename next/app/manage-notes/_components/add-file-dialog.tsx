import { memo, useContext } from 'react'
import { NoteContext } from '../_context/note-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Paperclip } from 'lucide-react'
import { UploadForm } from '@/components/form/upload-form'

interface AddFileDialogProps {}

export const AddFileDialog = memo<AddFileDialogProps>(
  (props: AddFileDialogProps) => {
    const noteContext = useContext(NoteContext)

    if (!noteContext?.note.id) return null

    const note = noteContext.note

    return (
      <Dialog>
        <DialogTrigger className="ml-auto" asChild>
          <Button>
            <Paperclip size={16} className="mr-2" /> Add New File
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col w-screen h-screen max-w-screen-md md:max-w-1/2 md:h-auto">
          <DialogHeader>
            <DialogTitle>Add new file to {note.name}</DialogTitle>
          </DialogHeader>

          <UploadForm type="file" />
        </DialogContent>
      </Dialog>
    )
  }
)

AddFileDialog.displayName = 'AddFileDialog'
