import { createSlice } from '@reduxjs/toolkit';

const intialState = {};
const messageSlice = createSlice({
    name: 'message',
    intialState,
    reducers: {
        setMessage: (state, action) => {
            return { message: Selection.payload };
        },
        clearMessage: () => {
            return { message: '' };
        },
    },
});
export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer ;