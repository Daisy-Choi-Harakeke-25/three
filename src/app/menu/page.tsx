'use client'

import { auth, db } from '@/lib/firebase/config'
import type { MenuItem } from '@/models/Model'
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

  const handleClick = (item: MenuItem) => {
    if (!item.id) {
      console.error('Item ID is missing')
      return
    }
    try {
      router.push(`/menu/${item.id}`)
    } catch (error) {
      console.error('Error loading menu item', error)
    }
  }

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
                onClick={() => handleClick(item)}
              />
            </div>
            <h2 className="text-lg font-semibold mt-2" onClick={() => handleClick(item)}>{item.name}</h2>
            <p className="text-green-600 font-bold mt-1">${item.price}</p>
            <button>ADD TO CART</button>

            {user && <button onClick={() => handleDelete(item.id)}>X</button>}
          </div>
        ))}
      </div>
      <p>{user && <Link href="/menu/menuAdmin">Upload Menu</Link>}</p>
    </div>
  )
}

export default Menu
