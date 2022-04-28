import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const listProducts = createAsyncThunk(
  "LIST_PRODUCTS",
  async ({ name = "", category = "", brand = "" }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `/api/products?name=${name}&category=${category}&brand=${brand}`
       
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
  products: [],
};

const productsListSlice = createSlice({
  name: "productsList",
  initialState,

  extraReducers: {
    [listProducts.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [listProducts.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        products: action.payload,
      };
    },
    [listProducts.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export default productsListSlice.reducer;
