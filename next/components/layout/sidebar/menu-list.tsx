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
import { MenuItem } from '@/hooks/useMenu'

interface MenuListProps {
  isCollapsed: boolean
  menus: MenuItem[]
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
                  <item.icon size={20} />
                  <span className="sr-only text-sm">{item.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
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
              pathname === item.path ? 'bg-muted text-white' : 'hover:bg-muted'
            )}>
            <item.icon className="ml-3 mr-3" size={20} />
            <span className="text-sm">{item.title}</span>
          </Link>
        )
      )}
    </div>
  )
}
