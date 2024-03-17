import { cn } from '@/lib/utils'

interface MdiIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string
  size?: string
  color?: string
}

export const MdiIcon = (props: MdiIconProps) => {
  const {
    icon,
    size = '1.3rem',
    color = 'currentColor',
    style,
    className,
    ...rest
  } = props

  return (
    <span
      style={{ fontSize: size, ...style }}
      className={cn('mdi', `${icon} fill-[${color}]`, className)}
      {...rest}
    />
  )
}
