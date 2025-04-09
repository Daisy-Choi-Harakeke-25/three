export const dynamic = "force-static"; // Forces the route to be static
export const revalidate = 60; // Set revalidation time (optional, in seconds)

import { db } from "@/lib/firebase/config";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET /api/menu
export async function GET(
  request: Request
) {
  try {
    console.log('working?')
    const menuRef = collection(db, "menuItems")
    const menuSnap = await getDocs(menuRef)
    if (menuSnap.empty) {
      return NextResponse.json({ error: "Menu items not found" }, { status: 404 })
    }
    const menuItems = menuSnap.docs.map(doc => ({
      id: doc.id,  
      ...doc.data()
    }))
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error in GET /api/menu", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// POST /api/menu
export async function POST(
  request: Request
) {
  try {
    const data = await request.json()
    const {name, description, price, imageUrl } = data
    const docRef = await addDoc(collection(db, 'menuItems'), {
      name, description, price, imageUrl
    })
    return NextResponse.json({
      id: docRef.id,
      name,
      description,
      price,
      imageUrl,
      status: 'created',
    }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/menu", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE /api/menu/:id
export async function DELETE(
  request: Request
) {
  try {
    const { id } = await request.json()
    if(!id || typeof id !== 'string') return NextResponse.json({ message: 'Id not found' },{ status: 404 })
    await deleteDoc(doc(db, 'menuItems', id))
    return NextResponse.json({ message: 'Deleted successfully' },{ status: 200 })
  } catch (error) {
    console.error("Error in DELETE", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}