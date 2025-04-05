'use client'
import { MenuItemDraft } from '@/models/Model'
import useCart from '@/stores/cartStore'
import Image from 'next/image'

type MenuItemListComponentProps = {
  menuItem: MenuItemDraft
  id: string
}

const MenuItemListComponent = ({ menuItem, id }: MenuItemListComponentProps) => {
  const addCart = useCart((state) => state.addCart)

  return (
    <div>
      <Image src={menuItem.url} alt={menuItem.name} width={500} height={500} />
      <h1>{menuItem.name}</h1>
      <h3>{menuItem.price}</h3>
      <p>{menuItem.description}</p>
      <button onClick={() => addCart({ id: id, name: menuItem.name, price: menuItem.price, imageUrl: menuItem.url, quantity: 1 })}>
        ADD TO CART
      </button>
      <button>Buy now</button>
    </div>
  )
}

export default MenuItemListComponent
