import { NextResponse } from 'next/server'
import { profileHandler } from '@/lib/db-handler'
import { exec } from 'child_process'

export async function POST() {
  try {
    const process = exec('python3 python/test.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
      }

      try {
        const output = JSON.parse(stdout)
        console.log(output)
      } catch (e) {}
    })

    process.stdin!.write(JSON.stringify('Hello World'))
    process.stdin!.end()

    const profile = await profileHandler.init()
    return NextResponse.json(profile)
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
