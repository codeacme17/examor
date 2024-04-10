import { noteHandler } from '@/lib/db-handler'
import { TNote } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const PATCH = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.pathname.split('/').pop() as string
    const body: TNote = await req.json()
    const res = await noteHandler.update(id, body)
    return new NextResponse(JSON.stringify(res))
  } catch (error) {
    console.log('[Examor PATCH] Error: ', error)
    return new NextResponse(error as string, { status: 500 })
  }
}
