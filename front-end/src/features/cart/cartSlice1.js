import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const addToCart = createAsyncThunk(
  'CART_ADD_ITEM',
  async ({id, qty}, {rejectWithValue, getState, dispatch}) =>{
    const {data } = await axios.get(`http://localhost:4000/api/products/${id}`);
    
    dispatch({
      type : 'CART_ADD_ITEM',
       payload: {
         name: data.name,
         image: data.image,
         price: data.price,
         conutInstock: data.conutInstock,
         product: data._id,
         qty,
       },
    });
    localStorage.setItem('cartItem', JSON.stringify(getState().cart.cartItems));
  }
  )



const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,

  // reducers: {
  //   addToCart(state, action){

  //   }
  // },
  extraReducers:{
    [addToCart.pending]: (state, action) => {
      state.loading = true;
    },
    [addToCart.fulfilled]:(state, action) => {
      state.loading = false;
      state.cartItems.push(action.payload)
      // const item = action.payload;
      // const existItem = state.cartItems.find((x) => x.product === item.product);
      // if (existItem) {
      //     return {
      //         ...state,
      //         cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
      //     }
      // } else if (!existItem){
      //     return {
      //         ...state,
      //         cartItems: [...state.cartItems, item]
      //     };
      // } else return state;
    },
    [addToCart.rejected]:(state, action) => {
      state.loading = false;
      state.error = action.payload;;
    }
  }
});

//export const {  } = cartSlice.actions;

export default cartSlice.reducer;
