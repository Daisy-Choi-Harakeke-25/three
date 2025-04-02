'use client'
import Link from 'next/link'
import Image from 'next/image'


interface ImageProp {
  imageUrl: string
  name: string
}

interface NavProps {
  image: ImageProp | null
}

const Nav = () => {
  return (
    <nav className="flex align-middle">
      <Link href="/" className="m-6">
        
      </Link>
      <div className="text-[#009B64] gap-4 text-[20px] font-bold flex md:flex md:flex-grow flex-row justify-end items-center">
        <p className=" text-right font-bold">
          <Link href="/menu">Menu</Link>
        </p>
        <p>
          <Link href="/aboutUs">About us</Link>
        </p>
        <p>
          <Link href="/contactUs">Contact us</Link>
        </p>
        <p>
          <Link href="/cart">Cart</Link>
        </p>
        
      </div>
    </nav>
  )
}

export default Nav
