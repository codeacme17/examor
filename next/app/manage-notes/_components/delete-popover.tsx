import { useContext, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useFetchNotes } from '@/hooks/useFetchNotes'
import { NoteContext } from '../_context/note-context'

import { Trash } from 'lucide-react'
import { LoadButton } from '@/components/share/load-button'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DeletePopoverProps {
  noteId: string
}

export const DeletePopover = (props: DeletePopoverProps) => {
  const { noteId } = props
  const { toast } = useToast()

  const noteContext = useContext(NoteContext)
  const { onBack } = noteContext!

  const [loading, setLoading] = useState(false)

  const { fetchNotes } = useFetchNotes()

  const handleDelete = async () => {
    const res = await fetch(`/api/note/${noteId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast({
        title: 'Note deleted',
        description: 'The note has been deleted successfully',
      })
      await fetchNotes()
      onBack()
    } else {
      toast({
        title: 'Failed to delete note',
        description: 'Please try again later',
        variant: 'destructive',
      })
    }
  }

  const handleConfirm = async () => {
    setLoading(true)
    await handleDelete()
    setLoading(false)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <LoadButton
          className="ml-auto"
          size={'icon'}
          variant={'ghost'}
          loadingLabel={''}
          loading={loading}>
          <Trash size={20} />
        </LoadButton>
      </PopoverTrigger>

      <PopoverContent>
        <p>Are you sure you want to delete this note?</p>

        <Button
          className="w-full mt-2 bg-green-500"
          disabled={loading}
          size={'sm'}
          onClick={handleConfirm}>
          Yeah
        </Button>
      </PopoverContent>
    </Popover>
  )
}
