import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiOrderList, ApiPizza, ApiPizzasList, FullOrder, Pizza} from "../types";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

interface UpdatePizzaParams {
  id: string;
  pizza: ApiPizza;
}

export const getOrders = createAsyncThunk<FullOrder[], undefined, {state: RootState}>(
  'orders/getOrders',
  async (_ , thunkAPI) => {
    const allDishes = thunkAPI.getState().pizzas.items;
    const ordersResponse = await axiosApi.get<ApiOrderList | null>('/orders.json')
    const orders = ordersResponse.data;

    let fullOrders: FullOrder[] = [];

    if (orders) {
      Object.keys(orders).forEach(id => {
        const order = orders[id];
        const orderDishes: FullOrder = {
          id: id,
          orderDishes: [],
        }
        for (let key in order) {
          allDishes.forEach(dish => {
            if (dish.id === key) {
              orderDishes.orderDishes.push({
                title: dish.title,
                price: dish.price,
                amount: order[key],
              })
            }
          })
        }
        fullOrders.push(orderDishes);
      });
    }
    return fullOrders;
  }
);

export const removeOrder = createAsyncThunk<void, string>(
  'orders/delete',
  async (pizzaId) => {
    await axiosApi.delete('/orders/' + pizzaId + '.json');
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
