import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const listProductsBrand = createAsyncThunk(
  "LIST_PRODUCTS_BRAND",
  async ( sample, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/products/brands`
       
      );
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
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