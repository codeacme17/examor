'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { cn } from '@/lib/utils'

export const ResizePanel = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <ResizablePanelGroup
      autoSaveId="examor-layout"
      direction="horizontal"
      className="max-h-screen">
      <ResizablePanel
        defaultSize={15}
        minSize={10}
        maxSize={20}
        collapsedSize={3}
        collapsible={true}
        onCollapse={() => {
          setIsCollapsed(true)
        }}
        onExpand={() => {
          setIsCollapsed(false)
        }}
        className={cn(
          isCollapsed &&
            'min-w-[70px] transition-all duration-300 ease-in-out'
        )}>
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel className="flex flex-col">
        <Navbar />
        <main className="w-full p-6 flex-1 overflow-y-scroll">
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
