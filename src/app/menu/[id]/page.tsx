import { GetServerSideProps } from 'next'
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

//add generate params of an array from GET /api/menu
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`)
  const data = await res.json()
console.log(data)
  // Return an array of possible dynamic params
  return data.map((item: { id: string }) => ({
    id: item.id,  // This will generate static pages for each menu item
  }))
}