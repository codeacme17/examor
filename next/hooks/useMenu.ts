import { useEffect, useState } from 'react'
import { LucideIcon, Notebook, Dices, NotebookPen } from 'lucide-react'
import { useNoteStore } from '@/store'

export interface MenuItem {
  title: string
  icon: (React.ComponentType<any> & LucideIcon) | string
  path: string
  isLoading?: boolean
}

export const useMenu = () => {
  const noteStore = useNoteStore()

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
      isUploading: note.isUploading,
    }))

    setNoteMenus(noteMenus)
  }, [noteStore.notes])

  return {
    staticMenus,
    noteMenus,
    setNoteMenus,
  }
}
