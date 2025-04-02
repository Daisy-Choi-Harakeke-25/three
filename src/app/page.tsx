"use client"
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <div className="relative w-full h-[500px]">
      <CldImage
  width="960"
  height="600"
  src="Main-Stripe_gsnsuy"
  sizes="20vw"
  alt="main-cake"/>
      </div>
      <div className='flex gap-12 my-12  mx-20 justify-between'>
      <div className='bg-[#009B64] text-white h-[400px] px-20 flex flex-col gap-10 justify-center py-4' >
      <h1 className='text-[50px] font-bold'>Seeking Fulfillment</h1>
      <p className="text-[20px] font-bold text-customGreen">
        Threebarfifty`s motto,`Seeking Fulfillment,` drives us to continuously
        elevate our desserts. We use premium ingredients such as New Zealand
        butter and French chocolate to create exceptional treats that exceed our
        customers` expectations.
      </p>
      </div>
      <CldImage
  width="960"
  height="600"
  src="Main-Cake_leby0z"
  sizes="20vw"
  alt="main-cake"/>
      </div>
      <p className='text-[40px] text-center'>
        Follow us on Instagram
        <Link href="https://www.instagram.com/threebarfifty/#" className='text-[#009B64]'>
          @threebarfifty
        </Link>
      </p>
    </div>
  )
}

export default Home