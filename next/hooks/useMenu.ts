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
      title: 'Notes',
      icon: Notebook,
      path: '/notes',
    },
    {
      title: 'Random Pick',
      icon: Dices,
      path: '/random',
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
