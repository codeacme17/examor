'use client'

import { memo } from 'react'
import { QuestionType, Role } from '@/types/global'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { QuestionTypeSwitch } from '@/components/share/question-type-switch'

interface QuestionTableProps {
  questions: any
  onRowClick: (question: Question) => void
}

export interface Question {
  id: string
  question: string
  designated_role: Role
  question_type: QuestionType
  answer: string
  status: string
  created_at: string
  updated_at: string
}

export const QuestionTable = memo((props: QuestionTableProps) => {
  const { questions, onRowClick } = props

  return (
    <section className="flex flex-col gap-5">
      <div>
        <div className="font-bold text-xl mb-3">New Questions</div>
        <_Table questions={questions} onRowClick={onRowClick} />
      </div>

      <div>
        <div className="font-bold text-xl mb-3">
          Expires Questions
        </div>
        <_Table questions={questions} onRowClick={onRowClick} />
      </div>

      <div>
        <div className="font-bold text-xl mb-3">Review Questions</div>
        <_Table questions={questions} onRowClick={onRowClick} />
      </div>
    </section>
  )
})

const _Table = (props: QuestionTableProps) => {
  const { questions, onRowClick } = props

  return (
    <Table className="border">
      <TableBody>
        {questions.map((question: Question) => (
          <TableRow key={question.id}>
            <TableCell className="p-2 pl-5 w-10">
              <QuestionTypeSwitch
                questionType={question.question_type}
                className="text-lg"
              />
            </TableCell>
            <TableCell className="p-2">{question.question}</TableCell>
            <TableCell className="text-right p-2 pr-5 w-20">
              <Button
                size={'sm'}
                onClick={() => onRowClick(question)}>
                Go
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

QuestionTable.displayName = 'QuestionTable'
