import { memo } from 'react'
import { QuestionType } from '@/types/global'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { QuestionTypeSwitch } from '@/components/share/question-type-switch'

interface _TableProps {
  data: any
}

export interface Question {
  id: string
  question: string
  question_type: QuestionType
  answer: string
  status: string
  created_at: string
  updated_at: string
}

const data = [
  {
    id: '1',
    question: 'What is your name?',
    answer: 'My name is John Doe',
    status: 'New',
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
    question_type: 'short',
  },
  {
    id: '2',
    question: 'What is your age?',
    answer: 'I am 20 years old',
    status: 'New',
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
    question_type: 'single',
  },
]

export const QuestionTable = memo(() => {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <div className="font-bold text-xl mb-3">New Questions</div>
        <_Table data={data} />
      </div>

      <div>
        <div className="font-bold text-xl mb-3">
          Expires Questions
        </div>
        <_Table data={data} />
      </div>

      <div>
        <div className="font-bold text-xl mb-3">Review Questions</div>
        <_Table data={data} />
      </div>
    </section>
  )
})

const _Table = (props: _TableProps) => {
  const { data } = props

  return (
    <Table className="border">
      <TableBody>
        {data.map((question: Question) => (
          <TableRow key={question.id}>
            <TableCell className="p-2 pl-5 w-10">
              <QuestionTypeSwitch
                questionType={question.question_type}
                className="text-lg"
              />
            </TableCell>
            <TableCell className="p-2">{question.question}</TableCell>
            <TableCell className="text-right p-2 pr-5 w-20">
              <Button size={'sm'}>Go</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

QuestionTable.displayName = 'QuestionTable'
