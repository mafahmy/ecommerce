import { createAction, createReducer } from '@reduxjs/toolkit';

import axios from 'axios';
export const addToCart = createAction('CART_ADD_ITEM',(id, qty) =>  {

   const { data } =  axios.get(`http://localhost:4000/api/products/${id}`); 
    return {
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInstock: data.countInstock,
            product: data._id,
            qty,
        },

    }
    //localStorage.setItem('cartItem', JSON.stringify(car))
} );

const initialState = {
    cartItems: [],
};
export const cartReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(addToCart, (state, action) => {
       const item = action.payload;
       const existItem = state.cartItems.find((x) => x.product === item.product);
       if (existItem) {
           return {
               ...state,
               cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
           }
       } else {
           return {
               ...state,
               cartItems: [...state.cartItems, item]
           };
       }
    })
    .addDefaultCase((state, action) => {
        return state;
    })
})


