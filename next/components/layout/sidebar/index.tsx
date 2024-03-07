'use client'

import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MenuList, MenuItem } from './menu-list'
import { cn } from '@/lib/utils'
import { Notebook, Dices, NotebookPen, Plus } from 'lucide-react'
import { Logo } from './logo'

export const Sidebar = ({
  isCollapsed,
}: {
  isCollapsed: boolean
}) => {
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

  const [dynamicMenus, setDynamicMenus] = useState<MenuItem[]>([
    {
      title: 'Vue',
      icon: NotebookPen,
      path: '/vue',
    },
  ])

  return (
    <div className="flex flex-col h-screen p-4 gap-2">
      <Logo isCollapsed={isCollapsed} />

      <Separator />

      <MenuList isCollapsed={isCollapsed} menus={staticMenus} />

      <Separator />

      <Button
        variant="outline"
        className={cn(
          'text-sm',
          isCollapsed
            ? 'p-0 justify-center items-center'
            : 'justify-start'
        )}>
        <Plus
          className={(cn(isCollapsed ? 'mr-0' : 'mr-2'), 'min-w-4')}
          size={16}
        />
        {isCollapsed ? '' : 'Add new note'}
      </Button>

      <MenuList isCollapsed={isCollapsed} menus={dynamicMenus} />
    </div>
  )
}
