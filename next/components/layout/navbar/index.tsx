'use client'

import { ModeToggle } from './mode-toggle'

export const Navbar = () => {
  return (
    <nav className="w-full right-0 z-50 h-16 flex justify-between items-center py-2 px-4 ">
      <div></div>

      <ModeToggle />
    </nav>
  )
}
