'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [show, setShow] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      setShow(!show)
    }

    return (
      <div className="relative">
        <Input {...props} ref={ref} type={show ? 'text' : 'password'} />
        <Button
          className="absolute right-2 top-0"
          variant={'ghost'}
          size={'icon'}
          onClick={handleClick}>
          {show ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
