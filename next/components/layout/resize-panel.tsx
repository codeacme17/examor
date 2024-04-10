'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useHasMounted } from '@/hooks/useHasMouted'
import { Main } from './main'

export const ResizePanel = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const mounted = useHasMounted()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  if (!mounted) return null

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
          'hidden lg:block',
          isCollapsed &&
            'md:min-w-[70px] transition-all duration-300 ease-in-out',
          !isCollapsed && 'md:min-w-[250px]'
        )}>
        <Sidebar isCollapsed={isCollapsed} />
      </ResizablePanel>

      <ResizableHandle
        withHandle
        className={cn(
          'hidden lg:flex z-[40] transition-all',
          isDragging && 'cursor-col-resize w-1.5'
        )}
        onDragging={setIsDragging}
      />

      <ResizablePanel className="flex flex-col">
        <section className="relative overflow-y-scroll">
          <Navbar />

          <Main>{children}</Main>
        </section>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
