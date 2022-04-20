import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
import axios from "axios";

export const detailsProduct = createAsyncThunk(
  "DETAILS_PRODUCT",
  async (productId, thunkAPI) => {
    const {
      log: { userInfo },
    } = thunkAPI.getState();

    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/products/${productId}`,
        
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
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
  
};
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    // resetUpdateProduct(state, action) {
    //   return {};
    // },
  },
  extraReducers: {
    [detailsProduct.pending]: (state, action) => {
      return {
        isLoading: true,
      };
    },
    [detailsProduct.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        product: action.payload,
        
      };
    },
    [detailsProduct.rejected]: (state, action) => {
      return {
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
//export const { resetUpdateProduct } = productUpdateSlice.actions;
export default productDetailsSlice.reducer;