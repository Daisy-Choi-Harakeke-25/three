export const dynamic = "force-static"; // Forces the route to be static
export const revalidate = 60; // Set revalidation time (optional, in seconds)
import MenuItemListComponent from '@/app/menu/[id]/MenuItemListComponent'
import { MenuItemDraft } from '@/models/Model'
import Link from 'next/link'

type PageProps = { params: Promise<{ id: string }> }

async function getMenuItem(id: string) {
  const res = await fetch(`http://localhost:3000/api/menu/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Failed to fetch menu item')
  }
  return res.json()
}

const Page = async ({ params }: PageProps) => {
  const id = (await params).id
  if(!id) return 
  const menuItem: MenuItemDraft = await getMenuItem(id)
  if (!menuItem) return <p>Loading...</p>
  return (
    <div className="mx-80">
      <p>
        <Link href="/" className="mx-2">
          Home
        </Link>
        /
        <Link href="/menu" className="mx-2">
          All products
        </Link>
        /
        <Link href={`${id}`} className="mx-2">
          {menuItem.name}
        </Link>
      </p>
      <MenuItemListComponent menuItem={menuItem} id={id} />
    </div>
  )
}

export default Page

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`);
    if (!res.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const menuItems = await res.json();
console.log(menuItems)
    // Ensure the fetched data structure matches what you expect
    return menuItems.map((item: { id: string }) => ({
      params: { id: item.id },
    }));
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];  // Return an empty array if fetching fails
  }
}