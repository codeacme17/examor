'use client'

import { useRef } from 'react'
import { Header } from '@/components/header'
import { QuestionBlock } from '@/components/question-block'

const RandomPick = () => {
  const questionBlockRef = useRef(null)

  return (
    <section>
      <Header
        title="Random Pick"
        subTitle="You can pick random question here"
      />

      <QuestionBlock
        type="normal"
        id="1"
        question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quam voluptates accusantium? Maiores dolore sint alias. Est placeat quo consectetur. Iste doloremque earum quaerat ipsa culpa nobis adipisci quia minus."
        role="examiner"
      />
    </section>
  )
}

export default RandomPick
