import { QuestionType } from '@/types/global'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const formData = await req.formData()

  const name = formData.get('name') as string
  const questionType = formData.get('type') as QuestionType
  const files = formData.getAll('files') as File[]

  return new NextResponse('success')
}
