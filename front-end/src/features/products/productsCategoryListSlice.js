import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const listProductsCategories = createAsyncThunk(
  "LIST_PRODUCTS_CATEGORIES",
  async ( sample, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/products/categories`
       
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
  categories: [],
};

const productsCategoryListSlice = createSlice({
  name: "productsCategoryList",
  initialState,

  extraReducers: {
    [listProductsCategories.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [listProductsCategories.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        categories: action.payload,
      };
    },
    [listProductsCategories.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export default productsCategoryListSlice.reducer;