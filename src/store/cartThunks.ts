import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiOrderList} from "../types";
import axiosApi from "../axiosApi";

export const createOrderDishes = createAsyncThunk<void, ApiOrderList>(
  'orders/createOrder',
  async (apiDish) => {
    await axiosApi.post('/orders.json', apiDish);
  }
);