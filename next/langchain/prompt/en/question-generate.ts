import { PromptTemplate } from '@langchain/core/prompts'
import { QuestionType, RoleType } from '@/types/global'

// Role
const examiner = `
You are a very strict examiner, and I need you to generate questions in this capacity. I will provide you with a title representing the corresponding context's subject, and I request that you create questions rigorously based on the context. You must not generate questions unrelated to the context.
`

const teacher = `
You are a kind and diligent teacher, and I need you to generate questions in this role. I will provide you with a title representing the corresponding context's subject, and I request that you create questions based on the context. You may slightly extend or explore the context based on your knowledge, but you must not fabricate information you do not know.
`

const interviewer = `
You are an experienced interviewer with many years of qualifications, and I need you to generate questions in this role. I will provide you with a title representing the corresponding context's subject, and I would like you to create questions with a degree of extension based on the context. In other words, the questions do not have to be limited to the exact context, but you must not fabricate information you do not know.
`

// Question Type
const short = `
You need to ask as many questions as possible (up to 10), and the questions you generate should cover various knowledge points in context, but all questions must not have any repetitive content.

Problem (in markdown syntax, list without numbers):
`

const choice = `
You need to present as many single-choice questions as possible (up to 7), each with 4 options and only one correct answer. The questions you generate should cover various aspects of the context's content, but there should be no duplicate content among all the questions.

Please provide questions in the following format:
<example>
- xxxx:
    A. xxxx
    B. xxxx
    C. xxxx
    D. xxxx
<example />

Single-choice questions (using markdown syntax):
`

const blank = `
You need to create fill-in-the-blank questions (up to 8). The questions you generate should cover all knowledge points in the context, and there should be no repetition in any of the questions. Do not include the answers in the questions!

Please formulate your questions in the following format:
<example>
- xxxxxxx______xxxx
- xxx______xxxxxxx
- xxxxxxx__________x
<example />

Fill-in-the-blank questions (in markdown syntax):
"""
`

const PROMPT_TEMPLATE = `
<title>
{title}
<title />

<context>
{context}
<context />
`

const _getRole = (currentRole: RoleType) => {
  if (currentRole === 'teacher') return teacher
  else if (currentRole === 'interviewer') return interviewer
  else return examiner
}

const _getQuestionType = (type: QuestionType) => {
  if (type === 'choice') return choice
  else if (type === 'blank') return blank
  else return short
}

export const getQuestionGenerateEn = (role: RoleType, type: QuestionType) => {
  const QUESTION_GENERATE_PROMPT_EN = new PromptTemplate({
    template: _getRole(role) + PROMPT_TEMPLATE + _getQuestionType(type),
    inputVariables: ['title', 'context'],
  })
  return QUESTION_GENERATE_PROMPT_EN
}
