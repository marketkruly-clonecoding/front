import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import productReducer from "./product";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
