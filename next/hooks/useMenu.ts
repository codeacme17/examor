import { useEffect, useState } from 'react'
import { LucideIcon, Notebook, Dices } from 'lucide-react'
import { useNoteStore } from '@/store'
import { useUploadingNotes } from '@/hooks/useUploadingNote'
import { useFileStore } from '@/store/file'

export interface MenuItem {
  title: string
  path: string
  isLoading?: boolean
  isDisabled?: boolean
  icon: (React.ComponentType<any> & LucideIcon) | string
}

export const useMenu = () => {
  const noteStore = useNoteStore()
  const fileStore = useFileStore()
  const { notes } = noteStore
  const { uploadingFiles } = fileStore
  const { uploadingNotes } = useUploadingNotes()

  const [staticMenus, setStaicMenus] = useState<MenuItem[]>([
    {
      title: 'Manage Notes',
      icon: Notebook,
      path: '/manage-notes',
      isDisabled: false,
    },
    {
      title: 'Random Pick',
      icon: Dices,
      path: '/random-pick',
      isDisabled: false,
    },
  ])
  const [noteMenus, setNoteMenus] = useState<MenuItem[]>([])

  useEffect(() => {
    if (notes.length === 0) {
      staticMenus[1].isDisabled = true
    } else if (notes.length === 1 && !!uploadingFiles.length) {
      staticMenus[1].isDisabled = true
    } else staticMenus[1].isDisabled = false

    setStaicMenus([...staticMenus])

    const noteMenus = notes.map((note) => ({
      title: note.name,
      icon: note.icon,
      path: `/note/${note.name}`,
      isUploading: uploadingNotes.some(
        (uploadingNote) => uploadingNote.noteId === note.id
      ),
    }))

    setNoteMenus(noteMenus)
  }, [notes, uploadingNotes, uploadingFiles])

  return {
    staticMenus,
    noteMenus,
    setNoteMenus,
  }
}
