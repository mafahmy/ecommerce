import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:4000/api/products/${id}`);
    dispatch({
        type: "CART_ADD_ITEM",
        payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInstock: data.countInstock,
            product: data._id,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
              return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                  x.product === existItem.product ? item : x
                ),
              };
            } else {
              return { ...state, cartItems: [...state.cartItems, item] };
            }
        default:
            return state;
    }
}