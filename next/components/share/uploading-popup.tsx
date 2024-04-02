import { Card } from '@/components/ui/card'
import { useFileStore } from '@/store'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, X, Paperclip } from 'lucide-react'
import { Button } from '../ui/button'

export const UploadingPopup = () => {
  const fileStore = useFileStore()
  const [isOpen, setIsOpen] = useState(false)
  const uploadingFiles = fileStore.uploadingFiles

  if (uploadingFiles.length === 0) return null

  if (!isOpen)
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{}}>
        <Button
          className="fixed rounded-full top-16 right-8 p-3  animate-pulse"
          onClick={() => setIsOpen(true)}
          size={'icon'}>
          <UploadCloud />
        </Button>
      </motion.div>
    )

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'circIn' }}>
      <Card className="fixed top-16 right-8 px-3 py-3">
        <div className="flex items-center text-muted-foreground">
          <span className="text-sm mr-3 font-bold">Uploading Files</span>
          <X
            size={12}
            onClick={() => setIsOpen(false)}
            className="ml-auto flex cursor-pointer"
          />
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {uploadingFiles.map((file) => (
            <div
              key={file.id}
              className="animate-pulse text-sm text-muted-foreground flex items-center w-48 ">
              <Paperclip className="mr-2" size={14} />{' '}
              <p className="text-ellipsis overflow-hidden">{file.fileName}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
