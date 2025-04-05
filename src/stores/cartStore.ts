import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type CartItem = {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

type CartState = {
  count: number
  cart: CartItem[]
  addCart: (item: CartItem) => void
  removeCart: (id: string) => void
  removeItemFromCart: (id: string) => void
}

const useCart = create(
  persist<CartState>(
    (set) => ({
      count: 0,
      cart: [],

      addCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem) {
            return {
              count: state.count + 1,
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            }
          }
          return {
            count: state.count + 1,
            cart: [...state.cart, { ...item, quantity: 1 }],
          }
        }),

      removeCart: (id) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id)
          if (existingItem && existingItem.quantity > 1) {
            return {
              count: state.count - 1,
              cart: state.cart.map((cartItem) =>
                cartItem.id === id
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              ),
            }
          }
          return {
            count: state.count - 1,
            cart: state.cart.filter((item) => item.id !== id),
          }
        }),
      removeItemFromCart: (id) =>
        set((state) => {
            const updatedCart = state.cart.filter((item) => item.id !== id)
            const updatedCount = updatedCart.reduce((total, item) => total + item.quantity, 0)
              return {
                count: updatedCount,
                cart: updatedCart,
              }
            
          
        }),
    }),
    {
      name: 'cart-items',
    }
  )
)

export default useCart
