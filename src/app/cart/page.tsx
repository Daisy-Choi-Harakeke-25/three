'use client'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
import { shallow, useShallow } from 'zustand/shallow'

const Cart = () => {
  // Use shallow to subscribe to specific parts of the store
  const { count, cart, addCart, removeCart, removeItemFromCart } = useCart(
    useShallow((state) => ({
      count: state.count,
      cart: state.cart,
      addCart: state.addCart,
      removeCart: state.removeCart,
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
    <div>
      {isCartEmpty && <p>Cart is empty.</p>}
      {!isCartEmpty &&
        cart.map((item) => (
          <div>
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={500}
              height={500}
            />
            <h1>name: {item.name}</h1>
            <h2>price: {item.price}</h2>
            <h2>quantity: {item.quantity}</h2>
            <button onClick={() => removeCart(item.id)}>decrease quantity</button>
            <button onClick={() => addCart(item)}>increase quuantity</button>
            <button onClick={() => removeItemFromCart(item.id)}>remove item from cart</button>
          </div>
        ))}
        <h2>Total items: {totalItem}</h2>
        <h2>Total price: {totalPrice}</h2>
    </div>
  )
}

export default Cart