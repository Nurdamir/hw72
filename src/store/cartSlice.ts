import {ApiOrderList, CartPizza, Pizza} from "../types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";

interface CartState {
  cartPizzas: CartPizza[];
}

const initialState: CartState = {
  cartPizzas: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: pizza}: PayloadAction<Pizza>) => {
      const existingIndex = state.cartPizzas.findIndex(item => {
        return item.pizza.id === pizza.id;
      });

      if (existingIndex !== -1) {
        state.cartPizzas[existingIndex].amount++;
      } else {
        state.cartPizzas.push({pizza, amount: 1})
      }
    },

    resetCart: (state) => {
      state.cartPizzas = initialState.cartPizzas;
    },

    removeDish: (state, action: PayloadAction<string>) => {
      state.cartPizzas = state.cartPizzas.filter(item => item.pizza.id !== action.payload)
    },

  }
});

export const cartReducer = cartSlice.reducer;

export const {addDish, resetCart, removeDish} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartPizzas;