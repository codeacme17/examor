'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { LucideIcon } from 'lucide-react'

interface MenuListProps {
  isCollapsed: boolean
  menus: MenuItem[]
}

export interface MenuItem {
  title: string
  icon: React.ComponentType<any> & LucideIcon
  path: string
  isLoading?: boolean
}

export const MenuList = ({ isCollapsed, menus }: MenuListProps) => {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2">
      {menus.map((item, index) =>
        isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    `dark:text-white 
                      dark:hover:bg-muted 
                      dark:hover:text-white 
                      flex 
                      items-center 
                      justify-center
                      p-2 
                      rounded-md 
                      transition-colors 
                      duration-200 
                      hover:text-muted-foreground 
                      hover:bg-white text-sm`,
                    pathname === item.path
                      ? 'bg-muted text-white'
                      : 'hover:bg-muted'
                  )}>
                  <item.icon size={16} />
                  <span className="sr-only">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex items-center gap-4">
                {item.title}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            key={index}
            href={item.path}
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
              pathname === item.path
                ? 'bg-muted text-white'
                : 'hover:bg-muted'
            )}>
            <item.icon className="ml-3 mr-2" size={16} />
            {item.title}
          </Link>
        )
      )}
    </div>
  )
}