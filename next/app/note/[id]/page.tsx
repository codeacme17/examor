'use client'

import { useState } from 'react'
import { NoteHeader } from './_components/note-header'
import { QuestionTable } from './_components/question-table'
import { QABlock } from '@/components/qa-block'
import { TransitionAnimate } from '@/components/transition-animate'
import { Question } from '@/types/global'

const note = {
  id: '1',
  name: 'Vuejs',
  icon: 'mdi-vuejs',
  upload_date: '2024-02-02',
}

const questions: Question[] = [
  {
    id: '1',
    question: 'What is your name?',
    answer: 'My name is John Doe',
    status: 'New',
    createdDate: '2024-02-02',
    updatedDate: '2024-02-02',
    questionType: 'short',
    roleType: 'examiner',
  },
  {
    id: '2',
    question: 'What is your age?',
    answer: 'I am 20 years old',
    status: 'New',
    createdDate: '2024-02-02',
    updatedDate: '2024-02-02',
    questionType: 'single',
    roleType: 'teacher',
  },
]

const NotePage = () => {
  const [tab, setTab] = useState<'table' | 'QA'>('table')
  const [currentQuestion, setCurrentQuestion] =
    useState<Question | null>(null)

  const handleRowClick = (question: Question) => {
    setTab('QA')
    setCurrentQuestion(question)
  }

  const handleClickBack = () => {
    if (tab !== 'QA') return
    setTab('table')
  }

  return (
    <section>
      <NoteHeader note={note} />
      {tab === 'table' ? (
        <TransitionAnimate key={tab} initial={{ x: -20 }}>
          <QuestionTable
            questions={questions}
            onRowClick={handleRowClick}
          />
        </TransitionAnimate>
      ) : (
        currentQuestion && (
          <TransitionAnimate key={tab}>
            <QABlock
              onBack={handleClickBack}
              type="normal"
              {...currentQuestion}
            />
          </TransitionAnimate>
        )
      )}
    </section>
  )
}

export default NotePage
