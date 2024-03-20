export type RoleType = 'examiner' | 'teacher' | 'interviewer'

export type QuestionType = 'short' | 'blank' | 'single'

export type ModelType = 'openai' | 'azure' | 'anthropic'

export interface Question {
  id: string
  question: string
  roleType: RoleType
  questionType?: QuestionType
  answer?: string
  status?: string
  createdDate?: string
  updatedDate?: string
}
