'use client'

import { motion, AnimatePresence } from 'framer-motion'

export const TransitionAnimate = ({
  children,
  duration = 0.3,
  initial: { opacity: initialOpacity = 0, x: initialX = 20 } = {},
  animate: { opacity: animateOpacity = 1, x: animateX = 0 } = {},
  exit: { opacity: exitOpacity = 0, x: exitX = -20 } = {},
}: {
  children: React.ReactNode
  duration?: number
  initial?: { opacity?: number; x?: number }
  animate?: { opacity?: number; x?: number }
  exit?: { opacity?: number; x?: number }
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: initialOpacity, x: initialX }}
        animate={{ opacity: animateOpacity, x: animateX }}
        exit={{ opacity: exitOpacity, x: exitX }}
        transition={{ ease: 'easeInOut', duration: duration }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
