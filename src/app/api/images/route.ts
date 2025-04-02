'use server'

import { getImage } from "../../../../db/main"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    if (req.method === 'GET') {
      const searchParams = req.nextUrl.searchParams
      const id = searchParams.get('id')
      if (typeof id !== 'string') {
        return NextResponse.json(
          { message: 'Invalid id parameter' },
          { status: 400 }
        )
      }
      const image = await getImage(+id)
      return NextResponse.json(image, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json(
      { message: `${error}: Can not load the image` },
      { status: 400 }
    )
  }
}
