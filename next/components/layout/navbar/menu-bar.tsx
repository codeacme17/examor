'use client'

import { memo, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { type MenuItem, useMenu } from '@/hooks/useMenu'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

interface ListItemProps
  extends MenuItem,
    Omit<React.HTMLAttributes<HTMLAnchorElement>, 'title'> {
  outLine?: boolean
}

export const Menubar = memo(() => {
  const { staticMenus, noteMenus } = useMenu()

  return (
    <NavigationMenu orientation="vertical" className="lg:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid min-w-[180px] gap-1 p-2">
              {staticMenus.map((item) => (
                <ListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid min-w-[180px] gap-1 p-2">
              <ListItem
                outLine
                title={'Add new note'}
                path={'/add-new'}
                icon={Plus}
              />

              {noteMenus.map((item) => (
                <ListItem key={item.title} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
})

const ListItem = forwardRef<any, ListItemProps>((props, ref) => {
  const { className, title, outLine, path, isDisabled, ...rest } = props
  const pathname = usePathname()

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={path}
          className={cn(
            'flex items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            outLine && 'border border-muted',
            pathname === path && 'bg-muted',
            isDisabled && 'opacity-50 pointer-events-none',
            className
          )}
          {...rest}>
          <props.icon className="mr-2" size={18} />

          <span className="text-sm font-medium leading-none">{title}</span>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

Menubar.displayName = 'Menubar'

ListItem.displayName = 'ListItem'
