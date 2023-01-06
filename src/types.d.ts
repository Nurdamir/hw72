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
  [id: string]: number | string;
}

export interface ApiOrderList {
  [id: string]: Order;
}

// export interface FullOrder {
//   id: string;
//   title: string;
//   price: number;
//   amount: number;
// }


