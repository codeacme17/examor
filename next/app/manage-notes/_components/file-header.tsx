import { Note } from '../page'

interface FileHeaderProps {
  note: Note | null
}

export const FileHeader = (props: FileHeaderProps) => {
  const { note } = props

  return (
    <header>
      <div></div>
    </header>
  )
}
