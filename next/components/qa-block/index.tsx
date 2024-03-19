import { QuestionBlock } from './question-block'
import { AnswerBlock } from './answer-block'
import { QuestionType, Role } from '@/types/global'

interface QABlockProps {
  noteName: string
  question: string
  role: Role
  questionType: QuestionType
  type: 'random' | 'normal'
  id: string
  onPick?: () => void
  onBack?: () => void
}

export const QABlock = (props: QABlockProps) => {
  const { noteName, question, role, type, id } = props

  return (
    <section>
      <QuestionBlock
        type={type}
        id={id}
        noteName={noteName}
        question={question}
        role={role}
        onClickPick={props.onPick}
        onClickBack={props.onBack}
      />

      <AnswerBlock />
    </section>
  )
}
