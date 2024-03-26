import { forwardRef, useEffect } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'

interface LoadButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading: boolean
  loadingLabel?: string
}

export const LoadButton = forwardRef<HTMLButtonElement, LoadButtonProps>(
  (props, ref) => {
    const { loading, loadingLabel, children, ...rest } = props

    return loading ? (
      <Button disabled {...rest} ref={ref}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {loadingLabel || 'Loading'}
      </Button>
    ) : (
      <Button {...rest} ref={ref}>
        {children}
      </Button>
    )
  }
)

LoadButton.displayName = 'LoadButton'
