'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { MenuList } from './menu-list'
import { Logo } from './logo'
import { useMenu } from '@/hooks/useMenu'

export const Sidebar = ({
  isCollapsed,
}: {
  isCollapsed: boolean
}) => {
  const { staticMenus, noteMenus } = useMenu()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen p-4 gap-2">
      <Logo isCollapsed={isCollapsed} />

      <Separator />

      <MenuList isCollapsed={isCollapsed} menus={staticMenus} />

      <Separator />

      <Button
        variant="outline"
        onClick={() => router.push('/add-new')}
        className={cn(
          `text-sm
          justify-start
          items-center
          dark:hover:bg-muted 
          hover:bg-white
          hover:text-muted-foreground 
          `,
          pathname === '/add-new' && 'bg-muted',
          isCollapsed ? 'p-0 pl-2' : ''
        )}>
        <Plus className={cn('min-w-4')} size={20} />

        {!isCollapsed && (
          <span className="ml-3.5 text-xs">
            {isCollapsed ? '' : 'Add new note'}
          </span>
        )}
      </Button>

      <MenuList isCollapsed={isCollapsed} menus={noteMenus} />
    </div>
  )
}
