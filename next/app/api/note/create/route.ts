import { NextResponse } from 'next/server'
import { Document } from 'langchain/document'
import {
  documentHandler,
  fileHandler,
  noteHandler,
  profileHandler,
} from '@/lib/db-handler'
import { deleteTempDir, readFileContent, uploadFile } from '@/lib/file-handler'
import { markdownSpitter } from '@/langchain/loader'
import { Chain } from '@/langchain/chain'
import { QuestionType } from '@/types/global'

export const POST = async (req: Request) => {
  try {
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

    const profile = await profileHandler.getFirst()
    const { id: nodeId } = await noteHandler.create({ name })

    for (const file of files) {
      const { id: fileId } = await fileHandler.create(nodeId, file)

      for (const fileName in documentsObj) {
        if (Object.prototype.hasOwnProperty.call(documentsObj, fileName)) {
          const documents = documentsObj[fileName]
          const chain = new Chain(
            profile!,
            nodeId,
            fileId,
            fileName,
            questionType,
            'generate'
          )

          await chain.generateQuestions(documents)
        }
      }

      await fileHandler.update(fileId, { isUploading: '0' })
    }

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
