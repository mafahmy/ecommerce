import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

export const login = createAsyncThunk(
  "USER_LOGIN",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/users/signin",
        { email, password }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
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

export const logout = createAsyncThunk("USER_LOGOUT", () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
});

const initialState = userInfo
  ? {
      isLoggedIn: true,
      userInfo,
    }
  : { isLoggedIn: false, userInfo: null };

const userLogSlice = createSlice({
  name: "log",
  initialState,
  extraReducers: {
    [login.pending]: (state, action) => {
      return {
        isLoading: true,
        isLoggedIn: false,
      };
    },
    [login.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    },
    [login.rejected]: (state, action) => {
      return {
        isLoading: false,
        isLoggedIn: false,

        error: action.payload,
      };
    },

    [logout.fulfilled]: (state, action) => {
      return {
        isLoading: false,
        userInfo: null,
        isLoggedIn: false,
      };
    },
  },
});
export default userLogSlice.reducer;
