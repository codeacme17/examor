import { useTheme } from 'next-themes'
import Image from 'next/image'

interface LogoProps {
  isCollapsed: boolean
}

export const Logo = ({ isCollapsed }: LogoProps) => {
  const { theme } = useTheme()

  return (
    <div className="w-full flex items-center select-none mb-2">
      <Image
        src={theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg'}
        alt="logo"
        className="rounded-md object-cover"
        width={55}
        height={55}
      />

      {!isCollapsed && (
        <div className="ml-3 flex flex-col">
          <span className="font-bold text-xl">examor</span>
          <span className="text-muted-foreground text-sm">
            self-improvement
          </span>
        </div>
      )}
    </div>
  )
}
