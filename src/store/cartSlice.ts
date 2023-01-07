import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {createPizza} from "./pizzasThunks";
import {CartPizza, Pizza} from "../types";

interface CartState {
  cartPizzas: CartPizza[];
  createOrderLoading: boolean
}

const initialState: CartState = {
  cartPizzas: [],
  createOrderLoading: false,
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
  },

  extraReducers: (builder) => {
    builder.addCase(createPizza.pending, (state) => {
      state.createOrderLoading = true;
    });
    builder.addCase(createPizza.fulfilled, (state) => {
      state.createOrderLoading = false;
    });
    builder.addCase(createPizza.rejected, (state) => {
      state.createOrderLoading = false;
    });
  }

});

export const cartReducer = cartSlice.reducer;

export const {addDish, resetCart, removeDish} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartPizzas;
export const selectCreateOrderLoading = (state: RootState) => state.cart.createOrderLoading;
