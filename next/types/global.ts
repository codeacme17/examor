import { z } from 'zod'
import { profileFormSchema } from '@/schema/profile'

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

export type ProfileType = z.infer<typeof profileFormSchema> & { id?: number }
