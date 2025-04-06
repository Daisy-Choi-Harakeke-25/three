'use client'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { useShallow } from 'zustand/shallow'

const Cart = () => {
  // Use shallow to subscribe to specific parts of the store
  const { count, cart, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } = useCart(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      increaseItemQuantity: state.increaseItemQuantity,
      decreaseItemQuantity: state.decreaseItemQuantity,
      removeItemFromCart: state.removeItemFromCart,
    }))
  )
  const isCartEmpty = cart.length === 0
  
  const totalItem = count
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="mx-80 flex flex-row gap-4">
      {isCartEmpty && <p>Cart is empty.</p>}
      {!isCartEmpty && (
        <div className="flex flex-col w-7/10">
          <div className="flex flex-row  place-content-between border-b-2 py-4 border-[#009B64]">
            <h1>My cart</h1>
            <p><Link href='/menu'>Continue shopping</Link></p>
          </div>
          {cart.map((item) => (
            <div className='flex flex-row place-content-between align-middle border-b-2 py-6 border-[#009B64] items-center'>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={150}
                height={150}
              />

              <div >
                <h1>{item.name}</h1>
                <h2>${item.price}</h2>
              </div>

              <div className="flex flex-row items-center justify-between w-30 h-10 p-5 border-2 border-black text-[20px]">
              <p onClick={() => decreaseItemQuantity(item.id)} className="cursor-pointer">
                -
              </p>
              <h2>{item.quantity}</h2>
              <p onClick={() => increaseItemQuantity(item)} className="cursor-pointer">+</p>
            </div>
            <p>${item.price * item.quantity}</p>
              <button onClick={() => removeItemFromCart(item.id)}>
                delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='w-3/10 '>
      <h1 className='border-b-2 py-4 border-[#009B64]'>Order summary</h1>
      <h2>Total items: {totalItem}</h2>
      <h2>Subtotal: {totalPrice}</h2>
      <h2>Total: {totalPrice}</h2>
      <button className="cursor-pointer border-2 border-[#009B64] bg-[#009B64] text-white py-3 px-6 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-[#009B64] hover:border-[#007a48] transform hover:scale-105">CHECKOUT</button>
      </div>
    </div>
  )
}

export default Cart
