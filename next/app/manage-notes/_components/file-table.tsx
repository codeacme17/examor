'use client'

import { memo, useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TFile } from '@prisma/client'
import { format } from 'date-fns'

interface FileTableProps {
  noteId: string
}

export const FileTable = memo((props: FileTableProps) => {
  const { noteId } = props
  const [files, setFiles] = useState<TFile[]>([])

  const fetchFiles = async () => {
    const res = await fetch(`/api/file/list?noteId=${noteId}`, {
      method: 'GET',
    })
    const data = await res.json()
    console.log(data)
    setFiles(data.files)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <Table>
      <TableCaption>
        This list shows the files uploaded by the current note
      </TableCaption>
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
            <TableCell className="font-medium">{file.fileName}</TableCell>
            <TableCell>{file.questionCount}</TableCell>
            <TableCell className="text-right">
              {format(file.uploadDate, 'yyyy-MM-dd')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

FileTable.displayName = 'FileTable'
