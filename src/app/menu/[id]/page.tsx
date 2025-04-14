export const dynamic = 'force-dynamic'
export const revalidate = 60 // Set revalidation time (optional, in seconds)
import MenuItemListComponent from '@/app/menu/[id]/MenuItemListComponent'
import { MenuItem } from '@/models/Model'
import Link from 'next/link'
import { db } from '@/lib/firebase/config'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { headers } from 'next/headers'

type PageProps = {
  params: { id: string }
}

async function getMenuItem(id: string): Promise<MenuItem | null> {
  try {
    const menuRef = doc(db, 'menuItems', id)
    const menuSnap = await getDoc(menuRef)

    if (!menuSnap.exists()) {
      throw new Error('Menu item not found')
    }

    const data = menuSnap.data()
    return {
      id: menuSnap.id,
      name: data.name,
      description: data.description,
      price: data.price,
      url: data.url || data.imageUrl, // Handle both possible field names
    }
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return null
  }
}

const Page = async ({ params }: PageProps) => {
  const { id } = params
  if (!id) return <p>Item does not exist.</p>

  const menuItem = await getMenuItem(id)
  if (!menuItem) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to load menu item</p>
        <Link
          href="/menu"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Return to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/menu" className="hover:text-gray-600">
          All products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-500">{menuItem.name}</span>
      </nav>
      <MenuItemListComponent menuItem={menuItem} id={id} />
    </div>
  )
}

export default Page

export async function generateStaticParams() {
  try {
    const menuRef = collection(db, 'menuItems')
    const menuSnap = await getDocs(menuRef)

    if (menuSnap.empty) {
      return []
    }

    return menuSnap.docs.map((doc) => ({
      id: doc.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
