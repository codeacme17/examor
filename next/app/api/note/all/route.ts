import { noteHandler } from '@/lib/db-handler'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const notes = await noteHandler.getAll()
    return new NextResponse(JSON.stringify(notes))
  } catch (error) {
    console.log('[Examor GET] Error: ', error)
    return new NextResponse(error as string, { status: 500 })
  }
}
