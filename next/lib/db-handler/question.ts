import { prismadb } from '@/lib/db-handler'
import { QuestionType } from '@/types/global'

const create = (
  documentId: string,
  questionType: QuestionType,
  content: string,
  designatedRole: string
) => {
  const question = prismadb.tQuestion.create({
    data: {
      documentId,
      questionType,
      content,
      designatedRole,
    },
  })

  return question
}

export const questionHandler = { create }
