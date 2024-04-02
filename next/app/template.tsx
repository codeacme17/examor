'use client'

import { motion } from 'framer-motion'
import { useProfileStore } from '@/store'
import { useEffect, useRef } from 'react'
import { useFileStore } from '@/store'
import { UploadingPopup } from '@/components/share/uploading-popup'

export default function Template({ children }: { children: React.ReactNode }) {
  const profileStore = useProfileStore()
  const fileStore = useFileStore()

  const ws = useRef<WebSocket | null>(null)

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
    getUploadingFiles()

    return () => {
      ws.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}>
      {children}
      <UploadingPopup />
    </motion.div>
  )
}
