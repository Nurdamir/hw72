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

// export interface CartDish {
//   dish: Dish;
//   amount: number;
// }
//
// export interface Customer {
//   name: string;
//   address: string;
//   phone: string;
// }
//
// export interface ApiOrder {
//   customer: Customer;
//   dishes: CartDish[];
// }
//
// export interface ApiOrdersList {
//   [id: string]: ApiOrder;
// }
//
// export interface Order extends ApiOrder {
//   id: string;
//   totalPrice: number;
// }