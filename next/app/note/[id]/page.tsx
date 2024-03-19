'use client'

import { useState } from 'react'
import { NoteHeader } from './_components/note-header'
import { Question, QuestionTable } from './_components/question-table'
import { QABlock } from '@/components/qa-block'
import { TransitionAnimate } from '@/components/transition-animate'

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
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
    question_type: 'short',
    designated_role: 'examiner',
  },
  {
    id: '2',
    question: 'What is your age?',
    answer: 'I am 20 years old',
    status: 'New',
    created_at: '2024-02-02',
    updated_at: '2024-02-02',
    question_type: 'single',
    designated_role: 'teacher',
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
              onBack={() => {
                setTab('table')
              }}
              type="normal"
              question={currentQuestion.question}
              role={currentQuestion.designated_role}
              questionType={currentQuestion.question_type}
              id={currentQuestion.id}
              noteName={note.name}
            />
          </TransitionAnimate>
        )
      )}
    </section>
  )
}

export default NotePage
