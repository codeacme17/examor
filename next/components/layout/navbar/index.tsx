'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { Menubar } from './menu-bar'

export const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="w-full right-0 z-50 h-16 flex justify-between items-center py-2 px-4 ">
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
