import { RoleType } from '@/types/global'

interface RoleSwitchProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  roleType: RoleType
}

export const RoleTypeSwitch = (props: RoleSwitchProps) => {
  const { roleType, ...rest } = props

  return (
    <span {...rest}>
      {roleType === 'examiner' && '🥷'}
      {roleType === 'teacher' && '👩‍🏫'}
      {roleType === 'interviewer' && '👨‍💻'}
    </span>
  )
}
