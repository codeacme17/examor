import { NextResponse } from 'next/server'
import { markdownSpitter } from '@/langchain/loader'
import { Chain } from '@/langchain/chain'
import { PureLlm } from '@/langchain/llm'
import { fileHandler, noteHandler, profileHandler } from '@/lib/db-handler'
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

    const name = formData.get('name') as string
    const questionType = formData.get('type') as QuestionType
    const files = formData.getAll('files') as File[]

    if (await noteHandler.isExist(name)) throw new Error('Note already exists')

    const documentsObj: Record<string, Document[]> = {}

    for (const file of files) {
      const filePath = await uploadFile(file)
      const fileName = file.name
      const content = await readFileContent(filePath)
      const docs = await markdownSpitter(content)
      documentsObj[fileName] = docs
    }

    await deleteTempDir()

    const { id: noteId } = await noteHandler.create({ name })

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

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
