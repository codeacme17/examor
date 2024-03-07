'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import Link from 'next/link'
import { Icon } from '@/components/icon'

interface MenuListProps {
  isCollapsed: boolean
  menus: MenuItem[]
}

export interface MenuItem {
  title: string
  icon: keyof typeof dynamicIconImports
  path: string
  isLoading?: boolean
}

export const MenuList = ({ isCollapsed, menus }: MenuListProps) => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {menus.map((menu, index) => (
        <Link
          key={index}
          href={menu.path}
          className={cn(
            `dark:text-white 
              dark:hover:bg-muted 
              dark:hover:text-white 
              flex 
              items-center 
              p-2 
              rounded-md 
              transition-colors 
              duration-200 
              hover:text-muted-foreground 
              hover:bg-white text-sm`,
            pathname === menu.path
              ? 'bg-muted text-white'
              : 'hover:bg-muted'
          )}>
          <Icon name={menu.icon} className="ml-3 mr-2 h-4 w-4" />
          {menu.title}
        </Link>
      ))}
    </div>
  )
}
