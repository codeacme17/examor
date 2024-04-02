import { NextResponse } from 'next/server'
import { profileHandler } from '@/lib/db-handler'

export async function POST() {
  try {
    const profile = await profileHandler.init()
    return NextResponse.json(profile)
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
