import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice3";
import counterReducer from "../features/counter/counterSlice";
import { productsApi } from "../features/products/productsApi";
import logReducer from "../features/users/userLogSlice";
import registerReducer from "../features/users/userRegisterSlice";
import ordersReducer from "../features/orders/ordersSlice";

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
    log: logReducer,
    register: registerReducer,
    orders: ordersReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),

  preloadedState,
});
