export const dynamic = 'force-dynamic'

import { db } from '@/lib/firebase/config'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { NextResponse } from 'next/server'

// GET /api/menu
export async function GET(request: Request) {
  try {
    const docRef = collection(db, 'menuItems')
    const docSnap = await getDocs(docRef)
    if (docSnap.empty) {
      return NextResponse.json(
        { error: 'Menu items not found' },
        { status: 404 }
      )
    }
    const menuItem = docSnap
    console.log('menu api', menuItem)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error in GET /api/menu', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST /api/menu
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, description, price, imageUrl } = data

    const docRef = await addDoc(collection(db, 'menuItems'), {
      name,
      description,
      price,
      imageUrl,
    })

    return NextResponse.json(
      {
        id: docRef.id,
        name,
        description,
        price,
        imageUrl,
        status: 'created',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/menu', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE /api/menu/[id]
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id
    if (!id) {
      return NextResponse.json({ message: 'Id not found' }, { status: 404 })
    }

    await deleteDoc(doc(db, 'menuItems', id))

    return NextResponse.json(
      { message: 'Deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/menu/[id]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
