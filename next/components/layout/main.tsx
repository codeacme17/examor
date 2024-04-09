'use client'

import { useEffect, useRef } from 'react'
import { useProfileStore, useFileStore } from '@/store'
import { useFetchNotes } from '@/hooks/useFetchNotes'

export const Main = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const profileStore = useProfileStore()
  const fileStore = useFileStore()

  const ws = useRef<WebSocket | null>(null)

  const { fetchNotes } = useFetchNotes()

  const fetchProfile = async () => {
    const res = await fetch('/api/profile/init', {
      method: 'POST',
    })

    if (res.ok) {
      const data = await res.json()
      profileStore.setProfile(data)
    } else {
      console.log('Failed to fetch profile')
    }
  }

  const getUploadingFiles = async () => {
    if (ws.current) return

    await fetch('/api/file/uploading', {
      method: 'GET',
    })

    ws.current = new WebSocket('ws://localhost:51782/')

    ws.current.onopen = () => {
      console.log('connected')
    }

    ws.current.onclose = () => {
      console.log('disconnected')
    }

    ws.current.onerror = (err) => {
      ws.current?.close()
    }

    ws.current.onmessage = (data) => {
      fileStore.setUploadingFiles(JSON.parse(data.data))
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchNotes()
    getUploadingFiles()

    return () => {
      ws.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="w-full p-6 flex-1 max-w-[1080px] mx-auto">{children}</main>
  )
}
