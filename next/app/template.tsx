'use client'

import { motion } from 'framer-motion'
import { useProfileStore } from '@/store'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  const profile = useProfileStore()

  const fetchProfile = async () => {
    const res = await fetch('/api/profile/init', {
      method: 'POST',
    })

    if (res.ok) {
      const data = await res.json()
      profile.setProfile(data)
    } else {
      console.log('Failed to fetch profile')
    }
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}>
      {children}
    </motion.div>
  )
}
