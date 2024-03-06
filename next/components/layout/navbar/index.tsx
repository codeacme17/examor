'use client'

import { ModeToggle } from './mode-toggle'

export const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 h-16 flex justify-between items-center py-2 px-4 border-b border-primary/10">
      <div>Examor</div>

      <ModeToggle />
    </nav>
  )
}
