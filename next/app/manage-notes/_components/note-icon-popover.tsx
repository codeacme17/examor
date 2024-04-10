/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef } from 'react'
import { NoteContext } from '../_context/note-context'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { MdiIcon } from '@/components/mdi-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CornerDownLeft } from 'lucide-react'
import { useFetchNotes } from '@/hooks/useFetchNotes'
import { useToast } from '@/components/ui/use-toast'

export const NoteIconPopover = () => {
  const noteContext = useContext(NoteContext)
  const { fetchNotes } = useFetchNotes()
  const { toast } = useToast()

  if (!noteContext?.note.id) return null

  const note = noteContext.note

  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    handleIconChange()
  }

  const handleClick = () => {
    handleIconChange()
  }

  const handleIconChange = async () => {
    const currentIcon = inputRef.current?.value.trim()

    if (!currentIcon) return

    const res = await fetch(`/api/note/${note.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ icon: currentIcon }),
    })

    if (res.ok) {
      fetchNotes()
      noteContext.changeIcon(currentIcon)
    } else {
      toast({
        title: 'Failed to update icon',
        description: 'Please try again later',
        variant: 'destructive',
      })
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <MdiIcon icon={note.icon} size="2.3rem" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto ml-10">
        <p className="text-sm">
          To get the icon please go to:
          <Button size={'sm'} variant={'link'}>
            <a href="https://pictogrammers.com/library/mdi/" target="_blank">
              Material Design Icons
            </a>
          </Button>
        </p>

        <div className="flex items-center mt-2 gap-1 h-10">
          <Input
            ref={inputRef}
            placeholder={note.icon}
            onKeyDown={handleKeyDown}
            className="h-full"
          />
          <Button onClick={handleClick} size={'icon'} className="h-full">
            <CornerDownLeft size={14} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
