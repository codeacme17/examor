'use client'

import { Button } from '../ui/button'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { RoleSwitch } from '@/components/share/role-switch'
import { Role } from '@/types/global'

interface QuestionBlockProps {
  type: 'normal' | 'random'
  id: string
  question: string
  role: Role
  noteName?: string
  onClickPick?: () => void
  onClickBack?: () => void
}

export const QuestionBlock = (props: QuestionBlockProps) => {
  const {
    type,
    id,
    question,
    role,
    noteName,
    onClickPick,
    onClickBack,
  } = props

  const handlePickClick = () => {
    if (type !== 'random') return
    onClickPick && onClickPick()
  }

  const handleBackClick = () => {
    if (type !== 'normal') return
    onClickBack && onClickBack()
  }

  return (
    <section className="w-full rounded-lg p-5 bg-blue-500/50 dark:bg-blue-700 shadow-sm">
      {type === 'normal' && (
        <div>
          <Button
            size={'icon'}
            className="w-7 h-7 rounded-full mr-3"
            onClick={handleBackClick}>
            <ArrowLeft size={14} />
          </Button>
          <span className="text-xl font-bold">Question</span>
          <RoleSwitch role={role} className="text-xl ml-1" />
        </div>
      )}

      {type === 'random' && (
        <div className="flex justify-center">
          <Button
            size={'icon'}
            variant={'ghost'}
            className="w-7 h-7 rounded-full mr-3"
            onClick={handlePickClick}>
            <RotateCcw size={14} />
          </Button>
          <span className="text-xl font-bold">{noteName}</span>
          <RoleSwitch role={role} className="text-xl ml-1" />
        </div>
      )}

      <div className="mt-3">{question}</div>
    </section>
  )
}
