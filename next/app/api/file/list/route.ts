import { fileHandler } from '@/lib/db-handler'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const urlQuery = new URLSearchParams(req.url?.split('?')[1])
    const noteId = urlQuery.get('noteId') || ''
    const files = await fileHandler.getFilesByNoteId(noteId)

    return new NextResponse(
      JSON.stringify({
        files,
      })
    )
  } catch (error) {
    console.log('[Examor GET] Error: ', error)
    return new NextResponse(error as string, { status: 500 })
  }
}
