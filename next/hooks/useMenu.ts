import { useState } from 'react'
import {
  LucideIcon,
  Notebook,
  Dices,
  NotebookPen,
} from 'lucide-react'

export interface MenuItem {
  title: string
  icon: React.ComponentType<any> & LucideIcon
  path: string
  isLoading?: boolean
}

export const useMenu = () => {
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

  const [noteMenus, setNoteMenus] = useState<MenuItem[]>([
    {
      title: 'Vue',
      icon: NotebookPen,
      path: '/vue',
    },
  ])

  return {
    staticMenus,
    noteMenus,
    setNoteMenus,
  }
}
