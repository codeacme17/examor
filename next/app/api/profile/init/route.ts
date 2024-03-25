import { prismadb } from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    let profile = await prismadb.tProfile.findFirst()
    console.log(profile)

    if (profile) profile
    else
      profile = await prismadb.tProfile.create({
        data: {
          id: 1,
          questionAmount: 12,
          currentModel: 'openai',
          currentRole: 'examiner',
          openaiModel: 'gpt-3.5-turbo',
          openaiBase: 'https://api.openai.com',
        },
      })

    return NextResponse.json(profile)
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
