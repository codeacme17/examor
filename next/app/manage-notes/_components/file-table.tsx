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

  const fileStore = useFileStore()

  const [isFetching, setIsFetching] = useState(false)
  const [files, setFiles] = useState<TFile[]>([])

  const fetchFiles = useCallback(async () => {
    setIsFetching(true)
    const res = await fetch(`/api/file/list?noteId=${noteId}`, {
      method: 'GET',
    })
    const data = await res.json()
    setIsFetching(false)
    setFiles(data.files)
  }, [noteId])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles, noteId])

  const isRawUploading = (file: TFile) => {
    return fileStore.uploadingFiles.some(
      (uploadingFile) => uploadingFile.id === file.id
    )
  }

  if (isFetching) return <Skeleton className="h-20 w-full rounded-xl" />

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
