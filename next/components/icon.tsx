import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { cn } from '@/lib/utils'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return (
    <LucideIcon
      {...props}
      className={cn('w-4 h-4', props.className)}
    />
  )
}
