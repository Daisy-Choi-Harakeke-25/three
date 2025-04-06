'use client'
import { MenuItemDraft } from '@/models/Model'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
import { useShallow } from 'zustand/shallow'

type MenuItemListComponentProps = {
  menuItem: MenuItemDraft
  id: string
}

const MenuItemListComponent = ({
  menuItem,
  id,
}: MenuItemListComponentProps) => {
  const { count, addCart, removeCart } = useCart(
    useShallow((state) => ({
      count: state.count,
      addCart: state.addCart,
      removeCart: state.removeCart,
    }))
  )
  // const addCart = useCart((state) => state.addCart)
  const totalItem = count
  return (
    <div className="flex flex-col mt-10 gap-8">
      <div className="flex flex-row gap-8">
        <Image
          src={menuItem.url}
          alt={menuItem.name}
          width={400}
          height={400}
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-[30px] font-bold">{menuItem.name}</h1>
          <h3 className='text-[20px]'>${menuItem.price.toFixed(2)}</h3>
          <div className="flex flex-col">
            <p>Quantity *</p>
            <div className="flex flex-row items-center justify-between w-30 h-10 p-5 border-2 border-black text-[20px]">
              <p onClick={() => removeCart(id)} className='cursor-pointer'>-</p>
              <p>{totalItem}</p>
              <p
                onClick={() =>
                  addCart({
                    id: id,
                    name: menuItem.name,
                    price: menuItem.price,
                    imageUrl: menuItem.url,
                    quantity: 1,
                  })
                }
                className='cursor-pointer'
              >
                +
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              addCart({
                id: id,
                name: menuItem.name,
                price: menuItem.price,
                imageUrl: menuItem.url,
                quantity: 1,
              })
            }
            className='cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105'
          >
            ADD TO CART
          </button>
          <button className='cursor-pointer border-2 border-[#009B64] py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-[#009B64] hover:text-white hover:border-[#007a48] transform hover:scale-105'>Buy now</button>
        </div>
      </div>

<div className='gap-4'>
      <p className='text-red-500'>Orders require 48 hours' notice. CBD Pickup Available Upon Request</p>
      <p>{menuItem.description}</p>
      </div>
    </div>
  )
}

export default MenuItemListComponent
