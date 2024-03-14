'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

interface QuestionBlockProps {
  type: 'normal' | 'random'
  id: string
  question: string
  role: string
  onClickPick?: () => void
  onClickBack?: () => void
}

export const QuestionBlock = (props: QuestionBlockProps) => {
  const { type, id, question, role, onClickPick, onClickBack } = props

  const handlePickClick = () => {
    onClickPick && onClickPick()
  }

  const handleBackClick = () => {
    onClickBack && onClickBack()
  }

  return (
    <section className="w-full rounded-lg p-5 bg-blue-500 dark:bg-blue-700 shadow-sm">
      {type === 'normal' && (
        <div>
          <Button
            size={'icon'}
            className="w-7 h-7 rounded-full mr-3"
            onClick={handleBackClick}>
            <ArrowLeft size={14} />
          </Button>
          Question
        </div>
      )}

      <div className="mt-3 text-white">{question}</div>
    </section>
  )
}
