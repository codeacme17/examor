import { NextResponse } from 'next/server'
import { Chain } from '@/langchain/chain'
import { PureLlm } from '@/langchain/llm'
import { markdownSpitter } from '@/langchain/loader'
import { fileHandler, profileHandler } from '@/lib/db-handler'
import { deleteTempDir, readFileContent, uploadFile } from '@/lib/file-handler'

import type { Document } from 'langchain/document'
import type { QuestionType } from '@/types/global'

export const POST = async (req: Request) => {
  try {
    const profile = await profileHandler.getFirst()

    try {
      const pureLlm = new PureLlm(profile)
      await pureLlm.checkLlmApiState()
    } catch (err) {
      console.log('Error: ', err)
      return new NextResponse(err as string, { status: 500 })
    }

    const formData = await req.formData()
    const questionType = formData.get('type') as QuestionType
    const noteId = formData.get('noteId') as string
    const files = formData.getAll('files') as File[]

    const documentsObj: Record<string, Document[]> = {}

    for (const file of files) {
      const isExisted = await fileHandler.checkExist(noteId, file.name)
      if (isExisted) throw new Error(`File ${file.name} already exists`)

      const filePath = await uploadFile(file)
      const fileName = file.name
      const content = await readFileContent(filePath)
      const docs = await markdownSpitter(content)
      documentsObj[fileName] = docs
    }

    await deleteTempDir()

    for (const file of files) {
      const { id: fileId } = await fileHandler.create(noteId, file)

      for (const fileName in documentsObj) {
        if (Object.prototype.hasOwnProperty.call(documentsObj, fileName)) {
          const documents = documentsObj[fileName]
          const chain = new Chain(
            profile!,
            files.length,
            noteId,
            fileId,
            fileName,
            questionType,
            'generate'
          )

          chain.generateQuestions(documents)
        }
      }
    }

    return new NextResponse('success')
  } catch (err) {
    console.log('Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
