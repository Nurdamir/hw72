import React, {ReactElement, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import PizzaItem from "./PizzaItem";
import {selectFetchAllPizzasLoading, selectPizzas} from "../../store/pizzasSlice";
import {fetchAllPizzas} from "../../store/pizzasThunks";

const Pizzas = () => {
  const dispatch = useAppDispatch();
  const pizzas = useAppSelector(selectPizzas);
  const fetchLoading = useAppSelector(selectFetchAllPizzasLoading);

  useEffect(() => {
    dispatch(fetchAllPizzas())
  }, [dispatch]);

  let content: ReactElement[] | ReactElement = (
    <p className="fs-3 fw-bold">There are no dishes yet!</p>
  );

  if (pizzas.length > 0) {
    content = (
      pizzas.map((pizza) => (
        <PizzaItem
          key={pizza.id}
          pizza={pizza}
        />
      ))
    )
  }

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between my-3">
      <h3>Dishes</h3>
      <Link className="btn btn-info" to={`/admin/new-dish`}>Add new Dish</Link>
      </div>
      <div className="d-flex justify-content-center">
        {fetchLoading ? <Spinner/> : content}
      </div>
    </div>
  );
};

export default Pizzas;