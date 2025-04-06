'use client'

import { auth, db } from '@/lib/firebase/config'
import type { MenuItem } from '@/models/Model'
import useCart from '@/stores/cartStore'
import { deleteDoc, doc } from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const Menu = () => {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const countItems = menuItems.length
  useEffect(() => {
    const fetchMenuItems = async () => {
      const res = await fetch('/api/menu')
      const data = await res.json()
      setMenuItems(data)
    }
    fetchMenuItems()
  }, [])

  
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      router.push('/menu')
    } catch (error) {
      console.error('Error adding menu item', error)
    }
  }

  const handleClick = (id: string) => {
    if (!id) {
      console.error('Item ID is missing')
      return
    }
    try {
      router.push(`/menu/${id}`)
    } catch (error) {
      console.error('Error loading menu item', error)
    }
  }

  const addItemToCart = useCart((state) => state.addItemToCart)

  return (
    <div className="p-4">
      <p>{countItems} products</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-lg">
            <div className="relative w-full h-[300px]">
              <Image
                src={item.url}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                onClick={() => handleClick(item.id)}
              />
            </div>
            <h2 className="text-lg font-semibold mt-2" onClick={() => handleClick(item.id)}>{item.name}</h2>
            <p className="text-green-600 font-bold mt-1">${item.price}</p>
            <button onClick={() => addItemToCart({id: item.id, name: item.name, price: item.price, imageUrl: item.url, quantity: 1})}>ADD TO CART</button>

            {user && <button onClick={() => handleDelete(item.id)}>X</button>}
          </div>
        ))}
      </div>
      <p>{user && <Link href="/menu/menuAdmin">Upload Menu</Link>}</p>
    </div>
  )
}

export default Menu
