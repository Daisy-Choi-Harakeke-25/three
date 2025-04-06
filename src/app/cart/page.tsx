'use client'
import useCart from '@/stores/cartStore'
import Image from 'next/image'
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
    <div className="mx-80">
      {isCartEmpty && <p>Cart is empty.</p>}
      {!isCartEmpty && (
        <div className="flex flex-col">
          <div className="flex flex-row  place-content-between">
            <h1>My cart</h1>
            <p>Continue shopping</p>
          </div>
          {cart.map((item) => (
            <div>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={200}
                height={200}
              />
              <div>
                <h1>name: {item.name}</h1>
                <h2>price: {item.price}</h2>
              </div>
              <h2>quantity: {item.quantity}</h2>
              <button onClick={() => decreaseItemQuantity(item.id)}>
                decrease quantity
              </button>
              <button onClick={() => increaseItemQuantity(item)}>increase quuantity</button>
              <button onClick={() => removeItemFromCart(item.id)}>
                remove item from cart
              </button>
            </div>
          ))}
        </div>
      )}
      <h2>Total items: {totalItem}</h2>
      <h2>Total price: {totalPrice}</h2>
    </div>
  )
}

export default Cart
