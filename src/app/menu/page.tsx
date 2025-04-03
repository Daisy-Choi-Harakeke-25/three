'use client'

import { db } from '@/lib/firebase/config'
import type { MenuItem } from '@/models/Model'
import { collection, getDocs } from 'firebase/firestore'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'
import Link from 'next/link'

const Menu = () => {
  const [user] = useAuthState(auth)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'))
        const items: MenuItem[] = querySnapshot.docs.map(
          (doc) => doc.data() as MenuItem
        )
        setMenuItems(items)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    }

    fetchMenuItems()
  }, [])

  return (
    <div className="p-4">
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
                
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-bold mt-1">
              ${item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      <p>{user && <Link href="/menu/menuAdmin">Upload Menu</Link>}</p>
    </div>
  )
}

export default Menu
