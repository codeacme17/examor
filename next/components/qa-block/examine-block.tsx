'use client'

import { useMarkdownit } from '@/hooks/useMarkdownit'

interface ExamineBlockProps {
  content: string
}

export const ExamineBlock = ({ content }: ExamineBlockProps) => {
  const renderContent = useMarkdownit({ content })

  return (
    <section className="mt-3 rounded-md bg-purple-400/20">
      <h3 className="text-lg font-semibold py-3 px-5 border-b">
        Examine
      </h3>

      <div
        className="px-5 py-3 markdown-box"
        dangerouslySetInnerHTML={{ __html: renderContent }}
      />
    </section>
  )
}
