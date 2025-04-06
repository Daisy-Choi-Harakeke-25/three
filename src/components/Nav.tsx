'use client'
import useCart from '@/stores/cartStore'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { useShallow } from 'zustand/shallow'


const Nav = () => {
  const { cart } = useCart(
    useShallow((state) => ({
cart: state.cart,
    }))
  )
  const countCartItems = cart.length
  return (
    <nav className="flex align-middle">
      <Link href="/" className="m-6">
        <CldImage
          width="110"
          height="110"
          src="Logo_juzkwh"
          sizes="20vw"
          alt="logo"
          className="ml-[100px]"
        />
      </Link>
      <div className="text-[#009B64] gap-4 text-[20px] font-bold flex md:flex md:flex-grow flex-row justify-end items-center mr-[100px]">
        <p>
          <Link href="/menu">Menu</Link>
        </p>
        <p>
          <Link href="/aboutUs">About us</Link>
        </p>
        <p>
          <Link href="/contactUs">Contact us</Link>
        </p>
        <p>
          <Link href="/cart"  className='flex flex-row'>Cart<p className='bg-[#009B64] w-8 h-8 flex items-center justify-center rounded-full text-white ml-2'>{countCartItems}</p></Link>
        </p>
      </div>
    </nav>
  )
}

export default Nav
