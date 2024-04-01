import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useFileStore } from '@/store'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UploadCloud } from 'lucide-react'
import { Button } from '../ui/button'

export const UploadingPopup = () => {
  const fileStore = useFileStore()
  const [isOpen, setIsOpen] = useState(false)
  // const uploadingFiles = fileStore.uploadingFiles

  const uploadingFiles = [
    {
      id: 1,
      fileName: 'file1',
    },
    {
      id: 2,
      fileName: 'file2',
    },
    {
      id: 3,
      fileName: 'file3',
    },
  ]

  if (uploadingFiles.length === 0) return null

  if (!isOpen)
    return (
      <Button
        className="fixed rounded-full bottom-10 right-8 p-3"
        onClick={() => setIsOpen(true)}
        size={'icon'}>
        <UploadCloud />
      </Button>
    )

  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{}}>
      <Card className="fixed bottom-10 right-8 p-3">
        <div className="flex items-center">
          <UploadCloud className="mr-2" /> Uploading
          <Button className="ml-auto" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
        <div className="mt-2 flex flex-col gap-2">
          {uploadingFiles.map((file) => (
            <div key={file.id}>
              <p>{file.fileName}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
