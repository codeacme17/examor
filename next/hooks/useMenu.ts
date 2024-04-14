import { useEffect, useState } from 'react'
import { LucideIcon, Notebook, Dices } from 'lucide-react'
import { useNoteStore } from '@/store'
import { useUploadingNotes } from '@/hooks/useUploadingNote'

export interface MenuItem {
  title: string
  icon: (React.ComponentType<any> & LucideIcon) | string
  path: string
  isLoading?: boolean
}

export const useMenu = () => {
  const noteStore = useNoteStore()

  const { uploadingNotes } = useUploadingNotes()

  const staticMenus: MenuItem[] = [
    {
      title: 'Manage Notes',
      icon: Notebook,
      path: '/manage-notes',
    },
    {
      title: 'Random Pick',
      icon: Dices,
      path: '/random-pick',
    },
  ]

  const [noteMenus, setNoteMenus] = useState<MenuItem[]>([])

  useEffect(() => {
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
