import { QABlock } from '@/components/qa-block'
import { Question } from '@/types/global'

const question: Question = {
  id: '1',
  question: 'What is your name?',
  answer: 'My name is John Doe',
  status: 'New',
  createdDate: '2024-02-02',
  updatedDate: '2024-02-02',
  questionType: 'short',
  roleType: 'examiner',
}

const RandomPick = () => {
  return (
    <section>
      <QABlock noteName="Vuejs" type="random" {...question} />
    </section>
  )
}

export default RandomPick
