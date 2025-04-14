export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

// GET /api/menu/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      )
    }

    const menuRef = doc(db, 'menuItems', id)
    const menuItem = await getDoc(menuRef)

    if (!menuItem.exists()) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: menuItem.id,
      ...menuItem.data(),
    })
  } catch (error) {
    console.error('Error in GET /api/menu/[id]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
