'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div>
      {theme === 'dark' ? (
        <Button onClick={toggleTheme} size="icon" variant="ghost">
          <Icon name="moon" size={16} className="fill-current" />
        </Button>
      ) : (
        <Button onClick={toggleTheme} size="icon" variant="ghost">
          <Icon name="sun" size={16} className="fill-current" />
        </Button>
      )}
    </div>
  )
}
