import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./userLogSlice";

export const resetPasswordNow = createAsyncThunk(
  "USER_RESET_PASSWORD",
  async ( {token, password }  , thunkAPI) => {
    try {
      const { data } = await axios.post(`/api/users/resetpassword/${token}`,{ password });
      
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
const initialState = {};

const resetPassSlice = createSlice({
    name: "resetPass",
    initialState,
    extraReducers: {
        [resetPasswordNow.pending]: (state, action) => {
            state.isLoading = true;
        },
        [resetPasswordNow.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.resetPassword = action.payload
        },
        [resetPasswordNow.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})
export default resetPassSlice.reducer;

