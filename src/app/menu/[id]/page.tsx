'use server'
import MenuItemListComponent from '@/app/menu/[id]/MenuItemListComponent'
import { MenuItemDraft } from '@/models/Model'
import Link from 'next/link'

type PageProps = { params: Promise<{ id: string }> }

async function getMenuItem(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}`, {
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
    <div className='mx-80'>
      <p ><Link href='/' className='mx-2'>Home</Link>/<Link href='/menu' className='mx-2'>All products</Link>/<Link href={`${id}`} className='mx-2'>{menuItem.name}</Link></p>
      <MenuItemListComponent menuItem={menuItem} id={id}/>
    </div>
  )
}

export default Page
