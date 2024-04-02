import { ProfileType } from '@/types/global'
import { NextResponse } from 'next/server'
import { profileHandler } from '@/lib/db-handler/index'

export const PATCH = async (req: Request) => {
  try {
    const body: ProfileType = await req.json()
    const profile = await profileHandler.update(body)

    return NextResponse.json(profile)
  } catch (err) {
    console.log('[Examor PATCH] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
