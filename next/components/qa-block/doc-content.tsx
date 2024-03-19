'use client'

import { useMarkdownit } from '@/hooks/useMarkdownit'

interface DocContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

export const DocContent = (props: DocContentProps) => {
  const { content, ...rest } = props

  const renderContent = useMarkdownit({ content })

  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderContent }}
      className="w-full px-5 py-3 bg-muted rounded-md markdown-box"
      {...rest}
    />
  )
}
