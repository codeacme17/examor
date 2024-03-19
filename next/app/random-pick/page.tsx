import { QABlock } from '@/components/qa-block'
import { Question } from '../note/[id]/_components/question-table'

const question: Question = {
  id: '1',
  question: 'What is your name?',
  answer: 'My name is John Doe',
  status: 'New',
  created_at: '2024-02-02',
  updated_at: '2024-02-02',
  question_type: 'short',
  designated_role: 'examiner',
}

const RandomPick = () => {
  return (
    <section>
      <QABlock
        noteName="Vuejs"
        question={question.question}
        role={question.designated_role}
        questionType={question.question_type}
        type="random"
        id={question.id}
      />
    </section>
  )
}

export default RandomPick
