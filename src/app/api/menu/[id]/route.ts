export const dynamic = "force-static"; // Forces the route to be static
export const revalidate = 60; // Set revalidation time (optional, in seconds)

import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config"; 

// GET /api/menu/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const menuRef = doc(db, "menuItems", (await params).id)
    const menuItem = await getDoc(menuRef)

    if (!menuItem.exists()) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 })
    }

    return NextResponse.json(menuItem.data());
  } catch (error) {
    console.error("Error in GET /api/menu/[id]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
