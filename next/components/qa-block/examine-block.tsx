'use client'

import { useEffect, useRef, useState } from 'react'
import markdownit from 'markdown-it'

interface ExamineBlockProps {
  content: string
}

export const ExamineBlock = ({ content }: ExamineBlockProps) => {
  const md = useRef<markdownit | null>(null)
  const [renderContent, setRenderContent] = useState('')

  useEffect(() => {
    md.current = new markdownit()
  }, [])

  useEffect(() => {
    if (md.current) {
      setRenderContent(md.current.render(content))
    }
  }, [content])

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
