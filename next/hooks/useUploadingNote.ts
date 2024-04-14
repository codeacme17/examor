import { useState, useEffect } from 'react'
import { useFileStore } from '@/store'

export const useUploadingNotes = (noteId?: string) => {
  const [uploadingNotes, setUploadingNotes] = useState<{ noteId: string }[]>([])

  const [isNoteUploading, setIsNoteUploading] = useState(false)

  const fileStore = useFileStore()
  const uploadingFiles = fileStore.uploadingFiles

  useEffect(() => {
    const notes = uploadingFiles.map((file) => {
      return { noteId: file.noteId }
    })

    if (notes.some((note) => note.noteId === noteId)) setIsNoteUploading(true)
    else setIsNoteUploading(false)

    setUploadingNotes(notes)
  }, [uploadingFiles, noteId])

  return { uploadingNotes, isNoteUploading }
}
