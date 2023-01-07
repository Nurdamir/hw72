export interface Pizza {
  id: string;
  title: string;
  image: string;
  price: number;
}

export type ApiPizza = Omit<Pizza, 'id'>;

export interface ApiPizzasList {
  [id: string]: ApiPizza;
}

export interface PizzaMutation {
  title: string;
  image: string;
  price: string;
}

export interface CartPizza {
  pizza: Pizza;
  amount: number;
}

export interface Order {
  [id: string]: number;
}

export interface ApiOrderList {
  [id: string]: Order;
}

export interface OrderDish {
  title: string;
  price: number;
  amount: number;
}

export interface FullOrder {
  id: string;
  orderDishes: OrderDish[];
}


