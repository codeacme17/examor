'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { MenuList, MenuItem } from './menu-list'
import { Icon } from '@/components/icon'

export const Sidebar = () => {
  const pathname = usePathname()

  console.log(pathname)

  const staticMenus: MenuItem[] = [
    {
      title: 'Notes',
      icon: 'notebook',
      path: '/notes',
    },
    {
      title: 'Random Pick',
      icon: 'dices',
      path: '/random',
    },
  ]

  const [dynamicMenus, setDynamicMenus] = useState<MenuItem[]>([
    {
      title: 'Vue',
      icon: 'notebook-pen',
      path: '/vue',
    },
  ])

  return (
    <div className="flex flex-col h-screen p-4 gap-2">
      <span className="font-semibold mb-2">Examor</span>
      <MenuList isCollapsed={false} menus={staticMenus} />
      <Separator />
      <Button variant="outline" className="justify-start text-sm">
        <Icon name="plus" className="mr-2" /> Add new note
      </Button>
      <MenuList isCollapsed={false} menus={dynamicMenus} />
    </div>
  )
}
