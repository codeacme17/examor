import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { memo } from 'react'

interface _TableProps {
  data: any
}

export interface Question {
  id: string
  question: string
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
  },
  {
    id: '2',
    question: 'What is your age?',
    answer: 'I am 20 years old',
    status: 'New',
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
  },
]

export const QuestionTable = memo(() => {
  return (
    <section className="flex flex-col gap-5">
      <div>
        <div className="font-bold text-xl mb-2">New Questions</div>
        <_Table data={data} />
      </div>

      <div>
        <div className="font-bold text-xl mb-2">
          Expires Questions
        </div>
        <_Table data={data} />
      </div>

      <div>
        <div className="font-bold text-xl mb-2">Review Questions</div>
        <_Table data={data} />
      </div>
    </section>
  )
})

const _Table = (props: _TableProps) => {
  const { data } = props

  const CellClassName = 'p-2'

  return (
    <Table className="border">
      <TableBody>
        {data.map((question: Question) => (
          <TableRow key={question.id}>
            <TableCell className="font-medium p-2 pl-5">
              INV001
            </TableCell>
            <TableCell className="font-medium p-2">INV001</TableCell>
            <TableCell className="p-2">Paid</TableCell>
            <TableCell className="p-2">Credit Card</TableCell>
            <TableCell className="text-right p-2">
              <Button>Go</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

QuestionTable.displayName = 'QuestionTable'
