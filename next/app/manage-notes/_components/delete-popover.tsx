import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Trash } from 'lucide-react'

interface DeletePopoverProps {
  noteId: string
}

export const DeletePopover = (props: DeletePopoverProps) => {
  const { noteId } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="ml-auto" size={'icon'} variant={'ghost'}>
          <Trash size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <p>Are you sure you want to delete this note?</p>

        <Button className="w-full mt-2 bg-green-500" size={'sm'}>
          Yeah
        </Button>
      </PopoverContent>
    </Popover>
  )
}
