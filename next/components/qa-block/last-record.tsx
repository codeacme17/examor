'use client'

import { useMarkdownit } from '@/hooks/useMarkdownit'

interface LastRecordProps
  extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

export const LastRecord = (props: LastRecordProps) => {
  const { content, ...rest } = props
  const renderContent = useMarkdownit({ content })

  return (
    <section
      dangerouslySetInnerHTML={{ __html: renderContent }}
      className="w-full px-5 py-3 bg-muted rounded-md markdown-box"
      {...rest}
    />
  )
}
