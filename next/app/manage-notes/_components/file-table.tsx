'use client'

import { memo, use } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface File {
  id: number
  note_id: number
  file_name: string
  is_uploading: boolean
  question_count: number
  upload_date: string
}

const files: File[] = [
  {
    id: 1,
    note_id: 1,
    file_name: 'Vuejs',
    is_uploading: false,
    question_count: 20,
    upload_date: '2024-02-02',
  },
  {
    id: 2,
    note_id: 2,
    file_name: 'javascript',
    is_uploading: false,
    question_count: 20,
    upload_date: '2024-02-02',
  },
]

export const FileTable = memo(() => {
  const res = use<string>(
    new Promise((resolve) =>
      setTimeout(() => {
        resolve('1')
      }, 500)
    )
  )

  return (
    <section className="px-3">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>File name</TableHead>
            <TableHead>Question count</TableHead>
            <TableHead className="text-right">Upload date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">
                {file.file_name}
              </TableCell>
              <TableCell>{file.question_count}</TableCell>
              <TableCell className="text-right">
                {file.upload_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
})

FileTable.displayName = 'FileTable'
