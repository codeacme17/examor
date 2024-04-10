import { useFileStore } from '@/store'
import { UploadCloud, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const UploadingPopup = () => {
  const fileStore = useFileStore()

  const uploadingFiles = fileStore.uploadingFiles

  if (uploadingFiles.length === 0) return null

  return (
    <Popover>
      <PopoverTrigger
        className="rounded-full animate-pulse bg-primary ml-2"
        asChild>
        <Button className="w-8 h-8" size={'icon'}>
          <UploadCloud size={14} />
        </Button>
      </PopoverTrigger>

      <PopoverContent align={'start'}>
        <div className="flex items-center text-muted-foreground">
          <span className="text-sm mr-3 font-bold">Uploading Files</span>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className="animate-pulse text-sm text-muted-foreground flex items-center w-40">
              <Paperclip className="mr-2" size={14} />{' '}
              <p className="text-ellipsis overflow-hidden">{file.fileName}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
