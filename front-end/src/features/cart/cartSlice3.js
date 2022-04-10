import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      hydrate:(state, action) => {
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
      } else if(!existItem){
        return { ...state, error: "", cartItems: [...state.cartItems, item] };
      } else return state;
    },
    removeFromCart(state, action){
      
        const filteredCartItems = state.cartItems.filter(
          (cartItem) => cartItem.product !== action.payload.product
        );
        state.cartItems = filteredCartItems;
      
    }
  },
  
});
export const { addToCart, hydrate, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
