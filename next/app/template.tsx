'use client'

import { motion } from 'framer-motion'
import { UploadingPopup } from '@/components/share/uploading-popup'

export default function Template({ children }: { children: React.ReactNode }) {
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
