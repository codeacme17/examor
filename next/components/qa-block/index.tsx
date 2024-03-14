import { QuestionBlock } from './question-block'
import { AnswerBlock } from './answer-block'

export const QABlock = () => {
  return (
    <section>
      <QuestionBlock
        type="random"
        id="1"
        noteName="Vue.js"
        question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quam voluptates accusantium? Maiores dolore sint alias. Est placeat quo consectetur. Iste doloremque earum quaerat ipsa culpa nobis adipisci quia minus."
        role="examiner"
      />

      <AnswerBlock />
    </section>
  )
}
