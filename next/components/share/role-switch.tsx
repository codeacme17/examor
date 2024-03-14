import { Role } from '@/types/global'

interface RoleSwitchProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  role: Role
}

export const RoleSwitch = (props: RoleSwitchProps) => {
  const { role, ...rest } = props

  return (
    <span {...rest}>
      {role === 'examiner' && '🥷'}
      {role === 'teacher' && '👩‍🏫'}
      {role === 'interviewer' && '👨‍💻'}
    </span>
  )
}
