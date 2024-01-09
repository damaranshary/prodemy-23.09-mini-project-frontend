import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../store/slices/productSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

export default store;
