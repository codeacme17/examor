import { NextResponse } from 'next/server'
import { noteHandler } from '@/lib/db-handler'
import { deleteTempDir, uploadFile } from '@/lib/file-handler'

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    const name = formData.get('name')
    const type = formData.get('type')
    const files = formData.getAll('files') as File[]

    const { id } = await noteHandler.create({ name })

    for (const file of files) await uploadFile(id, file)
    await deleteTempDir()

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
