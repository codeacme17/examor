import { NextResponse } from 'next/server'
import { documentHandler, fileHandler, noteHandler } from '@/lib/db-handler'
import { deleteTempDir, readFileContent, uploadFile } from '@/lib/file-handler'
import { markdownSpitter } from '@/langchain/loader/markdown'

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const type = formData.get('type')
    const files = formData.getAll('files') as File[]
    const documents: { fileName: string; content: string }[] = []

    if (await noteHandler.isExist(name)) throw new Error('Note already exists')

    for (const file of files) {
      const filePath = await uploadFile(file)
      const content = await readFileContent(filePath)
      const docs = await markdownSpitter(content)

      for (const doc of docs) {
        documents.push({ fileName: file.name, content: doc.pageContent })
      }
    }

    await deleteTempDir()

    const { id: nodeId } = await noteHandler.create({ name })

    for (const file of files) {
      const { id: fileId } = await fileHandler.create(nodeId, file)

      for (const document of documents) {
        if (document.fileName === file.name) {
          const { fileName, content } = document
          const { id: documentId } = await documentHandler.create(
            nodeId,
            fileId,
            fileName,
            content
          )
        }
      }
    }

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
