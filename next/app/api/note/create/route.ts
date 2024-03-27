import { NextResponse } from 'next/server'

export const POST = (req: Request) => {
  console.log(req)

  return NextResponse.json('success')
}
