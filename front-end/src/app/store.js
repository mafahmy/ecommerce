import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice3";
import counterReducer from "../features/counter/counterSlice";
import { productsApi } from "../features/products/productsApi";
import logReducer from "../features/users/userLogSlice";
import registerReducer from "../features/users/userRegisterSlice";
import ordersReducer from "../features/orders/ordersSlice";
import orderDetailsReducer from "../features/orders/orderDetailsSlice";
import orderPayReducer from "../features/orders/orderPaySlice";
import usersReducer from "../features/admin/usersListSlice";
import userDetailsReducer from "../features/users/userDetailsSlice";
import userOrdersReducer from "../features/orders/userOrdersSlice";
import userUpdateProfileReducer from "../features/users/userUpdateProfileSlice";
import productCreateReducer from "../features/admin/productCreateSlice";
import productUpdateReducer from "../features/admin/productUpdateSlice";
import productDetailsReducer from "../features/admin/productDetailsSlice";


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
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
    userOrders: userOrdersReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDetails: productDetailsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),

  preloadedState,
});
