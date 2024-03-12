'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Menubar } from './menu-bar'

export const Navbar = () => {
  const router = useRouter()

  return (
    <nav
      className="z-50 h-12 flex justify-between items-center py-2 px-4 sticky top-0"
      style={{
        backgroundColor: 'transparent',
        backgroundImage:
          'radial-gradient(circle at 50% 50%, var(--background) 20%, transparent 20.5%, transparent 49.5%, var(--background) 50%)',
        backgroundSize: '15px 15px',
        backdropFilter:
          'blur(20px) hue-rotate(-50deg) saturate(130%)',
      }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}>
        <ChevronLeft size={16} />
      </Button>

      <div className="flex">
        <Menubar />
        <ModeToggle />
      </div>
    </nav>
  )
}
