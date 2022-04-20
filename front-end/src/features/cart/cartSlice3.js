import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    addToCart(state, action) {
      // state.cartItems.push(action.payload);
      // st
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else if (!existItem) {
        return { ...state, error: "", cartItems: [...state.cartItems, item] };
      } else return state;
    },
    removeFromCart(state, action) {
      const filteredCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== action.payload.product
      );
      state.cartItems = filteredCartItems;
    },
    emptyCart(state, action) {
      return {
        ...state,
        cartItems: [],
      };
    },
    saveShippingAddress(state, action) {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    },
    savePaymentMethod(state, action) {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
    getTotals(state, action) {
      // const toPrice = (num) => Number(num.toFixed(2));
      const total = state.cartItems.reduce(
        (acc, value) => acc + value.price * value.qty,
        0
      );
      const shipPrice = total > 100 ? 0 : 10;
      const tax = 0.15 * total;
      const allTotal = total + shipPrice + tax;

      state.itemsPrice = total;
      state.shippingPrice = shipPrice;
      state.taxPrice = tax;
      state.totalPrice = allTotal;
    },
  },
});
export const {
  addToCart,
  hydrate,
  emptyCart,
  getTotals,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
