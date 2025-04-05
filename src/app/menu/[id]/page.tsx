'use server'
import { MenuItemDraft } from '@/models/Model'
import Image from 'next/image'

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
    <div>
      <Image src={menuItem.url} alt={menuItem.name} width={500} height={500} />
      <h1>{menuItem.name}</h1>
      <h3>{menuItem.price}</h3>
      <p>{menuItem.description}</p>
      <button>Add to cart</button>
      <button>Buy now</button>
    </div>
  )
}

export default Page
