'use server'
import { MenuItemDraft } from "@/models/Model"
import Image from 'next/image'

type PageProps = {
  params: {
    id: string
  }
}

async function getMenuItem (id: string) {
  const res = await fetch(`http://localhost:3000/api/menu/${id}`)
  if(!res.ok) {
    throw new Error('Failed to fetch menu item')
  }
  return res.json()
}

const Page = async ({ params }: PageProps) => {
  const menuItem: MenuItemDraft = await getMenuItem(params.id)
  if(!menuItem) return <p>Loading...</p>
  return(
    <div>
      <Image
                      src={menuItem.url}
                      alt={menuItem.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
      <h1>{menuItem.name}</h1>
      <h3>{menuItem.price}</h3>
      <p>{menuItem.description}</p>
    </div>
  )

}

export default Page