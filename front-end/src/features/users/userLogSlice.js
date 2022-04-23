import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../messages/messageSlice";
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
      console.log(email);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.respons.data.message) ||
        error.message ||
        error.toStrring();
      thunkAPI.dispatch(setMessage(message));
      return message;
    }
  }
);

export const logout = createAsyncThunk("USER_LOGOUT", () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
});

const initialState = userInfo
  ? { isLoggedIn: true, userInfo }
  : { isLoggedIn: false, userInfo: null };

const userLogSlice = createSlice({
  name: "log",
  initialState,
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;

      state.userInfo = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;

      state.error = action.payload;
    },
    // [logout.pending]: (state, action) => {
    //   state.isLoading = true;
    //   state.isLoggedIn = true;
    // },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    // [logout.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isLoggedIn = true;
    //   state.userInfo = action.payload;
    // }
  },
});
export default userLogSlice.reducer;
