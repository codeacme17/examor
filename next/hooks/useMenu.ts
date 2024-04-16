import { useEffect, useState } from 'react'
import { LucideIcon, Notebook, Dices } from 'lucide-react'
import { useNoteStore } from '@/store'
import { useUploadingNotes } from '@/hooks/useUploadingNote'

export interface MenuItem {
  title: string
  icon: (React.ComponentType<any> & LucideIcon) | string
  path: string
  isLoading?: boolean
  isDisabled?: boolean
}

export const useMenu = () => {
  const noteStore = useNoteStore()

  const { uploadingNotes } = useUploadingNotes()

  const [staticMenus, setStaicMenus] = useState<MenuItem[]>([
    {
      title: 'Manage Notes',
      icon: Notebook,
      path: '/manage-notes',
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
    if (noteStore.notes.length === 0) staticMenus[1].isDisabled = true
    else staticMenus[1].isDisabled = false

    setStaicMenus([...staticMenus])

    const noteMenus = noteStore.notes.map((note) => ({
      title: note.name,
      icon: note.icon,
      path: `/note/${note.name}`,
      isUploading: uploadingNotes.some(
        (uploadingNote) => uploadingNote.noteId === note.id
      ),
    }))

    setNoteMenus(noteMenus)
  }, [noteStore.notes, uploadingNotes])

  return {
    staticMenus,
    noteMenus,
    setNoteMenus,
  }
}
