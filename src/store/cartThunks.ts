import {createAsyncThunk} from "@reduxjs/toolkit";
import {Order} from "../types";
import axiosApi from "../axiosApi";

export const createOrderDishes = createAsyncThunk<void, Order>(
  'orders/createOrder',
  async (apiDish) => {
    await axiosApi.post('/orders.json', apiDish);
  }
);