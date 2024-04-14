'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useFileStore } from '@/store'
import type { TFile } from '@prisma/client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

interface FileTableProps {
  noteId: string
}

export const FileTable = memo((props: FileTableProps) => {
  const { noteId } = props
  const [files, setFiles] = useState<TFile[]>([])
  const fileStore = useFileStore()

  const fetchFiles = useCallback(async () => {
    const res = await fetch(`/api/file/list?noteId=${noteId}`, {
      method: 'GET',
    })
    const data = await res.json()
    setFiles(data.files)
  }, [noteId])

  useEffect(() => {
    fetchFiles()
  }, [noteId, fetchFiles, fileStore.uploadingFiles])

  const isRawUploading = (file: TFile) => {
    return fileStore.uploadingFiles.some(
      (uploadingFile) => uploadingFile.id === file.id
    )
  }

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
          <TableRow
            key={file.id}
            className={cn(
              isRawUploading(file) && 'pointer-events-none animate-pulse'
            )}>
            <TableCell className="font-medium">{file.fileName}</TableCell>

            <TableCell>
              {isRawUploading(file) ? (
                <Skeleton className="w-16 h-7 rounded-xl" />
              ) : (
                file.questionCount
              )}
            </TableCell>

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
