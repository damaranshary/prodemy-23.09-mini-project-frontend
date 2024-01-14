import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // products: [],
  cart: [],
  // wishlistConfirmed: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // setProducts: (state, action) => {
    //   state.products = action.payload
    // },
    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id)
      if (item) {
        item.qty = action.payload.qty
      } else {
        state.cart.push(action.payload)
      }
      console.log(state.cart)
    },
    removeFromCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload)
      if (item) {
        state.cart = state.cart.filter((item) => item.id !== action.payload)
      }
    },

    resetCart: (state) => {
      state.cart = []
    },

    // confirmWishlist: (state) => {
    //   state.wishlistConfirmed = true
    //   state.total = state.cart.reduce((total, item) => total + Number(item.price), 0)
    // },
  },
})
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
