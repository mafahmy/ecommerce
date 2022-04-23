import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessage } from "../messages/messageSlice";

export const listProductsBrand = createAsyncThunk(
  "LIST_PRODUCTS_BRAND",
  async ( sample, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/products/brands`
       
      );
      return data;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      thunkAPI.dispatch(setMessage(message));
      return message;
    }
  }
);
const initialState = {
  isLoading: true,
  brands: [],
};

const productsBrandListSlice = createSlice({
  name: "productsBrandList",
  initialState,

  extraReducers: {
    [listProductsBrand.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [listProductsBrand.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        brands: action.payload,
      };
    },
    [listProductsBrand.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export default productsBrandListSlice.reducer;