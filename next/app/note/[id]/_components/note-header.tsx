import { memo } from 'react'
import { MdiIcon } from '@/components/mdi-icon'
import { Note } from '@/app/manage-notes/page'

interface NoteHeader extends React.HTMLAttributes<HTMLDivElement> {
  note: Note
}

export const NoteHeader = memo((props: NoteHeader) => {
  const { note, ...rest } = props

  return (
    <header className="flex items-center mb-3 -mt-3" {...rest}>
      <MdiIcon icon={note.icon} size="2.3rem" />
      <span className="font-bold ml-2 text-2xl">{note.name}</span>
    </header>
  )
})

NoteHeader.displayName = 'NoteHeader'
