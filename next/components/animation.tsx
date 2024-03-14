'use client'

import { motion } from 'framer-motion'

export const Animation = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.5 }}>
      {children}
    </motion.div>
  )
}
