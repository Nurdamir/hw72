import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Spinner from "../Spinner/Spinner";
import {selectFetchAllPizzasLoading, selectPizzas} from "../../store/pizzasSlice";
import {fetchAllPizzas} from "../../store/pizzasThunks";
import ClientPizzaItem from "./ClientPizzaItem";
import {selectCartDishes} from "../../store/cartSlice";
import ModalCart from "./ModalCart";


const ClientPizzas = () => {
  const dispatch = useAppDispatch();
  const cartPizzas = useAppSelector(selectCartDishes)
  const pizzas = useAppSelector(selectPizzas);
  const fetchLoading = useAppSelector(selectFetchAllPizzasLoading);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPizzas())
  }, [dispatch]);

  const total = cartPizzas.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.pizza.price;
  }, 0);

  return (
    <div className="p-3">
      {fetchLoading ? <Spinner/> : pizzas.map((pizza) => (
        <ClientPizzaItem
          key={pizza.id}
          pizza={pizza}
        />
      ))}

      <div>
        <div>
          <div className="col text-right">
            Order total: <strong>{total}</strong> KGS
          </div>
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >Checkout</button>
        </div>
        <div>
          {showModal && <ModalCart show={showModal} onClose={() => setShowModal(false)}/>}
        </div>
      </div>
    </div>
  );
};

export default ClientPizzas;