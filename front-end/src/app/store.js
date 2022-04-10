import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice3";
import counterReducer from "../features/counter/counterSlice";
import { productsApi } from "../features/products/productsApi";
//import cartReducer from '../features/cart/cartSlice';

const preloadedState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),

  preloadedState,
});
