import { NextResponse } from 'next/server'
import { noteHandler } from '@/lib/db-handler'
import { deleteTempDir, readFileContent, uploadFile } from '@/lib/file-handler'
import { markdownSpitter } from '@/langchain/loader/markdown'

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const type = formData.get('type')
    const files = formData.getAll('files') as File[]

    if (await noteHandler.isExist(name)) throw new Error('Note already exists')

    for (const file of files) {
      const filePath = await uploadFile(file)
      const content = await readFileContent(filePath)
      const docs = await markdownSpitter(content)

      return
    }
    await deleteTempDir()

    const { id } = await noteHandler.create({ name })

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
