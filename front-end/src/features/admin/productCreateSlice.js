import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "CREATE_PRODUCT",
  async (sample, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/products",
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data.product;
    } catch (error) {
      const message = error.response.data.message
        ? error.response.data.message
        : error.message;
      thunkAPI.dispatch(setMessage(message));
      return message;
    }
  }
);
const initialState = {};
const productCreateSlice = createSlice({
  name: "productCreate",
  initialState,
  reducers: {
    resetCreateProduct(state, action) {
      return {};
    },
  },
  extraReducers: {
    [createProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [createProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        success: true,
        product: action.payload,
      };
    },
    [createProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export const { resetCreateProduct } = productCreateSlice.actions;
export default productCreateSlice.reducer;
