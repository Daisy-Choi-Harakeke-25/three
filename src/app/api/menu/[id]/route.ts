export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

// GET /api/menu/[id]
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const {id} = await context.params
    const docRef = doc(db, 'menuItems', id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: 'Menu items not found' },
        { status: 404 }
      )
    }
    const menuItem = { id: docSnap.id, ...docSnap.data() }
    console.log('menu api', menuItem)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error in GET /api/menu/[id]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
