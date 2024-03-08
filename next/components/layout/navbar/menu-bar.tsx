'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { MenuItem, useMenu } from '@/hooks/useMenu'
import { Plus } from 'lucide-react'

export function Menubar() {
  const { staticMenus, noteMenus } = useMenu()

  return (
    <NavigationMenu orientation="vertical" className="lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid min-w-[180px] gap-1 p-2">
              {staticMenus.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.path}
                  icon={item.icon}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid min-w-[180px] gap-1 p-2">
              <ListItem
                title={'Add new note'}
                href={'/note/new'}
                outLine
                icon={Plus}
              />

              {noteMenus.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.path}
                  icon={item.icon}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon: MenuItem['icon']
    outLine?: boolean
  }
>(({ className, title, outLine, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            outLine && 'border border-muted',
            className
          )}
          {...props}>
          <props.icon className="mr-2" size={18} />

          <span className="text-sm font-medium leading-none">
            {title}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = 'ListItem'
