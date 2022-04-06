import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { productsApi } from '../features/products/productsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
});
