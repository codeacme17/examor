'use client'

import { Button } from '../ui/button'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { RoleTypeSwitch } from '@/components/share/role-type-switch'
import { RoleType } from '@/types/global'

interface QuestionBlockProps {
  type: 'normal' | 'random'
  id: string
  question: string
  roleType: RoleType
  noteName?: string
  onPick?: () => void
  onBack?: () => void
}

export const QuestionBlock = (props: QuestionBlockProps) => {
  const { type, id, question, roleType, noteName, onPick, onBack } =
    props

  const handlePickClick = () => {
    if (type !== 'random') return
    onPick && onPick()
  }

  const handleBackClick = () => {
    if (type !== 'normal') return
    onBack && onBack()
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
          <RoleTypeSwitch
            roleType={roleType}
            className="text-xl ml-1"
          />
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
          <RoleTypeSwitch
            roleType={roleType}
            className="text-xl ml-1"
          />
        </div>
      )}

      <div className="mt-3">{question}</div>
    </section>
  )
}
