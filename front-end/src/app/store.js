import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice3";

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
import productDeleteReducer from "../features/admin/productDeleteSlice";
import ordersListReducer from "../features/admin/ordersListSlice";
import orderDeleteReducer from "../features/admin/orderDeleteSlice";
import orderDeliverReducer from "../features/admin/orderDeliverSlice";
import userDeleteReducer from "../features/admin/userDeleteSlice";
import userUpdateReducer from "../features/admin/userUpdateSlice";
import productsListReducer from "../features/products/productsListSlice";
import productsCategoryListReducer from "../features/products/productsCategoryListSlice";
import productsBrandListReducer from "../features/products/productsBrandListSlice";
import productReviewReducer from "../features/products/productReviewSlice";
import messageReducer from "../features/messages/messageSlice";
import adminPayReducer from "../features/admin/adminPaySlice";

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
   
    log: logReducer,
    register: registerReducer,
    orders: ordersReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    adminPay: adminPayReducer,
    productsList: productsListReducer,
    productsCategoryList: productsCategoryListReducer,
    productsBrandList: productsBrandListReducer,
    productReview: productReviewReducer,
    users: usersReducer,
    userDetails: userDetailsReducer,
    userOrders: userOrdersReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    ordersList: ordersListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    message: messageReducer,
    [productsApi.reducerPath]: productsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),

  preloadedState,
});
