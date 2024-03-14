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

  const CLASS_NAME = `flex 
  items-center 
  p-2 
  rounded-md 
  text-primary
  transition-colors 
  duration-200 
  dark:hover:bg-muted 
  hover:bg-white
  hover:text-muted-foreground 
  text-sm`

  return (
    <div className="flex flex-col gap-2">
      {menus.map((item, index) =>
        isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.path}
                  className={cn(
                    CLASS_NAME,
                    pathname === item.path
                      ? 'bg-muted'
                      : 'hover:bg-muted'
                  )}>
                  <item.icon size={20} />
                  <span className="sr-only text-sm">
                    {item.title}
                  </span>
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
              CLASS_NAME,
              pathname === item.path ? 'bg-muted' : 'hover:bg-muted'
            )}>
            <item.icon className="ml-3 mr-3" size={20} />
            <span className="text-xs">{item.title}</span>
          </Link>
        )
      )}
    </div>
  )
}
