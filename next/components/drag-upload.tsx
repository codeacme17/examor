import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { UploadCloud, Trash2, Paperclip } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

interface DragUploadRef {
  files: File[]
}

interface DragUploadProps {
  files: File[]
  onFileChange: (files: File[]) => void
}

export const DragUpload = forwardRef<DragUploadRef, DragUploadProps>(
  ({ files: _files, onFileChange }, ref) => {
    const [isDragOver, setIsDragOver] = useState(false)
    const [files, setFiles] = useState<File[]>([])

    useImperativeHandle(ref, () => ({
      files: files,
    }))

    useEffect(() => {
      onFileChange(files)
    }, [files, onFileChange])

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const draggedFiles = Array.from(e.dataTransfer.files)
      handleUpdateFiles(draggedFiles)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        handleUpdateFiles(Array.from(e.target.files))
      }
    }

    const handleUpdateFiles = (selectedFiles: File[]) => {
      const newFiles = selectedFiles.filter(
        (selectedFiles) =>
          !files.some((file) => file.name === selectedFiles.name)
      )

      setFiles((prev) => [...prev, ...newFiles])
    }

    const handleDelete = (fileName: string) => {
      setFiles((prev) => prev.filter((file) => file.name !== fileName))
    }

    return (
      <div
        className="flex items-center justify-center w-full flex-col"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}>
        <label
          htmlFor="dropzone-file"
          className={cn(
            'flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-300 border-dashed rounded-lg cursor-pointer bg-zinc-50 dark:hover:bg-zinc-800 dark:bg-muted hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 transition-colors',
            isDragOver
              ? 'border-band dark:border-band'
              : 'border-zinc dark:border-zinc-600'
          )}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6 select-none pointer-events-none">
            <UploadCloud className="w-8 h-8 mb-4 text-zinc-500 dark:text-zinc-400" />
            <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              current only support <strong>.md</strong>
            </p>
          </div>

          <Input
            id="dropzone-file"
            className="hidden"
            type="file"
            multiple
            onChange={(e) => handleInputChange(e)}
          />
        </label>

        {!!files.length && (
          <Table className="mt-2">
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell className="font-medium p-1 pl-4">
                    <div className="flex items-center">
                      <Paperclip size={14} className="mr-2" />
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-1">
                    {(file.size / 1024).toFixed(2)} KB
                  </TableCell>
                  <TableCell className="text-right p-1 w-10">
                    <Button
                      size={'icon'}
                      variant={'ghost'}
                      onClick={() => handleDelete(file.name)}>
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    )
  }
)

DragUpload.displayName = 'DragUpload'
