import { QuestionType } from '@/types/global'

interface QuestionTypeSwitchProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  questionType: QuestionType
}

export const QuestionTypeSwitch = (props: QuestionTypeSwitchProps) => {
  const { questionType, ...rest } = props

  return (
    <span {...rest}>
      {questionType === 'short' && '📝'}
      {questionType === 'choice' && '🔠'}
      {questionType === 'blank' && '⬜'}
    </span>
  )
}
