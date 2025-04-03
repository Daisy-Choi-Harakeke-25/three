'use client'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'


const Nav = () => {
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
          <Link href="/cart">Cart</Link>
        </p>
      </div>
    </nav>
  )
}

export default Nav
