import {configureStore} from "@reduxjs/toolkit";
import {pizzasReducer} from "../store/pizzasSlice";
import {cartReducer} from "../store/cartSlice";


export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    cart: cartReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;