import { PromptType, QuestionType, RoleType } from '@/types/global'
import { PromptTemplate } from '@langchain/core/prompts'
import { getQuestionGenerateEn } from './en/question-generate'

export const choicePrompt = (
  promptType: PromptType,
  roleType: RoleType,
  questionType: QuestionType
): PromptTemplate => {
  let prompt: PromptTemplate | null = null

  if (promptType === 'generate')
    prompt = getQuestionGenerateEn(roleType, questionType)

  return prompt!
}
