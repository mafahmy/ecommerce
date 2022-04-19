import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { emptyCart } from "../cart/cartSlice3";

export const createOrder = createAsyncThunk(
  "CREATE_ORDER",
  async (order, thunkAPI) => {
    try {
      const {
        log: { userInfo },
      } = thunkAPI.getState();

      const { data } = await axios.post(
        "http://localhost:4000/api/orders",
        order,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return data.order;

      // thunkAPI.dispatch(emptyCart());
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  order: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrder: (state, acton) => {
      state.order = {};
    },
  },
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        order: action.payload,
        success: true,
      };
      // state.isLoading = false;
      // state.order = action.payload;
      // state.success = true;
    },
    [createOrder.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});
export const { resetOrder } = ordersSlice.actions;
export default ordersSlice.reducer;