import Markdownit from 'markdown-it'
import { useEffect, useRef, useState } from 'react'

interface MarkdownitProps {
  content: string
}

export const useMarkdownit = (props: MarkdownitProps) => {
  const { content } = props

  const md = useRef<Markdownit | null>(null)

  const [renderContent, setRenderContent] = useState('')

  useEffect(() => {
    md.current = new Markdownit()
  }, [])

  useEffect(() => {
    if (md.current) {
      setRenderContent(md.current.render(content))
    }
  }, [content])

  return renderContent
}
