import {ApiPizza, FullOrder, Pizza} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {createPizza, deletePizza, fetchAllPizzas, fetchOnePizza, getOrders, updatePizza} from "./pizzasThunks";


interface PizzasState {
  items: Pizza[];
  orders: FullOrder[];
  onePizza: null | ApiPizza;
  fetchAllPizzasLoading: boolean;
  deleteLoading: false | string;
  createLoading: boolean;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  fetchOrdersLoading: boolean;
}

const initialState: PizzasState = {
  items: [],
  orders: [],
  onePizza: null,
  fetchAllPizzasLoading: false,
  deleteLoading: false,
  createLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
  fetchOrdersLoading: false,
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    removeOrderFromList: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(item => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.fetchOrdersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, {payload: orders}) => {
      state.fetchOrdersLoading = false;
      state.orders = orders;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.fetchOrdersLoading = false;
    });

    builder.addCase(fetchAllPizzas.pending, (state) => {
      state.fetchAllPizzasLoading = true;
    });
    builder.addCase(fetchAllPizzas.fulfilled, (state, {payload: pizzas}) => {
      state.fetchAllPizzasLoading = false;
      state.items = pizzas;
    });
    builder.addCase(fetchAllPizzas.rejected, (state) => {
      state.fetchAllPizzasLoading = false;
    });

    builder.addCase(deletePizza.pending, (state, {meta: {arg: pizzaId}}) => {
      state.deleteLoading = pizzaId;
    });
    builder.addCase(deletePizza.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deletePizza.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(createPizza.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createPizza.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createPizza.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(updatePizza.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updatePizza.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updatePizza.rejected, (state) => {
      state.updateLoading = false;
    });

    builder.addCase(fetchOnePizza.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOnePizza.fulfilled, (state, {payload: pizza}) => {
      state.fetchOneLoading = false;
      state.onePizza = pizza;
    });
    builder.addCase(fetchOnePizza.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  }
});

export const pizzasReducer = pizzasSlice.reducer;
export const {removeOrderFromList} = pizzasSlice.actions;

export const selectOrders = (state: RootState) => state.pizzas.orders;
export const selectPizzas = (state: RootState) => state.pizzas.items;
export const selectFetchAllPizzasLoading = (state: RootState) => state.pizzas.fetchAllPizzasLoading;
export const selectOneFetchLoading = (state: RootState) => state.pizzas.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) => state.pizzas.deleteLoading;
export const selectCreateLoading = (state: RootState) => state.pizzas.createLoading;
export const selectUpdateLoading = (state: RootState) => state.pizzas.updateLoading;
export const selectOnePizza = (state: RootState) => state.pizzas.onePizza;
export const selectOrdersLoading = (state: RootState) => state.pizzas.fetchOrdersLoading;
