import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import Spinner from "../Spinner/Spinner";
import PizzaItem from "./PizzaItem";
import {selectFetchAllPizzasLoading, selectPizzas} from "../../store/pizzasSlice";
import {fetchAllPizzas} from "../../store/pizzasThunks";
import {Link} from "react-router-dom";

const Pizzas = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const fetchLoading = useAppSelector(selectFetchAllPizzasLoading);


  useEffect(() => {
    dispatch(fetchAllPizzas())
  }, [dispatch]);

  // const total = cartDishes.reduce((sum, cartDish) => {
  //   return sum + cartDish.amount * cartDish.dish.price;
  // }, 0);

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between my-3">
      <h3>Dishes</h3>
      <Link className="btn btn-info" to={`/admin/new-dish`}>Add new Dish</Link>
      </div>
        {fetchLoading ? <Spinner/> : pizzas.map((pizza) => (
        <PizzaItem
          key={pizza.id}
          pizza={pizza}
        />
      ))}
    </div>
  );
};

export default Pizzas;