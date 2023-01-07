import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {Order} from "../types";

export const createOrderDishes = createAsyncThunk<void, Order>(
  'orders/createOrder',
  async (apiDish) => {
    await axiosApi.post('/orders.json', apiDish);
  }
);