import { ProfileType } from '@/types/global'
import { NextResponse } from 'next/server'
import { prismadb } from '@/lib/prismadb'

export const PATCH = async (req: Request) => {
  try {
    const body: ProfileType = await req.json()
    const { id, ...rest } = body

    if (!id) throw new Error('Something went wrong! Please reload page.')

    const profile = await prismadb.tProfile.update({
      where: { id },
      data: rest,
    })

    return NextResponse.json(profile)
  } catch (err) {
    console.log('[Examor PATCH] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
