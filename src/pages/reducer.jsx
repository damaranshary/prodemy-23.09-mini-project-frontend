
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    cart: [],
    wishlistConfirmed : false,
    total: 0, 
    // user: {
    //     name: "",
    //     email: "",
    //     password: "",
    // }
};

const shopSlice = createSlice ({
    name:'shop',
    initialState,
    reducers:{
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        addToCart: (state,action) => {
            state.cart.push(action.payload);
            state.total += Number (action.payload.price);
        },
        removeFromCart: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) {
                state.total -= Number (item.price);
                state.cart = state.cart.filter(item => item.id !== action.payload);
            }
        },
        
        confirmWishlist: (state) => {
            state.wishlistConfirmed = true;
            state.total = state.cart.reduce((total, item) => total + Number (item.price), 0);
        }
    }
});
export const { setProducts, addToCart, removeFromCart, confirmWishlist } = shopSlice.actions;
export default shopSlice.reducer;


