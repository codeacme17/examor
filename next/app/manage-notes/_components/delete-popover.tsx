import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import { Trash } from 'lucide-react'
import { useContext } from 'react'
import { NoteContext } from '../_context/note-context'

interface DeletePopoverProps {
  noteId: string
}

export const DeletePopover = (props: DeletePopoverProps) => {
  const { noteId } = props
  const noteContext = useContext(NoteContext)

  const onBack = noteContext!.onBack

  const { toast } = useToast()

  const handleDelete = async () => {
    const res = await fetch(`/api/note/${noteId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast({
        title: 'Note deleted',
        description: 'The note has been deleted successfully',
      })
    }
    onBack()
  }

  const handleConfirm = async () => {
    handleDelete()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto" size={'icon'} variant={'ghost'}>
          <Trash size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <p>Are you sure you want to delete this note?</p>

        <Button
          className="w-full mt-2 bg-green-500"
          size={'sm'}
          onClick={handleConfirm}>
          Yeah
        </Button>
      </PopoverContent>
    </Popover>
  )
}
