import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiOrderList, ApiPizza, ApiPizzasList, Order, Pizza} from "../types";
import axiosApi from "../axiosApi";

interface UpdatePizzaParams {
  id: string;
  pizza: ApiPizza;
}

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_ , thunkAPI) => {
    const ordersResponse = await axiosApi.get<ApiOrderList | null>('/orders.json')
    const orders = ordersResponse.data;

    let newOrders: Order[] = [];
    if (orders) {
      newOrders = Object.keys(orders).map(id => {
        const order = orders[id];
        return {
          ...order,
          id: id
        }
      });
    }

    // thunkAPI.getState()

    return newOrders;
  }
);

export const createPizza = createAsyncThunk<void, ApiPizza>(
  'pizzas/create',
  async (apiPizza) => {
    await axiosApi.post('/pizzas.json', apiPizza);
  }
);

export const deletePizza = createAsyncThunk<void, string>(
  'pizzas/delete',
  async (pizzaId) => {
    await axiosApi.delete('/pizzas/' + pizzaId + '.json');
  }
);

export const fetchAllPizzas = createAsyncThunk<Pizza[]>(
  'pizzas/fetchAll',
  async () => {
    const pizzasResponse = await axiosApi.get<ApiPizzasList | null>('/pizzas.json');
    const pizzas = pizzasResponse.data;

    let newPizzas: Pizza[] = [];

    if (pizzas) {
      newPizzas = Object.keys(pizzas).map(id => {
        const pizza = pizzas[id];
        return {
          ...pizza,
          id
        }
      });
    }
    return newPizzas;
  }
);

export const fetchOnePizza = createAsyncThunk<ApiPizza, string>(
  'pizzas/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ApiPizza | null>('/pizzas/' + id + '.json');
    const pizza = response.data;

    if (pizza === null) {
      throw new Error('Not found');
    }
    return pizza;
  }
);

export const updatePizza = createAsyncThunk<void, UpdatePizzaParams>(
  'pizzas/update',
  async (params) => {
    await axiosApi.put('/pizzas/' + params.id + '.json', params.pizza);
  }
);
