import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const detailsOrder = createAsyncThunk(
  "ORDER_DETAILS",
  async (orderId, thunkAPI) => {
    try {
      const {
        log: { userInfo },
      } = thunkAPI.getState();

      const { data } = await axios.get(
        `/api/orders/${orderId}`,
        
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return data;

      // thunkAPI.dispatch(emptyCart());
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
  isLoading : true
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
//   reducers: {
//     resetOrder: (state, acton) => {
//       state.order = {};
//     },
//   },
  extraReducers: {
    [detailsOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [detailsOrder.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        order: action.payload,
      };
      // state.isLoading = false;
      // state.order = action.payload;
      // state.success = true;
    },
    [detailsOrder.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});
// export const { resetOrder } = ordersSlice.actions;
export default orderDetailsSlice.reducer;