import { useState, useEffect } from 'react'
import { useFileStore } from '@/store'

export const useUploadingNotes = () => {
  const [uploadingNotes, setUploadingNotes] = useState<{ noteId: string }[]>([])

  const fileStore = useFileStore()
  const uploadingFiles = fileStore.uploadingFiles

  useEffect(() => {
    const notes = uploadingFiles.map((file) => {
      return { noteId: file.noteId }
    })

    setUploadingNotes(notes)
  }, [uploadingFiles])

  return { uploadingNotes }
}
