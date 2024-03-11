'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { useHasMounted } from '@/hooks/useHasMouted'
import { Button } from '@/components/ui/button'

import { Moon, Sun } from 'lucide-react'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const hasMounted = useHasMounted()

  return (
    <div>
      {hasMounted && theme === 'dark' ? (
        <Button onClick={toggleTheme} size="icon" variant="ghost">
          <Moon size={16} className="fill-current" />
        </Button>
      ) : (
        <Button onClick={toggleTheme} size="icon" variant="ghost">
          <Sun size={16} className="fill-current" />
        </Button>
      )}
    </div>
  )
}
